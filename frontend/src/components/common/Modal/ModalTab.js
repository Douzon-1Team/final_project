import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {useState} from "react";
import {useSelector} from "react-redux";
import {FaUserClock} from 'react-icons/fa';
import {GoGraph} from 'react-icons/go';
import {WiTime9} from 'react-icons/wi';
import EmpWorktimeChoice from "../../setting/EmpWorktimeChoice";
import EmpWorktimeSetting from "../../setting/EmpWorktimeSetting";
import EmpPageSetting from "../../setting/EmpPageSetting";

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
  const empRole = useSelector( (state) => state.EMP_INFO.empInfo[2]);
  const [time, setTime] = useState([]);
  const handleChange = (event, newTime) => { setTime(newTime); };

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
        <EmpWorktimeChoice />
      </TabPanel>

      {/* 근무시간 설정 */}
      <TabPanel value={time} index={1}>
        <EmpWorktimeSetting />
      </TabPanel>

      {/* 페이지 보기 방식 */}
      <TabPanel value={time} index={2}>
        <EmpPageSetting />
      </TabPanel>
    </Box>
  );
}
