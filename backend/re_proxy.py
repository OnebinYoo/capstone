from flask import Flask, request, redirect, Response, render_template
import requests
import re

SITE_URL = 'http://192.168.56.102/'

def log_and_block():
    print('액세스가 거부되었습니다. 페이로드에 의심스러운 내용이 포함되어 있습니다.')
    return Response(render_template('access_denied.html'), status=403)

def configure_proxy_routes(app):

    security_rules = [
        {
            'id': 1,
            'name': '기본 룰',
            'pattern': r'admin|#|%|&|\+|\\|\^|~',
            'description': '문자열 패턴에 따른 보안 규칙',
            'enabled': False
        },
        {
            'id': 2,
            'name': 'XSS 공격 차단',
            'pattern': r'document|<|>|script|</',
            'description': 'XSS 공격시 사용되는 구문 필터링',
            'enabled': False
        },
        {
            'id': 3,
            'name': 'Injection 공격 차단',
            'pattern': r'and|#|-|or',
            'description': 'Injection 공격시 사용되는 구문 필터링',
            'enabled': False
        }
    ]

    @app.route('/security-rules', methods=['GET', 'POST', 'PUT', 'DELETE'])
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
        elif request.method == 'PUT':
            rule_id = request.json.get('rule_id')
            if rule_id:
                for rule in security_rules:
                    if rule['id'] == rule_id:
                        rule['enabled'] = not rule.get('enabled', False)
                        return {'message': '보안 규칙이 수정되었습니다.'}
                return {'error': '해당 보안 규칙이 존재하지 않습니다.'}, 404
            else:
                return {'error': '수정을 하려면 보안 규칙 ID가 필요합니다.'}, 400
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

    @app.route('/<path:path>', methods=['GET', 'POST', 'DELETE'])
    def proxy(path):
        global SITE_URL
        if request.method == 'GET':
            for rule in security_rules:
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
            for rule in security_rules:
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