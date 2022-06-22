import React from 'react';
import Layout from '../components/Layout';
import Calendar from "../components/common/Calendar";
import ProgressBar52h from "../components/ProgressBar52h";
import AnnualLeaveUsage from "../components/AnnualLeaveUsage";
import {Grid} from "@mui/material";
import {useSelector} from "react-redux";

// redux 사번 받아오기
function Main() {
    const subComponentData = useSelector((state) => state.calendarReducer[0]);
  return(
      <>
        <Layout />
        <Grid container spacing={2} justifyContent="end" maxWidth="90%">
        <Grid item xs={3} >
            <ProgressBar52h attendanceWeek={subComponentData.attendanceWeek} todayWorkTime={subComponentData.todayWorkTime} overtimeWeek={subComponentData.overtimeWeek}/>
            <br/>
            <AnnualLeaveUsage totalAnnualLeave={subComponentData.totalAnnualLeave} remainingAnnualLeaveDay={subComponentData.remainingAnnualLeaveDay} remainingAnnualLeaveTime={subComponentData.remainingAnnualLeaveTime}/>
        </Grid>
        <Grid item xs={6} >
          <Calendar />
        </Grid>
        </Grid>
      </>
      )
}

export default Main;
