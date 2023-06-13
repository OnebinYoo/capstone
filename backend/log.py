from flask import Flask, render_template, jsonify
import json
import os

app = Flask(__name__)

# 로그 파일 경로
LOG_FILE = 'logs/server.log'


def parse_log_file():
    logs = []
    if os.path.exists(LOG_FILE):
        with open(LOG_FILE, 'r') as file:
            for line in file:
                try:
                    log_data = json.loads(line.strip())
                    logs.append(log_data)
                except json.decoder.JSONDecodeError:
                    continue
    return logs

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/logs')
def get_logs():
    logs = parse_log_file()
    return jsonify(logs)


if __name__ == '__main__':
    app.run(debug=True)
