from flask import Flask, request, send_from_directory
import os
app = Flask(__name__, static_folder="../client/dist", static_url_path="/")

#python part of this app is now depricated, wanted to full stack this but i am cheaping out and doing everything through static react pages
@app.route('/')
def serve_root():
    return send_from_directory(app.static_folder, "index.html")

# Serve static files (JS, CSS, images, etc.)
@app.route('/<path:path>')
def serve_static(path):
    # If the file exists in the static folder, serve it
    if os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    # Otherwise, serve index.html and let React Router handle it
    else:
        return send_from_directory(app.static_folder, "index.html")


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)