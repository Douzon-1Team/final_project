import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { Grid } from '@mui/material';
import {AttendanceCardTitle, AttendanceCardText, CardContent, TopLine, MainCards} from "../../styles/mainstyle";

const cardAttendance = ({title,value,color}) => {
    return(
        <React.Fragment>
            <CardContent>
                <TopLine color={color}></TopLine>
                <AttendanceCardTitle>
                    {title}
                </AttendanceCardTitle>
                <AttendanceCardText>
                    {value}
                </AttendanceCardText>
            </CardContent>
        </React.Fragment>
    )
}


const AttendanceCard = ({attendanceCount, tardyCount, absenteeismCount, vacationCount }) => {
    return (
        <MainCards>
        <Card sx={{ maxWidth: 500 }}>
            <p className="title">월간 근태 현황</p>
            <Grid container spacing="auto">
                <Grid item xs={6}>
                    <Card className="card1" variant="outlined">{cardAttendance({title:"출근" , value:attendanceCount , color:"#03bd9e"})}</Card>
                </Grid>
                <Grid item xs={6}>
                    <Card className="card2" variant="outlined">{cardAttendance({title:"지각" , value:tardyCount , color: "#FFA500"})}</Card>
                </Grid>
            </Grid>
            <Grid container spacing="auto">
                <Grid item xs={6}>
                    <Card className="card3" variant="outlined">{cardAttendance({title:"휴가" , value:absenteeismCount, color: "#00AAFF"})}</Card>
                </Grid>
                <Grid item xs={6}>
                    <Card className="card4" variant="outlined">{cardAttendance({title:"결근" , value:vacationCount, color: "#FF0000"})}</Card>
                </Grid>
            </Grid>
        </Card>
        </MainCards>
    );
}

export default AttendanceCard;
