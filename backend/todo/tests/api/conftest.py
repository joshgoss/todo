import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine

from ...dependencies  import get_db
from ...database import Base
from ...main import app
from ..common import Session
from ..factories import UserModelFactory
from ...utils import generate_access_token

from ...config import settings


SQLALCHEMY_DATABASE_URL = "sqlite:///./test2.db"
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)


@pytest.fixture(scope='session')
def db():
    Base.metadata.create_all(bind=engine)
    Session.configure(bind=engine)
    session = Session()
    yield session 
    Session.remove()
    Base.metadata.drop_all(bind=engine)


@pytest.fixture(scope='session')
def client(db):
    def override_get_db():
        try:
            yield db
        finally:
            pass
    
    app.dependency_overrides[get_db] = override_get_db
    client = TestClient(app)
    yield client
    

@pytest.fixture(scope='session')
def test_user(db):
    user = UserModelFactory()
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


@pytest.fixture(scope='session')
def access_token(test_user):
    token = generate_access_token(dict(
        sub=test_user.username,
        username=test_user.username,
        id=test_user.id
    ))

    return token


@pytest.fixture(scope='module')
def other_user(db):
    user = UserModelFactory()
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

@pytest.fixture(scope='module')
def other_access_token(other_user):
    token = generate_access_token(dict(
        sub=other_user.username,
        username=other_user.username,
        id=other_user.id
    ))

    return token