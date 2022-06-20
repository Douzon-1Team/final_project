import React from 'react';
import Main from "./Main";
import {useSelector} from "react-redux";
import {Button, Button2, Table, Title} from "../styles/profile";

function EmpInfo() {
    let empInfo = useSelector( (state) => {return state});
    console.log(empInfo.EMP_INFO.empInfo.name);

    return (
        <>
            <Main />
            <Title>사원 정보 관리</Title>

            <Table>
                <tr>
                    <td rowSpan="6">사진</td>
                    <td>회사</td>
                    <td>더존비즈온</td>
                </tr>
                <tr>
                    <td>부서</td>
                    <td></td>
                </tr>
                <tr>
                    <td>이름</td>
                    <p>{empInfo.EMP_INFO.empInfo.name}</p>
                </tr>
                <tr>
                    <td>직급</td>
                    <p>
                    </p>
                </tr>
                <tr>
                    <td>사번</td>
                    <p>{empInfo.EMP_INFO.empInfo.empno}</p>
                </tr>
                <tr>
                    <td>사원번호</td>
                    <td></td>
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

            <div className="box-env">
                <label htmlFor="">사원</label>
                <input type="radio" name="chk_emp" value="" />
                <label htmlFor="">담당자</label>
                <input type="radio" name="chk_manager" value="" />
            </div>

            <Button>퇴사자등록</Button>
            <Button2>사원정보 삭제</Button2>

            <br/>
            <button>저장</button>
            <button>취소</button>
        </>
    );
}

export default EmpInfo;