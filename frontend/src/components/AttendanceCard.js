import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { Grid } from '@mui/material';
import {AttendanceCardTitle, AttendanceCardText, CardContent, TopLine} from "../styles/mainstyle";

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
        <Card sx={{ maxWidth: 500 }}>
            <Grid container spacing="auto">
                <Grid item xs={6}>
                    <Card variant="outlined">{cardAttendance({title:"출근" , value:attendanceCount , color:"#0057b7"})}</Card>
                </Grid>
                <Grid item xs={6}>
                    <Card variant="outlined">{cardAttendance({title:"지각" , value:tardyCount , color: "#ffe65a"})}</Card>
                </Grid>
            </Grid>
            <Grid container spacing="auto">
                <Grid item xs={6}>
                    <Card variant="outlined">{cardAttendance({title:"휴가" , value:absenteeismCount, color: "#4baf4b"})}</Card>
                </Grid>
                <Grid item xs={6}>
                    <Card variant="outlined">{cardAttendance({title:"결근" , value:vacationCount, color: "#c9474f"})}</Card>
                </Grid>
            </Grid>
        </Card>
    );
}

export default AttendanceCard;