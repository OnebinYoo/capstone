# 웹 방화벽 관리 페이지

> setting.jsx 개편

## 프로젝트 알림사항

- 반드시 `.env`파일을 아래와 같이 위치시켜야함

```
project/

- front/
- backend/
- .env
```

- realtime firebase 주소
  - https://capstone-dab03-default-rtdb.asia-southeast1.firebasedatabase.app

## 업데이트 내역

- 7/7

  - 파이어베이스 기반 규칙 목록 구현
    - 규칙 목록에서 '점 세개 버튼' 클릭 시 삭제/수정/더보기 버튼 나타나도록 구현
  - 규칙 추가 기능 구현
    - '문자열 차단', 'ip 차단'에 따른 type 자동 변경되어 추가되도록 구현
    - 배열에 null 값 입력 안되도록 구현
    - null 값 존재 시 에러 메시지 나타나도록 구현

- 7/12

  - 규칙 추가 기능 수정
    - 배열(blockedItems) 사용하여 여러 문자열/ip 추가 가능하도록 수정
  - 규칙 삭제 기능 구현
    - 규칙 삭제 시 alert 창으로 한 번 더 확인하도록 구현
  - 규칙 수정 초기 화면은 기존 데이터 값 그대로 보여주도록 구현

- 7/13
  - 규칙 더보기 기능 구현
    - type, name, pattern 보여주도록 구현
  - 규칙 수정 기능 구현
    - 배열에 null 값 입력 안되도록 구현
    - null 값 존재 시 에러 메시지 나타나도록 구현

* 7/17
  - null 값 검사를 input창이 아니라 blockedItems 배열을 검사하도록 수정(RuleAdd, RuleAdj)
  - RuleAdj에서 배열에 null 값 입력되는 현상 수정
  - RuleAdj의 일부 컴포넌트 요소 RuleAdd와 일치하도록 수정
  - 배열에 최대 5개까지만 입력되도록 수정
  * `type=0`으로 규칙 추가시 정규표현식으로 변환하여 저장되도록 수정

- 7/18
  - 규칙 목록에 필터 기능 추가
  * ` RuleAdd`,`RuleAdj  ` 페이지 접속 시에는 `sidebar`의 `설정`이 clicked 상태이도록 수정
  * 설정 페이지의 상단 부분 UI 개선
  * `RuleAddWrap`의 `border-radius` 값 조정
  * 삭제/수정/상세보기 버튼과 상세 정보란이 전부 펼쳐져 있을 때 buttonMoreVert 버튼 클릭만으로 전부 접히도록 개선

## 미완료 작업

- 스위치 구현
  - 현재는 간단하게 버튼식으로만(enable:ture => Enabled, false => False)
- 규칙 추가/수정/삭제 완료 시 alert 보이도록 구현

* 규칙 추가/수정 페이지의 상단 부분 UI 개선
  - 현재는 buttonMoreVert 버튼으로는 삭제/수정/상세보기 버튼만 control 가능
* `PrivateRoutes` 사용해서 로그인 안했을 시 login.jsx 외의 페이지는 안보이도록 수정
* console.log 제거
  - alert로 보이도록 하거나 제거

## 버그

- 상세보기에서 pattern의 정규표현식이 완벽하게 벗겨지지 않고 출력되는 현상

* 규칙 추가/수정의 description textarea 높이가 줄 수에 맞게 동적으로 변하지 않는 현상
