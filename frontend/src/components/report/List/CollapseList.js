import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import axios from 'axios';
import {ListStyle, ListHeader} from '../../../styles/ListStyle';
import {Row, EtcButton} from '../../admin/EmpTableStyle';

function InnerRow({row, month}) {
    const [open, setOpen] = React.useState(false);

    return (
        <>
            <Row>
                <TableCell className="line">
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell className="line">{row.empno}</TableCell>
                <TableCell className="line">{row.empName}</TableCell>
                {month === null ?
                    <>
                        <TableCell className="line">{15 - row.remainDay}</TableCell>
                        <TableCell className="line">{row.remainDay}</TableCell>
                        <TableCell className="line">{120 - row.remainHour}</TableCell>
                        <TableCell className="line">{row.remainHour}</TableCell>
                    </> : <TableCell className="line">{(row.count / month).toFixed(2)}</TableCell>
                }
            </Row>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0, border: 0}} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit style={{paddingLeft: '15%', width:'70%'}}>
                        <Box sx={{ margin: 1 }}>
                            <h3 style={{"marginLeft":"10px", "textAlign":"initial"}}>
                                상세 이력
                            </h3>
                            <Table size="small" aria-label="detail-history">
                                <TableHead>
                                    {month ?
                                        <TableRow>
                                            <TableCell>날짜</TableCell>
                                            <TableCell>근태구분</TableCell>
                                            <TableCell>출근시간</TableCell>
                                            <TableCell>퇴근시간</TableCell>
                                        </TableRow> :
                                        <TableRow>
                                            <TableCell>연차구분</TableCell>
                                            <TableCell>시작 날짜</TableCell>
                                            <TableCell>종료 날짜</TableCell>
                                        </TableRow>
                                    }

                                </TableHead>
                                <TableBody>
                                    {row.history.map((historyRow) => (
                                        <Row>
                                            {month === null ? null : <TableCell>{historyRow.date}</TableCell>}
                                            <TableCell>
                                                <EtcButton className={`${historyRow.etc}`}>{historyRow.etc}</EtcButton>
                                            </TableCell>
                                            <TableCell>{historyRow.start}</TableCell>
                                            <TableCell>{historyRow.end}</TableCell>
                                        </Row>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}

const CollapseList = (props) => {
    const empno = useSelector( (state) => state.EMP_INFO.empInfo[0]);
    const accessToken = useSelector( (state) => state.ACCESS_TOKEN.accessToken);
    const rows = [];
    const [rows2, setrows] = useState([]);
    const state = props.state;
    let tmp = true;

    let month;
    state !== "attendanceProblem" ? month = null : month = new Date().getMonth();

    async function attendanceProblem(){
        const response = await axios.get("http://localhost:8080/report/list",
            {
                params: {empno},
                headers: {Authorization: accessToken}
            });
        response.data.map((item) => {
            rows.map((i) => {
                if (i.empno === item.empno) {
                    tmp = false;
                    i.count = i.count+1;
                    i.history.push({date: item.date, etc: item.etc, start: item.start, end: item.end});
                }
            })
            if(tmp) {
                rows.push({
                    empno: item.empno, empName: item.empName, count:1,
                    history: [{date: item.date, etc: item.etc, start: item.start, end: item.end}]
                });
            }
            tmp = true;
        })
        setrows(rows);
    }

    async function dVacationHistory () {
        const response = await axios.get("http://localhost:8080/report/dvacation",
            {
                params: {empno},
                headers: {Authorization: accessToken}
            });
        setrows(state);
        state.map((item) => {
            item.history = [];
            response.data.map((i) => {
                if(i.empno === item.empno){
                    item.history.push({etc: i.etc, start: i.start, end: i.end})
                }
            })
        })
    }

    useEffect(( ) => {
        if (rows2.length === 0) {
            if(state === "attendanceProblem") attendanceProblem();
            else dVacationHistory();
        }
    }, [rows2]);

    return (
        <ListStyle>
        {rows2.length !== 0 ? <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <ListHeader>
                        <TableCell style={{width:"5%"}}/>
                        {state !== "attendanceProblem" ? <>
                            <TableCell>사번</TableCell>
                            <TableCell>이름</TableCell>
                            <TableCell>사용 연차</TableCell>
                            <TableCell>남은 연차</TableCell>
                            <TableCell>사용 시간</TableCell>
                            <TableCell>남은 시간</TableCell>
                            </> : <>
                            <TableCell style={{width:'30%'}}>사번</TableCell>
                            <TableCell style={{width:'30%'}}>이름</TableCell>
                            <TableCell style={{width:'30%'}}>평균 (횟수/달)</TableCell>
                        </>
                        }
                    </ListHeader>
                </TableHead>
                <TableBody>
                    {rows2.map((row) => (
                        <InnerRow key={row.empName} row={row} month={month}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer> : <h1>loading</h1>}
        </ListStyle>)
}

export default CollapseList;
