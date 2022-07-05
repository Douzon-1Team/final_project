import React, {useEffect, useState} from 'react';
import DayWorkChat from "./DayWorkChat";
import AttendanceProblem from "./AttendanceProblem";
import {getAttendance} from "../apis/AttendanceApi";
import _ from "lodash";

const Report = () => {
    const [data, setdata] = useState([[]]);
    const [emp, setemp] = useState([]);
    const [daywork, setdaywork] = useState([]);
    const changeData = [];

    useEffect(() => {
        const chatData = async () => {
            await getAttendance({empno: 220101}).then(res => {
                console.log(res.data);
                // TODO : 이상근태 발생한 애들 제일 밑에 넣어주고 SET으로 중복제거
                res.data.map(res => changeData.push(res.name));
                const setData = new Set(changeData);
                const uniqueArr = [...setData]; // set으로 정리하면서 뒤에 가져온 동일값(name)은 삭제됨 문제X
                setemp(uniqueArr);
                const attendance = _.filter(res.data, 'etc'); // 얘에서 뽑은 이름들 제거하고 앞에서부터 순서대로 박아주기
                const daydata = _.filter(res.data, 'onofftime'); // TODO : 막대그래프 데이터
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
            }, [])
        }
        chatData();
    }, [])


    return (
        <>
            <DayWorkChat data={daywork} />
            <AttendanceProblem data={[emp, data]} />
        </>
    )
}

export default Report;
