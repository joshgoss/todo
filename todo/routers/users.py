from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import crud, dependencies, models, schemas

router = APIRouter(
    prefix="/users",
    tags=["users"],
    dependencies=[]
)

def get_path_user(username: str, db: Session = Depends(dependencies.get_db), current_user: schemas.User = Depends(dependencies.get_current_user)):
    user_found = crud.get_user_by_username(db, username)

    if username != current_user.username:
        raise HTTPException(401, "Not authorized for this action")

    if not user_found:
        raise HTTPException(404, "No user found")

    return user_found


@router.post("/", status_code=201, response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(dependencies.get_db)):
    user_found = crud.get_user_by_username(db, user.username)

    if user_found:
        raise HTTPException(status_code=422, detail="Username already taken")

    user_created = crud.create_user(db, user)

    return user_created


@router.put("/{username}", response_model=schemas.User)
def update_user(username: str, data: schemas.UserUpdate, authorized: bool = Depends(get_path_user), db: Session = Depends(dependencies.get_db)):
    updated_user = crud.update_user(db, username, data)
    return updated_user