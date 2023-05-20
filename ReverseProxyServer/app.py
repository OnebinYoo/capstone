from flask import Flask, redirect, request
from re_proxy import configure_proxy_routes
import logging
from logging.handlers import RotatingFileHandler

app = Flask(__name__)

LOG_FILE='logs/server.log'

logging.basicConfig(filename=LOG_FILE, level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')

@app.before_request
def log_request_info():
    app.logger.info('Request: %s %s', request.method, request.url)

@app.after_request
def log_response_info(response):
    app.logger.info('Response: %s', response.status)
    return response

# app.logger.setLevel(logging.INFO)

# file_handler = RotatingFileHandler(LOG_FILE, maxBytes=1024*1024, backupCount=10)
# file_handler.setLevel(logging.INFO)

# formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
# file_handler.setFormatter(formatter)

# app.logger.addHandler(file_handler)

@app.route('/')
def index():
    return redirect('/web_project/')

configure_proxy_routes(app)

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=False, port=8000)

