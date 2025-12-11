from pydantic import BaseModel

class ProductBase(BaseModel):
    id: int
    name: str
    category: str
    price: float
    image_url: str
    description: str

class ProductCreate(ProductBase):
    pass

class Product(ProductBase):
    id: int

    class Config:
        from_attributes = True
