from flask import Flask, request, redirect, Response
import requests
import re

SITE_URL = 'http://192.168.56.101/'

def log_and_block():
    print('액세스가 거부되었습니다. 페이로드에 의심스러운 내용이 포함되어 있습니다.')
    return Response('액세스 거부', status=403)

def configure_proxy_routes(app):
    @app.route('/<path:path>', methods=['GET', 'POST', 'DELETE'])
    def proxy(path):
        global SITE_URL
        if request.method == 'GET':
            pattern = re.compile(r'admin|#|%|&|\+|\\|\^|~')
            for key, value in request.args.items():
                if pattern.search(value):
                    return log_and_block()
            resp = requests.get(f'{SITE_URL}{path}')
            excluded_headers = ['content-encoding', 'content-length', 'transfer-encoding', 'connection']
            headers = [(name, value) for (name, value) in resp.raw.headers.items() if name.lower() not in excluded_headers]
            response = Response(resp.content, resp.status_code, headers)
            return response
        elif request.method == 'POST':
            pattern = re.compile(r'admin|#|%|&|\+|\\|\^|~|-')
            if request.form:
                for key, value in request.form.items():
                    if pattern.search(value):
                        return log_and_block()
                resp = requests.post(f'{SITE_URL}{path}', data=request.form)
            elif request.json:
                for key, value in request.json.items():
                    if pattern.search(value):
                        return log_and_block()
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