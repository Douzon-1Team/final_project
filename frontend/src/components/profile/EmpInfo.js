import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {getProfile} from "../../apis/ApiServices";
import {InfoBox, Table, TableBox} from "../../styles/ProfileStyle";

function EmpInfo() {
  const empNo = useSelector( (state) => state.EMP_INFO.empInfo[0] );
  const accessToken = useSelector( (state) => state.ACCESS_TOKEN.accessToken);
  const [emp, setEmp] = useState(
    { deptName: null, name: null, extensionNum: null, rankName: null, profilePath: null, qrPath: null }
  );

  useEffect(() => {
    getProfile({empNo, accessToken}).then(response => {
      setEmp(response.data);
    })
  }, []);

  return (
    <>
      <TableBox>
        <Table style={{marginRight: '15%', minHeight: '38vh'}}>
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
            <InfoBox>{ emp.extensionNum }</InfoBox>
          </tr>
        </Table>
      </TableBox>
    </>
  );
}

export default EmpInfo;