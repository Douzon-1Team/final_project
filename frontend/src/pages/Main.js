import React, {useEffect, useState} from "react";
import Calendar from "../components/common/Calendar";
import ProgressBar52h from "../components/MainChart/ProgressBar52h";
import AnnualLeaveUsage from "../components/MainChart/AnnualLeaveUsage";
import { useSelector } from "react-redux";
import { MainStyle } from "../styles/Globalstyle";
import AttendanceCard from "../components/MainChart/AttendanceCard";
import {Mainchats} from "../styles/Chartstyle";

// redux 사번 받아오기
function Main() {
    const subComponentData = useSelector((state) => state.calendarReducer[0]);
  return (
      <MainStyle>
          {subComponentData !== undefined ?
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
          <AttendanceCard
              attendanceCount = {subComponentData.attendanceCount}
              tardyCount = {subComponentData.tardyCount}
              absenteeismCount = {subComponentData.absenteeismCount}
              vacationCount = {subComponentData.vacationCount}
          />
          </Mainchats>
          : <></> }
        <Calendar />
      </MainStyle>
  );
}

export default Main;
