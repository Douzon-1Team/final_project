import React, { useCallback, useEffect, useRef, useState } from "react";
import { render } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import TUICalendar from "@toast-ui/react-calendar";
import { ISchedule, ICalendarInfo } from "tui-calendar";
import {calendarReducer, getList} from "../../store/CalenderThunk";
import "tui-calendar/dist/tui-calendar.css";
// import "tui-date-picker/dist/tui-date-picker.css";
// import "tui-time-picker/dist/tui-time-picker.css";
import Button from '@mui/material/Button';
import CalendarStyle from "./Calendarstyle";
import _ from "lodash";
import {
    BsFillArrowLeftSquareFill,
    BsFillArrowRightSquareFill,
} from "react-icons/bs";

// TODO : 얘네 두개는 필요없을듯
function Calendar() {
const start = new Date();
const end = new Date(new Date().setMinutes(start.getMinutes() + 30));
var schedules = [ // schedules 일정 관리
];

// TODO : 얘는 따로 뺴줘야할듯
const calendars = [
    // 정상출근
    {
        id: "1", // id로 schedules와 연동되므로 순차적으로 올리기
        name: "출근",
        color: "#ffffff",
        bgColor: "#03bd9e",
        dragBgColor: "#03bd9e",
        borderColor: "#03bd9e"
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
        bgColor: "#FF0000",
        dragBgColor: "#FF0000",
        borderColor: "#FF0000"
    },
    // 지각
    {
        id: "4",
        name: "지각",
        color: "#ffffff",
        bgColor: "#FFA500",
        dragBgColor: "#FFA500",
        borderColor: "#FFA500"
    },
    // 결제진행/결제완료? #00AAFF
    {
        id: "5",
        name: "연차",
        color: "#ffffff",
        bgColor: "#00AAFF",
        borderColor: "#FF0000"
    },

];
    // const [inputValue, setInputValue] = useState("");

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
    schedules.push(...calendarList);

    useEffect(() => {
        dispatch(getList());
    }, []);
    const cal = useRef(null);

    const onClickSchedule = useCallback((e) => { // calendar 클릭시
        const { calendarId, id } = e.schedule;
        const el = cal.current.calendarInst.getElement(id, calendarId);

        // TODO : 얘네 3개 보내줄거임(근태 조정 & 휴가 신청) - title로 구분 할 것
        console.log(e.schedule.title);
        console.log(e.schedule.start);
        console.log(e.schedule.end);
    }, []);

    const onBeforeCreateSchedule = (scheduleData) => { // 일정 클릭시 일정 팝업창 생성
        var year = scheduleData.start.getFullYear();
        var month = ('0' + (scheduleData.start.getMonth() + 1)).slice(-2);
        var day = ('0' + scheduleData.start.getDate()).slice(-2);

        var dateStart = year + '-' + month  + '-' + day;

        var year = scheduleData.end.getFullYear();
        var month = ('0' + (scheduleData.end.getMonth() + 1)).slice(-2);
        var day = ('0' + scheduleData.end.getDate()).slice(-2);

        var dateEnd = year + '-' + month  + '-' + day;

        // TODO : 오늘 이전 연차신청목록 클릭시 -> 어떻게 할지?
        if (new Date() > scheduleData.start) {
            const test = _.find(schedules, { empno: '220101', date: `${dateStart}` });
            console.log(test);
        } else { // TODO : 연차 신청
            const test2 = _.find(schedules, { datestart: `${dateStart}` });
            console.log('over here!');
            // if (test2 == null) {
                // dateStart 보내기
            // }
        }
        // 승범님에게 data 보내기~
        // window.location.href = 'https://www.naver.com/';
    };


    // const onBeforeUpdateSchedule = useCallback((e) => { // 수정 팝업창
    //     console.log(e);
    //
    //     const { schedule, changes } = e;
    //
    //     cal.current.calendarInst.updateSchedule(
    //         schedule.id,
    //         schedule.calendarId,
    //         changes
    //     );
    // }, []);

    function _getFormattedTime(time) { // 시간 설정
        const date = new Date(time);
        const h = date.getHours();
        const m = date.getMinutes();

        return `${h}:${m}`;
    }

    function _getTimeTemplate(schedule, isAllDay) { // 일정 data
        console.log(123123);
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

    // TODO : Today 추가
    return (
        <CalendarStyle>
            <div className="calendar_header">
            <Button className="today" variant="contained">오늘 날짜</Button>
                <BsFillArrowLeftSquareFill className="prev"
                    onClick={() => {
                        onClickPrev()
                    }}
                />
            <span className="date">{date}</span>
                        <BsFillArrowRightSquareFill className="next"
                            onClick={() => {
                                onClickNext()}}
                        />

                <Button className="dept_vacation" variant="contained">부서별 휴가일정</Button>
            </div>
            <TUICalendar
                ref={cal}
                view="month"
                // useCreationPopup={true}
                // useDetailPopup={true}
                template={templates}
                calendars={calendars}
                schedules={schedules}
                onClickSchedule={onClickSchedule}
                onBeforeCreateSchedule={onBeforeCreateSchedule}
                month={{
                    daynames: ['일', '월', '화', '수', '목', '금', '토']
                }}
            // onBeforeDeleteSchedule={onBeforeDeleteSchedule}
                // onBeforeUpdateSchedule={onBeforeUpdateSchedule}
            />
        </CalendarStyle>
    );
}

export default Calendar;
