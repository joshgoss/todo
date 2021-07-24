from sqlalchemy.orm import Session
from . import models, schemas, utils


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

    if data.first_name:
        db_user.first_name = data.first_name

    if data.last_name:
        db_user.last_name = data.last_name
    
    db.commit()
    
    return db_user
