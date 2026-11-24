from os import getenv
from sys import exit
from dotenv import load_dotenv
from fastapi import FastAPI
from psycopg_pool import AsyncConnectionPool


def main():
    # Load environment
    db_name, db_host, db_port, db_passwd = load()
    # Get and test connection
    get_db_connection(db_name, db_host, db_port, db_passwd)
    print(test_db_connection(db_name, db_host, db_port, db_passwd))
    # Start API
    app = start()


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


def start():
    app = FastAPI()

    @app.get("/")
    def root():
        return {"message": "API is running"}

    @app.get("/health")
    def health_check():
        return {"status": "healthy"}

    return app


if __name__ == "__main__":
    main()
