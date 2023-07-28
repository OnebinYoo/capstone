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

- package-lock.json, package.json 업데이트 필요
  - 7/23 부로 업데이트(자세한 사항은 `업데이트 내역` 참조)
- realtime firebase 주소
  - https://capstone*dab03*default*rtdb.asia*southeast1.firebasedatabase.app

## 업데이트 내역

- 7/7
  - 파이어베이스 기반 규칙 목록 구현
    - 규칙 목록에서 `ButtonMoreVert` 버튼 클릭 시 삭제/수정/더보기 버튼 나타나도록 구현
  - 규칙 추가 기능 구현
    - `문자열 차단`, `ip 차단`에 따른 type 자동 변경되어 추가되도록 구현
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
- 7/17
  - 규칙 추가/수정 시 null 값 검사를 input창이 아니라 blockedItems 배열을 검사하도록 수정
  - `RuleAdj`에서 배열에 null 값 입력되는 현상 수정
  - `RuleAdj`의 일부 UI `RuleAdd`와 일치하도록 수정
  - 배열에 최대 5개까지만 입력되도록 수정
  - `type=0`으로 규칙 추가시 정규표현식으로 변환하여 저장되도록 수정
- 7/18
  - 규칙 목록에 필터 기능 추가
  - `RuleAdd`, `RuleAdj` 접속 시에는 `sidebar`의 clicked 상태가 정상적으로 작동안하던 현상 수정
  - `Setting`, `RuleAdd` UI 개선
  - 삭제/수정/상세보기 버튼과 상세 정보란까지 전부 펼쳐져 있을 때 `ButtonMoreVert` 버튼 클릭만으로 전부 접히도록 개선
  - 규칙 목록에 스위치 구현
    - mui의 switch 사용
    - 사전에 제작해 둔 switch 컴포넌트 삭제
    - `package-lock.json`, `package.json` 업데이트
- 7/19
  - `Setting`의 switch가 `FilterOptions` 앞에 나타나는 현상 수정
  - `RuleAdd`, `RuldAdj` 상단부 UI 개선
  - 규칙 상세보기에서 pattern의 정규표현식이 완벽히 제거되지 않는 현상 수정
    - backend와 협의되지 않은 사항이라 추후 수정될 수 있음
    - 정규표현식을 제외한 pattern 값만 보여주기 위해 pattern 값을 정규표현식으로 감쌀 때 {}로 감싸도록 수정
      - 기존: `admin -> (?im)^(?=.*\badmin\b).*`
      - 수정: `admin -> (?im)^(?=.*\b{admin}\b).*` (admin 앞뒤로 {} 추가됨)
  - `RuleAdj`에서 pattern 값 보여줄 때 정규표현식 제거하고 보여지도록 수정
  - `RuleAdd`와 `RuleAdj`의 pattern 입력 시 입력값 검증 추가
    - (공통) 띄어쓰기 허용하지 않도록 구현
    - (type=1) ip 입력 시 `숫자`, `.`, `/`만 허용하도록 구현
    - (공통) 허용하지 않은 값 입력 시 2초간 에러 메시지 발생하도록 구현
  - `ErrorPage` 초안 작성
    - `App`에서 지정하지 않은 주소로 접근 시 `ErrorPage`로 라우팅되도록 수정
- 7/20
  - pattern 값을 정규식 및 `{}`로 감싸도록 수정되어 생기는 오류 수정
    - `RuleAdj`에서 기존 값 외에 새로운 값 추가 시 배열에서 `{}`를 읽어오지 못해 생기는 오류 수정
    - 기존 값이 수정 후 이중으로 정규식으로 감싸지는 현상 수정
  - `Alert`, `Alertbar` UI 개선
  - 규칙 추가/수정/삭제 완료 시 Alertbar 보이도록 구현
    - 3초 후 없어지도록 구현
  - `setting`, `RuleAdd`, `RuleAdj`의 console.log 제거 혹은 Alertbar로 대체
- 7/22
  - `PrivateRoutes` 구현
    - 비로그인 상태에서는 `Login`, `Findpw` 외의 페이지 접근 시 `Login` 페이지로 리다이렉트되도록 구현
    - 구현 위해 일부 주소 변경
      - `Login` : `/` => `/login`
      - `Home` : `/home` => `/`
      - 주소 변경으로 인해 sidebar, topbar, login 일부 수정
  - `ErrorPage` 완성
  - `RuleAdj` UI 수정
  - 규칙 목록 보여주는 방식 개선
    - 매번 `Setting` 접속 혹은 새로고침 때마다 firebase에서 데이터를 가져오는 방식에서 생기는 로딩 시간을 개선하기 위해 수정
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
    - mui progress, skeleton 사용으로 인해 `package-lock.json`, `package.json` 업데이트
  - 코드 정리
    - `Setting`, `RuleAdd`, `RuldAdj`, `firebase`, `App`
- 7/27
  - `RuleAdd`의 textarea에 텍스트 입력시 발생하던 오류 수정
  - UI 개선
    - FHD 미만
      - `Topbar`에 `Sidebar`를 컨트롤하는 메뉴 버튼 추가
      - 메뉴 버튼에 의해 컨트롤 되도록 `Sidebar` 일부 수정
    - FHD 이상
      - 메뉴 버튼 숨겨지도록 설정
      - `Sidebar` 항상 보여지도록 설정

## 미완료 작업

- 정규표현식으로 감싸기 삭제
- ip 차단 추천 컴포넌트 구현

## 확인된 버그

- ~~`RuleAdj`에서 배열에 null 값 입력되는 현상~~ 7/17 수정 완료
- ~~`RuleAdd`, `RuleAdj` 접속 시에는 `Sidebar`의 clicked 상태가 정상적으로 작동안하던 현상~~ 7/18 수정 완료
- ~~`Setting`의 switch가 `FilterOptions` 앞에 나타나는 현상~~ 7/19 수정 완료
- ~~규칙 상세보기에서 pattern의 정규표현식이 완벽히 제거되지 않는 현상~~ 7/19 수정 완료
- ~~pattern 값을 정규식 및 `{}`로 감싸도록 수정되어 생기는 오류~~ 7/20 수정 완료
- ~~규칙 추가/수정의 description textarea 높이가 줄 수에 맞게 동적으로 변하지 않는 현상~~ 7/23 수정 완료
