import React, {useEffect, useState} from 'react';
import {getAttendance} from "../apis/AttendanceApi";
import _ from "lodash";
import {MainStyle} from "../styles/Globalstyle";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {useNavigate} from "react-router";
import {ReportStyle} from "../styles/ReportStyle";
import {IoMdStats} from 'react-icons/io';
import {BiCalendarX} from 'react-icons/bi';
import {BsBarChartSteps} from 'react-icons/bs';
import StackedBarChartIcon from '@mui/icons-material/StackedBarChart';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import {useSelector} from "react-redux";

const Report = () => {
    const accessToken = useSelector( (state) => state.ACCESS_TOKEN.accessToken);
    const empInfo = useSelector((state) => state.EMP_INFO.empInfo);
    const navigate = useNavigate();
    const [data, setdata] = useState([[]]);
    const [emp, setemp] = useState([]);
    const [daywork, setdaywork] = useState([]);
    const [deptattendance, setdeptattendance] = useState([]);
    const changeData = [];

    useEffect(() => {
        const chatData = async () => {
            await getAttendance({empno: empInfo[0], accessToken}).then(res => {
                res.data.map(res => changeData.push(res.name));
                const setData = new Set(changeData);
                const uniqueArr = [...setData]; // set으로 정리하면서 뒤에 가져온 동일값(name)은 삭제됨 문제X
                const newArr =
                    uniqueArr.filter(
                        (e, i) => e != null
                    );
                setemp(newArr);
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
      <MainStyle>
        <ReportStyle>
            <Card sx={{ maxWidth: 400 }} onClick={() => navigate("/report/52Gr")}>
                <IoMdStats size={200} className="icon" />
                <CardContent>
                    <Typography variant="h5" component="div" className="font">
                        주간 근무시간 현황
                    </Typography>
                </CardContent>
            </Card>
            <Card sx={{ maxWidth: 400 }} onClick={() => navigate("/report/weekworkGr", {
                state: daywork,
            })}>
                <StackedBarChartIcon sx={{ fontSize: 200, marginLeft: 8 }} />
                <CardContent>
                    <Typography variant="h5" component="div" className="font">
                        부서원 당일 근무 현황
                    </Typography>
                </CardContent>
            </Card>
            <Card sx={{ maxWidth: 400 }} onClick={() => navigate("/report/vacationGr")}>
                <BsBarChartSteps size={200} className="icon" />
                <CardContent>
                    <Typography variant="h5" component="div" className="font">
                        부서원 연차 사용 현황
                    </Typography>
                </CardContent>
            </Card>
            <Card sx={{ maxWidth: 400 }} onClick={() => navigate("/report/AttGr", {
                state: [emp, data, deptattendance],
            })}>
                <EventBusyIcon sx={{ fontSize: 200, marginLeft: 8 }} />
                <CardContent>
                    <Typography variant="h5" component="div" className="font">
                        부서별 이상근태 현황
                    </Typography>
                </CardContent>
            </Card>
        </ReportStyle>
      </MainStyle>
    )
}

export default Report;
