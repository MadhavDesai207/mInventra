from fastapi import  FastAPI
from models import Product
from db import session,engin
import db_models

db_models.Base.metadata.create_all(bind = engin)

app = FastAPI()

@app.get("/hello")
def say_hello():
    return "Hello00000 there!!"


products = [
    Product(id=1, name="Phone", price=24000, quantity=10),
    Product(id=2, name="Laptop", price=75000, quantity=5),
    Product(id=3, name="Tablet", price=35000, quantity=8),
    Product(id=4, name="Headphones", price=5000, quantity=20),
    Product(id=5, name="Monitor", price=18000, quantity=12),
    Product(id=6, name="Keyboard", price=3000, quantity=25),
    Product(id=7, name="Mouse", price=1500, quantity=30),
    Product(id=8, name="Webcam", price=4000, quantity=15),
    Product(id=9, name="Speaker", price=8000, quantity=10),
    Product(id=10, name="USB Cable", price=500, quantity=50)
]

def init_db():
    db = session()

    for product in products:
        db.add(db_models.Product(**product.model_dump()))
        
    db.commit()


@app.get("/products")
def get_all_products():
    db = session()
    return products

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

