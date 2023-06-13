from flask import Flask, redirect, request
import re_proxy
import logging
from logging.handlers import RotatingFileHandler
from logging_utils import save_log
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

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

app.route('/<path:path>', methods=['GET', 'POST', 'DELETE'])(re_proxy.proxy)
app.route('/security-rules', methods=['GET', 'POST', 'DELETE'])(re_proxy.manage_security_rules)

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=False, port=8000)
