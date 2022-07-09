import React, {useEffect, useState} from 'react';
import ECharts, { EChartsReactProps } from 'echarts-for-react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import {ToggleText, ComponentContainer, ChartContainer} from "../../../styles/graphStyle";
import _ from "lodash";
import {DayWorkChartStyle} from "../../../styles/DayWorkChartStyle";
import Button from '@mui/material/Button';
import {useLocation} from "react-router";
import CollapseList from "../List/CollapseList";

const AttendanceProblem = () => {
    const {state} = useLocation();
    console.log(state);
    const [status, setStatus] = useState(true);
    // prettier-ignore
    const month = [
        '1월', '2월', '3월', '4월', '5월', '6월',
        '7월', '8월', '9월', '10월', '11월','12월'
    ];

    const [data, setdata] = useState([[]]);
    const [emp, setemp] = useState([]);
    const [view, setView] = useState('list');
    const [handleView, sethandleView] = useState(false);
    const [deptmem, setdeptmem] = useState([]);
    const [deptdata, setdeptdata] = useState([]);
    let uniqueArr = [];
    let x = [];
    let deptName;

    const handleChange = (event, nextView) => {
        console.log(event);
        console.log(nextView);
        setView(nextView);
    };

    useEffect(() => {
        if (handleView === false) {
            setemp(state[0]);
            console.log(state[1]);
            setdata(state[1]);
        }
    })

    useEffect(() => {
        console.log(handleView);
        if (handleView === true) {
            deptName = _.map(state[2] , 'deptName');
            const setData = new Set(deptName);
            const uniqueArr = [...setData];
            // let dept = uniqueArr;
            let x = new Array(state[2].length);
            for (let i = 0; i < x.length; i++) {
                for (let j = 1; j < 13; j++) {
                    if (state[2][i].m === j) {
                        x[i] = [state[2][i].m-1, state[2][i].deptNo-1, state[2][i].count]
                    }
                }
            }
            console.log(x);
            setdeptdata(x);
            setdeptmem(uniqueArr);
        }
    }, [handleView])

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
                itemStyle:{
                    color: '#626A8E',
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

    const [option, setOption] = useState({
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
            max: 40,
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


    if (handleView === false) {
        options.yAxis.data = [...emp];
        options.series[0].data= [...data];
    } else if(handleView === true) {
        console.log(deptdata);
        option.yAxis.data = [...deptmem];
        option.series[0].data= [...deptdata];
    }

    return (
        <DayWorkChartStyle style={{marginLeft:'8%'}}>
            <h3>부서내 이상근태 현황</h3><hr/>
            <Button className="ap" variant = "outlined"
                    onClick={() => setStatus((prev) => !prev)}>
                {status ? "목록형" : "차트형"}
            </Button>
        {emp.length !== 0 && status?
                <ComponentContainer style={{width:'60%'}}>
                    <div>
                        <ToggleButtonGroup
                            orientation="vertical"
                            value={view}
                            exclusive
                            onChange={handleChange}
                        >
                            <ToggleButton value="list" aria-label="list">
                                <ToggleText>사원별</ToggleText>
                            </ToggleButton>
                            <ToggleButton value="module" aria-label="module">
                                <ToggleText>부서별</ToggleText>
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </div>
                    <ChartContainer>
                        <ECharts
                            option={options}
                            style={{width: "900px", height:"720px"}}
                        />
                    </ChartContainer>
                </ComponentContainer>
            : <CollapseList state="attendanceProblem"/>
        }
        </DayWorkChartStyle>
    );
}

export default AttendanceProblem;
