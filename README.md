# 프록시 웹 방화벽
> 리버스 프록시 서버를 통한 웹 방화벽.

[![Flask Version][flask-image]][flask-url]

파이썬의 flask를 활용한 리버스 프록시 서버이다.

파이썬은 3.9이상 버전을 사용하여 개발하였다.

보안규칙을 통해 어플리케이션 계층의 페이로드를 검사하고 운영중인 서버를 보호해 준다.

라즈베리파이가 프록시 서버 역할을 한다.

## 프로그램 흐름도 Back-End

```mermaid
graph TD;
    A[security_ruels.py]-->|Get rules| B{app.py};
    B --> |Leave a log| C(log.py);
    B --> |Check banned ip| E;
    B --> |Give rules and infromations| D(re_proxy.py);
    D --> |Check payload| E[access_denied.html];
    D --> |After load balancing| F[web_pages];
    G[Client] --> |Request 'web_pages'| B;
    C -->|Get server's logs| H(Front - admin page);
    I[firebase] --> H;
    I --> A;
```

1. secrutiy_rules에서 보안규칙 초기에 받아오고 최신화가 security_rules.py내부에서 발생.
2. app.py로 콜백해줄 함수 부재 추가 하거나 로직 변경.
3. 라운드 로빈 알고리즘으로 로드 밸런싱시 `0.1.4`버전에 기술한 고민거리 발생.

## 설치 방법-backend

파이썬 호환 OS(pip or pip3):

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

## 사용 방법  

`[app.py]:`

10번째줄에서 프론트엔트 서버 주소 적어주기.  

`app.route('/)`의 return값을 운영 중인 웹서버의 프로젝트 폴더 작성

예) 아파치 기본폴더/운영 중인 웹 서버 폴더`(web_project)`/웹 서버 파일 -> `www.example.com/web_project`

`[re_proxy.py]:`

20번째줄에 운영중인 웹서버 주소 적어주기.

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

## 업데이트 내역

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
* 0.1.3 (main branch에는 깔끔하게 업로드)
   * 추가 : `security_rules`에 보안규칙 받아오는 함수 작성
   * 추가 : `app.py`의 `@app.before_request`에 ip 검사로직 추가, 로깅도 정상 작동
   * 수정 : `security_rules`의 함수를 `app.py`와 `re_proxy.py`가 사용해서 규칙을 받아옴
   * 에러 : 보안규칙은 받아지는데, 분리된 로직에서 최신화 못받아옴

* 0.1.4 (main branch에는 깔끔하게 업로드)
   * 추가 : 로드밸런싱을 위해 라운드 로빈 알고리즘 채택. `security_rules`랑 충돌로 따로 관리중
   * 서버의 dbms가 존재하면 문제 없지만 이 프로젝트 특성상 가상머신 2개를 웹서버로 운영중이고, 각 가상머신에 웹서버와 db가 존재한다.
   * 이에 라운드 로빈 알고리즘은 단순히 2개의 서버중 하나를 선택해 분산해 주는것이기 때문에 다른 알고리즘을 선택해야될 수도 있음.
   * A,B서버중 하나로 보내준후 client의 request 마다 서버를 선택하기 때문에 `dbms`동기화 없이는 아래와 같은 문제가 발생할수 있다.
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
    * 수정 예정 : ip차단시 뒤로각 제거하기
 

## 확인된 버그

* 벡엔드 종료시 소켓 에러 발생
   * firebase와의 통신을 닫는 구문이 없어서 라고 추측
   * `OSError: [WinError 10038] 소켓 이외의 개체에 작업을 시도했습니다` 메시지 출력
   * 공식 문서확인결과 닫는 구문 없이 사용.
   * 내가 사용하는 함수의 공식문서. 아직 firebase 전체의 공식문서는 확인 못함. 너무 많음
   * 버그 발생 위치 : 수정사항을 받아오는 구문
* 수정사항 발생시 규칙 전부다 받아옴
   * 공식 문서내에서 제공하는 함수 없음
   * 내가 사용하는 함수의 공식문서. 아직 firebase 전체의 공식문서는 확인 못함. 너무 많음
* 로직 분리후 수정사항 발생시 규칙은 받아오는데, 검사 로직에 적용이 안됌( 0.1.3 ) 
* ``0.1.6`` 회의후 윈도우 pc와 맥북 에서 라운드 로빈 알고리즘 에러
    * 다른 팀원은 잘되고 혼자만 두대에서 그런거 보니깐 vscode의 extension이 꼬인걸로 추측
    * 윈도우는 파이썬 3.8 / 맥북은 3.10

## 참여 인원 정보

유원빈 – ywb000218@gmail.com

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
