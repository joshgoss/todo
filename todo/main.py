from fastapi import FastAPI
from functools import lru_cache

from .config import Settings
from .models import Base
from .database import SessionLocal, engine

app = FastAPI()

@lru_cache()
def get_settings():
    return Settings()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


