import React, {useEffect, useState, useRef} from 'react';
import {getProfile} from "../../apis/ApiServices";
import {useNavigate} from "react-router";
import {useParams} from 'react-router-dom';
import {useForm} from "react-hook-form";
import axios from 'axios';
import defaultImg from "../../assets/img/defualt_profile.png";
import {MainStyle} from "../../styles/Globalstyle";
import {FcEditImage} from 'react-icons/fc';
import {useSelector} from "react-redux";
import {ResignConfirm, DeleteConfirm} from "../common/alert/alert";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import {
    TabBox,
    ContentBox,
    TabTitle,
    LeftContainer,
    ProfileImg,
    IconBox,
    RightContainer, TableBox, InfoBox, InfoBox2, Table, RedBtn, PwdBox, BtnBox, Button, ProfileBox
} from '../../styles/ProfileStyle';

function Profile() {
    const [index, setIndex] = useState(0);
    const navigate = useNavigate();
    const param = useParams();
    const empNo = param.empno;
    const accessToken = useSelector( (state) => state.ACCESS_TOKEN.accessToken);
    const isNew = empNo ? false : true;
    const [emp, setEmp] = useState(
        { deptName: null, name: null, extensionNum: null, rankName: null, resigned: null }
    );
    const [profile, setProfile] = useState(null);
    const submit = useRef(null);
    const { register, handleSubmit, setValue, watch } = useForm();

    useEffect(() => {
        if(!isNew){
            getProfile({empNo, accessToken}).then(response => {
                setEmp(response.data);
                setProfile(response.data.profilePath);
            });
        }
    }, [])

    useEffect(() => {
        if(!isNew){
            setValue('deptName', emp.deptName);
            setValue('name', emp.name);
            setValue('extensionNum', emp.extensionNum);
            setValue('rankName', emp.rankName);
        }
    }, [emp]);

    const avatar = watch('image');

    useEffect(() => {
        if (avatar && avatar.length > 0) {
            const file = avatar[0];
            setProfile(URL.createObjectURL(file));
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
            alert('????????? ???????????? ????????????.')
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
            {headers: {ContengtType: 'multipart/form-data', Authorization: accessToken}});

        navigate("/admin/list");
    }

    const onSubmit = ({deptName, name, rankName, extensionNum, role, image, resigned}) => {
        isNew ? insertInfo({deptName, name, rankName, extensionNum, role, image})
            : updateInfo({ deptName, name, rankName, extensionNum, role, image, resigned});
    }

    const deleteInfo = () => {
        DeleteConfirm(function(isConfirm){
            if(isConfirm) {
                axios.delete(`http://localhost:8080/admin/remove/${empNo}`,
                    {headers: {Authorization: accessToken}});
                navigate("/admin/list");
            }
        });
    }

    const resign = () => {
        ResignConfirm(function (isConfirm){
            if(isConfirm){
                setValue("resigned", true);
                submit.current.click();
            }
        });
    }

    return (
        <MainStyle>
        <form onSubmit={handleSubmit(onSubmit)}>
            <LeftContainer>
                {profile ? <ProfileImg src={profile}/> : <ProfileImg src={defaultImg}/>}
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

            <RightContainer><ProfileBox style={{marginTop:'50px'}}>
            {/*{isNew ? <Title>?????? ?????? ??????</Title> : <Title>?????? ?????? ??????</Title>}*/}

             <Tabs selectedIndex={index} onSelect={index => setIndex(index)}><ContentBox>
                 <TabBox><TabList>
                     <Tab><TabTitle>????????????</TabTitle></Tab>
                     {!isNew && <Tab><TabTitle>???????????? ??????</TabTitle></Tab>}
                     {!isNew &&<RedBtn type="button" {...register('resigned')} onClick={() => {resign()}}>????????? ??????</RedBtn> }
                     {!isNew && <RedBtn type="button" onClick={() => {deleteInfo()}}>?????? ??????</RedBtn>}
                 </TabList></TabBox>

                 <TabPanel><TableBox>
                     <Table>
                         <tr>
                             <td>??????</td>
                             <InfoBox>???????????????</InfoBox>
                         </tr>
                         {!isNew &&<tr>
                             <td>??????</td>
                             <InfoBox>{empNo}</InfoBox>
                         </tr>}
                         <tr>
                             <td>??????</td>
                             <InfoBox2 {...register('deptName')} type="text"/>
                         </tr>
                         <tr>
                             <td>??????</td>
                             <InfoBox2 {...register('name')} type="text"/>
                         </tr>
                         <tr>
                             <td>??????</td>
                             <InfoBox2 {...register('rankName')} type="text"/>
                         </tr>
                         <tr>
                             <td>????????????</td>
                             <InfoBox2 {...register('extensionNum')} type="text"/>
                         </tr>
                         {isNew && <div style={{marginTop:'20px'}}>
                             <input style={{marginLeft:'20px'}} type="radio" name="role" value="ROLE_USER" {...register('role')}/> ??????
                             <input style={{marginLeft:'20px'}} type="radio" name="role" value="ROLE_MANAGER" {...register('role')}/> ?????????
                         </div>}
                     </Table></TableBox></TabPanel>

                 <TabPanel>
                     {!isNew ?
                         <TableBox><Table>
                             <tr>
                                 <td>??? ????????????</td>
                                 <PwdBox {...register('newPwd')} type="password"/>
                             </tr>
                             <tr>
                                 <td>??? ???????????? ?????? </td>
                                 <PwdBox {...register('chkPwd')} type="password" />
                             </tr>
                         </Table></TableBox> : null
                     }
                 </TabPanel>
                 <input {...register('empno')} type="text" value={empNo} hidden />

                 <BtnBox style={{marginTop:'1%', marginRight:'3%'}}>
                     <Button type="submit" ref={submit}>??????</Button>
                     <Button type="button" onClick={() => {navigate("/admin/list")}}>??????</Button>
                 </BtnBox>
             </ContentBox></Tabs>
            </ProfileBox></RightContainer>
        </form></MainStyle>
    );
}

export default Profile;
