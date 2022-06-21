import {createAsyncThunk} from "@reduxjs/toolkit";
import _ from "lodash";
import { getMain } from "../apis/CalendarApi";

export const getList = createAsyncThunk("GET_TODO", async () => {
    // TODO : REDUX에서 로그인 유저정보 받아오기
            try {
                const response = await getMain({empnos:220101});
                for (var i = 0; i < response.data.length; i++) {
                    if (response.data[i].empno != null) { // 출근
                        if (response.data[i].vacation != null) continue;
                        if (response.data[i].tardy == 1) { // 지각
                            response.data[i].calendarId = "4";
                            if (response.data[i].context == null) {
                                response.data[i].title = "지각";
                            } else {
                                if (response.data[i].reject === 1) {
                                    response.data[i].title = "지각 - 미승인";
                                } else if (response.data[i].accept === 1) {
                                    response.data[i].title = "지각 - 결제완료";
                                }
                                response.data[i].title = "지각 - 결제 진행중";
                            }
                            // 근태 신청 시 결제중/결제진행/반려 표시 -> context로 구분

                        } else if (response.data[i].leaveEarly == 1) { // 조퇴
                            response.data[i].calendarId = "3";
                            if (response.data[i].context == null) {
                                response.data[i].title = "조퇴";
                            } else {
                                if (response.data[i].reject === 1) {
                                    response.data[i].title = "조퇴 - 미승인";
                                } else if (response.data[i].accept === 1) {
                                    response.data[i].title = "조퇴 - 결제완료";
                                }
                                response.data[i].title = "조퇴 - 결제 진행중";
                            }
                            // 근태를 신청하지 않았다면, 조퇴 유무만 표시
                            // 근태 신청 시 결제중/결제진행 표시 -> context로 구분
                        } else if (response.data[i].attendance == 0) { // 결근
                            response.data[i].calendarId = "2";
                            if (response.data[i].context == null) {
                                response.data[i].title = "결근";
                            } else {
                                if (response.data[i].reject === 1) {
                                    response.data[i].title = "결근 - 미승인";
                                } else if (response.data[i].accept === 1) {
                                    response.data[i].title = "결근 - 결제완료";
                                }
                                response.data[i].title = "결근 - 결제 진행중";
                            }
                        } else { // 출근
                            // TODO : 퇴근 qr 구분 어떻게 할지?
                            response.data[i].calendarId = "1";
                            response.data[i].title = "출근";
                        }
                        _.merge(response.data[i], {category: "time", isVisible: true, id: i+1,
                            body: response.data[i].context, start: new Date(response.data[i].onwork),
                            end:new Date(response.data[i].offwork)});

                        response.data[i] = _.omit(response.data[i], ["accept",
                            'attendance',
                            'leaveEarly','reject','tardy','unregistered','time','offwork','onOffwork']);
                    } else { // 휴가 : category:allday, 반차:time
                        console.log(response.data[i].vacationStart);
                        // TODO : 시간연차 추후에 추가
                        if (response.data[i].title === "오전반차") {
                            // response.data[i].category = "allday";
                            if (response.data[i].reject == 1) {
                                response.data[i].body = response.data[i].reason;
                                response.data[i].title = "오전반차 - 미승인";
                            } else {
                                if (response.data[i].accept == 1) {
                                    response.data[i].body = response.data[i].context;
                                    response.data[i].title = "오전반차 - 결제완료";
                                } else {
                                    response.data[i].body = response.data[i].context;
                                    response.data[i].title = "오전반차 - 결제 중"
                                }
                            }
                            // response.data[i].start = response.data[i].vacationStart;
                            // response.data[i].end = response.data[i].vacationEnd;
                        } else if (response.data[i].title === "오후반차") {
                            if (response.data[i].reject == 1) {
                                response.data[i].body = response.data[i].reason;
                                response.data[i].title = "오후반차 - 미승인"
                            } else {
                                if (response.data[i].accept == 1) {
                                    response.data[i].body = response.data[i].context;
                                    response.data[i].title = "오후반차 - 결제완료";
                                } else {
                                    response.data[i].body = response.data[i].context;
                                    response.data[i].title = "오후반차 - 결제 중"
                                }
                            }
                        } else {
                            if (response.data[i].reject == 1) {
                                console.log('hwaeer');
                                response.data[i].body = response.data[i].reason;
                                response.data[i].title = "휴가 - 미승인"
                            } else {
                                if (response.data[i].accept == 1) {
                                    response.data[i].body = response.data[i].context;
                                    response.data[i].title = "휴가 - 결제완료";
                                } else {
                                    response.data[i].body = response.data[i].context;
                                    response.data[i].title = "휴가 - 결제 중"
                                }
                            }
                        }
                        _.merge(response.data[i], {isVisible: true, id: i+1,
                            category: "allday",
                            start: new Date(response.data[i].vacationStart),
                            end:new Date(response.data[i].vacationEnd), calendarId: "5"});
                    }
                }
                // TODO : 1. 년 단위로 가져오기? 2. 달력에 데이터 뿌리기
                return response.data;
            } catch (e) {
                alert("시스템 에러입니다. 관리자에게 문의 해주세요");
            }

    // 1. 휴가 req, reject, accept, vacation_start, vacation_end

    // 2. 출근 date(날짜), onwork(출근시간), attendance(출근(1)/결근(default 0)여부), offwork(퇴근시간), tardy(지각여부(0 -> 1(지각))),
    // leave_early(조퇴여부(0 -> 1(조퇴))) unregistered(퇴근 미등록(0 -> 1(미등록)))
    // -> 우선 1.출근/2.결근/3.조퇴/4.지각 여부 결정

    // TODO : 본인의 승인,여부 column 추가
    // TODO : 퇴근 미등록 OR 퇴근이상 처리 어떻게 할지?
});
