from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import SessionLocal, engine
from .routers import todos, token, users, healthcheck
from .schemas import Message
from .config import settings

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router)
app.include_router(todos.router)
app.include_router(token.router)
app.include_router(healthcheck.router)