from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import crud, dependencies, models, schemas

router = APIRouter(
    prefix="/users",
    tags=["users"],
    dependencies=[]
)

@router.post("/", status_code=201, response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(dependencies.get_db)):
    user_found = crud.get_user_by_username(db, user.username)

    if user_found:
        raise HTTPException(status_code=422, detail="Username already taken")

    user_created = crud.create_user(db, user)

    return user_created
