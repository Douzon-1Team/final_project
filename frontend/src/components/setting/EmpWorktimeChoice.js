import React, {useEffect, useState} from 'react';
import {SettingError, SettingSuccess} from "../common/alert/alert";
import {Button, LeftContainer, Radio, RightContainer, Text, TimeChoiceBox, Title} from "../../styles/ModalStyle";
import {useForm} from "react-hook-form";
import {useSelector} from "react-redux";
import {getSetting, settingTimeChoice} from "../../apis/ApiServices";

function EmpWorktimeChoice(props) {
  const empNo = useSelector( (state) => state.EMP_INFO.empInfo[0]);
  const [empDept, setEmpDept] = useState(
    { empno: null, deptNo: null, flexible: null }
  );
  const accessToken = useSelector( (state) => state.ACCESS_TOKEN.accessToken);
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    getSetting({empNo, accessToken}).then(response => {
      setEmpDept(response.data);
    })
  }, []);

  const onValidFlexible = async ({ empno, deptNo, flexible }) => {
    const response = await settingTimeChoice({ empno, deptNo, flexible, accessToken });
    if (response) {
      props.close(false);
      SettingSuccess();
    } else {
      props.close(false);
      SettingError(); }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onValidFlexible)}>
        <input {...register('empno')} type="text" defaultValue={empNo} hidden />
        <input {...register('deptNo')} type="text" defaultValue={empDept.deptNo} hidden />
        <LeftContainer>
          <TimeChoiceBox>
            <Text>출근 시간</Text>
            { empDept.getToWorkTimeSet }
            <Text>퇴근 시간</Text>
            { empDept.getOffWorkTimeSet }
          </TimeChoiceBox>
          <Title>일반 근무시간</Title>
          <Radio {...register('flexible')} type="radio" defaultValue="0" />
        </LeftContainer>
        <RightContainer>
          <TimeChoiceBox>
            <Text>출근 시간</Text>
            { empDept.getToWorkTimeSetF }
            <Text>퇴근 시간</Text>
            { empDept.getOffWorkTimeSetF }
          </TimeChoiceBox>
          <Title>유연 근무시간</Title>
          <Radio {...register('flexible')} type="radio" defaultValue="1" />
        </RightContainer>
        <Button type="submit">저 장</Button>
      </form>
    </>
  );
}

export default EmpWorktimeChoice;