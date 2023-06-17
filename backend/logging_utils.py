import json

LOG_FILE = 'logs/server.log'

def save_log(log_data):
    with open(LOG_FILE, 'a') as file:
        json.dump(log_data, file)
        file.write('\n')
