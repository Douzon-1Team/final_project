import React, {useEffect, useState} from 'react';
import {getProfile} from "../../apis/ApiService";
import {useNavigate} from "react-router";
import {useParams} from 'react-router-dom';
import {useForm} from "react-hook-form";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {
    BtnBox,
    Button,
    InfoBox,
    InfoBox2,
    Table,
    PwdBox,
    TableBox,
    TableBox2,
    ProfileImg,
    LeftContainer,
    RightContainer,
    IconBox, RedBtn
} from "../../styles/profile";
import axios from 'axios';
import defaultImg from "../../assets/img/defualt_profile.png";
import {TabPanel, a11yProps, useStyles} from '../../pages/VerticalTabs'
import {MainStyle} from "../../styles/Globalstyle";
import {FcEditImage} from 'react-icons/fc';
import {useSelector} from "react-redux";

function Profile() {
    const classes = useStyles();
    const [values, setValues] = React.useState(0);
    const navigate = useNavigate();
    const param = useParams();
    const empNo = param.empno;
    const accessToken = useSelector( (state) => state.ACCESS_TOKEN.accessToken);
    const isNew = empNo ? false : true;
    const [emp, setEmp] = useState(
        { deptName: null, name: null, extensionNum: null, rankName: null, profilePath: null, resigned: null }
    );
    const { register, handleSubmit, setValue, watch } = useForm();
    const avatar = watch('image');
    const handleChange = (event, newValue) => {
        setValues(newValue);
    };

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

        const response = await axios.patch('http://localhost:8080/admin/update', form,
                {headers: {ContentType: 'application/json; charset=UTF-8', Authorization: accessToken}});

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

        const response = await axios.post('http://localhost:8080/admin/register', form,
            {headers: {ContentType: 'multipart/form-data', Authorization: accessToken}});

        navigate("/admin/list");
    }

    const onSubmit = ({deptName, name, rankName, extensionNum, role, image, resigned}) => {
        isNew ? insertInfo({deptName, name, rankName, extensionNum, role, image})
            : updateInfo({ deptName, name, rankName, extensionNum, role, image, resigned});
    }

    const deleteInfo = async () => {
        const response = axios.delete(`http://localhost:8080/admin/remove/${empNo}`,
            {headers: {Authorization: accessToken}});
        navigate("/admin/list");
    }

    return (
        <MainStyle>
        <form onSubmit={handleSubmit(onSubmit)}>
            <LeftContainer>
                {emp.profilePath ? <ProfileImg src={emp.profilePath}/> : <ProfileImg src={defaultImg}/>}
                <label htmlFor="icon">
                    <IconBox style={{bottom:'50px', left:'110px'}}>
                        <FcEditImage size="20px"/>
                    </IconBox>
                    <input
                        {...register("image")}
                        id="icon"
                        type="file"
                        accept="image/*"
                        hidden
                    />
                </label>
            </LeftContainer>
            <RightContainer style={{marginTop:'-20px'}}>
        <div className={classes.root}>
            {/*{isNew ? <Title>사원 정보 등록</Title> : <Title>사원 정보 수정</Title>}*/}
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={values}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                className={classes.tabs}
            >

                <Tab label="개인정보" {...a11yProps(0)} />
                {!isNew && <Tab label="비밀번호 변경" {...a11yProps(1)} /> }
                {!isNew && <RedBtn {...register('resigned')} onClick={setValue("resigned", true)}>퇴사자 등록</RedBtn> }
                {!isNew && <RedBtn onClick={deleteInfo}>사원 정보 삭제</RedBtn> }
            </Tabs>

                <TabPanel index={0} value={values}><TableBox>
            <Table>
                <tr>
                    <td>회사</td>
                    <InfoBox>더존비즈온</InfoBox>
                </tr>
                {!isNew &&<tr>
                    <td>사번</td>
                    <InfoBox>{empNo}</InfoBox>
                </tr>}
                <tr>
                    <td>부서</td>
                    <InfoBox2 {...register('deptName')} type="text" defaultValue={emp.deptName}/>
                </tr>
                <tr>
                    <td>이름</td>
                    <InfoBox2 {...register('name')} type="text" defaultValue={emp.name}/>
                </tr>
                <tr>
                    <td>직급</td>
                    <InfoBox2 {...register('rankName')} type="text" defaultValue={emp.rankName}/>
                </tr>
                <tr>
                    <td>내선번호</td>
                    <InfoBox2 {...register('extensionNum')} type="text" defaultValue={emp.extensionNum}/>
                </tr>
                {isNew && <div style={{marginTop:'20px'}}>
                    <input style={{marginLeft:'20px'}} type="radio" name="role" value="ROLE_USER" {...register('role')}/> 사원
                    <input style={{marginLeft:'20px'}} type="radio" name="role" value="ROLE_MANAGER" {...register('role')}/> 담당자
                </div>}
            </Table></TableBox></TabPanel>

            <TabPanel index={1} value={values}>
                {!isNew ?
                <TableBox2><Table>
                <tr>
                    <td>새 비밀번호</td>
                    <td>
                        <PwdBox {...register('newPwd')} type="password"/>
                    </td>
                </tr>
                <tr>
                <td>새 비밀번호 확인 </td>
                <td>
                <PwdBox {...register('chkPwd')} type="password" />
                </td>
                </tr>
                </Table></TableBox2> : null
                }
            </TabPanel>

                <input {...register('empno')} type="text" defaultValue={empNo} hidden />

        </div></RightContainer>
            <BtnBox style={{marginTop:'-50px', marginRight:'300px'}}>
                <Button type="submit">저장</Button>
                <Button type="reset" onClick={(e) => {e.preventDefault(); navigate("/admin/list")}}>취소</Button>
            </BtnBox>
        </form></MainStyle>
    );
}



export default Profile;
