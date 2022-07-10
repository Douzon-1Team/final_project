import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {settingGraph, settingTime, settingTimeChoice} from "../../../apis/Users";
import {FaUserClock} from 'react-icons/fa';
import {FcComboChart, FcList} from 'react-icons/fc';
import {GoGraph} from 'react-icons/go';
import {WiTime9} from 'react-icons/wi';
import {getSetting} from "../../../apis/ApiService";
import {SettingError, SettingSuccess, TimeSettingError} from "../alert/alert";
import { Radio, TimeRightContainer, TimeContainer, Input, Button, Text, Title, TimeBox, LeftContainer, RightContainer, TimeChoiceBox } from "../../../styles/ModalStyle";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = { children: PropTypes.node, index: PropTypes.number.isRequired, value: PropTypes.number.isRequired, };

function a11yProps(index) {
  return { d: `simple-tab-${index}`, 'aria-controls': `simple-tabpanel-${index}`, };
}

export default function ModalTab() {
  const empNo = useSelector( (state) => state.EMP_INFO.empInfo[0]);
  const empRole = useSelector( (state) => state.EMP_INFO.empInfo[2]);
  const [empDept, setEmpDept] = useState(
    { empno: null, deptNo: null, flexible: null,
                getToWorkTimeSet: null, getOffWorkTimeSet: null,
                getToWorkTimeSetF: null, getOffWorkTimeSetF: null }
  );
  const [time, setTime] = useState([]);
  const { register, handleSubmit } = useForm();
  const handleChange = (event, newTime) => { setTime(newTime); };

  useEffect(() => {
    getSetting(empNo).then(response => {
      setEmpDept(response);
    })
  }, []);

  // 01. 근무시간 선택
  const onValidFlexible = async ({ empno, deptNo, flexible }) => {
    const response = await settingTimeChoice({ empno, deptNo, flexible });
    if (response.status) {
      // TODO: alert modal z-index 변경 필요
      SettingSuccess();
      // window.location.reload();
    } else { SettingError(); }
  };

  // 02. 근무시간 설정
  const onValid = async ({ empno, deptNo, getToWorkTimeSet, getOffWorkTimeSet, getToWorkTimeSetF, getOffWorkTimeSetF }) => {
    // TODO : return false 걸기
    if(getToWorkTimeSet >= getOffWorkTimeSet) {
      TimeSettingError();
      return false;
    } if(getToWorkTimeSetF >= getOffWorkTimeSetF){
      TimeSettingError();
      return false;
    }

    const response = await settingTime({ empno, deptNo, getToWorkTimeSet, getOffWorkTimeSet, getToWorkTimeSetF, getOffWorkTimeSetF });
    if (response.status) {
      SettingSuccess();
    } else { SettingError(); }
  };

  const onValidGraph = async ({ empno, deptNo, graph }) => {
    const response = await settingGraph({ empno, deptNo, graph });
    if (response.status) {
      // TODO: alert modal z-index 변경 필요
      SettingSuccess();
    } else { SettingError(); }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={time} onChange={handleChange} variant="scrollable" scrollButtons="on" indicatorColor="primary" textColor="primary">
          <Tab label="근무시간 선택" icon={<FaUserClock/>} {...a11yProps(0)} />
          { empRole !== "ROLE_USER" ? <Tab label="부서 근무시간 설정" icon={<WiTime9/>} {...a11yProps(1)} /> : null }
          { empRole !== "ROLE_USER" ? <Tab label="페이지 보기 방식" icon={<GoGraph/>} {...a11yProps(2)} /> : null }
        </Tabs>
      </Box>

      {/* 근무시간 선택 */}
      <TabPanel value={time} index={0}>
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
      </TabPanel>

      {/* 근무시간 설정 */}
      <TabPanel value={time} index={1}>
        <form onSubmit={handleSubmit(onValid)}>
          <input {...register('empno')} type="text" defaultValue={empNo} hidden />
          <input {...register('deptNo')} type="text" defaultValue={empDept.deptNo} hidden />
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
      </TabPanel>

      {/* 페이지 보기 방식 */}
      <TabPanel value={time} index={2}>
          <form onSubmit={handleSubmit(onValidGraph)}>
            <input {...register('empno')} type="text" defaultValue={empNo} hidden />
            <input {...register('deptNo')} type="text" defaultValue={empDept.deptNo} hidden />
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
      </TabPanel>
    </Box>
  );
}
