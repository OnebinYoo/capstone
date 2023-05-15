from flask import Flask, request, redirect, Response, send_from_directory
import requests

app = Flask(__name__)

SITE_URL = 'http://192.168.56.101/'
# 정적 파일(static file)을 제공하기 위한 설정
# app.config['STATIC_FOLDER'] = 'web_project'
# app.config['STATIC_URL_PATH'] = '/web_project'

@app.route('/')
def index():
    return 'Flask is running!'

@app.route('/web_project/<path:path>', methods=['GET'])
def web_project(path):
    resp = requests.get(f'{SITE_URL}/web_project/{path}')
    excluded_headers = ['content-encoding', 'content-length', 'transfer-encoding', 'connection']
    headers = [(name, value) for (name, value) in resp.raw.headers.items() if name.lower() not in excluded_headers]
    response = Response(resp.content, resp.status_code, headers)
    return response

@app.route('/<path:path>', methods=['GET', 'POST', 'DELETE'])
def proxy(path):
    if request.method == 'GET':
        resp = requests.get(f'{SITE_URL}{path}')
        excluded_headers = ['content-encoding', 'content-length', 'transfer-encoding', 'connection']
        headers = [(name, value) for (name, value) in resp.raw.headers.items() if name.lower() not in excluded_headers]
        response = Response(resp.content, resp.status_code, headers)
        return response
    elif request.method == 'POST':
        resp = requests.post(f'{SITE_URL}{path}', json=request.get_json())
        excluded_headers = ['content-encoding', 'content-length', 'transfer-encoding', 'connection']
        headers = [(name, value) for (name, value) in resp.raw.headers.items() if name.lower() not in excluded_headers]
        response = Response(resp.content, resp.status_code, headers)
        return response
    elif request.method == 'DELETE':
        resp = requests.delete(f'{SITE_URL}{path}').content
        response = Response(resp.content, resp.status_code, headers)
        return response

# # CSS 파일을 제공하는 route
# @app.route('web_project/css/<path:path>')
# def send_css(path):
#     return send_from_directory(app.config['STATIC_FOLDER'] + '/css', path)

# # 이미지 파일을 제공하는 route
# @app.route('web_project/img/<path:path>')
# def send_img(path):
#     return send_from_directory(app.config['STATIC_FOLDER'] + '/img', path)

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=False, port=8000)
