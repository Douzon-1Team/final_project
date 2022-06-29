import React, { useEffect, useState } from 'react';
import ECharts, { EChartsReactProps } from 'echarts-for-react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import {ToggleText, ComponentContainer, ChartContainer} from "../styles/graphStyle";

// prettier-ignore
const month = [
    '1', '2', '3', '4', '5', '6',
    '7', '8', '9', '10', '11','12'
];
// prettier-ignore
const emp = [
    '임요환', '홍진호', '강민',
    '김택용', '최연성'
];
// prettier-ignore
const data = [[0, 0, 5], [0, 1, 1], [0, 2, 0], [0, 3, 0],
    [0, 4, 0], [0, 5, 0], [0, 6, 0], [0, 7, 0],
    [0, 8, 0], [0, 9, 0], [0, 10, 0], [0, 11, 2],[0, 12, 4],
    [1, 0, 7], [1, 1, 0], [1, 2, 0], [1, 3, 0],
    [1, 4, 0], [1, 5, 0], [1, 6, 0], [1, 7, 0],
    [1, 8, 0], [1, 9, 0], [1, 10, 5], [1, 11, 2], [1, 12, 2],
    [2, 0, 1], [2, 1, 1], [2, 2, 0], [2, 3, 0],
    [2, 4, 0], [2, 5, 0], [2, 6, 0], [2, 7, 0],
    [2, 8, 0], [2, 9, 0], [2, 10, 3], [2, 11, 2], [2, 12, 1],
    [3, 0, 7], [3, 1, 3], [3, 2, 0], [3, 3, 0],
    [3, 4, 0], [3, 5, 0], [3, 6, 0], [3, 7, 0],
    [3, 8, 1], [3, 9, 0], [3, 10, 5], [3, 11, 4], [3, 12, 7],
    [4, 0, 1], [4, 1, 3], [4, 2, 0], [4, 3, 0],
    [4, 4, 0], [4, 5, 1], [4, 6, 0], [4, 7, 0],
    [4, 8, 0], [4, 9, 2], [4, 10, 4], [4, 11, 4], [4, 12, 2],
    [5, 0, 2], [5, 1, 1], [5, 2, 0], [5, 3, 3],
    [5, 4, 0], [5, 5, 0], [5, 6, 0], [5, 7, 0],
    [5, 8, 2], [5, 9, 0], [5, 10, 4], [5, 11, 1], [5, 12, 5]]
    .map(function (item) {
        return [item[1], item[0], item[2] || '-'];
    });

const AttendanceProblem = ({...list}) => {
    const [view, setView] = React.useState('list');

    const handleChange = (event, nextView) => {
        setView(nextView);
    };

    const [options, setOptions] = useState({
        tooltip: {

        },
        grid: {
            height: '75%',
            width: '75%',
            top: 'center'
        },
        xAxis: {
            type: 'category',
            data: month,
            splitArea: {
                show: true
            }
        },
        yAxis: {
            type: 'category',
            data: emp,
            splitArea: {
                show: true
            }
        },
        visualMap: {
            min: 0,
            max: 10,
            calculable: true,
            orient: 'vertical',
            right: '5%',
            bottom: 'center'
        },
        series: [
            {
                name: '이상근태 빈도',
                type: 'heatmap',
                data: data,
                label: {
                    show: true
                },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 20,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    });

    return (
        <>
            <ComponentContainer>
                <div>
                    <ToggleButtonGroup
                        orientation="vertical"
                        value={view}
                        exclusive
                        onChange={handleChange}
                    >
                        <ToggleButton value="list" aria-label="list" style={{height:"150px"}}>
                            <ToggleText>사원별</ToggleText>
                        </ToggleButton>
                        <ToggleButton value="module" aria-label="module" style={{height:"150px"}}>
                            <ToggleText>부서별</ToggleText>
                        </ToggleButton>
                    </ToggleButtonGroup>
                </div>
                <ChartContainer>
                    <ECharts
                        option={options}
                        style={{width: "1000px"}}
                    />
                </ChartContainer>
            </ComponentContainer>
        </>
    );
}

export default AttendanceProblem;