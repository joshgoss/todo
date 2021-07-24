from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from .. import crud, dependencies, schemas, utils

router = APIRouter(
    prefix="/token",
    tags=["auth"],
    dependencies=[]
)
    

@router.post("/", status_code=200, response_model=schemas.Token)
def auth(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(dependencies.get_db)):
    user = crud.get_user_by_username(db, form_data.username)
    
    if not user:
        return False
    
    if not utils.verify_password(form_data.password, user.hashed_password):
        return False

    if not user:
        raise HTTPException(status_code=401, detail="Invalid login or password")
    
    token = utils.generate_access_token(dict(
        sub=form_data.username,
        username=user.username,
        id=user.id
    ))

    return {
        "access_token": token,
        "token_type": "bearer"
    }