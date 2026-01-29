from fastapi import APIRouter, Depends, UploadFile, File, Form
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
from typing import List, Optional
import os
import uuid
from pathlib import Path

from .. import database, models, schemas

router = APIRouter(prefix="/products", tags=["Products"])

models.Base.metadata.create_all(bind=database.engine)

# Create uploads directory if it doesn't exist
UPLOAD_DIR = Path(__file__).parent.parent.parent / "uploads"
UPLOAD_DIR.mkdir(exist_ok=True)

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/", response_model=List[schemas.Product])
def get_products(db: Session = Depends(get_db)):
    return db.query(models.Product).all()

@router.post("/")
async def create_product(
    name: str = Form(...),
    category: str = Form(...),
    price: float = Form(...),
    description: str = Form(...),
    image: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db)
):
    image_url = ""
    
    # Handle file upload if image is provided
    if image:
        # Generate unique filename
        file_ext = image.filename.split(".")[-1] if image.filename else "jpg"
        unique_filename = f"{uuid.uuid4()}.{file_ext}"
        file_path = UPLOAD_DIR / unique_filename
        
        # Save file to disk
        contents = await image.read()
        with open(file_path, "wb") as f:
            f.write(contents)
        
        # Set image_url to the path that will be served
        image_url = f"/uploads/{unique_filename}"
    
    # Create product with image_url
    new_product = models.Product(
        name=name,
        category=category,
        price=price,
        description=description,
        image_url=image_url
    )
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    return {"message": "Product added", "product": new_product}

@router.delete("/{product_id}")
def delete_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if not product:
        return {"error": "Product not found"}
    
    # Delete image file if it exists
    if product.image_url and product.image_url.startswith("/uploads/"):
        file_path = UPLOAD_DIR / product.image_url.split("/uploads/")[-1]
        if file_path.exists():
            file_path.unlink()
    
    db.delete(product)
    db.commit()
    return {"message": "Product deleted"}