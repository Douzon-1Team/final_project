import { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton } from '@mui/material';
// components
import MenuPopover from './MenuPopover';
import {useSelector} from "react-redux";
import {useNavigate} from "react-router";
import { UserImg } from "../../common/Logo/LogoStyle"

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: '마이프로필',
    linkTo: '/profile',
  },
  {
    label: '환경설정',
    linkTo: '#',
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
    const empInfo = useSelector( (state) => state.EMP_INFO.empInfo );
    const navigate = useNavigate();
  const anchorRef = useRef(null);

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
          {/* TODO : 둘 중 어떤거 쓸지 정해야함 */}
          {/* 1. 기존 유저 이미지 */}
          <UserImg />
        {/*  2. material ui에서 가져온거 여기에 src만 넣어주면 ok임 */}
        {/*<Avatar alt="photoURL" />*/}
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

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.label} to={option.linkTo} component={RouterLink} onClick={handleClose}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={() => {
            return navigate("/logout")
        }} sx={{ m: 1 }}>
          로그아웃
        </MenuItem>
      </MenuPopover>
    </>
  );
}
