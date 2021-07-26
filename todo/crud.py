from sqlalchemy.orm import Session
from . import models, schemas, utils

def create_todo(db: Session, data: schemas.ToDoBase):
    todo = models.ToDo(**data)
    db.add(todo)
    db.commit()
    db.refresh(todo)
    return todo


def get_user_todos(db: Session, user_id: int):
    return db.query(models.ToDo).filter(models.ToDo.user_id == user_id).all()


def get_todo(db: Session, id: int):
    return db.query(models.ToDo).filter(models.ToDo.id == id).first()

def update_todo(db: Session, id: int, data: schemas.ToDoBase):
    todo = db.query(models.ToDo).filter(models.ToDo.id == id).first()

    for key, value in data.__dict__.items():
        setattr(todo, key, value)

    db.commit()

    return todo

def delete_todo(db: Session, id: int):
    todo = db.query(models.ToDo).filter(models.ToDo.id == id).first()
    db.delete(todo)
    db.commit()
    return todo

def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = utils.get_password_hash(user.password)
    db_user = models.User(
        first_name=user.first_name,
        last_name=user.last_name,
        hashed_password=hashed_password,
        username=user.username
    )

    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def delete_user(db: Session, username: str):
    user = db.query(models.User).filter(models.User.username == username).first()
    db.delete(user)
    db.commit()
    return user


def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()


def update_user(db: Session, username, data: schemas.UserUpdate):
    db_user = db.query(models.User).filter(models.User.username == username).first()
    
    for key, value in data.__dict__.items():
        setattr(db_user, key, value)
    
    db.commit()
    
    return db_user
