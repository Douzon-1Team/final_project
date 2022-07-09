import PropTypes from 'prop-types';
import React, {useState, useRef, useEffect} from 'react';
// @mui
import {
  Box,
  List,
  Badge,
  Divider,
  Typography,
  IconButton,
  ListItemText,
  ListItemAvatar,
  ListItemButton,
} from '@mui/material';
// components
import { AiFillBell } from 'react-icons/ai';
import Scrollbar from './Scrollbar';
import MenuPopover from './MenuPopover';
import {MemberImg} from "../../../styles/NotificationStyle";

import {getNotificationTardyList, NotificationTardyList} from "../../../apis/NotifiactionApi";


// ----------------------------------------------------------------------

let NOTIFICATIONS = [];

export default function NotificationsPopover() {

  const anchorRef = useRef(null);

  const [notifications, setNotifications] = useState(NOTIFICATIONS);

  const tardy = notifications.filter((item) => item.approve === false).length;

  const [open, setOpen] = useState(null);

  const getTardyList = async () => {
    await getNotificationTardyList({empno:220101}).then(res =>{
      NOTIFICATIONS =res.data;
      setNotifications(NOTIFICATIONS);
    }).catch(console.log('수신 실패'))
  }


  useEffect(() => {
    getTardyList();
  }, []);

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
        color={open ? 'primary' : 'default'}
        onClick={handleOpen}
        sx={{ width: 40, height: 40 }}
      >
        <Badge badgeContent={tardy} color="error">
          <AiFillBell size={27} />
        </Badge>
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{ width: 360, p: 0, mt: 1.5, ml: 0.75 }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">근태 이상자</Typography>
          </Box>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Scrollbar sx={{ height: { xs: 340, sm: 'auto' } }}>
          <List disablePadding>
            {notifications.slice(0, NOTIFICATIONS.length).map((notification) => (
                <NotificationItem key={notification.id} notification={notification} />
            ))}
          </List>

        </Scrollbar>

        <Divider sx={{ borderStyle: 'dashed' }} />
      </MenuPopover>
    </>
  );
}

// ----------------------------------------------------------------------

NotificationItem.propTypes = {
    notification: PropTypes.shape({
    id: PropTypes.string,
    empno: PropTypes.string,
    name: PropTypes.string,
    profile: PropTypes.string,
    date: PropTypes.string,
    approve: PropTypes.bool,
  }),
};

function NotificationItem({ notification }) {
  const { profile, name } = renderContent(notification);
  return (
    <ListItemButton
      sx={{
        py: 1.5,
        px: 2.5,
        mt: '1px',
        ...(notification.date === null && {
          bgcolor: 'action.selected',
        }),
      }}
    >
      <ListItemAvatar>
        <MemberImg src = {notification.profile} />
      </ListItemAvatar>
      <ListItemText
        primary={notification.name + "(" + notification.empno + ")"}
        secondary={notification.date === null ? "미출근" : notification.date }
      />

    </ListItemButton>
  );
}

// ----------------------------------------------------------------------

function renderContent(notification) {
  const name = (
    <Typography variant="subtitle2">
      {notification.name}
      <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
        &nbsp;
      </Typography>
    </Typography>
  );

  return {
    profile: notification.profile ? <img alt={notification.name} src={notification.profile} /> : null,
    name,
  };
}
