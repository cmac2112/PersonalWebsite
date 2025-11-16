from flask import Flask, request, send_from_directory
from flask_cors import CORS

app = Flask(__name__, static_folder="../client/dist", static_url_path="/")

#allow cros origin requests
CORS(app)
@app.route('/api/addblog', methods=['POST'])
def add_latest_blog():
    print('POST /api/addblog')
    data = request.get_json()
    
    blog_id = data.get("id")
    date_created = data.get("date")
    topic = data.get("topic")
    text = data.get("text")
    links_to = data.get("links")
    print(f"id: {blog_id}")
    print(f"date: {date_created}")
    print(f"topic: {topic}")
    print(f"text: {text}")
    print(f"links: {links_to}")
    return "Blog entry received"
        
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080)