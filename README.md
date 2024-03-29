# 프록시 웹 방화벽
> 리버스 프록시 서버를 통한 웹 방화벽.

[![Flask Version][flask-image]][flask-url]

파이썬의 flask를 활용한 리버스 프록시 서버이다.

파이썬은 3.9 버전을 사용하여 개발하였다. 

보안규칙을 통해 어플리케이션 계층의 페이로드와 IP를 검사하고 운영중인 서버를 보호해 준다.

라즈베리파이가 프록시 서버 역할을 한다.

## 프로그램 흐름도 Back-End

```mermaid
graph TD;
    A[security_ruels.py]-->|Get rules| B{app.py};
    B --> |Leave a log| C(log.py);
    B --> |Check banned ip| E;
    A --> |Get rules| D(re_proxy.py);
    D --> |Check payload| E[access_denied.html];
    D --> |After load balancing| F[web_pages];
    G[Client] --> |Request 'web_pages'| B;
    C -->|Get server's logs| H(Front - admin page);
    I[firebase] --> H;
    I --> A;
```

## 설치 방법-backend

파이썬 3.9(pip or pip3):

```sh
pip install flask
```
클라이언트의 요청을 전달하기 위한 모듈(request가 안될시 requests):

```sh
pip install request
pip install requests
```

프론트의 api요청을 허용하기 위한 모듈:

```sh
pip install -U flask-cors
```

firebase admin 이용을 위한 모듈:

```sh
pip install firebase-admin
```
## 설치 방법-frontend

npm을 이용하여 react 실행

```sh
npm install
npm start
```

## 사용 방법  

`[app.py]:`

13번째줄에서 프론트엔트 서버 주소 적어주기.  

`app.route('/)`의 return값을 운영 중인 웹서버의 프로젝트 폴더 작성

예) 아파치 기본폴더/운영 중인 웹 서버 폴더`(web_project)`/웹 서버 파일 -> `www.example.com/web_project`

`[re_proxy.py]:`

7번째줄에 운영중인 웹서버 주소 적어주기. 
두개 이상의 서버로 로드밸런싱 사용시 ip주소가 큰서버를 앞 배열에 위치

`firebase realtime database 설정`

firebase에 접속하여 -> 프로젝트 설정 -> 내앱 -> sdk 생성( npm, python ) 후 백엔드와 프론트 파일 교체

_더 많은 사용법은 하단의 정보로 문의주세요._

## 개발 환경 설정

설치 방법 선행후 실행:  

debug모드 `'True'`설정:

`app.run(host='0.0.0.0', debug=True, port=8000)`

서버 실행:

```sh
python app.py
python3 app.py
```

## 개발 내역

* 0.0.1
    * 추가: 리버스 프록시 역할 수행
* 0.0.2
    * 추가: `security-rules`를 통한 보안규칙 활성화
* 0.0.3
    * 버그 수정: `re_proxy.py` 로직 재구성(보안 규칙 검사 로직 에러)
* 0.0.4
    * 첫 출시
    * 라즈베리파이 연결후 공유기 포트포워딩으로 외부 접속 확인
* 0.0.5
    * 수정: `requests`정보에 매개변수 값 추가 ( 웹 서버의 게시글등의 db접속 원할)
* 0.0.6
    * 수정: `requests`정보에 쿠키 값 추가 (로그인시 세션 유지)
* 0.0.7
    * 추가: `security-rules`, `logs` api end-point 추가 (관리자페이지에서 요청 및 접근 가능)
    * 수정: 로직 재구성으로 main branch에 기존 `ReverseProxyServer` -> `backend`로 변경
* 0.1.0
    * 추가: 보안규칙에 걸릴경우 보여줄 페이지인 `templates/access_denied.html` 추가
    * 추가: 보안규칙의 `활성화/비활성화` 여부를 통한 관리 기능
* 0.1.1
    * 수정: `security-rules` 하드코딩 삭제 ( 규칙 정보및 api등 )
    * 추가: `firebase`로 보안규칙 이전
    * 추가: 불러오기 기능, 수정사항 반영 기능 추가(수정사항 발생시 전체 받아옴)
    * 추가: 웹 db를 한번 거쳐서,규칙을 저장할때 특수문자 앞에 `'\'`를 추가해줘야지 인식
    * 추가: 보안규칙 형식에 `type`추가 (저장및 불러오기시 구분 목적. 규칙 적용에는 상관없음)
