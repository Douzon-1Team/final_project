import React, {useEffect, useState} from 'react';
import DayWorkChat from "./DayWorkChat";
import AttendanceProblem from "./AttendanceProblem";
import {getAttendance} from "../apis/AttendanceApi";
import _ from "lodash";
import {MainStyle} from "../styles/Globalstyle";
import VacationGraph from "./VacationGraph";
import Graph52h from "./Graph52h";

const Report = () => {
    const [data, setdata] = useState([[]]);
    const [emp, setemp] = useState([]);
    const [daywork, setdaywork] = useState([]);
    const [deptattendance, setdeptattendance] = useState([]);
    const changeData = [];

    useEffect(() => {
        const chatData = async () => {
            await getAttendance({empno: 220101}).then(res => {
                // TODO : 이상근태 발생한 애들 제일 밑에 넣어주고 SET으로 중복제거
                res.data.map(res => changeData.push(res.name));
                const setData = new Set(changeData);
                const uniqueArr = [...setData]; // set으로 정리하면서 뒤에 가져온 동일값(name)은 삭제됨 문제X
                setemp(uniqueArr);
                const attendance = _.filter(res.data, 'etc'); // 얘에서 뽑은 이름들 제거하고 앞에서부터 순서대로 박아주기
                const daydata = _.filter(res.data, 'onofftime'); // TODO : 막대그래프 데이터\
                const deptatt = _.filter(res.data, 'deptName');
                setdeptattendance(deptatt);
                setdaywork(daydata);
                let x = new Array(attendance.length);
                for (let i = 0; i < x.length; i++) {
                    for (let j = 1; j < 13; j++) {
                        if (attendance[i].m === j) {
                            x[i] = [attendance[i].m-1, attendance[i].sort-1, attendance[i].count]
                        }
                    }
                }
                setdata([...x]);
            }).catch((err) => {});
        }
        chatData();
    }, [])

    return (
      <>
        <MainStyle>
            <DayWorkChat data={daywork} />
            <Graph52h/>
            <VacationGraph/>
            <AttendanceProblem data={[emp, data, deptattendance]} />
        </MainStyle>
      </>
    )
}

export default Report;
