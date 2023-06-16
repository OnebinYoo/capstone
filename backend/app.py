from flask import Flask, redirect, request
import re_proxy
import logging
import log
from logging.handlers import RotatingFileHandler
from logging_utils import save_log
from flask_cors import CORS
import uuid
import datetime

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})


def log_request_info():
    current_time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    log_data = {
        'method': request.method,
        'url': request.url,
        'ip': request.remote_addr,
        'date': current_time,
        # 'headers': dict(request.headers),
        'data': request.get_json()
    }
    save_log(log_data)

@app.after_request
def log_response_info(response):
    current_time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    if response.status_code >= 400:
        log_data = {
            'id': str(uuid.uuid4()),
            'status_code': response.status_code,
            'ip': request.remote_addr,
            'date': current_time,
            'content_length': len(response.get_data()),
            # 'headers': dict(response.headers),
            'data': response.get_json()
        }
        save_log(log_data)
    return response

@app.route('/')
def index():
    return redirect('/web_project/')

app.route('/<path:path>', methods=['GET', 'POST', 'DELETE'])(re_proxy.proxy)
app.route('/security-rules', methods=['GET', 'POST', 'DELETE'])(re_proxy.manage_security_rules)
app.route('/logs', methods=['GET'])(log.get_logs)

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=False, port=8000)
