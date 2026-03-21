from fastapi import  FastAPI
from models import Product

app = FastAPI()

@app.get("/hello")
def say_hello():
    return "Hello00000 there!!"

