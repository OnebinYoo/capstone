from flask import Flask, request, redirect, Response
import requests
import logging

app = Flask(__name__)

SITE_URL = 'http://192.168.56.101/'

# 로그 설정
logging.basicConfig(filename='proxy.log', level=logging.INFO)

@app.route('/')
def index(): 
    return redirect('/web_project/')

@app.route('/<path:path>', methods=['GET', 'POST', 'DELETE'])
def proxy(path):
    global SITE_URL

    # 특수 문자나 admin을 검사하는 보안 규칙
    if 'admin' in request.data or '$' in request.data or '#' in request.data or '&' in request.data:
        # 보안 위협이 발생한 경우, 로그 파일에 상대방 IP와 요청 내용을 기록
        logging.info(f'[BLOCKED] From {request.remote_addr}: {request.method} {request.full_path}')

        # 보안 위협이 발생한 경우, 403 Forbidden 반환
        return 'Forbidden', 403

    if request.method == 'GET':
        resp = requests.get(f'{SITE_URL}{path}')
        excluded_headers = ['content-encoding', 'content-length', 'transfer-encoding', 'connection']
        headers = [(name, value) for (name, value) in  resp.raw.headers.items() if name.lower() not in excluded_headers]
        response = Response(resp.content, resp.status_code, headers)
        return response

    elif request.method == 'POST':
        if request.form:
            resp = requests.post(f'{SITE_URL}{path}', data=request.form)
        elif request.json:
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
