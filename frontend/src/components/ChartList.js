import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import {useLocation} from 'react-router';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    }
});

const ChartList = () => {
    const location = useLocation();
    const data = location.state;
    const headers = data.splice(0,1)[0];
    const classes = useStyles();
    console.log("넘겨받은 데이터", data);


    return (
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
                            {data.map((row) => {
                                return <TableRow>
                                    {row.map((item) => (
                                        <TableCell>{item}</TableCell>
                                    ))}
                                </TableRow>
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
    )
}

export default ChartList