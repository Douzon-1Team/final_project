import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

export const getList = createAsyncThunk("GET_TODO", async () => {
    const response = await axios.get("http://localhost:8080/main", {
        params: {
            empnos: '220101'
        }
    });

    // 1. 휴가 req, reject, accept, vacation_start, vacation_end

    // 2. 출근 date(날짜), onwork(출근시간), attendance(출근(1)/결근(default 0)여부), offwork(퇴근시간), tardy(지각여부(0 -> 1(지각))),
    // leave_early(조퇴여부(0 -> 1(조퇴))) unregistered(퇴근 미등록(0 -> 1(미등록)))
    // -> 우선 1.출근/2.결근/3.조퇴/4.지각 여부 결정

    // accept: false
    // attendance: true
    // date: "22-06-13"
    // deptNo: "01"
    // empno: "220101"
    // leaveEarly: false
    // offwork: "2022-06-13 18:12:29"
    // onOffWork: true
    // onwork: "2022-06-13 08:52:23"
    // reject: false
    // tardy: false
    // time: "8"
    // unregistered: false

    // schedules 하기
    // calendarId: "1", // 휴가/반차/결제진행/결제중 종류에따른 색깔 정하기
    //     category -> 하루 OR 휴가기간
    //     isVisible -> 그냥 1
    //     title -> 오전반차 - 결제중 (이런식으로 해야함) OR 출근/결근/조퇴/결근
    //     id -> 1씩 증가
    //     body -> 상세내역이므로 빼도 될 듯? -> 생각해보니 수정 할 때 보내줘야 할듯
    //     start -> onwork
    //     end -> offwork

    // TODO : 본인의 승인,여부 column 추가
    // TODO : 퇴근 미등록 OR 퇴근이상 처리 어떻게 할지?
    console.log(response.data);

    for (var i = 0; i < response.data.length; i++) {
        if (response.data[i].empno != null) { // 출근
            if (response.data[i].tardy == 1) { // 지각
                response.data[i].calendarId = "4";
                // 근태를 신청하지 않았다면, 지각 유무만 표시
                // TODO : 승인 / 근태조정신청 구분
                if (response.data[i].context == null) {
                    response.data[i].title = "지각";
                } else {
                    if (response.data[i].reject === 1) {
                        response.data[i].title = "지각 - 반려";
                    } else if (response.data[i].accept === 1) {
                        response.data[i].title = "지각 - 결제완료";
                    }
                    response.data[i].title = "지각 - 결제 진행중";
                }
                // 근태 신청 시 결제중/결제진행/반려 표시 -> context로 구분

            } else if (response.data[i].leaveEarly == 1) { // 조퇴
                response.data[i].calendarId = "3";
                response.data[i].title = "조퇴";
                // 근태를 신청하지 않았다면, 조퇴 유무만 표시
                // 근태 신청 시 결제중/결제진행 표시 -> context로 구분
            } else if (response.data[i].attendance == 0) { // 결근
                response.data[i].calendarId = "2";
                response.data[i].title = "결근";
                // 근태를 신청하지 않았다면, 결근 유무만 표시
                // 근태 신청 시 결제중/결제진행 표시 -> context로 구분
            } else { // 출근
                response.data[i].calendarId = "1";
                response.data[i].title = "출근";
            }
            _.merge(response.data[i], {category: "time", isVisible: true, id: i+1,
                body: response.data[i].context, start: new Date(response.data[i].onwork),
                end:new Date(response.data[i].offwork)});

            response.data[i] = _.omit(response.data[i], ["accept",
                'attendance', 'date',
                'leaveEarly','reject','tardy','unregistered','time','offwork','onOffwork']);

            // calendarId: "5", // 색깔
            //     category: "time", // hours or time or date 설정 가능
            //     isVisible: true,
            //     title: "휴가 - 결제완료",
            //     id: "1",
            //     body: "Test",
            //     start: new Date(new Date().setHours(start.getHours() + 1)),
            //     end: new Date(new Date().setHours(start.getHours() + 4))
            // const test = new Object();
            // response.data[0].calendarId = 1;
            // reject(반려/반려X 구분), accept(결제 여부(관리자) )
            // 출근(휴가/반차도 정상출근으로 구분)

            // accept: true
            // attendance: false
            // context: "개인사유입니다."
            // leaveEarly: false
            // onOffWork: false
            // reject: false
            // tardy: false
            // title: "휴가"
            // unregistered: false
            // vacationEnd: "22-06-17"
            // vacationStart: "22-06-16"

            // 1. 휴가 req, reject, accept, vacation_start, vacation_end
            // 5번색깔
        } else { // 휴가 : category:allday, 반차:time
            console.log(response.data[i].vacationStart);
            // TODO : 시간연차 추후에 추가
            if (response.data[i].title === "오전반차" || response.data[i].title === "오후반차") {
                response.data[i].category = "day";
                // response.data[i].start = response.data[i].vacationStart;
                // response.data[i].end = response.data[i].vacationEnd;
            } else {
                response.data[i].category = "allday";
            }
            _.merge(response.data[i], {isVisible: true, id: i+1,
                body: response.data[i].context, start: new Date(response.data[i].vacationStart),
                end:new Date(response.data[i].vacationEnd)});
        }
        // console.log(new Date(new Date().setHours(start.getHours() + 1)));
        // console.log(start.getHours());
        // // TODO : DB데이터 ToastUI 라이브러리 형식에 맞게 저장
        // console.log(new Date("2021-05-23 18:30:10"));

    }


    // vacation 더미데이터를 무엇으로? -> 휴가/반차 제외 data 안넣음 -> 프론트에서 data 안넘어오도록

    // TODO : 1. 년 단위로 가져오기? 2. 달력에 데이터 뿌리기
    return response.data;
});


export const calendarReducer = createSlice({
    name: "calendarList",
    initialState: [],
    reducers: {},
    extraReducers: {
        [getList.fulfilled]: (state, { payload }) => [...payload],
    },
});
