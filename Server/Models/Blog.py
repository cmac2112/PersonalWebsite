from sqlalchemy import create_engine, Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.ext.declarative import declarative_base
Base = declarative_base()

    

class BlogItem(Base):
    __tablename__ = "Blog"
    id = Column(Integer, primary_key=True)
    DateCreated = Column(DateTime)
    Text = Column(String)
    LinksTo = Column(String)