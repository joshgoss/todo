import pytest
from faker import Faker
from ... import utils
from ..factories import UserModelFactory

@pytest.fixture(scope="module")
def login_password():
    fake = Faker()
    return fake.pystr()

@pytest.fixture(scope="module")
def login_user(db, login_password):
    user = UserModelFactory()
    user.hashed_password = utils.get_password_hash(login_password)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


class TestToken:
    def test_invalid_password(self, client, login_user, login_password):
        response = client.post('/token/', data=dict(
            username=login_user.username,
            password='wrongpassword'
        ))
        assert response.status_code == 401

    def test_valid_login(self, client, login_user, login_password):
        response = client.post('/token/', data=dict(
            username=login_user.username,
            password=login_password
        ))
        assert response.status_code == 200
        assert 'access_token' in response.json()