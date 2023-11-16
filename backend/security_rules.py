from firebase_admin import db, initialize_app, credentials
import re

cred = credentials.Certificate('./capstone-dab03-firebase-adminsdk-thmaz-17364d3943.json')
initialize_app(cred, {
    'databaseURL': 'https://capstone-dab03-default-rtdb.asia-southeast1.firebasedatabase.app'
})

class SharedRules:
    _instance = None 

    def getInstance():
        if SharedRules._instance == None:  
            SharedRules()
        return SharedRules._instance

    def __init__(self):    
        if SharedRules._instance != None:
            raise Exception("이 클래스는 이미 싱글턴입니다.")  
        else:
            SharedRules._instance = self
            self.security_rules = self.get_security_rules() 

    def get_security_rules(self):
        ref = db.reference('/rules')
        self.security_rules = ref.get()

        # ip 보안규칙 감싸주기
        for key, rule in self.security_rules.items():
            if rule['type'] == 1:
                patterns = rule['pattern'].split('|')
                modified_patterns = [f"^{re.escape(pattern)}$" for pattern in patterns]
                rule['pattern'] = '|'.join(modified_patterns)
            if rule['type'] == 0:
                patterns = rule['pattern'].split('|')
                modified_patterns = [f"(?im)^(?=.*\\b{re.escape(pattern)}\\b).*" for pattern in patterns]
                rule['pattern'] = '|'.join(modified_patterns)

        type_1_rules = {key: rule for key, rule in self.security_rules.items() if rule['type'] == 1}
        print("ip 주소 정규표현식(^$) :", type_1_rules)

        return self.security_rules

    def listen_for_rule_changes(self):
        ref = db.reference('/rules')
        
        # 변경 사항을 감지하는 함수
        def handle_rule_change(event):
            global security_rules
            self.security_rules = self.get_security_rules()
            print('보안 규칙이 변경되었습니다:', self.security_rules)

        # 리스너 등록
        ref.listen(handle_rule_change)
        print("Firebase 리스너가 규칙 변경을 감지 중...")

    def get_rules(self):
        return self.get_security_rules()
    
# 싱글톤 객체 생성
Shared_rules_singleton = SharedRules.getInstance()
Shared_rules_singleton.listen_for_rule_changes()