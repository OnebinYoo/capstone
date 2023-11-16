from flask import Flask, request, redirect, Response, render_template
import requests, re
from security_rules import Shared_rules_singleton

app = Flask(__name__)

<<<<<<< HEAD
cred = credentials.Certificate('./capstone-dab03-firebase-adminsdk-thmaz-17364d3943.json')
initialize_app(cred, {
    'databaseURL': 'https://capstone-dab03-default-rtdb.asia-southeast1.firebasedatabase.app'
})

# Firebase Realtime Database에서 보안 규칙 가져오기
ref = db.reference('/rule')
#받아온 보안규칙 저장
security_rules = ref.get()


SITE_URL = 'http://192.168.0.56/'
=======
SITE_URLS = ['http://192.168.0.57/', 'http://192.168.0.56/']
current_site_index = 0
>>>>>>> ywb

def log_and_block():
    print('액세스가 거부되었습니다. 페이로드에 의심스러운 내용이 포함되어 있습니다.')
    return Response(render_template('access_denied.html'), status=403)

def configure_proxy_routes(app):
<<<<<<< HEAD

    def handle_rule_change(event):
        # 보안 규칙이 변경될 때마다 호출되는 함수
        global security_rules
        security_rules = ref.get()
        print('보안 규칙이 변경되었습니다 :', security_rules)

    def initialize_rules():
        ref.listen(handle_rule_change)

    initialize_rules()

=======
>>>>>>> ywb
    @app.route('/<path:path>', methods=['GET', 'POST', 'DELETE'])
    def proxy(path):
        global SITE_URLS, current_site_index
        current_server = SITE_URLS[current_site_index]
        current_site_index = (current_site_index + 1) % len(SITE_URLS)
        security_rules = Shared_rules_singleton.get_rules()
        
        if request.method == 'GET':
<<<<<<< HEAD
=======
            print(f"요청이 오는 서버: {current_server}, IP 주소: {request.remote_addr}")
>>>>>>> ywb
            for rule in security_rules.values():
                if rule['enabled']:
                    pattern = re.compile(rule['pattern'])
                    for key, value in request.args.items():
                        if pattern.search(value) or pattern.match(request.remote_addr):
                            return log_and_block()
            resp = requests.get(f'{current_server}{path}', params=request.args, cookies=request.cookies)
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
                resp = requests.post(f'{current_server}{path}', data=request.form, params=request.args, cookies=request.cookies)
            elif request.json:
                resp = requests.post(f'{current_server}{path}', json=request.json, params=request.args, cookies=request.cookies)
            else:
                return "지원되지 않는 미디어 유형입니다", 415
            excluded_headers = ['content-encoding', 'content-length', 'transfer-encoding', 'connection']
            headers = [(name, value) for (name, value) in resp.raw.headers.items() if name.lower() not in excluded_headers]
            response = Response(resp.content, resp.status_code, headers)
            return response
        elif request.method == 'DELETE':
            resp = requests.delete(f'{current_server}{path}')
            excluded_headers = ['content-encoding', 'content-length', 'transfer-encoding', 'connection']
            headers = [(name, value) for (name, value) in resp.raw.headers.items() if name.lower() not in excluded_headers]
            response = Response(resp.content, resp.status_code, headers)
            return response
        
