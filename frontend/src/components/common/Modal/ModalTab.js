import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router";
import {useForm} from "react-hook-form";
// import {getSetting} from "../../../apis/ApiSetting";
import {settingGraph, settingTime} from "../../../apis/Users";
import {FaUserClock} from 'react-icons/fa';
import {GoGraph} from 'react-icons/go';
import {Input} from "../../../styles/profile";
import {getSetting} from "../../../apis/ApiService";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function ModalTab() {
  const empNo = useSelector( (state) => state.EMP_INFO.empInfo[0]);
  const empRole = useSelector( (state) => state.EMP_INFO.empInfo[2]);

  const [empDept, setEmpDept] = useState(
    { empno: null, deptNo: null, flexible: null,
                getToWorkTimeSet: null, getOffWorkTimeSet: null,
                getToWorkTimeSetF: null, getOffWorkTimeSetF: null }
  );

  useEffect(() => {
    getSetting(empNo).then(response => {
      setEmpDept(response);
    })
  }, []);

  const [time, setTime] = useState([]);
  const navigate = useNavigate();

  const handleChange = (event, newTime) => {
    setTime(newTime);
  };
  const { register, handleSubmit } = useForm();
  const onValid = async ({ empno, deptNo, getToWorkTimeSet, getOffWorkTimeSet, getToWorkTimeSetF, getOffWorkTimeSetF, flexible }) => {
    const response = await settingTime({ empno, deptNo, getToWorkTimeSet, getOffWorkTimeSet, getToWorkTimeSetF, getOffWorkTimeSetF, flexible });

    if (response.status) {
      alert("근무시간 변경이 완료되었습니다.");
      window.location.reload();
      // return navigate('/profile');
      console.log(response)
      console.log(response.status)
    } else {
      alert("근무시간 변경에 실패했습니다.");
    }
    // if(getToWorkTimeSetF >= getOffWorkTimeSetF){
    //   alert('출근시간이 퇴근시간보다 늦어서는 안됩니다.');
    //   return false;
    // }
  };

  const onValidChk = async ({ empno, deptNo, graph }) => {
    const response = await settingGraph({ empno, deptNo, graph });

    if (response.status) {
      alert("페이지보기 형식이 변경되었습니다.");
      window.location.reload();
      // return navigate('/profile');
      console.log(response)
      console.log(response.status)
    } else {
      alert("페이지보기 형식 변경에 실패했습니다.");
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={time} onChange={handleChange} variant="scrollable" scrollButtons="on" indicatorColor="primary" textColor="primary"
          aria-label="scrollable force tabs example"
        >
          <Tab label="근무시간 설정" icon={<FaUserClock/>} {...a11yProps(0)} />
          { empRole !== "ROLE_USER"
            ? <Tab label="페이지 보기 방식" icon={<GoGraph/>} {...a11yProps(1)} />
            : null }
        </Tabs>
      </Box>
      <TabPanel value={time} index={0}>
        <Box component="form" sx={{ '& > :not(style)': { m: 1 }, }}
             noValidate
             autoComplete="off"
             onSubmit={handleSubmit(onValid)}
        >
          <input {...register('empno')} type="text" defaultValue={empNo} hidden />
          <input {...register('deptNo')} type="text" defaultValue={empDept.deptNo} hidden />

          { empRole !== "ROLE_USER"
            ? <>
                <h2>일반 근무시간</h2>
                <p>출근 시간 설정</p>
                <Input {...register('getToWorkTimeSet')} type="time"  />
                <p>퇴근 시간 설정</p>
                <Input {...register('getOffWorkTimeSet')} type="time"  />

                <h2>유연 근무제</h2>
                <p>출근 시간 설정</p>
                <Input {...register('getToWorkTimeSetF')} type="time"  />
                <p>퇴근 시간 설정</p>
                <Input {...register('getOffWorkTimeSetF')} type="time" />
                <br/>
              </>
            : <>
                <h2>일반 근무시간</h2>
                <p>출근 시간</p>
                { empDept.getToWorkTimeSet }
                <p>퇴근 시간</p>
                { empDept.getOffWorkTimeSet }
                <Input {...register('flexible')} type="radio" defaultValue="0" />
                <br/>
                <h2>유연 근무제</h2>
                <p>출근 시간</p>{ empDept.getToWorkTimeSetF }
                <p>퇴근 시간</p>
                { empDept.getOffWorkTimeSetF }
                <Input {...register('flexible')} type="radio" defaultValue="1" />
              </>
          }
          <button type="submit">저장</button>
        </Box>
      </TabPanel>
      { empRole !== "ROLE_USER"
        ?
        <>
          <TabPanel value={time} index={1}>
          <form onSubmit={handleSubmit(onValidChk)}>
              <input {...register('empno')} type="text" defaultValue={empNo} hidden />
              <input {...register('deptNo')} type="text" defaultValue={empDept.deptNo} hidden />
              <p>차트형</p>
              <Input {...register('graph')} type="radio" defaultValue="chart" />
              <p>목록형</p>
              <Input {...register('graph')} type="radio" defaultValue="list" />
              <button type="submit">저장</button>
            </form>
          </TabPanel>
        </>
        : null
      }
    </Box>
  );
}
