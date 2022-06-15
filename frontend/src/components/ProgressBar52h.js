import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import {BorderLinearProgress, PbContainer, TextContainer, CardContainer, progressValue} from "../styles/main2";
import {Grid} from "@mui/material";

export default function ProgressBar52h({ CumulativeTime, AnnualLeave, Overtime}) {
    return (
        <Card sx={{ maxWidth: 500 }}>
            <CardContainer>
                <PbContainer>
                    <Grid container spacing={1}>
                    <Grid item xs={10}>
                    <BorderLinearProgress variant="determinate" value={100*(CumulativeTime/52)} />
                    </Grid>
                    <Grid item xs={2}>
                    <progressValue> {(100*(CumulativeTime/52)).toFixed(2)}% </progressValue>
                    </Grid>
                    </Grid>
                </PbContainer>
                <TextContainer>
                    누적 근무시간 : {CumulativeTime} H
                </TextContainer>
                <TextContainer>
                    연차 사용시간 : {AnnualLeave} H
                </TextContainer>
                <TextContainer>
                    초과 근무시간 : {Overtime} H
                </TextContainer>
            </CardContainer>
        </Card>
    );
}
