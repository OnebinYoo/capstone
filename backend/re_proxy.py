from flask import Flask, request, redirect, Response, render_template
import requests
import re
from firebase_admin import credentials, db, initialize_app

app = Flask(__name__)

cred = credentials.Certificate('./capstone-dab03-firebase-adminsdk-thmaz-17364d3943.json')
initialize_app(cred, {
    'databaseURL': 'https://capstone-dab03-default-rtdb.asia-southeast1.firebasedatabase.app'
})

# Firebase Realtime Database에서 보안 규칙 가져오기
ref = db.reference('/rule')
security_rules = ref.get()

#받아온 보안규칙 저장
app.security_rules = security_rules

SITE_URL = 'http://localhost/'

def log_and_block():
    print('액세스가 거부되었습니다. 페이로드에 의심스러운 내용이 포함되어 있습니다.')
    return Response(render_template('access_denied.html'), status=403)

def configure_proxy_routes(app):

    def handle_rule_change(event):
        # 보안 규칙이 변경될 때마다 호출되는 함수
        app.security_rules = ref.get()
        print('보안 규칙이 변경되었습니다 :', app.security_rules)

    def initialize_rules():
        ref.listen(handle_rule_change)

    initialize_rules()

    @app.route('/<path:path>', methods=['GET', 'POST', 'DELETE'])
    def proxy(path):
        global SITE_URL
        if request.method == 'GET':
            for rule in app.security_rules:
                if rule['enabled']:
                    pattern = re.compile(rule['pattern'])
                    for key, value in request.args.items():
                        if pattern.search(value):
                            return log_and_block()
            resp = requests.get(f'{SITE_URL}{path}', params=request.args, cookies=request.cookies)
            excluded_headers = ['content-encoding', 'content-length', 'transfer-encoding', 'connection']
            headers = [(name, value) for (name, value) in resp.raw.headers.items() if name.lower() not in excluded_headers]
            response = Response(resp.content, resp.status_code, headers)
            return response
        elif request.method == 'POST':
            for rule in app.security_rules:
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