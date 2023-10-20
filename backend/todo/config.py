from pydantic import BaseSettings


class Settings(BaseSettings):
    access_token_expire_minutes: str
    access_token_algorithm: str
    app_name: str
    app_host: str
    app_port: str
    postgres_db: str
    postgres_host: str
    postgres_password: str
    postgres_port: str
    postgres_user: str
    secret_key: str

    class Config:
        env_file = ".env"


settings = Settings()

print(f"POSTGRES PORT: {settings.postgres_port}")
print(f"POSTGRES USER: {settings.postgres_user}")
print(f"POSTGRES HOST: {settings.postgres_host}")
print(f"APP_PORT: {settings.app_port}")
