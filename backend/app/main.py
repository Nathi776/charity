from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pathlib import Path

from .routes import products, auth

from .create_admin import create_admin

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # we'll secure later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup():
    create_admin()

@app.get("/")
def home():
    return {"status": "Backend is running"}

# Mount uploads directory for serving static files
uploads_dir = Path(__file__).parent.parent / "uploads"
uploads_dir.mkdir(exist_ok=True)
app.mount("/uploads", StaticFiles(directory=str(uploads_dir)), name="uploads")

app.include_router(products.router)
app.include_router(auth.router)

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