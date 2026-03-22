from fastapi import  FastAPI, Depends
from models import Product
from db import session,engin
import db_models
from sqlalchemy.orm import Session

db_models.Base.metadata.create_all(bind = engin)

app = FastAPI()

@app.get("/hello")
def say_hello():
    return "Hello00000 there!!"

def get_db():
    db = session()
    try:
        yield db
    finally:
        db.close()


@app.get("/products")
def get_all_products(db: Session = Depends(get_db)):
    return db.query(db_models.Product).all()

@app.get("/product/{id}")
def get_product_by_id(id: int):
    for product in products:
        if product.id == id:
           return product
    return "product not fount"

@app.post("/product")
def add_product(product: Product):
    products.append(product)
    return products

@app.put("/product")
def update_product(id: int, product: Product):
    for i in range(len(products)):
        if products[i].id == id:
            products[i] = product
            return "Product Updated successfully"
    
    return "Product not found"

@app.delete("/product")
def update_product(id: int):
    for i in range(len(products)):
        if products[i].id == id:
            del products[i]
            return "Product Deleted successfully"
    
    return "Product not found"

