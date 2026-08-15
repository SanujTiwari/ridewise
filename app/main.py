from fastapi import FastAPI

app = FastAPI(title="RideWise API")


@app.get("/")
def home():
    return {"message": "RideWise API is running"}