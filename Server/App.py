from flask import Flask, request, send_from_directory
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

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

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)