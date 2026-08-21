def test_get_root(client):
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert data["project"] == "RideWise API"

def test_get_routes(client):
    response = client.get("/api/v1/routes")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_search_routes(client):
    response = client.get("/api/v1/routes/search?from_stop=Phagwara&to_stop=Jalandhar")
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
