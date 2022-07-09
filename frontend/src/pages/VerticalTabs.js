import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {BtnBox, Button, InfoBox, Table, PwdBox, TableBox, TableBox2} from "../styles/profile";
import {useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router";
import {getProfile} from "../apis/ApiService";
import { updatePwd} from "../apis/Users";
import SettingModal from "../components/common/Modal/SettingModal";
import {PwdError, PwdNotCollect, PwdNotRight, PwdSuccess} from "../components/common/alert/alert";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: '100%',
    width: '100%',
    minWidth: '50vw',
    maxHeight: '50vh',
    minHeight: '50vh',
    borderRadius: '20px',
    boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default function VerticalTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
    <div className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
      >
        <Tab label="개인정보" {...a11yProps(0)} />
        <Tab label="비밀번호 변경" {...a11yProps(1)} />
        <Tab label={<SettingModal/>} {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <TableBox>
          <Table>
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
      </TabPanel>

      <TabPanel value={value} index={1}>
        <form onSubmit={handleSubmit(onValid)}>
          <input {...register('empno')} type="text" defaultValue={empNo} hidden />
          <TableBox2>
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
          </TableBox2>
          <BtnBox>
            <Button type="submit">저 장</Button>&nbsp;&nbsp;
            <Button type="reset">취 소</Button>
          </BtnBox>
        </form>
      </TabPanel>
    </div>
  );
}
