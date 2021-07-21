from fastapi import FastAPI
from .database import SessionLocal, engine
from .routers import users
from .schemas import Message

app = FastAPI()

app.include_router(users.router)

@app.get('/healthcheck', response_model=Message)
async def healthcheck():
    return {"message": "Success"}