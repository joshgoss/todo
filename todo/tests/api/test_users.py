from ...main import app
from ..factories import UserCreateFactory, UserModelFactory


class TestUsersCreate:
    def test_with_missing_username(self, client):
        user = UserCreateFactory()
        user.username = None
        response = client.post('/users/', json=user.__dict__)
        assert response.status_code == 422

    def test_with_missing_password(self, client):
        user = UserCreateFactory()
        user.password = None
        response = client.post('/users/', json=user.__dict__)
        assert response.status_code == 422

    def test_with_valid_data(self, client):
        user = UserCreateFactory()
        response = client.post('/users/', json=user.__dict__)

        assert response.status_code == 201
        json = response.json() 
        assert json['username'] == user.username
        assert json['first_name'] == user.first_name
        assert json['last_name'] == user.last_name
        assert 'id' in json

    def test_with_already_existing_username(self, client, test_user):
        response = client.post("/users/", json=dict(
            username=test_user.username,
            password='randompassword'
        ))
        assert response.status_code == 422

class TestUsersMe:
    def test_with_no_token(self, client, access_token):
        response = client.get(
            f"/users/me",     
        )
        assert response.status_code == 401

    def test_with_valid_token(self, client, test_user, access_token):
        response = client.get(
            f"/users/me",
            headers={"Authorization": f"Bearer {access_token}"}   
        )
        assert response.status_code == 200
        assert response.json()['username'] == test_user.username


class TestUsersUpdate:
    def test_with_no_token(self, client, test_user):
        first_name = 'updated'
        response = client.put(
            f"/users/{test_user.username}", 
            json=dict(first_name=first_name),
        )

        assert response.status_code == 401

    def test_with_valid_user(self, client, test_user, access_token):
        first_name = 'updated'

        response = client.put(
            f"/users/{test_user.username}", 
            json=dict(first_name=first_name),
            headers={"Authorization": f"Bearer {access_token}"}
        )
        assert response.status_code == 200
        assert response.json()['first_name'] == first_name


    def test_updating_another_user(self, client, other_user, access_token):
        first_name = 'updated'
        response = client.put(
            f"/users/{other_user.username}", 
            json=dict(first_name=first_name),
            headers={"Authorization": f"Bearer {access_token}"}
        )
        assert response.status_code == 401


class TestUsersDelete:
    def test_with_invalid_token(self, client, test_user):
        response = client.delete(
            f"/users/{test_user.username}"
        )
        assert response.status_code == 401

    def test_with_valid_token(self, client, other_user, other_access_token):
        response = client.delete(
            f"/users/{other_user.username}", 
            headers={"Authorization": f"Bearer {other_access_token}"}
        )
        assert response.status_code == 200