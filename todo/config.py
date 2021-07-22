from pydantic import BaseSettings


class Settings(BaseSettings):
    access_token_expire_minutes: int
    app_name: str
    app_host: str
    app_port: str
    database_url: str
    secret_key: str

    class Config:
        env_file = ".env"


settings = Settings()