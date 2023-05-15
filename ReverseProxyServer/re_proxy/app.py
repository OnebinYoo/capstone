from flask import Flask, request, redirect, Response
import requests
import re

app = Flask(__name__)

SITE_URL = 'http://192.168.56.101/'

def log_and_block():
    # 로그를 남기는 코드
    print('Access denied. Payload contains suspicious content.')
    # 접근 차단을 위해 403 Forbidden HTTP status code를 반환
    return Response('Access Denied', status=403)

@app.route('/')
def index():
    return redirect('/web_project/')

@app.route('/<path:path>', methods=['GET', 'POST', 'DELETE'])
def proxy(path):
    global SITE_URL
    if request.method == 'GET':
        # 쿼리 매개변수에서 admin, 특수 문자를 찾기 위한 정규식
        pattern = re.compile(r'admin|#|%|&|\+|\\|\^|~')
        # path의 쿼리 매개변수에서 값을 가져와 정규식으로 검사
        for key, value in request.args.items():
            if pattern.search(value):
                # 값에 위험한 문자열이 포함되어 있다면 로그를 남기고 접근 차단
                return log_and_block()
        resp = requests.get(f'{SITE_URL}{path}')
        excluded_headers = ['content-encoding', 'content-length', 'transfer-encoding', 'connection']
        headers = [(name, value) for (name, value) in resp.raw.headers.items() if name.lower() not in excluded_headers]
        response = Response(resp.content, resp.status_code, headers)
        return response
    elif request.method == 'POST':
        # POST 요청에서 payload에서 값을 가져와 정규식으로 검사
        pattern = re.compile(r'admin|#|%|&|\+|\\|\^|~|-')
        if request.form:
            for key, value in request.form.items():
                if pattern.search(value):
                    # 값에 위험한 문자열이 포함되어 있다면 로그를 남기고 접근 차단
                    return log_and_block()
            resp = requests.post(f'{SITE_URL}{path}', data=request.form)
        elif request.json:
            for key, value in request.json.items():
                if pattern.search(value):
                    # 값에 위험한 문자열이 포함되어 있다면 로그를 남기고 접근 차단
                    return log_and_block()
            resp = requests.post(f'{SITE_URL}{path}', json=request.json)
        else:
            return "Unsupported Media Type", 415
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

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=False, port=8000)