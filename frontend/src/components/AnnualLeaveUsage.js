import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import {TextContainer, CardContainer, TitleContainer} from "../styles/mainstyle";
import {Grid} from "@mui/material";
import ECharts, { EChartsReactProps } from 'echarts-for-react';

const AnnualLeaveUsage = ({totalAnnualLeave , remainingAnnualLeaveDay, remainingAnnualLeaveTime}) => {

    const [options, setOptions] = useState({
        series: [
            {
                type: 'gauge',
                startAngle: 90,
                endAngle: -270,
                min: 0,
                max:totalAnnualLeave,
                pointer: {
                    show: false
                },
                itemStyle: {
                    color: '#00AAFF'
                },
                progress: {
                    show: true,
                    overlap: false,
                    roundCap: true,
                    clip: false,
                    itemStyle: {
                        borderWidth: 1,
                        borderColor: '#00AAFF'
                    }
                },
                axisLine: {
                    lineStyle: {
                        width: 10
                    }
                },
                splitLine: {
                    show: false,
                    distance: 0,
                    length: 10
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: false,
                    distance: 50
                },
                data: [{
                    value: totalAnnualLeave-remainingAnnualLeaveDay,
                    name:'',
                    title: {
                        offsetCenter: ['0%', '0%']
                    },
                    detail: {
                        valueAnimation: true,
                        offsetCenter: ['0%', '10%']
                    }
                }],
                title: {
                    fontSize: 12
                },
                detail: {
                    width: 40,
                    height: 10,
                    fontSize: 12,
                    color: 'auto',
                    borderColor: 'auto',
                    borderRadius: 20,
                    borderWidth: 1,
                    formatter: '{value}일'
                }
            }
        ]
    });

    return (
        <Card sx={{ maxWidth: 500 }}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TitleContainer>
                        연차 사용 현황
                    </TitleContainer>
                    <CardContainer>
                        <TextContainer>
                            전체 일수 : {totalAnnualLeave} 일
                        </TextContainer>
                        <TextContainer>
                            잔여 일수 : {remainingAnnualLeaveDay} 일
                        </TextContainer>
                        <TextContainer>
                            잔여 시간 : {remainingAnnualLeaveTime} H
                        </TextContainer>
                    </CardContainer>
                </Grid>
                <Grid item xs={6}>
                    <ECharts
                        option={options}
                        style={{width: 'auto', height: '150px'}}
                    />
                </Grid>
            </Grid>
        </Card>
    );
}

export default AnnualLeaveUsage
