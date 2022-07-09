import React, {useEffect, useState} from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import axios from 'axios';
import ListStyle from '../styles/ListStyle';
import { useLocation } from 'react-router';

function Row({row, month}) {
    const [open, setOpen] = React.useState(false);
    console.log(row)

    return (
        <>
            <TableRow>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell>{row.empno}</TableCell>
                <TableCell>{row.empName}</TableCell>
                {month === null ?
                    <>
                        <TableCell>{15 - row.remainDay}</TableCell>
                        <TableCell>{row.remainDay}</TableCell>
                        <TableCell>{120 - row.remainHour}</TableCell>
                        <TableCell>{row.remainHour}</TableCell>
                    </> : <TableCell>{(row.count / month).toFixed(2)}</TableCell>
                }
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                상세 이력
                            </Typography>
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
                                        <TableRow>
                                            {month === null ? null : <TableCell>{historyRow.date}</TableCell>}
                                            <TableCell>
                                                <button className={`${historyRow.etc}`}>{historyRow.etc}</button>
                                            </TableCell>
                                            <TableCell>{historyRow.start}</TableCell>
                                            <TableCell>{historyRow.end}</TableCell>
                                        </TableRow>
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

const CollapseList = () => {
    const rows = [];
    const [rows2, setrows] = useState([]);
    const state = useLocation().state;
    let tmp = true;

    let month;
    state !== "attendanceProblem" ? month = null : month = new Date().getMonth();

    async function attendanceProblem(){
        const response = await axios.get("http://localhost:8080/report/list");
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
        const response = await axios.get("http://localhost:8080/report/dvacation");
        setrows(state.deptStatus);
        state.deptStatus.map((item) => {
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
                    <TableRow>
                        <TableCell style={{"width":"10%"}}/>
                        <TableCell>사번</TableCell>
                        <TableCell>이름</TableCell>
                        {state !== "attendanceProblem" ? <>
                            <TableCell>사용 연차</TableCell>
                            <TableCell>남은 연차</TableCell>
                            <TableCell>사용 시간</TableCell>
                            <TableCell>남은 시간</TableCell>
                            </> : <TableCell>평균</TableCell>
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows2.map((row) => (
                        <Row key={row.empName} row={row} month={month}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer> : <h1>loading</h1>}
        </ListStyle>)

}


export default CollapseList;
