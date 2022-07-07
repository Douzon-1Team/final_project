import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TUICalendar from "@toast-ui/react-calendar";
import { calendarReducer, getList } from "../../store/CalenderThunk";
import "tui-calendar/dist/tui-calendar.css";
import Chart from "../month/chart";
import Button from "@mui/material/Button";
import {DeptCalendarStyle} from "../../styles/Calendarstyle";
import _ from "lodash";
import {
    BsFillArrowLeftSquareFill,
    BsFillArrowRightSquareFill,
    BsDot,
} from "react-icons/bs";
import {useNavigate} from "react-router";
import {getMain} from "../../apis/DeptVacationApi";
import {MainStyle} from "../../styles/Globalstyle"

// TODO : 얘네 두개는 필요없을듯
function DeptVacation() {
    const navigate = useNavigate();
    const start = new Date();
    const end = new Date(new Date().setMinutes(start.getMinutes() + 30));
    const [schedules, setschedules] = useState([]);


    // TODO : 본인 휴가 색깔과 다른 부서원 색깔 정하기
    const calendars = [
        // 정상출근
        {
            id: "1",
            name: "내 휴가",
            color: "#03bd9e",
            bgColor: "#03bd9e",
            dragBgColor: "#03bd9e",
            borderColor: "#03bd9e",
        },
        // 조퇴
        {
            id: "2",
            name: "다른 부서원 휴가",
            color: "#ffffff",
            bgColor: "#00a9ff",
            dragBgColor: "#00a9ff",
            borderColor: "#00a9ff",
        },
    ];

    const empno = useSelector((state) => state.EMP_INFO);

    const getvacation = async () => {
        await getMain({empno: 220102}).then((res) => {
                const vacation = res.data;
                if (vacation.length != 0) {
                    for (let i = 0; i < vacation.length; i++) {
                        if (vacation[i].empno === empno.empInfo[0]) {
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
                    console.log(schedules);
                } else {
                    // error
                }
            }
        ).catch(console.log('실패야 이녀석아'));
    }


    useEffect(() => {
        // TODO : 관리자가 들어올경우 props로 받은 데이터를 활용
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
