# 웹 방화벽 관리 페이지

> setting.jsx 개편

## 프로젝트 알림사항

- `.env`파일을 /front 아래에 위치시켜야함

```
project/
- front/
  - .env
```

- package-lock.json, package.json 업데이트 필요
  - 9/19 부로 업데이트(자세한 사항은 `업데이트 내역` 참조)
- realtime firebase 주소
  - https://capstone*dab03*default*rtdb.asia*southeast1.firebasedatabase.app

## 업데이트 내역

- 7/7
  - 규칙을 firebase 기반으로 수정
  - `Setting` 수정
    - `RuleList` 컴포넌트화
      - 규칙 목록에서 `ButtonMoreVert` 버튼 클릭 시 삭제/수정/상세보기 버튼 생성
  - 규칙 추가 기능 추가 (`RuleAdd`)
    - `문자열 차단`, `ip 차단`에 따른 type 자동 변경
- 7/12
  - `RuleAdd` 수정
    - 배열(blockedItems) 사용하여 여러 문자열/ip 추가 가능
    - 배열에 null 값 입력 차단
    - null 값 존재 시 에러 메시지 생성
  - 규칙 삭제 기능 추가
    - 규칙 삭제 시 `Alert`으로 한 번 더 확인
  - 규칙 수정 기능 추가 (`RuleAdj`)
    - 초기화면은 기존 데이터 출력
- 7/13
  - 규칙 더보기 기능 추가
    - type, name, pattern 출력
  - `RuleAdj` 수정
    - 배열에 null 값 입력 차단
    - null 값 존재 시 에러 메시지 생성
- 7/17
  - `RuleAdd`, `RuleAdj` 수정
    - (공통) 차단 문자열/ip 항목은 null 값 검사를 배열을 검사
    - (공통) 배열에 최대 5개까지만 추가 가능
    - ~~(`RuleAdd`) `type=0`은 규칙 추가시 정규표현식으로 변환~~
    - (`RuleAdj`) 배열에 null 값 입력 불가
    - (`RuleAdj`) UI 일부 개선
- 7/18
  - `Setting` 수정
    - 필터 기능 추가
  - `RuleList` 수정
    - 삭제/수정/상세보기 버튼과 상세 정보란까지 전부 펼쳐져 있을 때 `ButtonMoreVert` 클릭만으로 전부 접기 가능
    - 스위치 개선
      - mui swith 사용 (`package-lock.json`, `package.json` 업데이트)
  - `Sidebar` 수정
    - `RuleAdd`, `RuleAdj` 접속 시 clicked 상태 정상 작동
  - UI 개선 (`Setting`, `RuleAdd`)
- 7/19
  - `Setting` 수정
    - switch가 `FilterOptions` 앞에 나타나는 현상 수정
  - UI 개선 (`RuleAdd`, `RuldAdj` 상단부)
  - ~~정규표현식 관련 로직 수정~~
    - ~~규칙 상세보기에서 pattern의 정규표현식이 완벽히 제거되지 않는 현상 수정~~
    - ~~정규표현식을 제외한 pattern 값만 보여주기 위해 pattern 값을 정규표현식으로 감쌀 때 {}로 감싸도록 수정~~
      - ~~기존: `admin -> (?im)^(?=.*\badmin\b).*`~~
      - ~~수정: `admin -> (?im)^(?=.*\b{admin}\b).*` (admin 앞뒤로 {} 추가됨)~~
    - ~~`RuleAdj`에서 pattern 값 보여줄 때 정규표현식 제거하고 보여지도록 수정~~
  - `RuleAdd`, `RuleAdj` 수정
    - pattern 입력 시 입력값 검증 추가
      - (공통) 띄어쓰기 불가
      - (type=1) ip 입력 시 `숫자`, `.`, `/`만 허용
      - (공통) 허용하지 않은 값 입력 시 2초간 에러 메시지 발생
  - `ErrorPage` 추가
    - `App`에서 지정하지 않은 주소로 접근 시 `ErrorPage`로 라우팅
- 7/20
  - ~~정규표현식 관련 로직 수정~~
    - ~~`RuleAdj`에서 기존 값 외에 새로운 값 추가 시 배열에서 `{}`를 읽어오지 못해 생기는 오류 수정~~
    - ~~기존 값이 수정 후 이중으로 정규식으로 감싸지는 현상 수정~~
  - `Alert`, `Alertbar` UI 개선
  - 규칙 추가/수정/삭제 완료 시 Alertbar 출력 기능 추가
    - 3초간 출력
  - console.log 정리
    - `setting`, `RuleAdd`, `RuleAdj`의 console.log 제거 혹은 `Alertbar`로 대체
