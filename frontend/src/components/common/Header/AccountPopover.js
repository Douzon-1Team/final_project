import {useEffect, useRef, useState} from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton } from '@mui/material';
// components
import MenuPopover from './MenuPopover';
import {useSelector} from "react-redux";
import {useNavigate} from "react-router";
import { UserImg } from "../../common/Logo/LogoStyle"
import SettingModal from "../Modal/SettingModal";
import {ImProfile} from "react-icons/im"
import {TbLogout} from "react-icons/tb"
import {AiFillSetting} from "react-icons/ai"
import {getProfile} from "../../../apis/ApiServices";

export default function AccountPopover() {
  const empInfo = useSelector( (state) => state.EMP_INFO.empInfo );
  const navigate = useNavigate();
  const anchorRef = useRef(null);

  const empNo = useSelector( (state) => state.EMP_INFO.empInfo[0] );
  const accessToken = useSelector( (state) => state.ACCESS_TOKEN.accessToken);
  const [emp, setEmp] = useState({ profilePath: null } );

  useEffect(() => {
    getProfile({empNo, accessToken}).then(response => {
      setEmp(response.data);
    })
  }, []);
  //add


  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        {/*<UserImg style={{height: '50px', width: '50px'}} src = {empInfo[3]} />*/}
        <UserImg style={{height: '50px', width: '50px'}} src = {emp.profilePath} />
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          p: 0,
          mt: 1.5,
          ml: 0.75,
          '& .MuiMenuItem-root': {
            typography: 'body2',
            borderRadius: 0.75,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
              {empInfo[1]}({empInfo[0]})
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />
        <MenuItem onClick={() => { return navigate("/profile") }}
                  sx={{ m: 1 }}>
          <ImProfile style={{marginRight: '7px'}}/>마이페이지
        </MenuItem>
        <MenuItem onClick={() => { return <SettingModal/> }}
                  sx={{ m: 1 }}>
          <AiFillSetting /><SettingModal/>
        </MenuItem>

        <Divider sx={{ borderStyle: 'dashed' }} />
        <MenuItem onClick={() => { return navigate("/logout") }}
                  sx={{ m: 1 }}>
          <TbLogout style={{marginRight: '7px'}} />로그아웃
        </MenuItem>
      </MenuPopover>
    </>
  );
}
