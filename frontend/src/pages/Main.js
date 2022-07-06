import React, {useEffect} from "react";
import Calendar from "../components/common/Calendar";
import ProgressBar52h from "../components/ProgressBar52h";
import AnnualLeaveUsage from "../components/AnnualLeaveUsage";
import { useSelector } from "react-redux";
import { MainStyle } from "../styles/Globalstyle";
import { Mainchats } from "../styles/Chatstyle";

// redux 사번 받아오기
function Main() {
  const subComponentData = useSelector((state) => state.calendarReducer[0]);
    console.log(subComponentData);

  return (
      <MainStyle>
          <Mainchats>
          <ProgressBar52h
            attendanceWeek={subComponentData.attendanceWeek}
            todayWorkTime={subComponentData.todayWorkTime}
            overtimeWeek={subComponentData.overtimeWeek}
          />
          <br />
          <AnnualLeaveUsage
            totalAnnualLeave={subComponentData.totalAnnualLeave}
            remainingAnnualLeaveDay={subComponentData.remainingAnnualLeaveDay}
            remainingAnnualLeaveTime={subComponentData.remainingAnnualLeaveTime}
          />
          </Mainchats>
        <Calendar />
      </MainStyle>
  );
}

export default Main;
