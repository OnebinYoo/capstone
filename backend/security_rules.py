from firebase_admin import db, initialize_app, credentials
import re

cred = credentials.Certificate('./capstone-dab03-firebase-adminsdk-thmaz-17364d3943.json')
initialize_app(cred, {
    'databaseURL': 'https://capstone-dab03-default-rtdb.asia-southeast1.firebasedatabase.app'
})

def get_security_rules():
    ref = db.reference('/rule')
    security_rules = ref.get()

    # ip 보안규칙 감싸주기
    for key, rule in security_rules.items():
        if rule['type'] == 1:
            patterns = rule['pattern'].split('|')
            modified_patterns = [f"^{re.escape(pattern)}$" for pattern in patterns]
            rule['pattern'] = '|'.join(modified_patterns)

    type_1_rules = {key: rule for key, rule in security_rules.items() if rule['type'] == 1}
    print("ip 주소 정규표현식 ^$", type_1_rules)
    return security_rules

def handle_rule_change(event):
    # 보안 규칙이 변경될 때마다 호출되는 함수
    security_rules = get_security_rules()
    print('보안 규칙이 변경되었습니다:', security_rules)

def initialize_rules():
    ref = db.reference('/rule')
    ref.listen(handle_rule_change)

# initialize_rules()