from fastapi import FastAPI
from fastapi.middleware import Middleware
from fastapi.middleware.cors import CORSMiddleware
from .database import SessionLocal, engine
from .routers import todos, token, users, healthcheck
from .schemas import Message
from .config import settings

origins = []

if settings.app_env == 'local':
    origins.append(f"http://{settings.host}:{settings.app_port}")
else:
    origins.append(f"https://{settings.client_domain}")

middleware = [
    Middleware(
        CORSMiddleware,
        allow_origins=origins,
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



