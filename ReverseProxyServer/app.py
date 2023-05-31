from flask import Flask, redirect, request
from re_proxy import configure_proxy_routes
import logging
from logging.handlers import RotatingFileHandler
from logging_utils import save_log

app = Flask(__name__)

# LOG_FILE='logs/server.log'

def log_request_info():
    log_data = {
        'method': request.method,
        'url': request.url,
        'ip': request.remote_addr,
        'headers': dict(request.headers),
        'data': request.get_json()
    }
    save_log(log_data)

@app.after_request
def log_response_info(response):
    log_data = {
        'status_code': response.status_code,
        'headers': dict(response.headers),
        'data': response.get_json()
    }
    save_log(log_data)
    return response

# logging.basicConfig(filename=LOG_FILE, level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')

# @app.before_request
# def log_request_info():
#     app.logger.info('Request: %s %s', request.method, request.url)

# @app.after_request
# def log_response_info(response):
#     app.logger.info('Response: %s', response.status)
#     return response

@app.route('/')
def index():
    return redirect('/web_project/')

configure_proxy_routes(app)

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=False, port=8000)