- 7/22
  - `PrivateRoutes` 추가
    - 미인증 상태에서는 `Login`, `Findpw` 외 페이지 접근 시 `Login`으로 리다이렉트
    - 구현 위해 일부 주소 변경
      - `Login` : `/` => `/login`
      - `Home` : `/home` => `/`
      - 주소 변경으로 `Sidebar`, `Topbar`, `Login` navigate 수정
  - UI 개선 (`ErrorPage`, `RuleAdj`)
  - 규칙 목록 출력 방식 개선
    - 매번 `Setting` 접속 혹은 새로고침 때마다 firebase에서 데이터를 가져오는 방식에서 생기는 로딩 시간을 개선
    - firebase에서 가져온 데이터를 로컬 저장소에 저장
    - 관찰자를 두어 firebase 데이터에 수정 사항 발생 시 firebase에서 데이터를 다시 불러와 로컬 저장소에 다시 저장
    - 로그아웃 시 로컬 저장소 비움
- 7/23
  - textarea 수정
    - `TextArea`로 컴포넌트화
    - 글의 줄 수에 따라 textarea의 높이 자동으로 변하도록 수정
    - 200자 제한
  - 로컬 저장소의 캐시 데이터 유효성 검사 추가
  - 로딩 UI 개선
    - `Log`: mui progress 사용
    - `Setting`: mui skeleton 사용
    - `package-lock.json`, `package.json` 업데이트
  - 코드 정리
    - `Setting`, `RuleAdd`, `RuldAdj`, `firebase`, `App`
- 7/27
  - `RuleAdd` 수정
    - textarea에 텍스트 입력시 발생하던 오류 수정
  - UI 개선
    - FHD 미만
      - `Topbar`에 `Sidebar`를 컨트롤하는 `menu` 버튼 추가
    - FHD 이상
      - `menu` 숨겨지도록 설정
      - `Sidebar` 항상 보여지도록 설정
- 8/2
  - 정규표현식 관련 로직 삭제
  - `Chart` 수정
    - 이름 변경: `Chart` -> `TodayLog`
    - 당일(시스템시간 기준) 발생한 로그의 status_code별 개수
    - mui pie 차트 사용 (`package-lock.json`, `package.json` 업데이트)
  - `Log` 수정
    - 로그가 보이지 않던 현상 수정
- 8/3
  - 차트 로딩 UI 추가
  - `WeekLog` 추가
    - 날짜별 로그 개수(시스템시간 기준 당일 포함 7일간)
    - `WeekLog_bak`: 개발용(개발 끝나면 삭제 예정)
  - backend off 시 에러 메시지 출력되도록 수정
    - `TodayLog`, `WeekLog`, `Log`
- 8/4
  - `WeekLog` 수정
    - pie 차트에서 bar 차트로 수정
- 8/9
  - `TodayLog`, `WeekLog` 수정
    - 에러 메시지 출력 후 app.py 실행 시 차트 안보이던 현상 수정
  - topbar 버튼의 sidebar 컨트롤 기능 수정
    - `Setting`에서만 적용되던 현상 수정
  - 이미지 프리로드 추가
- 8/29
  - 패키지 의존성 문제 수정
    - `Log`의 `@material-ui/core` 패키지가 react 18 버전과 호환이 안되어 `@mui/material` 패키지로 수정
  - 일부 의존성 패키지 버전 업데이트
- 9/19
  - 일부 의존성 패키지 버전 업데이트

## 미완료 작업

## 확인된 버그

- ~~`RuleAdj`에서 배열에 null 값 입력되는 현상~~ 7/17 수정 완료
- ~~`RuleAdd`, `RuleAdj` 접속 시에는 `Sidebar`의 clicked 상태가 정상적으로 작동안하던 현상~~ 7/18 수정 완료
- ~~`Setting`의 switch가 `FilterOptions` 앞에 나타나는 현상~~ 7/19 수정 완료
- ~~규칙 상세보기에서 pattern의 정규표현식이 완벽히 제거되지 않는 현상~~ 7/19 수정 완료
- ~~pattern 값을 정규식 및 `{}`로 감싸도록 수정되어 생기는 오류~~ 7/20 수정 완료
- ~~규칙 추가/수정의 description textarea 높이가 줄 수에 맞게 동적으로 변하지 않는 현상~~ 7/23 수정 완료
- ~~`Log`에서 로그가 보이지 않는 현상~~ 8/2 수정 완료
- ~~backend 종료 상태에서 `Log` 접속 시 `Cannot read properties of undefined (reading 'length')` 에러 발생~~ 8/3 수정 완료
