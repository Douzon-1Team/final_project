import React, { useEffect, useState } from 'react';
import ECharts, { EChartsReactProps } from 'echarts-for-react';
import {DayWorkChartStyle} from '../../../styles/DayWorkChartStyle'
import {useLocation} from "react-router";

const DayWorkChart = () => {
    const {state} = useLocation();
    const [data, setdata] = useState([]);

    const onwork = [];// 출근시간
    let offwork = [];  // 퇴근시간
    const offworks = [];
    let workmember = [];
    let hour = new Date().getHours();

    for (let i = 0; i < state.length; i++) {
        let count = 0;
        for (let j = 0; j < state.length; j++) {
            if (state[i].empno === state[j].empno) count += 1;
        }
        if (count > 1) {
            if (offworks.length === 0) {
                state[i].totaltime = 8;
                offworks.push(state[i]);
            }
            if (offworks[offworks.length - 1].name === state[i].name) continue;
            if (state[i].totaltime === null) {
                state[i].totaltime = 8;
                offworks.push(state[i]);
            } else {
                state[i].totaltime = 8;
                offworks.push(state[i]);
            }
        } else if (count === 1) {
            if (hour - state[i].onofftimenum < 0) {
                state[i].totaltime = 0;
                onwork.push(state[i]);
            } else {
                state[i].totaltime = hour - state[i].onofftimenum;
                onwork.push(state[i]);
            }
        }
    }
    offworks.push(onwork[0]);
    offwork =
        offworks.filter(
            (e, i) => e != null
        );
    let overtimes; // 초과근무 배열
    (overtimes = []).length = offwork.length;
    overtimes.fill(0);
    if (offwork.length !== 1) {
        for (let i = 0; i < overtimes.length; i++) {
            if (offwork[i].totaltime > 8) {
                if (offwork[i].totaltime-8 < 0) {
                    overtimes[i] = 0;
                }
                overtimes[i] = offwork[i].totaltime-8;
            }
        }
        for (let j = 0; j < offwork.length; j++) {
            if (j == 0 ) workmember.push(['product', '총 근무시간', '초과근무시간']);
            workmember.push([offwork[j].name, offwork[j].totaltime, overtimes[j]]);
        }
    }

    useEffect(() => {
        setdata([...workmember]);
    }, [])

    const [options, setOptions] = useState({
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {},
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
        },
        yAxis: {
            type: 'value'
        },
        dataset: {
            // source에 데이터는 append해주는 식으로 추가하면 될듯
            source: [

            ]
        },
        series: [
            {
                type: 'bar',
                stack: 'Ad',
                emphasis: {
                    focus: 'series'
                },
                itemStyle: {color: '#64CD3C'},
            },
            {
                type: 'bar',
                stack: 'Ad',
                emphasis: {
                    focus: 'series'
                },
                itemStyle: {color: '#00AAFF'},
            },
        ]
    });

    options.dataset.source = [...workmember];

    return (
        <DayWorkChartStyle style={{marginLeft:'7%'}}>
            <h3>부서원 당일 근무 현황</h3>
        {options.dataset.source.length !== 0 ?
            <ECharts
                option={options}
                style={{width: "1200px", height:"700px"}}
            /> : <></>
        }
        </DayWorkChartStyle>
    );
}

export default DayWorkChart;
