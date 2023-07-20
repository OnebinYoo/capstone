# 프록시 웹 방화벽
> 리버스 프록시 서버를 통한 웹 방화벽.

[![Flask Version][flask-image]][flask-url]

파이썬의 flask를 활용한 리버스 프록시 서버이다.

보안규칙을 통해 어플리케이션 계층의 페이로드를 검사하고 운영중인 서버를 보호해 준다.

라즈베리파이가 프록시 서버 역할을 한다.

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

프론트의 api접근을 허용하기 위한 모듈:

```sh
pip install -U flask-cors
```

firebase admin sdk이용을 위한 모듈:

```sh
pip install firebase-admin
```

## 사용 방법  

`[app.py]:`

10번째줄에서 프론트엔트 서버 주소 적어주기.  

`app.route('/)`의 return값을 운영 중입 웹서버의 프로젝트 폴더 작성

예) 아파치 기본폴더 - 운영 중인 웹 서버 폴더 -> `www.example.com/web_project`

--> `web_project` 기입

`[re_proxy.py]:`

20번째줄에 운영중인 웹서버 주소 적어주기.

_더 많은 사용법은 하단의 정보로 문의주세요._

## 개발 환경 설정

설치 방법 선행후 실행:  

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
    * 수정: `security-rules` 하드코딩 삭제
    * 추가: `firebase`로 보안규칙 이전 및 불러오기 기능, 수정사항 반영 기능 추가(수정사항 발생시 전체 받아오는지는 확인 X)

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
