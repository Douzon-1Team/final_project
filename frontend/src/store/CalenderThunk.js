import {createAsyncThunk} from "@reduxjs/toolkit";
import _ from "lodash";
import { getMain } from "../apis/CalendarApi";
import {MainCalendarError2} from "../components/common/alert/alert";

export const getList = createAsyncThunk("GET_TODO", async (empno) => {
  // TODO : 본인 승인시 detail 페이지 접근 불가
  // TODO : 근태신청 목록에서 삭제하면 -> req에서도 delete
  try {
    // 1. 동일한 날짜에 req 데이터가 존재한다면 이상근태 신청으로
    // 넘어갔으므로 해당 날짜에 관한건 전부 req를 우선으로 출력
    // 2. req를 제외한 나머지를 먼저 판단하고 req테이블에서 중복날짜들 전부제외하고 출력
    const response = await getMain(empno);
    console.log(response);
    for (var i = 1; i < response.data.length; i++) {
      if (response.data[i].m != null || response.data[i].count != null || response.data[i].datediff != null) continue
      if (response.data[i].empno != null) { // 정상 출/퇴근, 조퇴, 지각 판단
        if (response.data[i].tardy == 1) {
          response.data[i].calendarId = "4";
          if (response.data[i].context == null) {
            response.data[i].title = "지각";
          } else {
            if (response.data[i].reject === true) {
              continue;
            } else if (response.data[i].accept === true) {
              response.data[i].title = "지각 - 결제완료";
            }
            response.data[i].title = "지각 - 결제 진행중";
          }
          // 근태 신청 시 결제중/결제진행/반려 표시 -> context로 구분
        } else { // 정상 출퇴근
          response.data[i].calendarId = "1";
          response.data[i].title = "출근";
        }
        _.merge(response.data[i], {category: "time", isVisible: true, id: i+1,
          body: response.data[i].context, start: response.data[i].onwork,
          end: new Date(response.data[i].offwork)});

        response.data[i] = _.omit(response.data[i], ["accept",
          'attendance',
          'reject','tardy','unregistered','time','offwork','onOffwork']);
      } else { // 휴가 : category:allday, 반차:time, 무단결근 status & req는 모두 여기서 받음
        console.log(response.data[i]);
        // TODO : 시간연차 추후에 추가
        if (response.data[i].title == "오전반차" ||
            response.data[i].title == "오전반차 - 미승인"
            || response.data[i].title == "오전반차 - 결제완료" || response.data[i].title == "오전반차 - 결제 중") {
          if (response.data[i].reject == true) {
            continue;
          } else {
            if (response.data[i].accept == true) {
              response.data[i].body = response.data[i].context;
              response.data[i].title = "오전반차 - 결제완료";
            } else {
              response.data[i].body = response.data[i].context;
              response.data[i].title = "오전반차 - 결제 중"
            }
          }
        } else if (response.data[i].title == "오후반차" ||
            response.data[i].title == "오후반차 - 미승인"
            || response.data[i].title == "오후반차 - 결제완료" || response.data[i].title == "오후반차 - 결제 중") {
          if (response.data[i].reject == true) {
            continue;
          } else {
            if (response.data[i].accept == true) {
              response.data[i].body = response.data[i].context;
              response.data[i].title = "오후반차 - 결제완료";
            } else {
              response.data[i].body = response.data[i].context;
              response.data[i].title = "오후반차 - 결제 중"
            }
          }
          // req(title) & status(vacation)는 무단결근 근태이상 신청함, status에만 존재하는건 퇴근미등록 data
          // 1. req로 들어왔을 경우 생각해야함 title, reject, agree, context, accept, reason, vacationstart, datestart, vacationend, dateend
          // 2. status로 들어왔을 경우 생각해야 attendance, tardy, leave_early, vacation, unregistered
        } else if (response.data[i].etc == "퇴근미등록" || response.data[i].title == "퇴근미등록") { // 조퇴, 휴가 데이터
          if (response.data[i].etc == "퇴근미등록") {
            response.data[i].title = "퇴근미등록";
            let finds = _.find(response.data, { 'count': 1, 'datestart': response.data[i].notreqdate });
            if (finds != null) continue;
          } else if(response.data[i].title == "퇴근미등록") {
            response.data[i].count = 1;
            if (response.data[i].reject == true) {
              continue;
            } else {
              if (response.data[i].accept == true) {
                response.data[i].body = response.data[i].context;
                response.data[i].title = "퇴근미등록 - 결제완료";
              } else {
                response.data[i].body = response.data[i].context;
                response.data[i].title = "퇴근미등록 - 결제 중"
              }
            }
          }
        } else if (response.data[i].etc == "출근미등록" || response.data[i].title == "출근미등록") {
          if (response.data[i].etc == "출근미등록") {
            response.data[i].title = "출근미등록";
            let finds = _.find(response.data, { 'count': 2, 'datestart': response.data[i].notreqdate });
            if (finds != null) continue;
          } else if (response.data[i].title == "출근미등록") {
            response.data[i].count = 2;
            if (response.data[i].reject == true) {
              continue;
            } else {
              if (response.data[i].accept == true) {
                response.data[i].body = response.data[i].context;
                response.data[i].title = "출근미등록 - 결제완료";
              } else {
                response.data[i].body = response.data[i].context;
                response.data[i].title = "출근미등록 - 결제 중"
              }
            }
          }
        }  else if (response.data[i].etc == "무단결근" || response.data[i].title == "무단결근") {
          if (response.data[i].etc == "무단결근") { // TODO : status임
            response.data[i].title = "무단결근";
            let finds = _.find(response.data, { 'count': 3, 'datestart': response.data[i].notreqdate });
            if (finds != null) continue;
          } else if (response.data[i].title == "무단결근") { // TODO : req임
            response.data[i].count = 3;
            // console.log(response.data[i]);
            // status를 count로 두고 찾았다? date와 비교해야함
            // 1. req로 들어왔을 경우 생각해야함 title, reject, agree, context, accept, reason, vacationstart, datestart, vacationend, dateend
            // 2. status로 들어왔을 경우 생각해야 attendance, tardy, leave_early, vacation, unregistered
            if (response.data[i].reject == true) {
              continue;
            } else {
              if (response.data[i].accept == true) {
                response.data[i].body = response.data[i].context;
                response.data[i].title = "무단결근 - 결제완료";
              } else {
                response.data[i].body = response.data[i].context;
                response.data[i].title = "무단결근 - 결제 중"
              }
            }
          }
        } else if (response.data[i].etc == "시간연차" || response.data[i].title == "시간연차") {
          if (response.data[i].etc == "시간연차") { // TODO : status임
            response.data[i].title = "시간연차";
            let finds = _.find(response.data, { 'count': 3, 'datestart': response.data[i].notreqdate });
            if (finds != null) continue;
          } else if (response.data[i].title == "무단결근") { // TODO : req임
            response.data[i].count = 3;
            // console.log(response.data[i]);
            // status를 count로 두고 찾았다? date와 비교해야함
            // 1. req로 들어왔을 경우 생각해야함 title, reject, agree, context, accept, reason, vacationstart, datestart, vacationend, dateend
            // 2. status로 들어왔을 경우 생각해야 attendance, tardy, leave_early, vacation, unregistered
            if (response.data[i].reject == true) {
              continue;
            } else {
              if (response.data[i].accept == true) {
                response.data[i].body = response.data[i].context;
                response.data[i].title = "시간연차 - 결제완료";
              } else {
                response.data[i].body = response.data[i].context;
                response.data[i].title = "시간연차 - 결제 중"
              }
            }
          }
        } else {
          if (response.data[i].reject == true) {
            continue;
          } else {
            if (response.data[i].accept == true) {
              response.data[i].body = response.data[i].context;
              response.data[i].title = "휴가 - 결제완료";
            } else {
              response.data[i].body = response.data[i].context;
              response.data[i].title = "휴가 - 결제 중"
            }
          }
        }
        if (response.data[i].etc != null) { // attendance, tardy, leave_early, vacation, unregistered
          _.merge(response.data[i], {isVisible: true, id: i+1,
            category: "time",
            start: new Date(response.data[i].notreqdate),
            end:new Date(response.data[i].notreqdate), calendarId: "5"});
        } else {
          _.merge(response.data[i], {isVisible: true, id: i+1,
            category: "allday",
            start: new Date(response.data[i].vacationStart),
            end:new Date(response.data[i].vacationEnd), calendarId: "5"});
        }
      }
    }
    // TODO : req와 status 동일한 데이터 존재할시 req를 우선으로 뿌려주기
    return response.data;
  } catch (e) {
    MainCalendarError2();
  }

  // 1. 휴가 req, reject, accept, vacation_start, vacation_end

  // 2. 출근 date(날짜), onwork(출근시간), attendance(출근(1)/결근(default 0)여부), offwork(퇴근시간), tardy(지각여부(0 -> 1(지각))),
  // leave_early(조퇴여부(0 -> 1(조퇴))) unregistered(퇴근 미등록(0 -> 1(미등록)))
  // -> 우선 1.출근/2.결근/3.조퇴/4.지각 여부 결정
});
