import React, {useEffect, useState} from 'react';
import GetProfile from "../../apis/ApiService"
import {useNavigate} from "react-router";
import {useParams} from 'react-router-dom';
import {useForm} from "react-hook-form";
import S3Upload from "../common/S3Upload";
import {Title, Table, Button, Form, Img, Line} from '../../styles/profile';
import axios from 'axios';

function Profile() {
    const param = useParams();
    const empNo = param.empno;
    const [emp, setEmp] = useState(
        { deptName: null, name: null, extensionNum: null, rankName: null, profilePath: null, resigned: null }
    );
    const { register, handleSubmit } = useForm();

    useEffect(() => {
        GetProfile(empNo).then(response => {
            setEmp(response);
        })
    }, []);

    const onValid = async ({ deptName, name, rankName, extensionNum}) => {
        console.log(empNo, deptName, name, rankName, extensionNum);
        const response = await axios.patch('http://localhost:8080/update',
            {empno: empNo,
                deptName: deptName,
            name: name,
            rankName: rankName,
            extensionNum: extensionNum},
                {header: {ContentType: 'application/json; charset=UTF-8'}});
        console.log(response);
    };

    return (
        <>
            <Title>사원 정보 수정</Title>
            <Form onSubmit={handleSubmit(onValid)}>
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
                    <input {...register('deptName')} type="text" placeholder={emp.deptName}/>
                </tr>
                <tr>
                    <td>이름</td>
                    <input {...register('name')} type="text" placeholder={emp.name}/>
                </tr>
                <tr>
                    <td>직급</td>
                    <input {...register('rankName')} type="text" placeholder={emp.rankName}/>
                </tr>
                <tr>
                    <td>사번</td>
                    <td>{empNo}</td>
                </tr>
                <tr>
                    <td>내선번호</td>
                    <input {...register('extensionNum')} type="text" placeholder={emp.extensionNum}/>
                </tr>
            </Table>
            <Line>
                {/*<S3Upload empNo = {empNo}/>*/}
            </Line>

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

                <input {...register('empno')} type="text" defaultValue={empNo} hidden />
                <Button type="reset">취소</Button>
                <Button type="submit">저장</Button>
                <Line>
                    <p>* 현재 비밀번호로의 변경은 불가능합니다.</p>
                </Line>

                <input type="radio" /> 사원
                <input type="radio"/> 담당자

                <button>퇴사자 등록</button>
                <button>사원 정보 삭제</button>
            </Form>
            </>
            );
            }

export default Profile;
