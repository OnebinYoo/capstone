from flask import Flask, request, redirect, Response
import requests

app = Flask(__name__)

SITE_URL = 'http://192.168.56.101/'

@app.route('/')
def index(): 
    return redirect('/web_project/')

@app.route('/<path:path>',methods=['GET','POST',"DELETE"])
def proxy(path):
    global SITE_URL
    if request.method=='GET':
        resp = requests.get(f'{SITE_URL}{path}')
        excluded_headers = ['content-encoding', 'content-length', 'transfer-encoding', 'connection']
        headers = [(name, value) for (name, value) in  resp.raw.headers.items() if name.lower() not in excluded_headers]
        response = Response(resp.content, resp.status_code, headers)
        return response
    elif request.method=='POST':
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
    elif request.method=='DELETE':
        resp = requests.delete(f'{SITE_URL}{path}')
        excluded_headers = ['content-encoding', 'content-length', 'transfer-encoding', 'connection']
        headers = [(name, value) for (name, value) in resp.raw.headers.items() if name.lower() not in excluded_headers]
        response = Response(resp.content, resp.status_code, headers)
        return response

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=False, port=8000)
