import React, {useEffect, useState} from 'react';
import Main from "./Main";
import GetProfile from "../apis/ApiService";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router";
import {useForm} from "react-hook-form";
import {updatePwd} from "../apis/Users";
import S3Upload from "../components/common/S3Upload";
import { Title, Table } from '../styles/profile';
import axios from "axios";

function Profile() {
    let empInfo = useSelector( (state) => {return state});
    const [emp, setEmp] = useState({deptName: null, name: null, extensionNum: null, profilePath: null, rankName: null} )
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const [img, setImg] = useState([]);

    useEffect(() => {
        GetProfile(empInfo.EMP_INFO.empInfo.empno).then(response => {
            setEmp(response);
            console.log(response);
        })
    }, []);

    // let empno = empInfo.EMP_INFO.empInfo.empno;
    console.log(emp)
    const onValid = async ({ empno, pwd, newPwd, chkPwd }) => {
        const response = await updatePwd({ empno, pwd, newPwd, chkPwd });
        if (response.status) {
            alert('변경 완료');
            return navigate('/profile');
        } else {
            alert('error');
        }
    };

    function searchApi() {
        const url = emp.profilePath;
        axios.get(url)
            .then(function(response) {
                setImg(response.data);
                console.log("성공");
            })
            .catch(error => { console.log(error);} //CORS error
            )

    }

    return (
        <>
            <Main/>
            <Title>사원 정보 관리</Title>

            <Table>
                <tr>
                    <td rowSpan="6">사진</td>
                    <button onClick={searchApi}> 불러오기 </button>
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
            <S3Upload />

            <form onSubmit={handleSubmit(onValid)}>
                <input {...register('empno')} type="text" placeholder="사 번(나중에 hidden처리)" defaultValue="${empInfo.EMP_INFO.empInfo.empno}" /><br/>
                <input {...register('pwd')} type="password" placeholder="비밀번호" /><br/>
                <input {...register('newPwd')} type="password" placeholder="변경할 pwd" /><br/>
                <input {...register('chkPwd')} type="password" placeholder="변경 확인 pwd" /><br/>
                <button type="submit">비밀번호 변경</button>
            </form>
            <p>* 현재 비밀번호로의 변경은 불가능합니다.</p>
        </>
    );
}

export default Profile;