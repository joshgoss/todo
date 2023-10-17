
def test_get_healthcheck(client):
    response = client.get('/healthcheck')
    assert response.status_code == 200
    assert response.json() == {'message': 'Success'}