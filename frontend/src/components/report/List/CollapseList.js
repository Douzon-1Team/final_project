import React, {useEffect, useState} from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import axios from 'axios';

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);


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
                <TableCell>{row.name}</TableCell>
                <TableCell>평균</TableCell>
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
                                    <TableRow>
                                        <TableCell>날짜</TableCell>
                                        <TableCell>근태구분</TableCell>
                                        <TableCell>출근시간</TableCell>
                                        <TableCell>퇴근시간</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.history.map((historyRow) => (
                                        <TableRow>
                                            <TableCell>{historyRow.date}</TableCell>
                                            <TableCell>{historyRow.etc}</TableCell>
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

// Row.propTypes = {
//     row: PropTypes.shape({
//         calories: PropTypes.number.isRequired,
//         carbs: PropTypes.number.isRequired,
//         fat: PropTypes.number.isRequired,
//         history: PropTypes.arrayOf(
//             PropTypes.shape({
//                 amount: PropTypes.number.isRequired,
//                 customerId: PropTypes.string.isRequired,
//                 date: PropTypes.string.isRequired,
//             }),
//         ).isRequired,
//         name: PropTypes.string.isRequired,
//         price: PropTypes.number.isRequired,
//         protein: PropTypes.number.isRequired,
//     }).isRequired,
// };

const CollapseList = () => {
    // const [raw, setRaw] = useState([]);
    const rows = [];
    const [rows2, setrows] = useState([]);
    let tmp = true;

    async function test () {
        const response = await axios.get("http://localhost:8080/report/list");
        console.log(response.data)
        response.data.map((item) => {
            rows.map((i) => {
                if (i.empno === item.empno) {
                    tmp = false;
                    i.history.push({date: item.date, etc: item.etc, start: item.start, end: item.end});
                }
            })
            if(tmp) {
                rows.push({
                    empno: item.empno, name: item.name,
                    history: [{date: item.date, etc: item.etc, start: item.start, end: item.end}]
                });
            }
            tmp = true;
        })
        setrows(rows);
    }

    useEffect(( ) => {
        if (rows2.length === 0) {
            test();
        }
    }, [rows2]);
    console.log(rows2);

    console.log(rows2);

    return (
        <>
        {rows2.length !== 0 ? <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell/>
                        <TableCell>사번</TableCell>
                        <TableCell>이름</TableCell>
                        <TableCell>평균</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows2.map((row) => (
                        <Row key={row.name} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer> : <h1>loading</h1>}
        </>)

}


export default CollapseList;
