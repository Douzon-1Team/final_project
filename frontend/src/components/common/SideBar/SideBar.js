import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import WorkOffIcon from '@mui/icons-material/WorkOff';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import GroupsIcon from '@mui/icons-material/Groups';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import PeopleIcon from '@mui/icons-material/People';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import {useSelector} from "react-redux";

export const SideBar = (props) => {
  console.log(props);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  let navigate = useNavigate();
  const empRole = useSelector( (state) => state.EMP_INFO.empInfo[2] );
  const [role, setRole] = useState(""); // 0 일반 사용자, 1 담당자, 2 관리자

  const handleClick = () => {
    setOpen(!open);
  };
  const handleClick2 = () => {
    setOpen2(!open2);
  };
  const handleClick3 = () => {
    setOpen3(!open3);
  };
  const handleClick4 = () => {
    setOpen4(!open4);
  };

  useEffect(() => {
    let chkRole = [...role];
    if (empRole === "ROLE_MANAGER") {
      chkRole[1] = empRole;
      setRole(1);
    } else if (empRole === "ROLE_ADMIN") {
      chkRole[2] = empRole;
      setRole(2);
    } else {
      chkRole[0] = empRole;
      setRole(0);
    }
  }, []);

  return (
      <>
      <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
          component="nav"
      >
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <WorkHistoryIcon />
          </ListItemIcon>
          <ListItemText primary="휴가" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }} onClick={() => navigate("/leavereq")}>
              <ListItemIcon>
                <BorderColorIcon />
              </ListItemIcon>
              <ListItemText primary="내 휴가 신청" />
            </ListItemButton>
          </List>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }} onClick={() => navigate("/leavelist")}>
              <ListItemIcon>
                <FormatListBulletedIcon />
              </ListItemIcon>
              <ListItemText primary="내 휴가 신청 목록" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
  <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
  >
    <ListItemButton onClick={handleClick2}>
      <ListItemIcon>
        <WorkOffIcon />
      </ListItemIcon>
      <ListItemText primary="근태 조정" />
      {open2 ? <ExpandLess /> : <ExpandMore />}
    </ListItemButton>
    <Collapse in={open2} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        <ListItemButton sx={{ pl: 4 }} onClick={() => navigate("/attendancereq")}>
          <ListItemIcon>
            <BorderColorIcon />
          </ListItemIcon>
          <ListItemText primary="내 근태조정 신청" />
        </ListItemButton>
      </List>
      <List component="div" disablePadding>
        <ListItemButton sx={{ pl: 4 }} onClick={() => navigate("/attendancelist")}>
          <ListItemIcon>
            <FormatListBulletedIcon />
          </ListItemIcon>
          <ListItemText primary="내 근태조정 신청 목록" />
        </ListItemButton>
      </List>
    </Collapse>
  </List>
        {role !== 0 ?
        <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            component="nav"
        >
          <ListItemButton onClick={handleClick3}>
            <ListItemIcon>
              <GroupsIcon />
            </ListItemIcon>
            <ListItemText primary="팀 관리" />
            {open3 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open3} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }} onClick={() => navigate("/acceptreq")}>
                <ListItemIcon>
                  <FactCheckIcon />
                </ListItemIcon>
                <ListItemText primary="부서원 근태관리" />
              </ListItemButton>
            </List>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }} onClick={() => navigate("/deptmember")}>
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="사원 목록" />
              </ListItemButton>
            </List>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }} onClick={() => navigate("/report")}>
                <ListItemIcon>
                  <InsertChartIcon />
                </ListItemIcon>
                <ListItemText primary="보고서 관리" />
              </ListItemButton>
            </List>
          </Collapse>
        </List>
        : null}
        {role === 2 ?
            <List
                sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}
                component="nav"
            >
              <ListItemButton onClick={handleClick4}>
                <ListItemIcon>
                  <AdminPanelSettingsIcon/>
                </ListItemIcon>
                <ListItemText primary="admin"/>
                {open4 ? <ExpandLess/> : <ExpandMore/>}
              </ListItemButton>
              <Collapse in={open4} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{pl: 4}} onClick={() => navigate("/profile")}>
                    <ListItemIcon>
                      <PeopleIcon/>
                    </ListItemIcon>
                    <ListItemText primary="사원 등록"/>
                  </ListItemButton>
                </List>
                <List component="div" disablePadding>
                  <ListItemButton sx={{pl: 4}} onClick={() => navigate("/admin/list")}>
                    <ListItemIcon>
                      <FormatListBulletedIcon/>
                    </ListItemIcon>
                    <ListItemText primary="사원 정보 조회"/>
                  </ListItemButton>
                </List>
              </Collapse>
            </List>
        : null }
      </>
  );
};
export default SideBar;
