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
  - 7/18 부로 업데이트(자세한 사항은 `업데이트 내역` 참조)

* realtime firebase 주소
  - https://capstone-dab03-default-rtdb.asia-southeast1.firebasedatabase.app

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

* 7/17
  - null 값 검사를 input창이 아니라 blockedItems 배열을 검사하도록 수정(`RuleAdd`, `RuleAdj`)
  - RuleAdj에서 배열에 null 값 입력되는 현상 수정
  - RuleAdj의 일부 컴포넌트 요소 RuleAdd와 일치하도록 수정
  - 배열에 최대 5개까지만 입력되도록 수정
  * `type=0`으로 규칙 추가시 정규표현식으로 변환하여 저장되도록 수정

- 7/18
  - 규칙 목록에 필터 기능 추가
  * `RuleAdd`, `RuleAdj` 페이지 접속 시에는 `sidebar`의 '설정' clicked 상태가 정상적으로 작동안하던 부분 수정
  * 설정 페이지의 상단 부분 UI 개선
  * `RuleAddWrap`의 `border-radius` 값 조정
  * 삭제/수정/상세보기 버튼과 상세 정보란까지 전부 펼쳐져 있을 때 ButtonMoreVert 버튼 클릭만으로 전부 접히도록 개선
  * 규칙 목록에 스위치 구현
    - mui의 switch 사용
      - 사전에 제작해 둔 switch 컴포넌트 삭제
    * mui 사용 및 switch customize로 인해 `package-lock.json`, `package.json`도 업데이트

* 7/19
  - `setting`의 switch가 `FilterOptions` 앞에 나타나는 현상 수정
  * `RuleAdd`, `RuldAdj` 페이지 상단 부분의 UI 개선
  * 규칙 상세보기에서 pattern의 정규표현식이 완벽히 제거되지 않는 현상 수정
    - backend와 협의되지 않은 사항이라 추후 수정될 수 있음
    - 정규표현식을 제외한 pattern 값만 보여주기 위해 pattern 값을 정규표현식으로 감쌀 때 {}로 감싸도록 수정
      - 기존: `admin -> (?im)^(?=.*\badmin\b).*`
      - 수정: `admin -> (?im)^(?=.*\b{admin}\b).*` (admin 앞뒤로 {} 추가됨)
  * `RuleAdj`에서 pattern 값 보여줄 때 정규표현식 제거하고 보여지도록 수정
  * `RuleAdd`와 `RuleAdj`의 pattern 입력 시 입력값 검증 추가
    - (공통) 띄어쓰기 허용하지 않도록 구현
    - (type=1) ip 입력 시 `숫자`, `.`, `/`만 허용하도록 구현
    * (공통) 허용하지 않은 값 입력 시 2초간 에러 메시지 발생하도록 구현
  * 에러페이지 초안 작성

## 미완료 작업

- 규칙 추가/수정/삭제 완료 시 alert 보이도록 구현
- 규칙 수정 편의성 개선
  - 기존의 배열 값 클릭 시 배열에서 해당 값이 지워지고, 클릭 한 값이 input 창으로 들어와 바로 수정할 수 있도록 수정
- PrivateRoutes 사용해서 로그인 안했을 시 login.jsx 외의 페이지는 안보이도록 수정
- console.log 제거
  - alert로 보이도록 하거나 제거
- ip 차단 추천 컴포넌트 구현

## 확인된 버그

- 규칙 추가/수정의 description textarea 높이가 줄 수에 맞게 동적으로 변하지 않는 현상
- 7/19 이전 버전에서 추가한 규칙을 수정 시 정규표현식에 {}가 없어 에러가 발생하는 현상
  - 해당 규칙을 제거하면 해결되나 test를 위해 남겨놔 발생하는 현상
