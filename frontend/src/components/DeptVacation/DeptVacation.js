import React, {useEffect, useRef, useState } from "react";
import TUICalendar from "@toast-ui/react-calendar";
import "tui-calendar/dist/tui-calendar.css";
import Button from "@mui/material/Button";
import {DeptCalendarStyle} from "../../styles/Calendarstyle";
import _ from "lodash";
import {
    BsFillArrowLeftSquareFill,
    BsFillArrowRightSquareFill,
} from "react-icons/bs";
import {useNavigate} from "react-router";
import {getMain} from "../../apis/DeptVacationApi";
import {MainStyle} from "../../styles/Globalstyle";
import {useSelector} from "react-redux";

function DeptVacation() {
    const empno = useSelector((state) => state.EMP_INFO.empInfo[0]);
    const accessToken = useSelector( (state) => state.ACCESS_TOKEN.accessToken);
    const navigate = useNavigate();
    const start = new Date();
    const end = new Date(new Date().setMinutes(start.getMinutes() + 30));
    const [schedules, setschedules] = useState([]);


    const calendars = [
        // 정상출근
        {
            id: "1",
            name: "내 휴가",
            color: "#ffffff",
            bgColor: "#00AAFF",
            dragBgColor: "#00AAFF",
            borderColor: "#00AAFF",
        },
        // 조퇴
        {
            id: "2",
            name: "다른 부서원 휴가",
            color: "#ffffff",
            bgColor: "#ffcfa0",
            dragBgColor: "#ff9f40",
            borderColor: "#ff9f40",
        },
    ];

    const getvacation = async () => {
        await getMain({empno, accessToken}).then((res) => {
                const vacation = res.data;
                console.log(empno);
                if (vacation.length !== 0) {
                    for (let i = 0; i < vacation.length; i++) {
                        if (vacation[i].empno === empno) {
                            vacation[i].calendarId = "1";
                        } else {
                            vacation[i].calendarId = "2";
                        }
                        _.merge(vacation[i], {
                            isVisible: true, id: i + 1,
                            category: "allday",
                            start: new Date(vacation[i].vacationStart),
                            end: new Date(vacation[i].vacationEnd)
                        });
                    }
                    setschedules(vacation);
                } else {
                    // error
                }
            }
        ).catch(console.log('error'));
    }


    useEffect(() => {
        getvacation();
    }, []);
    const cal = useRef(null);

    const onBeforeCreateSchedule = (scheduleData) => {
        // 일정 클릭시 일정 팝업창 생성
        var year = scheduleData.start.getFullYear();
        var month = ("0" + (scheduleData.start.getMonth() + 1)).slice(-2);
        var day = ("0" + scheduleData.start.getDate()).slice(-2);

        var dateStart = year + "-" + month + "-" + day;

        var year = scheduleData.end.getFullYear();
        var month = ("0" + (scheduleData.end.getMonth() + 1)).slice(-2);
        var day = ("0" + scheduleData.end.getDate()).slice(-2);

        var dateEnd = year + "-" + month + "-" + day;
    };

    function _getFormattedTime(time) {
        // 시간 설정
        const date = new Date(time);
        const h = date.getHours();
        const m = date.getMinutes();

        return `${h}:${m}`;
    }

    function _getTimeTemplate(schedule, isAllDay) {
        // 일정 data
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

    const templates = {
        // 일정 view
        time: function (schedule) {
            return _getTimeTemplate(schedule, false);
        },
    };

    const [date, setDate] = useState("");

    useEffect(() => {
        const month = cal?.current?.calendarInst.getDate().getMonth();
        const year = cal?.current?.calendarInst.getDate().getFullYear();
        setDate(`${year}년 ${month + 1}월`);
    }, []);

    function onClickPrev() {
        cal?.current?.calendarInst.prev();
        const month = cal?.current?.calendarInst.getDate().getMonth();
        const year = cal?.current?.calendarInst.getDate().getFullYear();
        setDate(`${year}년 ${month + 1}월`);
    }

    function onClickNext() {
        cal?.current?.calendarInst.next();
        const month = cal?.current?.calendarInst.getDate().getMonth();
        const year = cal?.current?.calendarInst.getDate().getFullYear();
        setDate(`${year}년 ${month + 1}월`);
    }

    function onClickTodayBtn() {
        cal?.current?.calendarInst.today();
        const month = new Date().getMonth();
        const year = new Date().getFullYear();
        setDate(`${year}년 ${month + 1}월`);
    }

    function mainPage() {
        return navigate("/main");
    }

    return (
        <MainStyle>
                <DeptCalendarStyle>
                    <div className="calendar_header">
                        <Button className="today" variant="contained" onClick={() => {
                            onClickTodayBtn();
                        }}>
                            오늘 날짜
                        </Button>
                        <BsFillArrowLeftSquareFill
                            className="prev"
                            onClick={() => {
                                onClickPrev();
                            }}
                        />
                        <span className="date">{date}</span>
                        <BsFillArrowRightSquareFill
                            className="next"
                            onClick={() => {
                                onClickNext();
                            }}
                        />

                        <Button className="dept_vacation" variant="contained" onClick={() => {mainPage()}}>
                            내 휴가일정
                        </Button>
                    </div>
                    <TUICalendar
                        ref={cal}
                        view="month"
                        useDetailPopup={true}
                        template={templates}
                        calendars={calendars}
                        schedules={schedules}
                        onBeforeCreateSchedule={onBeforeCreateSchedule}
                        month={{
                            workweek: true,
                            daynames: ["일", "월", "화", "수", "목", "금", "토"],
                        }}

                    />
                </DeptCalendarStyle>
        </MainStyle>
    );
}

export default DeptVacation;
