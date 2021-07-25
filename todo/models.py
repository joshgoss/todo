import datetime
import enum
from sqlalchemy import Boolean, Column, Date, DateTime, Enum, ForeignKey, Integer, String

from .database import Base
from .schemas import PriorityEnum


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    first_name = Column(String, nullable=True)
    last_name = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, nullable=True)


class ToDo(Base):
    __tablename__ = "todos"
    id = Column(Integer, primary_key=True, index=True)
    description = Column(String, index=True)
    priority = Column(Enum(PriorityEnum))
    due_date = Column(Date, nullable=True)
    completed = Column(Boolean, default=False)
    user_id  = Column(Integer, ForeignKey('users.id'))
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, nullable=True)