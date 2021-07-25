from fastapi import FastAPI
from .database import SessionLocal, engine
from .routers import token, users, healthcheck
from .schemas import Message

app = FastAPI()

app.include_router(users.router)
app.include_router(token.router)
app.include_router(healthcheck.router)