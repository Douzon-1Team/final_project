import React, {useEffect, useState} from 'react';
import {getProfile} from "../apis/ApiService";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router";
import {useForm} from "react-hook-form";
import {updatePwd} from "../apis/Users";
import S3Upload from "../components/common/S3Upload";
import {Title, Table, Button, Form, Img, QR, Line} from '../styles/profile';
import SettingModal from "../components/common/Modal/SettingModal";
import { MainStyle } from "../styles/Globalstyle";

function Profile() {
    const empNo = useSelector( (state) => state.EMP_INFO.empInfo[0] );
    const [emp, setEmp] = useState(
      { deptName: null, name: null, extensionNum: null, rankName: null, profilePath: null, qrPath: null }
    );
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    useEffect(() => {
        getProfile(empNo).then(response => {
            setEmp(response);
        })
    }, []);

    const onValid = async ({ empno, pwd, newPwd, chkPwd }) => {
        if (pwd.valueOf() === '' || newPwd.valueOf() === '' || chkPwd.valueOf() === '') {
            alert('비밀번호에 빈값이 존재하면 안됩니다.')
            return false;
        } if(newPwd !== chkPwd){
            alert("새 비밀번호와 새 비밀번호 확인값이 다릅니다.")
            return false;
        }

        const response = await updatePwd({ empno, pwd, newPwd, chkPwd });
        if (response.status) {
            alert("비밀번호 변경이 완료되었습니다.");
            window.location.reload();
            return navigate('/profile');
        } else {
            alert("비밀번호 변경에 실패했습니다.");
        }
    };

    return (
        <MainStyle>
            <Title>개인 정보 관리</Title>
            <a href={ emp.qrPath }><QR>QR code</QR></a>
            <Table>
                <tr>
                    <td rowSpan="6">
                        <Img src={ emp.profilePath } />
                    </td>
                    <td>회사</td>
                    <td>더존비즈온</td>
                </tr>
                <tr>
                    <td>부서</td>
                    <td>{ emp.deptName }</td>
                </tr>
                <tr>
                    <td>이름</td>
                    <td>{ emp.name }</td>
                </tr>
                <tr>
                    <td>직급</td>
                    <td>{ emp.rankName }</td>
                </tr>
                <tr>
                    <td>사번</td>
                    <td>{ empNo }</td>
                </tr>
                <tr>
                    <td>내선번호</td>
                    <td>{ emp.extensionNum }</td>
                </tr>
            </Table>
            <Line>
                <S3Upload />
            </Line>

            <Form onSubmit={handleSubmit(onValid)}>
                {/*<PwdTable>*/}
                <tr>
                    <td>현재 비밀번호</td>
                    <td>
                        <input {...register('pwd')} type="password" />
                    </td>
                </tr>
                <tr>
                    <td>새 비밀번호</td>
                    <td>
                        <input {...register('newPwd')} type="password" />
                    </td>
                </tr>
                <tr>
                    <td>새 비밀번호 확인 </td>
                    <td>
                        <input {...register('chkPwd')} type="password" />
                    </td>
                </tr>
                {/*</PwdTable>*/}

                <input {...register('empno')} type="text" defaultValue={empNo} hidden />
                <Button type="reset">취소</Button>
                <Button type="submit">저장</Button>
            </Form>
            <Line>
                <p>* 현재 비밀번호로의 변경은 불가능합니다.</p>
            </Line>
            <SettingModal/>
        </MainStyle>
    );
}
export default Profile;
