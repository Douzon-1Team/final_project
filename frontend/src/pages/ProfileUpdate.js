import React, {useState } from 'react';
import { Title, Table, Button } from '../styles/profile';
import axios from "axios";
import S3Upload from "../components/common/S3Upload";

function ProfileUpdate() {
    let [pass, setPassword] = useState("");
    const [img, setImg] = useState();
    const handleChange = ({ target: { value } }) => setPassword(value);
    console.log(pass);
    // console.log(value)
    // useEffect(() => {
    //     console.log('img',img);
    // }, [img]);

    const handleSubmit = (event) => {
        event.preventDefault();
        // alert(`변경된 패스워드: ${pass}`);
        alert('이미지 업로드');
        setImg({"profile" : { asdqweqwea: "asdasd" }});

        axios.post(
            "http://localhost:8080/profile/update",
            {img},
            { headers: {
                    'Content-Type': 'application/json'
                }}
        )
            .then( res => { console.log("res", res.data.message); })
            .catch( err => { console.log("error in request", err); });
    };

    return (
        <>
            <Title>사원 정보 관리 - UPDATE </Title>

            <Table>
                <tr>
                    {/*<td rowSpan="6">사진</td>*/}
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
                    {/*<p>{...register(`${empInfo.EMP_INFO.empInfo.empno}`)}</p>*/}
                </tr>
                <tr>
                    <td>내선번호</td>
                    {/*{ emp.extensionNum }*/}
                </tr>
            </Table>
            <form onSubmit={handleSubmit}>
                <button type="submit">사진 업로드</button>
            </form>

            <S3Upload />
            {/*<ProfileImg/>*/}

            {/*<form onSubmit={handleSubmit}>*/}
            {/*    <input type="password" name="password" value={pass} onChange={handleChange} />*/}
            {/*    /!*<input type="password" name="password2" value={pass} onChange={handleChange} />*!/*/}
            {/*    /!*<input type="password" name="password3" value={pass} onChange={handleChange} />*!/*/}
            {/*    /!*<input id="pwd0" type="password" placeholder="현재 비밀번호" />*!/*/}
            {/*    /!*<input id="pwd1" type="password" placeholder="비밀번호" />*!/*/}
            {/*    /!*<input id="pwd2" type="password" placeholder="비밀번호 확인" />*!/*/}
            {/*    <Button type="submit">저장</Button>*/}
            {/*    <Button type="reset">취소</Button>*/}
            {/*</form>*/}
            <p>* 현재 비밀번호로의 변경은 불가능합니다.</p>
        </>
    );
}

export default ProfileUpdate;