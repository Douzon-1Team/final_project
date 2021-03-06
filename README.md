# ALL IN ONE_FinalProject

## 개요
- 기간 : 2022.06.07 ~ 2022.07.14
- 팀명 : ALL IN ONE
- 주제 : 스마트 근태 관리 서비스
- 개발 환경 : IntelliJ
- 사용 언어 : React , Spring boot
- DataBase : MariaDB

## 프로젝트 구조도
<img width="600" height="400" alt="Struct" src="https://user-images.githubusercontent.com/91658901/178360509-9dae87c2-0489-42ae-afcd-2f851c9c1187.png">


## ERD
<img width="600" height="500" alt="ERD" src="https://user-images.githubusercontent.com/91658901/178360676-e681f928-45d8-41c2-97bb-a9ddb2e37f38.png">

## 기능 요구 사항
1. QR코드를 이용한 출퇴근 관리
2. 정상출근/이상근태 판정
3. 일별/월별 근태상황 리포트 조회
4. ADMIN 사원정보 조회, 등록, 수정, 삭제
5. 근태 담당자 근태 관리(보고서 조회. 근무 환경설정, 현황 조회.결재)
6. 사원 휴가/근태관리 (신청, 조회)
7. 기타 (마이페이지, 로그인/로그아웃, 이상근태 알림)

## 팀원 역할 분배
> 회원 관리 - 신중호(sjoongh)
>
- 메인 페이지(달력, 부서별 휴가일정, 월간 근태기록)
- 부서원 목록
- 부서별 차트(이상근태, 당일근무)

> 실시간 채팅 - 이한용(Quence1151)
>
- QR Reader
- 출퇴근 관리
- 메인페이지(주52시간, 연차, 월별 카드형 근태현황)
- 지각자 알림
- 주간 근무시간 차트
- 스케줄러 설정

> 게시판 - 이지은(2jelee)
>
- 로그인/로그아웃
- 마이페이지
- 근태담당자 환경설정
- 부서 연차 사용현황 차트

> 게시판 - 임지영(Limitiz)
>
- ADMIN 페이지
- 로그인/로그아웃
- 차트 상세보기(목록형)

> 게시판 - 주승범(seungbeom613)
>
- 공통 UI(헤더, 사이드바)
- 휴가 및 근태조정 신청 & 조회 & 결재

