import React from 'react';

function User() {
    return (
        <>
            <h2>개인 정보 관리</h2>
            <button>QR코드 다운로드</button>

            <table className="table-info">
                <tr>
                    <td rowSpan="6">사진</td>
                    <td>회사</td>
                    <td>회사명</td>
                </tr>
                <tr>
                    <td>부서</td>
                    <td>회사명</td>
                </tr>
                <tr>
                    <td>이름</td>
                    <td>회사명</td>
                </tr>
                <tr>
                    <td>직급</td>
                    <td>회사명</td>
                </tr>
                <tr>
                    <td>사번</td>
                    <td>회사명</td>
                </tr>
                <tr>
                    <td>사원번호</td>
                    <td>회사명</td>
                </tr>
            </table>
            <button>사진 업로드</button>
            
            <table className="table-info">
                <tr>
                    <td>현재 비밀번호</td>
                    <td>
                        <input type="text"/>
                    </td>
                </tr>
                <tr>
                    <td>새 비밀번호</td>
                    <td>
                        <input type="password"/>
                    </td>
                </tr>
                <tr>
                    <td>새 비밀번호 확인</td>
                    <td>
                        <input type="password"/>
                    </td>
                </tr>
            </table>
            <p>* 현재 비밀번호로의 변경은 불가능합니다.</p>

            <div className="box-env">
                <label htmlFor="">사원</label>
                <input type="radio" name="chk_emp" value="" />
                <label htmlFor="">담당자</label>
                <input type="radio" name="chk_manager" value="" />
            </div>

            <button>퇴사자등록</button>
            <button>사원정보 삭제</button>

            <br/>
            <button>저장</button>
            <button>취소</button>

        </>
    );
}

export default User;