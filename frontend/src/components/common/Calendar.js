import React, { useCallback, useEffect, useRef, useState } from "react";
import { render } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import TUICalendar from "@toast-ui/react-calendar";
import { ISchedule, ICalendarInfo } from "tui-calendar";
import {calendarReducer, getList} from "../../store/Calender";
import "tui-calendar/dist/tui-calendar.css";
// import "tui-date-picker/dist/tui-date-picker.css";
// import "tui-time-picker/dist/tui-time-picker.css";
import CalendarStyle from "./Calendarstyle";

// TODO 1.
// 출근, 조퇴, 반차, 결근 & 휴가 하루는 TODAY ~ 하루종일 이므로
// END에서 hours data만 가져오면 ㄱㄴ

// 기간이 이틀 이상인 데이터는 start와 end getData 해야함

// hours와 date구분해야함
// db에서 가져온 데이터가 휴가라면
// getDate 넣기
// 이외의 것들 getHours 넣기

// TODO 2.
// 서버에서 받아온 날짜별 일정 data 넣기

// TODO 3.
// getDate를 useEffect와 useState 사용하기

// TODO 4.
// https://gipyeonglee.tistory.com/209
// 휴일 API 받아와서 라이브러리에 공휴일 적용

// TODO : 얘네 두개는 필요없을듯
function Calendar() {
const start = new Date();
const end = new Date(new Date().setMinutes(start.getMinutes() + 30));
// var [schedules, setschedules] = useState({}); // 출/퇴근 기록
var schedules = [ // schedules 일정 관리
    // {
    //     calendarId: "1", // 색깔
    //     category: "time", // hours or time or date 설정 가능
    //     isVisible: true,
    //     title: "휴가 - 결제완료",
    //     id: "3",
    //     body: "Test",
    //     start: new Date(new Date().setHours(start.getHours() + 1)),
    //     end: new Date(new Date().setHours(start.getHours() + 4))
    // },
    // {
    //     calendarId: "2",
    //     category: "time",
    //     isVisible: true,
    //     title: "오전반차 - 결제진행",
    //     id: "4",
    //     body: "Description",
    //     start: new Date(new Date().setHours(start.getHours() + 1)),
    //     end: new Date(new Date().setHours(start.getHours() + 48))
    // },
];

const calendars = [
    // 정상출근
    {
        id: "1", // id로 schedules와 연동되므로 순차적으로 올리기
        name: "출근",
        color: "#ffffff",
        bgColor: "#9e5fff",
        dragBgColor: "#9e5fff",
        borderColor: "#9e5fff"
    },
    // 조퇴
    {
        id: "2",
        name: "조퇴",
        color: "#ffffff",
        bgColor: "#00a9ff",
        dragBgColor: "#00a9ff",
        borderColor: "#00a9ff"
    },
    // 결근
    {
        id: "3",
        name: "결근",
        color: "#ffffff",
        bgColor: "#00a9ff",
        dragBgColor: "#00a9ff",
        borderColor: "#00a9ff"
    },
    // 지각
    {
        id: "4",
        name: "지각",
        color: "#ffffff",
        bgColor: "#00a9ff",
        dragBgColor: "#00a9ff",
        borderColor: "#00a9ff"
    },
    // 결제진행

    // 결제완료

];

// TODO : Redux 데이터 바로 불러오기

    // const [inputValue, setInputValue] = useState("");
    // const [scheduless, setschedules] = useState([]); // 출/퇴근 기록
    // const [calendars, setcalendars] = useState([]); // 휴가기록

    // 1. 휴가 req, reject, accept, vacation_start, vacation_end

    // 2. 출석 empno, dept_no, onwork, offwork, on_off_work, time,
    //        attendance, tardy, leave_early, vacation, unregistered, date
    // 정상출근 -> 출근O, 결근X, 지각X, 조퇴X, 퇴근O, vacation은 상관X
    // 지각 -> 출근O, 지각O
    // 조퇴 -> 조퇴O
    // 결근 -> 출/퇴근 QR data X
    // date(날짜), onwork(출근시간), attendance(출근(1)/결근(default 0)여부), offwork(퇴근시간), tardy(지각여부(0 -> 1(지각))),
    // leave_early(조퇴여부(0 -> 1(조퇴))) unregistered(퇴근 미등록(0 -> 1(미등록)))

    const dispatch = useDispatch();
    const calendarList = useSelector((state) => state.calendarReducer);
    var test = {};
    // test = calendarList[0];
    for (var i = 0; i < calendarList.length; i++) {
        test = calendarList[i];
    }
    // console.log(calendarList[0]);
    // setschedules(...calendarList);
    schedules.push(...calendarList);
    console.log(test);
    // console.log(...calendarList);
    console.log(schedules);
    // setschedules(calendarList[0].start);
    // calendarId: "1", // 색깔
    //     category
    //     isVisible
    //     title
    //     id
    //     body
    //     start
    //     end

    // setschedules(calendarId:1, category:"time", isVisible:true, title:calendarList)

    useEffect(() => {
        dispatch(getList());
    }, []);
    const cal = useRef(null);

    const onClickSchedule = useCallback((e) => { // calendar 클릭시
        const { calendarId, id } = e.schedule;
        const el = cal.current.calendarInst.getElement(id, calendarId);

        console.log(e, el.getBoundingClientRect());
    }, []);

    const onBeforeCreateSchedule = useCallback((scheduleData) => { // 일정 클릭시 일정 팝업창 생성
        console.log(scheduleData);

        const schedule = {
            id: String(Math.random()),
            title: scheduleData.title,
            isAllDay: scheduleData.isAllDay,
            start: scheduleData.start,
            end: scheduleData.end,
            category: scheduleData.isAllDay ? "allday" : "time",
            dueDateClass: "",
            location: scheduleData.location,
            raw: {
                class: scheduleData.raw["class"]
            },
            state: scheduleData.state
        };

        cal.current.calendarInst.createSchedules([schedule]);
    }, []);

    const onBeforeDeleteSchedule = useCallback((res) => { // 삭제 팝업창
        console.log(res);

        const { id, calendarId } = res.schedule;

        cal.current.calendarInst.deleteSchedule(id, calendarId);
    }, []);

    const onBeforeUpdateSchedule = useCallback((e) => { // 수정 팝업창
        console.log(e);

        const { schedule, changes } = e;

        cal.current.calendarInst.updateSchedule(
            schedule.id,
            schedule.calendarId,
            changes
        );
    }, []);

    function _getFormattedTime(time) { // 시간 설정
        const date = new Date(time);
        const h = date.getHours();
        const m = date.getMinutes();

        return `${h}:${m}`;
    }

    function _getTimeTemplate(schedule, isAllDay) { // 일정 data
        var html = [];

        if (!isAllDay) {
            html.push("<strong>" + _getFormattedTime(schedule.start) + "</strong> ");
        }
        if (schedule.isPrivate) {
            html.push('<span class="calendar-font-icon ic-lock-b"></span>');
            html.push("Private");
        } else {
            if (schedule.isReadOnly) {
                html.push('<span class="calendar-font-icon ic-readonly-b"></span>');
            } else if (schedule.recurrenceRule) {
                html.push('<span class="calendar-font-icon ic-repeat-b"></span>');
            } else if (schedule.attendees.length) {
                html.push('<span class="calendar-font-icon ic-user-b"></span>');
            } else if (schedule.location) {
                html.push('<span class="calendar-font-icon ic-location-b"></span>');
            }
            // 일정 title
            html.push(" " + schedule.title);
        }

        return html.join("");
    }

    const templates = { // 일정 view
        time: function (schedule) {
            console.log(schedule);
            return _getTimeTemplate(schedule, false);
        }
    };

    const [date, setDate] = useState("");

    useEffect(() => {
        const month = cal?.current?.calendarInst.getDate().getMonth();
        const year = cal?.current?.calendarInst.getDate().getFullYear();
        setDate(`${year}년 ${month + 1}월`);
        console.log(cal);
    }, []);

    function onClickPrev() {
        cal?.current?.calendarInst.prev();
        const month = cal?.current?.calendarInst.getDate().getMonth();
        const year = cal?.current?.calendarInst.getDate().getFullYear();
        setDate(`${year}년 ${month + 1}월`);
    }

    function onClickNext() {
        cal?.current?.calendarInst.next();
        console.log(cal?.current?.calendarInst.getDate());
        const month = cal?.current?.calendarInst.getDate().getMonth();
        const year = cal?.current?.calendarInst.getDate().getFullYear();
        setDate(`${year}년 ${month + 1}월`);
    }

    return (
        <CalendarStyle>
            <button
                onClick={() => {
                    onClickPrev()}}
            >
                PREV
            </button>
            <button
                onClick={() => {
                    onClickNext()}}
            >
                NEXT
            </button>
            <span>{date}</span>
            <TUICalendar
                ref={cal}
                height="750px"
                view="month"
                useCreationPopup={true}
                useDetailPopup={true}
                template={templates}
                calendars={calendars}
                schedules={schedules}
                onClickSchedule={onClickSchedule}
                onBeforeCreateSchedule={onBeforeCreateSchedule}
                onBeforeDeleteSchedule={onBeforeDeleteSchedule}
                onBeforeUpdateSchedule={onBeforeUpdateSchedule}
            />
        </CalendarStyle>
    );
}

export default Calendar;
