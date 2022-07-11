import React, { useCallback, useEffect, useRef, useState } from "react";
// import { render } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import TUICalendar from "@toast-ui/react-calendar";
// import { ISchedule, ICalendarInfo } from "tui-calendar";
import { calendarReducer, getList } from "../../store/CalenderThunk";
import "tui-calendar/dist/tui-calendar.css";
// import "tui-date-picker/dist/tui-date-picker.css";
// import "tui-time-picker/dist/tui-time-picker.css";
import Chart from "../MonthChart/chart";
import Button from "@mui/material/Button";
import {CalendarStyle} from "../../styles/Calendarstyle";
import CardContent from '@mui/material/CardContent';
import _ from "lodash";
import Card from '@mui/material/Card';
import {
  BsFillArrowLeftSquareFill,
  BsFillArrowRightSquareFill,
  BsDot,
} from "react-icons/bs";
import {useLocation, useNavigate} from "react-router";


// TODO : 얘네 두개는 필요없을듯
function Calendar() {
  const { state } = useLocation(); // TODO : 사원목록 탭에서 넘어온 사원 데이터
  const navigate = useNavigate();
  const start = new Date();
  const end = new Date(new Date().setMinutes(start.getMinutes() + 30));
  var schedules = [
    // schedules 일정 관리
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
      borderColor: "#03bd9e",
    },
    // 결근
    {
      id: "2",
      name: "결근",
      color: "#ffffff",
      bgColor: "#FF0000",
      dragBgColor: "#FF0000",
      borderColor: "#FF0000",
    },
    // 지각
    {
      id: "3",
      name: "지각",
      color: "#ffffff",
      bgColor: "#FFA500",
      dragBgColor: "#FFA500",
      borderColor: "#FFA500",
    },
    // 결제진행/결제완료? #00AAFF
    {
      id: "4",
      name: "연차",
      color: "#ffffff",
      bgColor: "#00AAFF",
      borderColor: "#00AAFF",
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

  const empno = useSelector((state) => state.EMP_INFO);
  const dispatch = useDispatch();
  const mainData = useSelector((state) => state.calendarReducer);
  let calendarList = _.filter(mainData, 'title');
  let work = _.filter(mainData, 'm');
  schedules.push(...calendarList);

  useEffect(() => {
    // TODO : 관리자가 들어올경우 props로 받은 데이터를 활용
    // TODO : 새로고침시 사라지지 않고 메인 버튼을 누르거나 뒤로가기를 해야 STATE가 사라짐
    if (state !== null) {
      dispatch(getList({empno : state[0]}));
    } else {
      dispatch(getList({empno : empno.empInfo[0]}));
    }
  }, []);
  const cal = useRef(null);

  const onClickSchedule = useCallback((e) => {
    // calendar 클릭시
    const { calendarId, id } = e.schedule;
    const el = cal.current.calendarInst.getElement(id, calendarId);

    if (e.schedule.title !== "출근" && new Date() > e.schedule.start) {
      const areq = [];
      areq.push(e.schedule.title);
      areq.push(e.schedule.start);
      areq.push(e.schedule.end);

      let check = e.schedule.title,substring = "결제완료";

      check.includes(substring)
      // TODO : 이상근태 or 휴가가 본인 승인시 근태조정 신청으로 넘어가지 않게 조건 걸기 -> 어캐걸지..
      if (state === null && check.includes(substring) !== true) {
        navigate('/attendancereq', {
          state: areq,
        });
      }
    } else { // 신청한 휴가는 목록으로 이동
      if (e.schedule.title !== "출근" && new Date() < e.schedule.start) {
        let check2 = e.schedule.title,substring = "결제완료";
        if (state === null && check2.includes(substring) !== true)
        navigate('/leavelist');
      }
    }
  }, []);

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

    if (new Date() > scheduleData.start) {
      // TODO : 오늘 이전 연차신청목록 클릭시 -> 아무일 없음
    } else {
      // 금일 이후 달력 클릭시 휴가신청 페이지로 넘어감
      if (state === null) {
        const start = scheduleData.start;
        navigate("/leavereq", {
          state: start,
        });
      } else {
        // 근태관리자가 사원꺼 클릭중인데 어칼지?
      }
    }
  };
  function _getFormattedTime(time) {
    // start 시간 설정
    // TODO : END 시간도 표시해줄까?
    const date = new Date(time);
    let h = date.getHours();
    let m = date.getMinutes();
    h = h > 9 ? h : '0' + h;
    m = m > 9 ? m : '0' + m;
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
  const [chartview, setChartView] = useState(false);

  const handleMonthClick = useCallback(() => {
    // cal.current.calendarInst.setOptions({month: {visibleWeeksCount: 6}}, true);
    cal.current.calendarInst.changeView("month", true);
  }, []);

  const handleWeekClick = useCallback(() => {
    cal.current.calendarInst.changeView("week");
  }, []);

  const handleDayClick = useCallback(() => {
    cal.current.calendarInst.changeView("day");
  }, []);
  // TODO : Today 추가
  function dVcationPage() {
    return navigate("/dvacation");
  }
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
      <>
        {chartview === false ?
            <CalendarStyle>
              {state !== null ?
              <Card sx={{ maxWidth: 360, fontWeight: 'bold' }}>
                <CardContent>
                  {state[0]} {state[1]} 사원의 근태관리 정보입니다.
                </CardContent>
              </Card>
              : <></>}
              <div className="calendar_header">
                <div className="calbutton">
                  <Button className="mon" variant="contained" type="button" onClick={handleMonthClick}>
                    월별
                  </Button>
                  <Button className="week" variant="contained" type="button" onClick={handleWeekClick}>
                    주별
                  </Button>
                  <Button className="day" variant="contained" type="button" onClick={handleDayClick}>
                    일별
                  </Button>
                </div>
                <Button variant="contained" className="today" onClick={() => {
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

                <Button className="dept_vacation" variant="contained" onClick={() => { setChartView(true) }}>월간 근태기록</Button>
                <Button className="dept_vacation" variant="contained" onClick={() => {dVcationPage()}}>
                  부서별 휴가일정
                </Button>
              </div>
              <div className="headerdot">
              <BsDot className="dot1" />출근
              <BsDot className="dot2" />지각
              <BsDot className="dot3" />결근
              <BsDot className="dot4" />연차
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
                    daynames: ["일", "월", "화", "수", "목", "금", "토"],
                  }}
                  // onBeforeDeleteSchedule={onBeforeDeleteSchedule}
                  // onBeforeUpdateSchedule={onBeforeUpdateSchedule}
              />
            </CalendarStyle>
            : <Chart data={work} /> }
      </>
  );
}

export default Calendar;
