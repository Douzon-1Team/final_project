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

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    }
});
// axios data 받아오기
// const response () =

function DeptMember() {
    const navigate = useNavigate();
    const classes = useStyles();
    const [deptmember, setdeptmember] = useState([]);
    const MemberList = async () => {
        // TODO : axios 데이터가 들어왔음
        // agree: false
        // attendance: true
        // date: "2022-06-29"
        // deptNo: "01"
        // empProfile: "https://dzfinal.s3-ap-northeast-2.amazonaws.com/profile-220102-54e9edbd-10b6-4b03-8924-c288f68f3b91.jpeg"
        // empno: "220102"
        // etc: "퇴근미등록"
        // extensionNum: "070-1601-3892"
        // name: "이지은"
        // rank: {name: '사원'}
        // tardy: false
        // unregistered: false
        await getDeptMember({empno: 220101}).then(res => {

            const MList = res.data;
            for (let i = 0; i < MList.length; i++) {
                // 쿼리문에서 출근 etc는 null값임 -> 때문에 etc에 특정값이라도 주어야 데이터를 가져오는데
                // null값일때 출근으로 만들었더니 출근을 하지 않은 녀석들도 출근으로 나와서 조건문 처리했음
                // 쿼리문에서 case쓰기는 좀
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
        navigate("/main", {
            state: event.empno,
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
