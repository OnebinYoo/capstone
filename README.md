# capstone
# main branch에는 업로드 금지
# 각자 본인이름의 branch를 만들고 업로드  
  #pip install request  
    #안되면 pip install requests  
  #pip install flask  
  # pip install -U flask-cors  

## 관리페이지
* topbar
  1. components/topbar/Topbar.jsx 생성
  2. topbar 왼쪽에 회사 로고, 오른쪽에 아이콘 추가
  3. topbar 메뉴가 항상 보이도록 sticky 옵션 추가
 
* sidebar
  1.  components/sidebar/Sidebar.jsx 생성
  2.  sidebar부분과 homepage부분을 4:1로 분할해 구성
  3.  메뉴 스타일 적용, 아이콘 추가
 
*  Home page
   1. pages/home/Home.jsx 생성
   2. 안에 들어갈 페이지 추가
      - chart
      - log
      - setting
     
*  chart
   1. rechart 라이브러리 사용
   2. simpleLineChart example 코드로 동작 확인
   3. Tooltip 추가( 그래프에 마우스 대면 정보 표시)
   4. backend의 log를 반영해 차트에 보여주도록 변경
   5. 총 로그 수 차트와 지정한 시간동안 들어온 로그 수 차트 두가지로 나눔
   6. pie차트로 로그 유형별 개수도 보이도록 변경
 
*  log
*  1. MaterialReactTable 사용
   2. 테이블 형식으로 로그 보여지게 만듬
 






## 실패
* topbar 알림 : 새로운 로그가 발생하면 늘어나지만 클릭했을 때 다시 0으로 돌아오지 않음
* 
