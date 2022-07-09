import React, {useEffect, useState} from 'react';
import {getAttendance} from "../apis/AttendanceApi";
import _ from "lodash";
import {MainStyle} from "../styles/Globalstyle";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useNavigate} from "react-router";
import {ReportStyle} from "../styles/ReportStyle";

const Report = () => {
    const navigate = useNavigate();
    const [data, setdata] = useState([[]]);
    const [emp, setemp] = useState([]);
    const [daywork, setdaywork] = useState([]);
    const [deptattendance, setdeptattendance] = useState([]);
    const changeData = [];

    useEffect(() => {
        const chatData = async () => {
            await getAttendance({empno: 220101}).then(res => {
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
      <MainStyle>
        <ReportStyle>
            <Card sx={{ maxWidth: 400 }} onClick={() => navigate("/report/52Gr")}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        주 52시간 근태관리 차트
                    </Typography>
                </CardContent>
            </Card>
            <Card sx={{ maxWidth: 400 }} onClick={() => navigate("/report/weekworkGr", {
                state: daywork,
            })} className="test">
                <CardContent>
                    <Typography variant="h5" component="div">
                        부서 주간 근무 현황
                    </Typography>
                </CardContent>
            </Card>
            <Card sx={{ maxWidth: 400 }} onClick={() => navigate("/report/vacationGr")}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        부서 연차사용 현황
                    </Typography>
                </CardContent>
            </Card>
            <Card sx={{ maxWidth: 400 }} onClick={() => navigate("/report/AttGr", {
                state: [emp, data, deptattendance],
            })}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        부서/타부서 이상근태 현황
                    </Typography>
                </CardContent>
            </Card>
        </ReportStyle>
      </MainStyle>
    )
}
// report/52Gr
// report/dayworkGr
// report/vacationGr
// report/AttGr
export default Report;
