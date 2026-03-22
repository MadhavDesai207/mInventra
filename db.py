from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine

db_url = "postgresql://postgres:pg1234@localhost:5432/minventra"
engin = create_engine(db_url)
session = sessionmaker(autocommit = False, autoflush = False, bind = engin)