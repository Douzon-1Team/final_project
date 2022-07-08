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
    for (var i = 1;  i < response.data.length; i++) {
      if (response.data[i].m != null || response.data[i].count != null || response.data[i].datediff != null) {
        continue; // 필요없는 데이터 제외
      }
      if (response.data[i].empno != null) { // 정상 출/퇴근, 지각 판단
        console.log('gere');
        // 지각 판단
        if (response.data[i].tardy == true) {
          response.data[i].calendarId = "3";
          response.data[i].title = "지각";
        } else { // 정상 출/퇴근 판단 -> 출근 또는 퇴근 기록이 없을수도 있음
          response.data[i].calendarId = "1";
          response.data[i].title = "출근";
        }
        // 출/퇴근 기록이 없는건 time : null표시
          _.merge(response.data[i], {category: "time", isVisible: true, id: i+1,
            body: response.data[i].context, start: response.data[i].onwork,
            end: new Date(response.data[i].offwork)});
      } else { // req && 결근(출/퇴근)
        // 반려&본인승인 제외
        if (response.data[i].agree == true && response.data[i].reject == true) continue;
        else { // 오직 휴가 && 결근(출/퇴근) 미등록 검증 -> 결근은 req 하던 말던 결제중 표시 X
          if (response.data[i].title != null) { // 휴가 data
            console.log(response.data[i]);
            if (response.data[i].title == "오전반차" || response.data[i].title === "오후반차") {
              if (response.data[i].title == "오전반차") {
                if (response.data[i].accept == true) {
                  response.data[i].body = response.data[i].context;
                  response.data[i].title = "오전반차 - 결제완료";
                } else {
                  response.data[i].body = response.data[i].context;
                  response.data[i].title = "오전반차 - 결제 중";
                }
              } else {
                if (response.data[i].accept == true) {
                  response.data[i].body = response.data[i].context;
                  response.data[i].title = "오전반차 - 결제완료";
                } else {
                  response.data[i].body = response.data[i].context;
                  response.data[i].title = "오전반차 - 결제 중";
                }
              }
            } else if (response.data[i].title == "시간연차") {
              if (response.data[i].accept == true) {
                response.data[i].body = response.data[i].context;
                response.data[i].title = "시간연차 - 결제완료";
              } else {
                response.data[i].body = response.data[i].context;
                response.data[i].title = "시간연차 - 결제 중";
              }
            }
             else if (response.data[i].title == "휴가") {
              if (response.data[i].accept == true) {
                response.data[i].body = response.data[i].context;
                response.data[i].title = "휴가 - 결제완료";
              } else {
                response.data[i].body = response.data[i].context;
                response.data[i].title = "휴가 - 결제 중";
              }
            }
            _.merge(response.data[i], {isVisible: true, id: i+1,
              category: "allday",
              start: new Date(response.data[i].vacationStart),
              end:new Date(response.data[i].vacationEnd), calendarId: "4"});
          } else { // 결근(출/퇴근) data
            if (response.data[i].etc == "퇴근미등록") {
                response.data[i].title = "퇴근미등록";
            } else if (response.data[i].etc == "출근미등록") {
                response.data[i].body = response.data[i].context;
                response.data[i].title = "출근미등록";
            } else if (response.data[i].etc == "결근" || response.data[i].etc == "무단결근") {
                response.data[i].body = response.data[i].context;
                response.data[i].title = "결근";
            }
            console.log(response.data[i]);
            _.merge(response.data[i], {isVisible: true, id: i+1,
              category: "time",
              start: new Date(response.data[i].date),
              end:new Date(response.data[i].date), calendarId: "2"});
          }
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
