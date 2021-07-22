from datetime import datetime
from pydantic import BaseModel, constr, EmailStr
from typing import Optional

class Login(BaseModel):
    username: str
    password: str


class AuthToken(BaseModel):
    auth_token: str

class Message(BaseModel):
    message: str

class UserBase(BaseModel):
    username: constr(regex=r'^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$', min_length=3, max_length=20)
    first_name: Optional[str] = None
    last_name: Optional[str] = None


class UserCreate(UserBase):
    password: constr(min_length=6, max_length=200)


class User(UserBase):
    id: int
    created_at: datetime = None
    updated_at: datetime = None

    class Config:
        orm_mode = True