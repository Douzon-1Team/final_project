import React, { useEffect, useRef, useState } from 'react';
import ECharts from 'echarts-for-react';

const Chart = () => {
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
        // y축 머 넣지?..
        yAxis: {
            type: 'value',
            max: 100,
            interval: 20,
        },
        series: [
            {
                color: "#00aaff",
                name: '출근',
                emphasis: {
                    focus: 'series'
                },
                data: [150, 230, 224, 218, 135, 147, 260, 210, 120, 123, 435, 123],
                type: 'bar'
            },
            {
                name: 'Video Ads',
                type: 'bar',
                emphasis: {
                    focus: 'series'
                },
                data: [150, 232, 201, 154, 190, 330, 410]
            },
            {
                name: 'Union Ads',
                type: 'bar',
                emphasis: {
                    focus: 'series'
                },
                data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
                name: 'asd',
                type: 'bar',
                emphasis: {
                    focus: 'series'
                },
                data: [220, 182, 191, 234, 290, 330, 310]
            },
        ]
    });

    return (
        <ECharts
            option={options}
            opts={{ renderer: 'svg', width: 'auto', height: '700px' }}
        />
    );
}

export default Chart;
