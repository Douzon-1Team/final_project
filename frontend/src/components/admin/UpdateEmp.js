import React, {useEffect, useState} from 'react';
// import GetProfile from "../../apis/ApiService"
import {useNavigate} from "react-router";
import {useParams} from 'react-router-dom';
import {useForm} from "react-hook-form";
import {Title, Table, Button, Form, Img, Line} from '../../styles/profile';
import axios from 'axios';
import defaultImg from "../../assets/img/defualt_profile.png";
import {getProfile} from "../../apis/ApiService";

function Profile() {
    const navigate = useNavigate();
    const param = useParams();
    const empNo = param.empno;
    const isNew = empNo ? false : true;
    const [emp, setEmp] = useState(
        { deptName: null, name: null, extensionNum: null, rankName: null, profilePath: null, resigned: null }
    );
    const { register, handleSubmit, setValue, watch } = useForm();
    const avatar = watch('image');

    useEffect(() => {
        if(!isNew){
            getProfile(empNo).then(response => {
                setEmp(response);
            })
        }
    }, []);

    useEffect(() => {
        if (avatar && avatar.length > 0) {
            const file = avatar[0];
            setEmp({profilePath: URL.createObjectURL(file)});
        }
    }, [avatar]);

    const updateInfo = async ({ deptName, name, rankName, extensionNum, role, image, resigned}) => {
        const data = {
            empno : empNo,
            deptName: deptName,
            name: name,
            rankName: rankName,
            extensionNum: extensionNum,
            role: role,
            resigned: resigned
        }

        const form = new FormData();
        form.append("file", image[0]);
        form.append("EmpUpdateDto", new Blob([JSON.stringify(data)], {type: "application/json"}));

        const response = await axios.patch('http://localhost:8080/update', form,
                {header: {ContentType: 'application/json; charset=UTF-8'}});

        navigate("/admin/list");
    };

    const insertInfo = async ({deptName, name, rankName, extensionNum, role, image}) => {
        if (deptName.valueOf() === '' || name.valueOf() === '' || rankName.valueOf() === '' || extensionNum === '' || role === '') {
            alert('빈값이 존재하면 안됩니다.')
            return false;
        }

        const data = {
                    deptName: deptName,
                    name: name,
                    rankName: rankName,
                    extensionNum: extensionNum,
                    role: role
                }

        const form = new FormData();
        form.append("file", image[0]);
        form.append("EmpInfoDto", new Blob([JSON.stringify(data)], {type: "application/json"}));

        const response = await axios.post('http://localhost:8080/register', form,
            {header: {ContentType: 'multipart/form-data'}});

        navigate("/admin/list");
    }

    const onSubmit = ({deptName, name, rankName, extensionNum, role, image, resigned}) => {
        isNew ? insertInfo({deptName, name, rankName, extensionNum, role, image})
            : updateInfo({ deptName, name, rankName, extensionNum, role, image, resigned});
    }

    const deleteInfo = async () => {
        const response = axios.delete(`http://localhost:8080/remove/${empNo}`);
        navigate("/admin/list");
    }

    return (
        <>
            {isNew ? <Title>사원 정보 등록</Title> : <Title>사원 정보 수정</Title>}
            <Form onSubmit={handleSubmit(onSubmit)}>
            <Table>
                <tr>
                    <td rowSpan="6">
                        {emp.profilePath ? <img src={emp.profilePath} style={{display:"block"}}/> : <img src={defaultImg} style={{display:"block"}}/>}
                        <label
                            htmlFor="image"
                        >파일 선택
                        <input
                            {...register("image")}
                            id="image"
                            type="file"
                            accept="image/*"
                            style={{visibility:"hidden"}}
                        />
                        </label>
                    </td>
                    <td>회사</td>
                    <td>더존비즈온</td>
                </tr>
                {!isNew &&<tr>
                    <td>사번</td>
                    <td>{empNo}</td>
                </tr>}
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
                    <td>내선번호</td>
                    <input {...register('extensionNum')} type="text" placeholder={emp.extensionNum}/>
                </tr>
            </Table>
                {!isNew &&
                <>
                <tr>
                    <td>새 비밀번호</td>
                    <td>
                        <input {...register('newPwd')} type="password"/>
                    </td>
                </tr>
                <tr>
                <td>새 비밀번호 확인 </td>
                <td>
                <input {...register('chkPwd')} type="password" />
                </td>
                </tr>
                </>
            }
                <input {...register('empno')} type="text" defaultValue={empNo} hidden />
                <Button type="reset" onClick={(e) => {e.preventDefault(); navigate("/admin/list")}}>취소</Button>
                <Button type="submit">저장</Button>
                {!isNew &&
                    <Line>
                        <p>* 현재 비밀번호로의 변경은 불가능합니다.</p>
                    </Line>
                }

                <input type="radio" name="role" value="ROLE_USER" {...register('role')}/> 사원
                <input type="radio" name="role" value="ROLE_MANAGER" {...register('role')}/> 담당자

                {!isNew &&
                <>
                <button {...register('resigned')} onClick={setValue("resigned", true)}>퇴사자 등록</button>
                <button onClick={deleteInfo}>사원 정보 삭제</button>
                </>
            }
            </Form>
            </>
            );
            }

export default Profile;
