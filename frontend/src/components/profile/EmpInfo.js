import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router";
import {getProfile} from "../../apis/ApiService";
import {InfoBox, Table, TableBox} from "../../styles/ProfileStyle";

// 사원 정보를 읽어오는 component
function EmpInfo() {
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

  return (
    <>
      <TableBox>
        <Table style={{marginRight: '15%', minHeight: '38vh'}}>
        {/*<table>*/}
          <tr>
            <td>회사</td>
            <InfoBox>더존비즈온</InfoBox>
          </tr>
          <tr>
            <td>부서</td>
            <InfoBox>{ emp.deptName }</InfoBox>
          </tr>
          <tr>
            <td>이름</td>
            <InfoBox>{ emp.name }</InfoBox>
          </tr>
          <tr>
            <td>직급</td>
            <InfoBox>{ emp.rankName }</InfoBox>
          </tr>
          <tr>
            <td>사번</td>
            <InfoBox>{ empNo }</InfoBox>
          </tr>
          <tr>
            <td>내선번호</td>
            <InfoBox> { emp.extensionNum } </InfoBox>
          </tr>
        </Table>
      </TableBox>
    </>
  );
}

export default EmpInfo;