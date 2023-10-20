from pydantic import BaseSettings


class Settings(BaseSettings):
    access_token_expire_minutes: int
    access_token_algorithm: str
    app_name: str
    app_host: str
    app_port: int
    postgres_db: str
    postgres_host: str
    postgres_password: str
    postgres_port: int
    postgres_user: str
    secret_key: str

    class Config:
        env_file = ".env"


settings = Settings()
