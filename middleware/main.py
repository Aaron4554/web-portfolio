from contextlib import asynccontextmanager
from os import getenv
from sys import exit
from typing import Annotated

from dotenv import load_dotenv
from fastapi import Depends, FastAPI, HTTPException, Request
from psycopg import AsyncConnection, sql
from psycopg_pool import AsyncConnectionPool
from uvicorn import run


def main():
    # Use uvicorn to run app when main.py runs.
    run("main:app", host="127.0.0.1", port=8000, reload=False)


# Loads environment, returns name, host, port, and passwd if successful; else raises error message
def load():
    load_dotenv()

    try:
        environment = require_env("APP_ENV")
        if environment == "dev":
            db_name = require_env("DEV_DB_NAME")
        elif environment == "prod":
            db_name = require_env("PROD_DB_NAME")
        else:
            raise ValueError(f"Invalid APP_ENV: {environment}")
        db_host = require_env("DB_HOST")
        db_port = require_env("DB_PORT")
        db_passwd = require_env("PORTFOLIO_RO_PASSWORD")
    except ValueError as e:
        exit(str(e))
    return db_name, db_host, db_port, db_passwd


# Load helper
def require_env(name):
    value = getenv(name)
    if not value:
        raise ValueError(f"Missing environment variable {name}")
    return value


@asynccontextmanager
async def lifespan(app: FastAPI):
    db_name, db_host, db_port, db_passwd = load()

    pool = AsyncConnectionPool(
        conninfo="",
        kwargs={
            "dbname": db_name,
            "host": db_host,
            "port": int(db_port),
            "user": "portfolio_ro",
            "password": db_passwd,
        },
        min_size=1,
        max_size=5,
        open=True,
    )
    await pool.wait()

    app.state.pool = pool

    try:
        yield
    finally:
        await pool.close()


async def get_db_connection(request: Request):
    async with app.state.pool.connection() as conn:
        yield conn


def start():
    app = FastAPI(lifespan=lifespan)
    allowed_tables = ["certifications", "projects", "social_links", "resume"]

    @app.get("/")
    def root():
        return {"message": "API is running"}

    @app.get("/health")
    def health_check():
        return {"status": "healthy"}

    @app.get("/health/db")
    async def databse_health(
        conn: Annotated[AsyncConnection, Depends(get_db_connection)],
    ):
        async with conn.cursor() as cur:
            await cur.execute("SELECT current_database(), current_user;")
            result = await cur.fetchone()
            if result is None:
                raise RuntimeError("Database health check returned no results")
        return {
            "database": result[0],
            "user": result[1],
        }

    @app.get("/{category}/{id}")
    async def get_link(
        category: str,
        id: int,
        conn: Annotated[AsyncConnection, Depends(get_db_connection)],
    ):
        if category not in allowed_tables:
            raise HTTPException(
                status_code=404, detail=f"Category '{category}' not found"
            )
        async with conn.cursor() as cur:
            await cur.execute(
                sql.SQL("SELECT link FROM {} WHERE id = %s").format(
                    sql.Identifier(category),
                ),
                (id,),
            )
            link = await cur.fetchone()
            if link is None:
                raise HTTPException(
                    status_code=404,
                    detail=f"No link found for id {id} in table {category}",
                )
        return link[0]

    return app


# Start API, make app available on module level for cli uvicorn
app = start()

if __name__ == "__main__":
    main()
