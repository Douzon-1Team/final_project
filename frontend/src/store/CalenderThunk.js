import {createAsyncThunk} from "@reduxjs/toolkit";
import _ from "lodash";
import { getMain } from "../apis/CalendarApi";

export const getList = createAsyncThunk("GET_TODO", async ({empno, accessToken}) => {
  try {
    const response = await getMain({empno, accessToken});
    for (var i = 1;  i < response.data.length; i++) {
      if (response.data[i].m != null || response.data[i].count != null || response.data[i].datediff != null) {
        continue; // 필요없는 데이터 제외
      }
      if (response.data[i].empno != null) { // 정상 출/퇴근, 지각 판단
        // 지각 판단
        if (response.data[i].tardy == true) {
          response.data[i].calendarId = "3";
          response.data[i].title = "지각";
        } else { // 정상 출/퇴근 판단 -> 출근 또는 퇴근 기록이 없을수도 있음
          response.data[i].calendarId = "1";
          response.data[i].title = "- "+response.data[i].endwork+"근무";
        }
        // 출/퇴근 기록이 없는건 time : null표시
          _.merge(response.data[i], {category: "time", isVisible: true, id: i+1,
            body: response.data[i].context, start: response.data[i].onwork,
            end: response.data[i].offwork}); // new Date() 없앰
      } else { // req && 결근(출/퇴근)
        // 반려&본인승인 제외
        if (response.data[i].reject == true) continue;
        else { // 오직 휴가 && 결근(출/퇴근) 미등록 검증 -> 결근은 req 하던 말던 결제중 표시 X
          if (response.data[i].title != null) { // 휴가 data
            if (response.data[i].title == "오전반차" || response.data[i].title === "오후반차") {
              if (response.data[i].title == "오전반차") {
                if (response.data[i].accept == true) {
                  response.data[i].body = response.data[i].context;
                  response.data[i].title = "오전반차-결제완료";
                } else {
                  response.data[i].body = response.data[i].context;
                  response.data[i].title = "오전반차-결제 중";
                }
              } else {
                if (response.data[i].accept == true) {
                  response.data[i].body = response.data[i].context;
                  response.data[i].title = "오전반차-결제완료";
                } else {
                  response.data[i].body = response.data[i].context;
                  response.data[i].title = "오전반차-결제 중";
                }
              }
            } else if (response.data[i].title == "시간연차") {
              if (response.data[i].accept == true) {
                response.data[i].body = response.data[i].context;
                response.data[i].title = "시간연차-결제완료";
              } else {
                response.data[i].body = response.data[i].context;
                response.data[i].title = "시간연차-결제 중";
              }
            }
             else if (response.data[i].title == "휴가") {
              if (response.data[i].accept == true) {
                response.data[i].body = response.data[i].context;
                response.data[i].title = "휴가-결제완료";
              } else {
                response.data[i].body = response.data[i].context;
                response.data[i].title = "휴가-결제 중";
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
            _.merge(response.data[i], {isVisible: true, id: i+1,
              category: "time",
              start: new Date(response.data[i].date),
              end:new Date(response.data[i].date), calendarId: "2"});
          }
        }
      }
    }
    return response.data;
  } catch (e) {
    console.log(e);
  }
});
