from datetime import date, datetime
import enum
from pydantic import BaseModel, constr, EmailStr
from typing import Optional

class PriorityEnum(int, enum.Enum):
    none = 0
    low = 1
    medium = 2
    high = 3


class Login(BaseModel):
    username: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str

class Exists(BaseModel):
    exists: bool

class Message(BaseModel):
    message: str

class TokenData(BaseModel):
    username: Optional[str] = None
    user_id: Optional[int] = None


class ToDoBase(BaseModel):
    description: str
    priority: Optional[PriorityEnum] = PriorityEnum.none
    due_date: Optional[date] = None
    completed: Optional[bool]  = False

    class Config:
        orm_mode = True


class ToDo(ToDoBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        orm_mode = True

class UserBase(BaseModel):
    username: constr(regex=r'^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$', min_length=3, max_length=20)
    first_name: Optional[str] = None
    last_name: Optional[str] = None


class UserCreate(UserBase):
    password: constr(min_length=6, max_length=200)


class UserUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None

class User(UserBase):
    id: int
    created_at: datetime = None
    updated_at: datetime = None

    class Config:
        orm_mode = True


