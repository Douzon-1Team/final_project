import React from 'react';
import {BtnBox, Button, PwdBox, Table, TableBox} from "../../styles/ProfileStyle";
import {PwdError, PwdNotCollect, PwdNotRight, PwdSuccess} from "../common/alert/alert";
import {updatePwd} from "../../apis/Users";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router";
import {useSelector} from "react-redux";

// 사원 비밀번호를 변경하는 component
function EmpPwd() {
  const empNo = useSelector( (state) => state.EMP_INFO.empInfo[0] );
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onValid = async ({ empno, pwd, newPwd, chkPwd }) => {
    if (pwd.valueOf() === '' || newPwd.valueOf() === '' || chkPwd.valueOf() === '') {
      PwdNotRight();
      return false;
    } if(newPwd !== chkPwd){
      PwdNotCollect();
      return false;
    }

    const response = await updatePwd({ empno, pwd, newPwd, chkPwd });
    if (response.status) {
      PwdSuccess();
      window.location.reload();
      return navigate('/profile');
    } else { PwdError(); }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onValid)}>
        <input {...register('empno')} type="text" defaultValue={empNo} hidden />
        <TableBox>
          <Table>
            <tr>
              <td>현재 비밀번호</td>
              <PwdBox {...register('pwd')} type="password" />
            </tr>
            <tr>
              <td>새 비밀번호</td>
              <PwdBox {...register('newPwd')} type="password" />
            </tr>
            <tr>
              <td>새 비밀번호 확인 </td>
              <PwdBox {...register('chkPwd')} type="password" />
            </tr>
          </Table>
          <BtnBox>
            <Button type="submit">저 장</Button>&nbsp;&nbsp;
            <Button type="reset">취 소</Button>
          </BtnBox>
        </TableBox>
      </form>
    </>
  );
}

export default EmpPwd;