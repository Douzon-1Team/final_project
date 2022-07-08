import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import {
    BorderLinearProgress,
    PbContainer,
    TextContainer,
    CardContainer,
    progressValue,
    TitleContainer2
} from "../styles/mainstyle";
import {Grid} from "@mui/material";

const ProgressBar52h = ({ attendanceWeek, overtimeWeek, todayWorkTime}) => {
    const [options, setOptions] = useState({

    });

    const [time ,setTime] = useState(0)
    setInterval(() => {
        setTime(time+1);
    }, 3600000);

    return (
        <Card sx={{ maxWidth: 500 }}>
            <CardContainer>
                <TitleContainer2>
                    금주 근무시간
                </TitleContainer2>
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
                    초과 근무시간 : {overtimeWeek} H
                </TextContainer>
                <TextContainer>
                    금일 근무시간 : {todayWorkTime+time} H
                </TextContainer>
            </CardContainer>
        </Card>
    );
}

export default ProgressBar52h;
