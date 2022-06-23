import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import {BorderLinearProgress, PbContainer, TextContainer, CardContainer, progressValue} from "../styles/main2";
import {Grid} from "@mui/material";

export default function ProgressBar52h({ attendanceWeek, overtimeWeek, todayWorkTime}) {
    return (
        <Card sx={{ maxWidth: 500 }}>
            <CardContainer>
                <PbContainer>
                    <Grid container spacing={1}>
                    <Grid item xs={10}>
                    <BorderLinearProgress variant="determinate" value={100*(attendanceWeek/52)} />
                    </Grid>
                    <Grid item xs={2}>
                    <progressValue> {(100*(attendanceWeek/52)).toFixed(2)}% </progressValue>
                    </Grid>
                    </Grid>
                </PbContainer>
                <TextContainer>
                    누적 근무시간 : {attendanceWeek} H
                </TextContainer>
                <TextContainer>
                    초가 근무시간 : {overtimeWeek} H
                </TextContainer>
                <TextContainer>
                    금일 근무시간 : {todayWorkTime} H
                </TextContainer>
            </CardContainer>
        </Card>
    );
}
