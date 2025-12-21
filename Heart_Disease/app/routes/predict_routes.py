from fastapi import APIRouter
from app.controllers.predict_controller import predict

router = APIRouter(prefix="/predict")

@router.get("/")
def predict_route():
    return predict(data)