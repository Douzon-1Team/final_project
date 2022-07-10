import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Avatar
} from '@material-ui/core';
import {getDeptMember} from "../../apis/DeptMemberApi";
import {DeptMemberList, MemberImg} from "../../styles/DeptMemberstyle";
import {useNavigate} from "react-router";
import {MainStyle} from "../../styles/Globalstyle";
import {useSelector} from "react-redux";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    }
});

function DeptMember() {
    const empNo = useSelector( (state) => state.EMP_INFO.empInfo[0]);
    const navigate = useNavigate();
    const classes = useStyles();
    const [deptmember, setdeptmember] = useState([]);
    const MemberList = async () => {
        await getDeptMember({empno: empNo}).then(res => {

            const MList = res.data;
            console.log(MList);
            for (let i = 0; i < MList.length; i++) {
                if (MList[i].etc === '출근' & MList[i].attendance === false) {
                    MList[i].etc = '출근미등록'
                }
            }
            console.log(res.data);
            setdeptmember(MList);
            console.log(deptmember);

        }).catch(console.log('실패야 인마 잘좀해~'));
    }

        useEffect(() => {
            MemberList();
        }, []);
    function handleEmpMember(event) {
        console.log(event);
        navigate("/main", {
            state: [event.empno, event.name],
        });
    }
        return (
            <MainStyle>
            <DeptMemberList>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell>이름</TableCell>
                                <TableCell>사원번호</TableCell>
                                <TableCell>부서</TableCell>
                                <TableCell>직급</TableCell>
                                <TableCell>사내번호</TableCell>
                                <TableCell>이메일</TableCell>
                                <TableCell>상태</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {deptmember.map((row) => (
                                <TableRow key={row.empno} onClick={() => handleEmpMember(row)}>
                                    <TableCell>
                                        {/*<Avatar alt={row.profilePath} img={row.empProfile}/>*/}
                                        <MemberImg src={ row.empProfile } />
                                        {/*<MemberImg alt={"test"} src={row.profilePath} />*/}
                                    </TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.empno}</TableCell>
                                    <TableCell>{row.deptName}</TableCell>
                                    <TableCell>{row.rank.name}</TableCell>
                                    <TableCell>{row.extensionNum}</TableCell>
                                    <TableCell>{row.email}</TableCell>
                                    <TableCell>{row.etc}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </DeptMemberList>
            </MainStyle>
        )
}

export default DeptMember;
