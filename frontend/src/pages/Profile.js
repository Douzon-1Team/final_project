import React, {useEffect, useState} from 'react';
import { Title, Table, Button2, Button } from '../styles/profile';
import GetProfile from "../apis/ApiService";
import {useSelector} from "react-redux";

function Profile() {
    let empInfo = useSelector( (state) => {return state});
    const [emp, setEmp] = useState({deptName: null, name: null, extensionNum: null, profile: null, rankName: null})
    useEffect(() => {
        GetProfile(empInfo.EMP_INFO.empInfo.empno).then(response => {
            setEmp(response);
            console.log(response);
        })
    }, []);

    return (
        <>
            <Title>사원 정보 관리</Title>

            <Table>
                <tr>
                    <td rowSpan="6">사진</td>
                    <td>회사</td>
                    <td>더존비즈온</td>
                </tr>
                <tr>
                    <td>부서</td>
                    {emp.deptName}
                </tr>
                <tr>
                    <td>이름</td>
                    {emp.name}
                </tr>
                <tr>
                    <td>직급</td>
                    {emp.rankName}
                </tr>
                <tr>
                    <td>사번</td>
                    { empInfo.EMP_INFO.empInfo.empno }
                </tr>
                <tr>
                    <td>내선번호</td>
                    { emp.extensionNum }
                </tr>
            </Table>
            <button>사진 업로드</button>

            <Table>
                <tr>
                    <td>현재 비밀번호</td>
                    <td>
                        <input type="text"/>
                    </td>
                </tr>
                <tr>
                    <td>새 비밀번호</td>
                    <td>
                        <input type="password" />
                    </td>
                </tr>
                <tr>
                    <td>새 비밀번호 확인</td>
                    <td>
                        <input type="password" />
                    </td>
                </tr>
            </Table>
            <p>* 현재 비밀번호로의 변경은 불가능합니다.</p>
        </>
    );
}

export default Profile;
