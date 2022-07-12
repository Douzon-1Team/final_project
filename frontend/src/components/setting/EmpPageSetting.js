import React, {useEffect, useState} from 'react';
import {SettingError, SettingSuccess} from "../common/alert/alert";
import {Button, LeftContainer, Radio, RightContainer, TimeChoiceBox, Title} from "../../styles/ModalStyle";
import {useForm} from "react-hook-form";
import {useSelector} from "react-redux";
import {FcComboChart, FcList} from "react-icons/fc";
import {getSetting, settingGraph} from "../../apis/ApiServices";

function EmpPageSetting(props) {
  const empNo = useSelector( (state) => state.EMP_INFO.empInfo[0]);
  const [empDept, setEmpDept] = useState(
    { empno: null, deptNo: null, graph: null }
  );
  const accessToken = useSelector( (state) => state.ACCESS_TOKEN.accessToken);
  const { register, handleSubmit, setValue} = useForm();

  useEffect(() => {
    getSetting({empNo, accessToken}).then(response => {
      setEmpDept(response.data);
    })
  }, []);
  const dept = setValue('deptNo', empDept.deptNo);

  const onValidGraph = async ({ empno, deptNo, graph }) => {
    const response = await settingGraph({ empno, deptNo, graph, accessToken });
    if (response) {
      props.close(false);
      SettingSuccess();
    } else { SettingError(); }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onValidGraph)}>
        <input {...register('empno')} type="text" defaultValue={empNo} hidden />
        <input {...register('deptNo')} type="text" defaultValue={dept} hidden />
        <LeftContainer>
          <TimeChoiceBox>
            <FcComboChart size={"100%"} />
          </TimeChoiceBox>
          <Title>차트형</Title>
          <Radio {...register('graph')} type="radio" value="chart" />
        </LeftContainer>
        <RightContainer>
          <TimeChoiceBox>
            <FcList size={"100%"} />
          </TimeChoiceBox>
          <Title>목록형</Title>
          <Radio {...register('graph')} type="radio" value="list" />
        </RightContainer>
        <Button type="submit">저 장</Button>
      </form>
    </>
  );
}

export default EmpPageSetting;