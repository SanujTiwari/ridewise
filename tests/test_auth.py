def test_register_user(client):
    response = client.post(
        "/api/v1/auth/register",
        json={
            "name": "Test Commuter",
            "email": "commuter@ridewise.io",
            "password": "securepassword123",
            "role": "USER"
        }
    )
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["user"]["email"] == "commuter@ridewise.io"
    assert data["user"]["role"] == "USER"

def test_login_user(client):
    response = client.post(
        "/api/v1/auth/login",
        json={
            "email": "commuter@ridewise.io",
            "password": "securepassword123"
        }
    )
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["user"]["name"] == "Test Commuter"

def test_login_invalid_password(client):
    response = client.post(
        "/api/v1/auth/login",
        json={
            "email": "commuter@ridewise.io",
            "password": "wrongpassword"
        }
    )
    assert response.status_code == 401
