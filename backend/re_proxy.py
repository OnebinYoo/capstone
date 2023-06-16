from flask import Flask, request, redirect, Response
import requests
import re

app = Flask(__name__)

SITE_URL = 'http://192.168.56.101/'
security_rules = [
    {
        'id': 1,
        'name': 'Rule 1',
        'pattern': r'admin|#|%|&|\+|\\|\^|~',
        'description' : '문자열 패턴에 따른 보안 규칙',
        'enabled': True  # 이 값을 리액트 API로 관리
    },
    {
        'id': 2,
        'name': 'Rule 2',
        'pattern': r'admin|#|%|&|\+|\\|\^|~',
        'description' : '1번 규칙과 같지만 설정을 끄고 킬 수 있는지 테스트용',
        'enabled': False  # 이 값을 리액트 API로 관리
    },
]

def log_and_block():
    print('액세스가 거부되었습니다. 페이로드에 의심스러운 내용이 포함되어 있습니다.')
    return Response('액세스 거부', status=403)

def apply_security_rules(request):
    for rule in security_rules:
        if rule['enabled']:  # 보안 규칙이 활성화여부 확인
            pattern = re.compile(rule['pattern'])
            for key, value in request.args.items():
                if pattern.search(value):
                    return log_and_block()
        #form통신이랑 request통신 두가지 형식에 대한 오류 관리
            if request.form:
                for key, value in request.form.items():
                    if pattern.search(value):
                        return log_and_block()
            if request.json:
                for key, value in request.json.items():
                    if pattern.search(value):
                        return log_and_block()
    return None

@app.route('/<path:path>', methods=['GET', 'POST', 'DELETE'])
def proxy(path):
    global SITE_URL
    if request.method == 'GET':
        query_params = request.args
        resp = requests.get(f'{SITE_URL}{path}', params=query_params)
        excluded_headers = ['content-encoding', 'content-length', 'transfer-encoding', 'connection']
        headers = [(name, value) for (name, value) in resp.raw.headers.items() if name.lower() not in excluded_headers]
        response = Response(resp.content, resp.status_code, headers)
        return response
    elif request.method == 'POST':
        if apply_security_rules(request):
            return log_and_block()
        if request.form:
            resp = requests.post(f'{SITE_URL}{path}', data=request.form)
        elif request.json:
            resp = requests.post(f'{SITE_URL}{path}', json=request.json)
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

@app.route('/security-rules', methods=['GET', 'POST', 'DELETE'])
def manage_security_rules():
    if request.method == 'GET':
        return {'security_rules': security_rules}
    elif request.method == 'POST':
        rule = request.json.get('rule')
        if rule:
            security_rules.append(rule)
            return {'message': '보안 규칙이 추가되었습니다.'}
        else:
            return {'error': '올바른 보안 규칙을 제공해야 합니다.'}, 400
    elif request.method == 'DELETE':
        rule_id = request.json.get('rule_id')
        if rule_id:
            for rule in security_rules:
                if rule['id'] == rule_id:
                    security_rules.remove(rule)
                    return {'message': '보안 규칙이 삭제되었습니다.'}
            return {'error': '해당 보안 규칙이 존재하지 않습니다.'}, 404
        else:
            return {'error': '삭제를 하려면 보안 규칙 ID가 필요합니다.'}, 400

if __name__ == '__main__':
    app.run()
