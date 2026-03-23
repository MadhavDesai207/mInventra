from fastapi import  FastAPI, Depends
from models import Product
from db import session,engin
import db_models
from sqlalchemy.orm import Session

db_models.Base.metadata.create_all(bind = engin)

app = FastAPI()

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
def get_product_by_id(id: int, db: Session = Depends(get_db)):
    product = db.query(db_models.Product).filter(db_models.Product.id == id).first()
    if product:
        return product
    return "product not fount"

@app.post("/product")
def add_product(product: Product, db: Session = Depends(get_db)):
    db.add(db_models.Product(**product.model_dump()))
    db.commit()
    return product

@app.put("/product")
def update_product(id: int, product: Product, db: Session = Depends(get_db)):
    db_product = db.query(db_models.Product).filter(db_models.Product.id == id).first()

    if db_product:
        db_product.id = product.id
        db_product.name = product.name
        db_product.price = product.price
        db_product.quantity = product.quantity
        db.commit()
        return "Product Updated successfully"
   
    return "Product not found"

@app.delete("/product")
def update_product(id: int, db: Session = Depends(get_db)):
    db_product = db.query(db_models.Product).filter(db_models.Product.id == id).first()
    if db_product:
        db.delete(db_product)
        db.commit()
        return "Product Deleted successfully"
    return "Product not found"

