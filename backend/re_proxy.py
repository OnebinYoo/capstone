from flask import Flask, request, redirect, Response, render_template
import requests, re
from security_rules import get_security_rules, handle_rule_change, initialize_rules

app = Flask(__name__)

SITE_URL = 'http://192.168.0.57/'

def log_and_block():
    print('액세스가 거부되었습니다. 페이로드에 의심스러운 내용이 포함되어 있습니다.')
    return Response(render_template('access_denied.html'), status=403)

def configure_proxy_routes(app, security_rules):
    @app.route('/<path:path>', methods=['GET', 'POST', 'DELETE'])
    def proxy(path):
        global SITE_URL
        if request.method == 'GET':
            print("client ip ," ,request.remote_addr )
            for rule in security_rules.values():
                if rule['enabled']:
                    pattern = re.compile(rule['pattern'])
                    for key, value in request.args.items():
                        if pattern.search(value) or pattern.match(request.remote_addr):
                            return log_and_block()
            resp = requests.get(f'{SITE_URL}{path}', params=request.args, cookies=request.cookies)
            excluded_headers = ['content-encoding', 'content-length', 'transfer-encoding', 'connection']
            headers = [(name, value) for (name, value) in resp.raw.headers.items() if name.lower() not in excluded_headers]
            response = Response(resp.content, resp.status_code, headers)
            return response
        elif request.method == 'POST':
            for rule in security_rules.values():
                if rule['enabled']:
                    pattern = re.compile(rule['pattern'])
                    if request.form:
                        for key, value in request.form.items():
                            if pattern.search(value):
                                return log_and_block()
                    elif request.json:
                        for key, value in request.json.items():
                            if pattern.search(value):
                                return log_and_block()
            if request.form:
                resp = requests.post(f'{SITE_URL}{path}', data=request.form, params=request.args, cookies=request.cookies)
            elif request.json:
                resp = requests.post(f'{SITE_URL}{path}', json=request.json, params=request.args, cookies=request.cookies)
            else:
                return "지원되지 않는 미디어 유형입니다", 415
            excluded_headers = ['content-encoding', 'content-length', 'transfer-encoding', 'connection']
            headers = [(name, value) for (name, value) in resp.raw.headers.items() if name.lower() not in excluded_headers]
            response = Response(resp.content, resp.status_code, headers)
            return response
        elif request.method == 'DELETE':
            resp = requests.delete(f'{SITE_URL}{path}')
            excluded_headers = ['content-encoding', 'content-length', 'transfer-encoding', 'connection']
            headers = [(name, value) for (name, value) in resp.raw.headers.items() if name.lower() not in excluded_headers]
            response = Response(resp.content, resp.status_code, headers)
            return response
        
security_rules = get_security_rules()

# Firebase Realtime Database의 규칙 변경 감지 설정
initialize_rules()

configure_proxy_routes(app, security_rules)