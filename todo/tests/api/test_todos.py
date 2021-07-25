import pytest
from ..factories import ToDoCreateFactory, ToDoModelFactory

@pytest.fixture(scope='module')
def test_todo(db, access_token, test_user):
    todo = ToDoModelFactory()
    todo.user_id = test_user.id
    todo.priority = 0
    db.add(todo)
    db.commit()
    db.refresh(todo)

    return todo

class TestToDosCreate:
    def test_with_no_token(self, client, access_token):
        todo = ToDoCreateFactory()
        response = client.post('/todos/', json={
            **todo.__dict__,
            'due_date': str(todo.due_date),
        })
        assert response.status_code == 401

    def test_valid_todo(self, client, access_token):
        todo = ToDoCreateFactory()
        response = client.post('/todos/', json={
            **todo.__dict__,
            'due_date': str(todo.due_date),
        }, headers={"Authorization": f"Bearer {access_token}"} )
        assert response.status_code == 201
        json = response.json()
        assert 'id' in json
        assert json['description'] == todo.description


class TestToDosGet:
    def test_with_invalid_token(self, client, access_token):
        response = client.get('/todos/', headers={"Authorization": f"Bearer badfasd"})
        assert response.status_code == 401
    
    def test_with_valid_token(self, client, access_token):
        response = client.get('/todos/', headers={"Authorization": f"Bearer {access_token}"})
        assert response.status_code == 200


class TestToDoGet:
    def test_with_invalid_token(self, client, access_token, test_todo):
        response = client.get(f"/todos/{test_todo.id}", headers={"Authorization": f"Bearer badfasd"})
        assert response.status_code == 401
    
    def test_with_valid_token(self, client, access_token, test_todo):
        response = client.get(f"/todos/{test_todo.id}", headers={"Authorization": f"Bearer {access_token}"})
        assert response.status_code == 200
        assert response.json()['id'] == test_todo.id