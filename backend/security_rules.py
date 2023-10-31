from firebase_admin import db, initialize_app, credentials
import re

cred = credentials.Certificate('./capstone-dab03-firebase-adminsdk-thmaz-17364d3943.json')
initialize_app(cred, {
    'databaseURL': 'https://capstone-dab03-default-rtdb.asia-southeast1.firebasedatabase.app'
})

"""싱글톤 구현 - 파이썬
https://velog.io/@kimsehwan96/%ED%8C%8C%EC%9D%B4%EC%8D%AC-%EC%8B%B1%EA%B8%80%ED%84%B4-%ED%8C%A8%ED%84%B4
https://wikidocs.net/3693  <- 초기화하는거 이사람꺼 보기 cls어쩌구
https://jroomstudio.tistory.com/41
-에러처리-
https://blockdmask.tistory.com/538
"""

class SharedRules:
    _instance = None # 1. 인스탠스를 None으로 초기화 해줌

    def getInstance(): # 위에서 만든 인스탠스 None 확인? 아래랑 구현 위치 상관 없음
        if SharedRules._instance == None:  # None인지 확인후 생성한 class인 SharedRules를 동작?? 몰루
            SharedRules()
        return SharedRules._instance

    def __init__(self):     # 싱글톤 구현중 self 인자값 추가 // 파이썬은 new 안된다고 블로그에서 봄.// 증명은 안해봄 // 썅 new로 하니깐 에러나서 init으로 함
        if SharedRules._instance != None:
            raise Exception("이 클래스는 이미 싱글턴입니다.")  # 싱글턴은 하나의 인스턴스이므로 이미 생성될 경우의 예외 처리
        else:
            SharedRules._instance = self
            self.security_rules = self.get_security_rules() # 인스턴스에 앞으로 여러파일에서 사용할 변수 선언
                    # 싱글톤 인스턴스 구현 끝

    # 여기 아래부터는 싱글톤에서 만든 self 인자값만 추가해주면됨 // 맨아래 싱글톤 객체 생성 제외

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
        return self.security_rules
    
# 싱글톤 객체 생성
Shared_rules_singleton = SharedRules.getInstance()
Shared_rules_singleton.listen_for_rule_changes()