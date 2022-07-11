import React, { useEffect, useState } from 'react';
import ECharts from 'echarts-for-react';
import {getGraph52hData} from "../../../apis/Graph52hApi";
import {useSelector} from "react-redux";
import {DayWorkChartStyle} from "../../../styles/DayWorkChartStyle";

const Graph52h = () => {
    let [attendanceWeek, setAttendance] = useState([]);
    let [overtimeWeek, setOvertimeWeek] = useState([]);
    let [name, setName] = useState([]);
    const names=[]
    const attendanceWeeks=[]
    const overtimeWeeks = []
    const empno = useSelector((state) => state.EMP_INFO);
    const accessToken = useSelector( (state) => state.ACCESS_TOKEN.accessToken);

    const [response, setRes] = useState();

    const getJsonData = async () => {
        await getGraph52hData({empno : empno.empInfo[0], accessToken}).then((res) => {
                for (let i = 9; i < 14; i++) {
                    names.push(res.data[i].name);
                    attendanceWeeks.push(res.data[i].attendanceWeek);
                    overtimeWeeks.push(res.data[i].overtimeWeek);
                }
            const attdanceWeeks =
                attendanceWeeks.filter(
                    (e, i) => e != null
                );
            setName(names);
            setAttendance(attdanceWeeks);
            setOvertimeWeek(overtimeWeeks);
            setRes(res.data);
            }
        );
    }
    useEffect(() => {
        getJsonData()
    }, []);

    const [options, setOptions] = useState({
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        yAxis: {
            type: 'value'
        },
        xAxis: {
            type: 'category',
            data: []
        },
        series: [
            {
                name: '주간근무시간',
                type: 'bar',
                stack: 'total',
                label: {
                    show: true
                },
                emphasis: {
                    focus: 'series'
                },
                data: []
            },
            {
                name: '초과근무시간',
                type: 'bar',
                color: '#c9474f',
                stack: 'total',
                label: {
                    show: true
                },
                emphasis: {
                    focus: 'series'
                },
                data: []
            }
        ]
    });
    options.xAxis.data = [...name];
    options.series[1].data = [...overtimeWeek];
    options.series[0].data = [...attendanceWeek];

    return (
        <DayWorkChartStyle style={{marginLeft: '17%'}}>
            <h3>주간 근무시간 현황</h3>
            {name.length !== 0 ?
                <ECharts
                    option={options}
                    style={{width: '700px', height: '500px'}}
                />
            : <></> }
        </DayWorkChartStyle>
    );
}

export default Graph52h;
