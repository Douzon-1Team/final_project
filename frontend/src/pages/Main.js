import React from "react";
import Calendar from "../components/common/Calendar";
import ProgressBar52h from "../components/ProgressBar52h";
import AnnualLeaveUsage from "../components/AnnualLeaveUsage";
import { useSelector } from "react-redux";
import { MainStyle } from "../styles/Globalstyle";

// redux 사번 받아오기
function Main() {
  const subComponentData = useSelector((state) => state.calendarReducer[0]);
    console.log(subComponentData[0])

  return (
      <MainStyle>
          <ProgressBar52h
            attendanceWeek={subComponentData.attendanceWeek}
            todayWorkTime={subComponentData.todayWorkTime}
            overtimeWeek={subComponentData.overtimeWeek}
          />
          <br />
          <AnnualLeaveUsage
            totalAnnualLeave={subComponentData.totalAnnualLesave}
            remainingAnnualLeaveDay={subComponentData.remainingAnnualLeaveDay}
            remainingAnnualLeaveTime={subComponentData.remainingAnnualLeaveTime}
          />
        <Calendar />
      </MainStyle>
  );
}

export default Main;
