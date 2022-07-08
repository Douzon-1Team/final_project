import React, { useEffect, useState } from 'react';
import ECharts, { EChartsReactProps } from 'echarts-for-react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import {ToggleText, ComponentContainer, ChartContainer} from "../styles/graphStyle";
import {useNavigate} from "react-router";

const AttendanceDept = (props) => {
    const month = [
        '1월', '2월', '3월', '4월', '5월', '6월',
        '7월', '8월', '9월', '10월', '11월','12월'
    ];
    const [deptmem, setdeptmem] = useState([]);
    const [deptdata, setdeptdata] = useState([]);
    const [view, setView] = useState('list');
    const [handleView, sethandleView] = useState(false);
    const navigate = useNavigate();


    const handleChange = (event, nextView) => {
        console.log(event);
        console.log(nextView);
        setView(nextView);
    };

    useEffect(() => {
        setView('module');
        setdeptmem(props.data[0]);
        setdeptdata(props.data[1]);
        if (handleView === true) {
                // navigate("/report");
                window.location.reload("/report");
        }
    })

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
            data: [],
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
                data: [],
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

        options.yAxis.data = [...deptmem];
        options.series[0].data = [...deptdata];
    return (
        <>
            {deptmem.length === 0 ? <></> :
                <>
                    {handleView === false ?
                    <ComponentContainer>
                        <div>
                            <ToggleButtonGroup
                                orientation="vertical"
                                value={view}
                                exclusive
                                onChange={handleChange}
                            >
                                <ToggleButton onClick={() => sethandleView(true)} value="list" aria-label="list" style={{height: "150px"}}>
                                    <ToggleText>사원별</ToggleText>
                                </ToggleButton>
                                <ToggleButton value="module" aria-label="module" style={{height: "150px"}}>
                                    <ToggleText>부서별</ToggleText>
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </div>
                        <ChartContainer>
                                <ECharts
                                    option={options}
                                    style={{width: "1000px", height:"800px"}}
                                />
                        </ChartContainer>
                    </ComponentContainer>
                        : <></> }
                </>
            }
        </>
    );
}

export default AttendanceDept;
