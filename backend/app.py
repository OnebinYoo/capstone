from flask import Flask, redirect, request
from re_proxy import configure_proxy_routes
import log
from logging_utils import save_log
from security_rules import get_security_rules, initialize_rules
from flask_cors import CORS
import uuid
import datetime
import re

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

def log_and_block():
    print('액세스가 거부되었습니다. IP 차단 정책에 의해 차단되었습니다.')
    return "액세스가 거부되었습니다. IP 차단 정책에 의해 차단되었습니다.", 403

def update_security_rules(security_rules):
    configure_proxy_routes(app, security_rules)

@app.before_request
def log_request_info():
    current_time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    log_data = {
        'method': request.method,
        'url': request.url,
        'ip': request.remote_addr,
        'date': current_time,
        'data': None
    }
    if request.method == 'POST' and request.content_type == 'application/json':
        log_data['data'] = request.get_json()
    save_log(log_data)

    for rule in security_rules.values():
        if rule['enabled'] and rule['type'] == 1:
            pattern = re.compile(rule['pattern'])
            if pattern.match(request.remote_addr):
                return log_and_block()

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
            'data': response.get_json()
        }
        save_log(log_data)
    return response

@app.route('/')
def index():
    return redirect('/web_project/')

# 최신 규칙 가져오기
security_rules = get_security_rules()

# 최신 규칙으로 프록시 라우트 설정
update_security_rules(security_rules)

# Firebase Realtime Database의 규칙 변경 감지 설정
initialize_rules()

app.route('/logs', methods=['GET'])(log.get_logs)

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port=8000)
