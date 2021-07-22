from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import dependencies, schemas, utils

router = APIRouter(
    prefix="/auth",
    tags=["auth"],
    dependencies=[]
)

@router.post("/", status_code=200, response_model=schemas.AuthToken)
def auth(login: schemas.Login, db: Session = Depends(dependencies.get_db)):
    user = utils.authenticate(db, login.username, login.password)

    if not user:
        raise HTTPException(status_code=401, detail="Invalid login or password")
    
    token = utils.generate_access_token(dict(
        sub=login.username,
        id=user.id,
        first_name=user.first_name,
        last_name=user.last_name
    ))

    return {
        "auth_token": token
    }