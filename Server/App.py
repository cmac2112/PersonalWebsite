from flask import Flask, request, send_from_directory
from flask_cors import CORS
from sqlalchemy import create_engine
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
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

engine = create_engine(DATABASE_URL, echo=True)
SessionLocal = sessionmaker(bind=engine)

Base.metadata.create_all(bind=engine)



app = Flask(__name__, static_folder="../client/dist", static_url_path="/")

#allow cros origin requests
CORS(app)

#define basic rate limiting, applied by default to all endpoints
limiter = Limiter(
    get_remote_address,
    app=app,
    default_limits=["10000 per day", "1000 per hour"],
    storage_uri="memory://"
)



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
    return {"blogs": [{"id": b.id, "date": str(b.DateCreated), "topic": b.Topic, "text": b.Text, "links": b.LinksTo} for b in blogs]}

@app.route('/api/blog/<id>', methods=['GET'])
def get_blog_by_Id(id: int):
    print(f"GET /api/blog/{id}")
    session = SessionLocal()
    
    blog: BlogItem = session.query(BlogItem).filter(BlogItem.id == id).first()
    session.close()
    
    if blog:    
        return {
            "id": blog.id,
            "date": str(blog.DateCreated.date),
            "text": blog.Text,
            "links":blog.LinksTo
        }
    else:
        return {"error": "Blog not found"}, 404
       
@app.route('/api/blog/latest', methods=['GET'])
def get_latest_blog():
    print('GET /api/blog/latest')
    
    session = SessionLocal()
    blog: BlogItem = session.query(BlogItem).first()
    if blog:
        return {
            "id": blog.id,
            "date": str(blog.DateCreated),
            "text": blog.Text,
            "links":blog.LinksTo
        }
    else:
        return {"error": "blog not found"}, 404
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)