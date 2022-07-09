import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import ECharts from 'echarts-for-react';
import {MainchatStyle} from "../../styles/mainstyle";
import Button from "@mui/material/Button";
import Calendar from "../common/Calendar";
import _ from "lodash";

const Chart = (props) => {
    // TODO : 뒤로가기 버튼 누르면 달력으로 GO
    const [calendarview, setCalendarview] = useState(false);
    const nowork = [0,0,0,0,0,0,0,0,0,0,0,0];
    const works = [0,0,0,0,0,0,0,0,0,0,0,0];
    const rest = [0,0,0,0,0,0,0,0,0,0,0,0];

    const notwork = _.filter(props.data, 'etc');
    const vacation = _.filter(props.data, 'vacation');
    const work = _.filter(props.data, 'normalwork');

    notwork.filter(function(test) {
        nowork.splice(test.month.slice(1,2), 1, Number(test.count));
    })
    vacation.filter(function(test) {
        rest.splice(test.month.slice(1,2), 1, Number(test.count));
    })

    work.filter(function(test) {
        works.splice(test.month.slice(1,2), 1, Number(test.count));
    })

    const [options, setOptions] = useState({
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {},
        xAxis: {
            type: 'category',
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        },
        yAxis: {
            type: 'value',
            max: 31,
            interval: 1,
        },
        series: [
            {
                name: '출근',
                type: 'bar',
                emphasis: {
                    focus: 'series'
                },
                data: []
            },
            {
                name: '이상근태',
                type: 'bar',
                emphasis: {
                    focus: 'series'
                },
                data: []
            },
            {
                name: '연차',
                type: 'bar',
                emphasis: {
                    focus: 'series'
                },
                data: []
            },
        ]
    });

        options.series[1].data = [...nowork];
        options.series[2].data = [...rest];
        options.series[0].data = [...works];

    return (
        <>
            {calendarview == false ?
                <MainchatStyle>
                    <Button className="dept_vacation" variant="contained" onClick={() => { setCalendarview(true) }}>일간 근태기록</Button>
                    <ECharts
                        option={options}
                        opts={{ renderer: 'svg' }}
                    />
                </MainchatStyle>
                : <Calendar/> }
        </>
    );
}

export default Chart;
