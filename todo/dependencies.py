from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from functools import lru_cache
from jose import JWTError, jwt
from sqlalchemy.orm import Session

from .config import Settings
from .database import SessionLocal
from .crud import get_user_by_username
from .schemas import Token, TokenData

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@lru_cache()
def get_settings():
    return Settings()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db), settings: Settings = Depends(get_settings)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(token, settings.secret_key, algorithms=[settings.access_token_algorithm])
        username: str = payload.get("username")

        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
    
    user = get_user_by_username(db, username=token_data.username)
    
    if user is None:
        raise credentials_exception
    
    return user