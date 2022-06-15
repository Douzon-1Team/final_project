import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import {TextContainer, CardContainer, TitleContainer} from "../styles/main2";
import {Grid} from "@mui/material";
import ECharts, { EChartsReactProps } from 'echarts-for-react';

const AnnualLeaveUsage = ({total , used, annualLeaveInfo}) => {
    const [options, setOptions] = useState({
        series: [
            {
                type: 'gauge',
                startAngle: 90,
                endAngle: -270,
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
                data: annualLeaveInfo,
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
                    formatter: '{value}%'
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
                            전체 일수 : {total} 일
                        </TextContainer>
                        <TextContainer>
                            사용 일수 : {used} 일
                        </TextContainer>
                        <TextContainer>
                            잔여 일수 : {total-used} 일
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
