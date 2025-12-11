from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routes import products,auth

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # we'll secure later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"status": "Backend is running"}


products_db = [
    {
        "id": 1,
        "name": "Rose Luxury Perfume",
        "price": 250,
        "category": "Perfume",
        "image_url": "https://via.placeholder.com/300",
        "description": "Soft floral rose scent for women"
    }
]

app.include_router(products.router)
app.include_router(auth.router)
