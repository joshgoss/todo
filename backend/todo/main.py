from fastapi import FastAPI
from fastapi.middleware import Middleware
from fastapi.middleware.cors import CORSMiddleware
from .database import SessionLocal, engine
from .routers import todos, token, users, healthcheck
from .schemas import Message
from .config import settings

middleware = [
    Middleware(
        CORSMiddleware,
        allow_origins=['http://127.0.0.1:3000', 'http://localhost:3000'],
        allow_credentials=True,
        allow_methods=['*'],
        allow_headers=['*']
    )
]

app = FastAPI(middleware=middleware)

app.include_router(users.router)
app.include_router(todos.router)
app.include_router(token.router)
app.include_router(healthcheck.router)



