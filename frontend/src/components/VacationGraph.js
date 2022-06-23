import React, { useEffect, useState } from 'react';
import ECharts, { EChartsReactProps } from 'echarts-for-react';

const VacationGraph = ({...list}) => {
    const [options, setOptions] = useState({
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value'
        },
        yAxis: {
            type: 'category',
            data: ['임요환', '홍진호', '이윤열']
        },
        series: [
            {
                name: '잔여연차',
                type: 'bar',
                color: 'skyblue',
                stack: 'total',
                label: {
                    show: true
                },
                emphasis: {
                    focus: 'series'
                },
                data: [15, 12, 10]
            },
            {
                name: '사용연차',
                type: 'bar',
                color: 'green',
                stack: 'total',
                label: {
                    show: true
                },
                emphasis: {
                    focus: 'series'
                },
                data: [1, 3, 5]
            }
        ]
    });

    return (
        <ECharts
            option={options}
        />
    );
}

export default VacationGraph;
