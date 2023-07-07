# 07/07 작업 현황

> setting.jsx 개편

## 파이어베이스 기반으로 규칙 목록 불러오기 --> 약80%

    * 스위치 구현 --> 0%
        * 현재는 간단하게 버튼식으로만(enable:ture => Enabled, false => False)
    * 규칙 목록에서 '점 세개 버튼' 클릭 시 수정/삭제/더보기 --> 100%

## 규칙 추가 구현 --> 25%

    * '문자열 차단', 'ip 차단'에 따른 type 자동 변경 --> 100%
    * 여러 문자열, ip 차단 규칙 가능하게 구현 --> 0%
    * 추가 완료 시 alert 창 --> 0%
    * 디자인 --> 0%

## 규칙 삭제 구현 --> 약70%

    * 규칙 삭제 시 alert 창 --> 30%
        *alert창 안띄우고 바로 삭제는 구현 되어있음

## 규칙 수정 구현 --> 0%

## 규칙 추가/수정/삭제 완료 시 alert --> 0%

## 규칙 상세보기 구현 --> 0%

    * type, pattern 정도 보여주기 --> 0%
        * 정보가 얼마 없어서 수정/삭제/더보기 버튼 밑에 회색 배경 안에 보여주도록 구상만 해놓음

## 반드시 .env파일을 아래와 같이 위치시켜야함

project/

- front/
- backend/
- .env

## realtime firebase 주소

https://capstone-dab03-default-rtdb.asia-southeast1.firebasedatabase.app
