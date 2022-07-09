import React, { useEffect, useState } from 'react';
import ECharts, { EChartsReactProps } from 'echarts-for-react';
import {getGraph52hData} from "../apis/Graph52hApi";
import {useSelector} from "react-redux";
import Button from "@mui/material/Button";
import {useNavigate} from 'react-router-dom';
import {DayWorkChatStyle} from "../styles/DayWorkChatStyle";

const Graph52h = () => {
    const navigate = useNavigate();
    let [attendanceWeek, setAttendance] = useState([]);
    let [overtimeWeek, setOvertimeWeek] = useState([]);
    let [name, setName] = useState([]);
    const names=[]
    const attendanceWeeks=[]
    const overtimeWeeks = []
    const empno = useSelector((state) => state.EMP_INFO);

    const [response, setRes] = useState();

    const getJsonData = async () => {
        await getGraph52hData({empno : empno.empInfo[0]}).then((res) => {
            console.log(res.data[0].attendanceWeek)
                for (let i = 9; i < 14; i++) {
                    names.push(res.data[i].name);
                    attendanceWeeks.push(res.data[i].attendanceWeek);
                    overtimeWeeks.push(res.data[i].overtimeWeek);
                }
            console.log(name)
            console.log(attendanceWeeks);
            setName(names);
            setAttendance(attendanceWeeks);
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
    console.log(name.length)
    options.xAxis.data = [...name];
    options.series[1].data = [...overtimeWeek];
    options.series[0].data = [...attendanceWeek];

    const data = [];
    for(let i=0; i<name.length; i++){
        data.push({name: name[i], attendance: attendanceWeek[i], overtime: overtimeWeek[i]});
    }

    return (
        <DayWorkChatStyle>
            <Button className="hour" variant="outlined"
                    onClick={() => navigate('/report/list',
                        {state: {data: data, url: "52hour"}})}
            >목록형</Button>
            {name.length !== 0 ?
                <ECharts
                    option={options}
                    style={{width: '700px', height: '500px'}}
                />
            : <></> }
        </DayWorkChatStyle>
    );
}

export default Graph52h;