* 0.1.2
    * 수정 : `firebase`에 저장된 배열의 키값이 정수 나열(`0,1,2....`)이 아닐경우에도 받아오도록 수정
* 0.1.3 
   * 추가 : `security_rules`에 보안규칙 받아오는 함수 작성
   * 추가 : `app.py`의 `@app.before_request`에 ip 검사로직 추가, 로깅도 정상 작동
   * 수정 : `security_rules`의 함수를 `app.py`와 `re_proxy.py`가 사용해서 규칙을 받아옴
   * 에러 : 보안규칙은 받아지는데 `security_rules.py`안에서만 최신화

* 0.1.4
   * 추가 : 로드밸런싱을 위해 라운드 로빈 알고리즘 채택. `security_rules`랑 충돌로 따로 관리중
   * 참고 : A,B서버중 하나로 보내준후 client의 request 마다 서버를 선택하기 때문에 `dbms`동기화 없이는 아래와 같은 문제가 발생할수 있다.
   * 참고 : 프로젝트의 특성상 라운드로빈을 보여주기 위에 다른 두개의 서버를 사용
        1. client가 request 요청
        2. A서버 추천으로 접속
        3. 게시판 클릭
        4. client의 request를 받아서 서버에서 다시 로드 밸런싱후 B서버 추천
        5. B서버로 게시판을 제공함
        6. A,B서버 각각 다른 db를 사용시 A서버의 게시판을 원해도 B 서버의 게시판을 제공할수 있음
* 0.1.5
    * 추가 : 라운드 로빈 알고리즘을 통한 로드 밸런싱
    * 수정 : 라운드 로빈 알고리즘과 보안검사 로직 충돌 해결
* 0.1.6
    * 추가 : 보안 규칙 ``Type=0`` 일때 ``(?im)^(?=.*\\b'문자'\\b).*`` 로 문자열 감싸기
    * 에러 : 회의후 라운드 로빈 알고리즘이 한 요청에 A,B서버를 둘다 응답처리하는 에러
    * 수정 예정 : ip차단시 뒤로가기 제거하기
* 0.1.7
    * 추가 : 싱글톤 패턴을 사용한 보안규칙 객체화(항상 최신성을 유지) `security_rules에서 구현`
    * 수정 : app.py에 싱글톤 객체 사용, re_proxy.py에서는 사용안함
    * 에러 : app.py의 규칙은 최신화 정상 작동, re_proxy.py는 최신화 작동 안함
* 0.2.0
    * 수정 : 싱글톤 객체 적용범위 확대 / app,re_proxy에서 받아옴
    * 해결 : 보안 규칙 업데이트시 ip,문자열 규칙 최신화되서 로직 적용
    * 해결 : 라운드 로빈 두개 동시 요청(서버 주소 배열에 값이 큰 주소를 앞에 배치해서 해결)

## 참여 인원 정보

유원빈(백엔드) – ywb000218@gmail.com  
권용휘(프론트) - 990225yh@gmail.com  
신민철(프론트) - doublemaxx@naver.com  

## 기여 방법

1. (https://github.com/OnebinYoo/capstone.git) 를 클론하거나 포크합니다.
2. (`git checkout -b feature/fooBar`) 명령어로 새 브랜치를 만드세요.
3. (`git status`) 작업후 변경 사항을 확인하세요.
4. (`git add/rm '파일명'`) 작업후 파일을 추가하거나 삭제해 주세요.
5. (`git commit -m '작업 사항 간략히'`) 추가/삭제후 명령어로 커밋하세요.
6. (`git push origin +'브랜치명'`) 명령어로 브랜치에 푸시하세요. 

<!-- Markdown link & img dfn's -->
[flask-image]: https://img.shields.io/badge/flask-00000?style=flat-square&logo=flask&logoColor=#000000
[flask-url]: https://flask-docs-kr.readthedocs.io/ko/latest/quickstart.html
