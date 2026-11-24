from contextlib import asynccontextmanager
from os import getenv
from sys import exit
from dotenv import load_dotenv
from fastapi import FastAPI
from psycopg_pool import AsyncConnectionPool
from uvicorn import run


def main():
    run("main:app", host="127.0.0.1", port=8000, reload=False)


# Loads environment, returns name, host, port, and passwd if successful; else raises error message
def load():
    load_dotenv()

    environment = getenv("APP_ENV", "dev")
    try:
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
        open=False,
    )

    await pool.open()
    await pool.wait()

    app.state.pool = pool

    try:
        yield
    finally:
        await pool.close()


def start():
    app = FastAPI(lifespan=lifespan)

    @app.get("/")
    def root():
        return {"message": "API is running"}

    @app.get("/health")
    def health_check():
        return {"status": "healthy"}

    @app.get("/health/db")
    async def databse_health():
        async with app.state.pool.connection() as conn, conn.cursor() as cur:
            await cur.execute("SELECT current_database(), current_user;")
            result = await cur.fetchone()
        return {
            "database": result[0],
            "user": result[1],
        }

    return app


# Start API
app = start()

if __name__ == "__main__":
    main()
