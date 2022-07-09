import React, {useState, useEffect, useLayoutEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import {useLocation} from 'react-router';
import ListStyle from "../styles/ListStyle";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    }
});

const SimpleList = () => {
    const location = useLocation();
    const url = location.state.url;
    const data = location.state.data;
    const [headers, setHeader] = useState([]);
    const classes = useStyles();


    useEffect(() => {
        console.log("넘겨받은 데이터", data);
        url === "dayWork" ? setHeader(data.splice(0,1)[0]) : setHeader(["이름", "주간 근무 시간", "초과 근무 시간"])
        console.log("headers", headers);
    }, []);
    console.log(data);

    return (<ListStyle>
        {data.length !== 0 ?
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {headers.map((header) => (
                                <TableCell>{header}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {url === "dayWork" ?<>
                            {data.map((row) => (
                                <TableRow>
                                    {row.map((item) => (
                                        <TableCell>{item}</TableCell>
                                    ))
                                    }
                                </TableRow>
                            ))}</> :<>
                            {data.map((row) => (
                                <TableRow>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.attendance}</TableCell>
                                    <TableCell>{row.overtime}</TableCell>
                                </TableRow>
                            ))}</>
                        }
                    </TableBody>
                </Table>
            </TableContainer> : <h1>loading</h1>
        }  </ListStyle>
    )
}

export default SimpleList
