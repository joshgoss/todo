from ..factories import ToDoCreateFactory


class TestUsersCreate:
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
        }, headers={"Authorization": f"Bearer {access_token}"}  )
        assert response.status_code == 201
        json = response.json()
        assert 'id' in json
        assert json['description'] == todo.description