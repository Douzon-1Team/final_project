import React from 'react';
import { Title, Table, Button } from '../styles/profile';
import S3Upload from "../components/common/S3Upload";
import {useForm} from "react-hook-form";
import { updatePwd} from "../apis/Users";
import {useNavigate} from "react-router";
import {Input} from "../styles/login";

function ProfileUpdate() {
    const navigate = useNavigate();
    // redux 값
    // let user = useSelector( state => {return state});
    // const empNum = user.EMP_INFO.empInfo.empno;

    const { register, handleSubmit } = useForm();

    const onValid = async ({ empno, pwd, newPwd, chkPwd }) => {
        const response = await updatePwd({ empno, pwd, newPwd, chkPwd });
        if (response.status) {
            alert('변경 완료');
            return navigate('/profile/update');
        } else {
            alert('error');
        }
    };

    return (
        <>
            <Title>사원 정보 관리 - UPDATE </Title>

            <Table>
                <tr>
                    <td rowSpan="6">사진</td>
                    <td>회사</td>
                    <td>더존비즈온</td>
                </tr>
                <tr>
                    <td>부서</td>
                    {/*{emp.deptName}*/}
                </tr>
                <tr>
                    <td>이름</td>
                    {/*{emp.name}*/}
                </tr>
                <tr>
                    <td>직급</td>
                    {/*{emp.rankName}*/}
                </tr>
                <tr>
                    <td>사번</td>
                    {/*{ empInfo.EMP_INFO.empInfo.empno }*/}
                </tr>
                <tr>
                    <td>내선번호</td>
                </tr>
            </Table> 
            <form onSubmit={handleSubmit(onValid)}>
                <input {...register('empno')} type="text" placeholder="사 번(나중에 hidden처리)" />
                <input {...register('pwd')} type="password" placeholder="비밀번호" />
                <input {...register('newPwd')} type="password" placeholder="변경할 pwd" />
                <input {...register('chkPwd')} type="password" placeholder="변경 확인 pwd" />
                <button type="submit">비밀번호 변경</button>
            </form>

            <S3Upload />
            <p>* 현재 비밀번호로의 변경은 불가능합니다.</p>
        </>
    );
}

export default ProfileUpdate;