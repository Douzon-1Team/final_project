import React, {useEffect, useLayoutEffect, useState} from 'react';
import ECharts, { EChartsReactProps } from 'echarts-for-react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import {ToggleText, ComponentContainer, ChartContainer} from "../../../styles/graphStyle";
import {getAttendance} from "../../../apis/AttendanceApi";
import _ from "lodash";
import DayWorkChat from "./DayWorkChart";
import {useNavigate} from 'react-router-dom'
import {DayWorkChartStyle} from "../../../styles/DayWorkChartStyle";
import Button from '@mui/material/Button';
import AttendanceDept from "./AttendanceDept";
import {useLocation} from "react-router";

const AttendanceProblem = () => {
    const navigate = useNavigate();
    const {state} = useLocation();
    console.log(state);
    // prettier-ignore
    const month = [
        '1월', '2월', '3월', '4월', '5월', '6월',
        '7월', '8월', '9월', '10월', '11월','12월'
    ];

// prettier-ignore[달, 사람위치, 횟수]
//     const data = [[0, 0, 5], [0, 1, 1], [0, 2, 0], [0, 3, 0],
//         [0, 4, 0], [0, 5, 0], [0, 6, 0], [0, 7, 0],
//         [0, 8, 0], [0, 9, 0], [0, 10, 0], [0, 11, 2],[0, 12, 4],
//         [1, 0, 7], [1, 1, 0], [1, 2, 0], [1, 3, 0],
//         [1, 4, 0], [1, 5, 0], [1, 6, 0], [1, 7, 0],
//         [1, 8, 0], [1, 9, 0], [1, 10, 5], [1, 11, 2], [1, 12, 2],
//         [2, 0, 1], [2, 1, 1], [2, 2, 0], [2, 3, 0],
//         [2, 4, 0], [2, 5, 0], [2, 6, 0], [2, 7, 0],
//         [2, 8, 0], [2, 9, 0], [2, 10, 3], [2, 11, 2], [2, 12, 1],
//         [3, 0, 7], [3, 1, 3], [3, 2, 0], [3, 3, 0],
//         [3, 4, 0], [3, 5, 0], [3, 6, 0], [3, 7, 0],
//         [3, 8, 1], [3, 9, 0], [3, 10, 5], [3, 11, 4], [3, 12, 7],
//         [4, 0, 1], [4, 1, 3], [4, 2, 0], [4, 3, 0],
//         [4, 4, 0], [4, 5, 1], [4, 6, 0], [4, 7, 0],
//         [4, 8, 0], [4, 9, 2], [4, 10, 4], [4, 11, 4], [4, 12, 2],
//         [5, 0, 2], [5, 1, 1], [5, 2, 0], [5, 3, 3],
//         [5, 4, 0], [5, 5, 0], [5, 6, 0], [5, 7, 0],
//         [5, 8, 2], [5, 9, 0], [5, 10, 4], [5, 11, 1], [5, 12, 5]]
//         .map(function (item) {
//             return [item[1], item[0], item[2] || '-'];
//         });
    // prettier-ignore
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
        // setOptions({
        //     tooltip: {
        //
        //     },
        //     grid: {
        //         height: '75%',
        //         width: '75%',
        //         top: 'center'
        //     },
        //     xAxis: {
        //         type: 'category',
        //         data: month,
        //         splitArea: {
        //             show: true
        //         }
        //     },
        //     yAxis: {
        //         type: 'category',
        //         data: [...deptmem],
        //         splitArea: {
        //             show: true
        //         }
        //     },
        //     visualMap: {
        //         min: 0,
        //         max: 10,
        //         calculable: true,
        //         orient: 'vertical',
        //         right: '5%',
        //         bottom: 'center'
        //     },
        //     series: [
        //         {
        //             name: '이상근태 빈도',
        //             type: 'heatmap',
        //             data: [...deptdata],
        //             label: {
        //                 show: true
        //             },
        //             emphasis: {
        //                 itemStyle: {
        //                     shadowBlur: 20,
        //                     shadowColor: 'rgba(0, 0, 0, 0.5)'
        //                 }
        //             }
        //         }
        //     ]
        // })
        console.log(deptdata);
        option.yAxis.data = [...deptmem];
        option.series[0].data= [...deptdata];
    }

    return (
        <DayWorkChartStyle>
            <Button className="ap" variant = "outlined"
                    onClick={() => navigate('/report/att', {state: "attendanceProblem"})}>목록형</Button>
        {emp.length === 0 ? <></> :
            <>
                <ComponentContainer>
                    <div>
                        <ToggleButtonGroup
                            orientation="vertical"
                            value={view}
                            exclusive
                            onChange={handleChange}
                        >
                            <ToggleButton value="list" aria-label="list" style={{height: "150px"}}>
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
            </>
        }
        </DayWorkChartStyle>
    );
}

export default AttendanceProblem;