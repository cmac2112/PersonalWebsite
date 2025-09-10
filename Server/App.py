from flask import Flask, request, send_from_directory

app = Flask(__name__, static_folder="../client/dist", static_url_path="/")

@app.route('/')
def serve_dist():
    return send_from_directory(app.static_folder, "index.html")

@app.route('/api/hello')
def hello():
    return 'Hello, World!'

@app.route('/api/uniqueVisitor/', methods=['POST'])
def uniqueVisitor():
    data = data.from_json(request.json)
    return 'unique user'

if __name__ == '__main__':
    app.run(port=8080)