import React, { useCallback, useEffect, useRef, useState } from "react";
import { render } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import TUICalendar from "@toast-ui/react-calendar";
import { ISchedule, ICalendarInfo } from "tui-calendar";
import { getList} from "../../store/Calender";
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

const start = new Date();
const end = new Date(new Date().setMinutes(start.getMinutes() + 30));
const schedules = [ // schedules 일정 관리
    {
        calendarId: "1", // 색깔
        category: "time", // hours or time or date 설정 가능
        isVisible: true,
        title: "Study",
        id: "1",
        body: "Test",
        start,
        end
    },
    {
        calendarId: "2",
        category: "time",
        isVisible: true,
        title: "Meeting",
        id: "2",
        body: "Description",
        start: new Date(new Date().setHours(start.getHours() + 1)),
        end: new Date(new Date().setHours(start.getHours() + 2))
    }
];

const calendars = [
    {
        id: "1",
        name: "My Calendar",
        color: "#ffffff",
        bgColor: "#9e5fff",
        dragBgColor: "#9e5fff",
        borderColor: "#9e5fff"
    },
    {
        id: "2",
        name: "Company",
        color: "#ffffff",
        bgColor: "#00a9ff",
        dragBgColor: "#00a9ff",
        borderColor: "#00a9ff"
    }
];

function Calendar() {
    const [inputValue, setInputValue] = useState("");

    const dispatch = useDispatch();
    const todoList = useSelector((state) => state.todoReducer);
    console.log(todoList);
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
