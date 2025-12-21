from fastapi import FastAPI
from app.routes.predict_routes import router as predict_router

app = FastAPI()

app.include_router(predict_router)

@app.get("/")
def home():
    return {"msg":"ML server running"}