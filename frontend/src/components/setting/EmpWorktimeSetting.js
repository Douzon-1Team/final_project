import React, {useEffect, useState} from 'react';
import {SettingError, SettingSuccess, TimeSettingError} from "../common/alert/alert";
import { Button, Input, TimeBox, TimeContainer, TimeRightContainer, } from "../../styles/ModalStyle";
import {useForm} from "react-hook-form";
import {useSelector} from "react-redux";
import {getSetting, settingTime} from "../../apis/ApiServices";

function EmpWorktimeSetting(props) {
  const empNo = useSelector( (state) => state.EMP_INFO.empInfo[0]);
  const [empDept, setEmpDept] = useState(
    { empno: null, deptNo: null,
                getToWorkTimeSet: null, getOffWorkTimeSet: null,
                getToWorkTimeSetF: null, getOffWorkTimeSetF: null }
  );
  const accessToken = useSelector( (state) => state.ACCESS_TOKEN.accessToken);
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    getSetting({empNo, accessToken}).then(response => {
      setEmpDept(response.data);
    })
  }, []);
  const dept = setValue('deptNo', empDept.deptNo);

  const onValid = async ({ empno, deptNo, getToWorkTimeSet, getOffWorkTimeSet, getToWorkTimeSetF, getOffWorkTimeSetF }) => {
    if(getToWorkTimeSet >= getOffWorkTimeSet) {
      props.close(false);
      SettingError();
      return false;
    } if(getToWorkTimeSetF >= getOffWorkTimeSetF){
      props.close(false);
      SettingError();
      return false;
    }
    const response = await settingTime({ empno, deptNo, getToWorkTimeSet, getOffWorkTimeSet, getToWorkTimeSetF, getOffWorkTimeSetF, accessToken });
    if (response) {
      props.close(false);
      SettingSuccess();
    } else {
      props.close(false);
      SettingError();
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onValid)}>
        <input {...register('empno')} type="text" defaultValue={empNo} hidden />
        <input {...register('deptNo')} type="text" defaultValue={dept} hidden />
        <TimeBox>
          <TimeContainer>일반 근무시간</TimeContainer>
          <TimeRightContainer>
            출근 시간 설정 <Input {...register('getToWorkTimeSet')} type="time" min="07:00" max="11:00" /><br/>
            퇴근 시간 설정 <Input {...register('getOffWorkTimeSet')} type="time" min="16:00" max="23:00" />
          </TimeRightContainer>
        </TimeBox>
        <TimeBox>
          <TimeContainer>유연 근무시간</TimeContainer>
          <TimeRightContainer>
            출근 시간 설정<Input {...register('getToWorkTimeSetF')} type="time" min="07:00" max="11:00" /><br/>
            퇴근 시간 설정<Input {...register('getOffWorkTimeSetF')} type="time" min="16:00" max="23:00" />
          </TimeRightContainer>
        </TimeBox>
        <Button type="submit">저 장</Button>
      </form>
    </>
  );
}

export default EmpWorktimeSetting;