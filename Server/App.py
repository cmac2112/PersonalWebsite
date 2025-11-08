from flask import Flask, request, send_from_directory
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from Models.Blog import Base, BlogItem
import os
from dotenv import load_dotenv


load_dotenv()
DB_USERNAME = os.getenv("sqlusername")
DB_PASSWORD = os.getenv("password")
DB_HOST = os.getenv("cloudsql_public_ip")
DB_PORT = os.getenv("database_port")
DB_NAME = os.getenv("database_name")
DB_DRIVER = os.getenv("DB_DRIVER")
DATABASE_URL = (
    f"mssql+pyodbc://{DB_USERNAME}:{DB_PASSWORD}@127.0.0.1:{DB_PORT}/{DB_NAME}"
    f"?driver=ODBC+Driver+18+for+SQL+Server&Encrypt=no"
)
print(DATABASE_URL)

engine = create_engine(DATABASE_URL, echo=True)
SessionLocal = sessionmaker(bind=engine)

Base.metadata.create_all(bind=engine)



app = Flask(__name__, static_folder="../client/dist", static_url_path="/")



@app.route('/')
def serve_dist():
    return send_from_directory(app.static_folder, "index.html")

@app.route('/api/blogs', methods=['GET'])
def get_blogs():
    #initialize our context
    session = SessionLocal()
    #query
    blogs = session.query(BlogItem).all()
    #dispose
    session.close()
    return {"blogs": [{"id": b.id, "date": str(b.DateCreated), "text": b.Text, "links": b.LinksTo} for b in blogs]}

@app.route('/api/blog/<id>', methods=['GET'])
def get_blog_by_Id(id):
    session = SessionLocal()
    
    blog = session.query(BlogItem).filter(BlogItem.id == id).first()
    session.close()
    
    if blog:
        return {
            "id": blog.id,
            "date": str(blog.DateCreated),
            "text": blog.Text,
            "links":blog.LinksTo
        }
    else:
        return {"error": "Blog not found"}, 404
        
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)