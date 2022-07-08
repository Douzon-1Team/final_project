import PropTypes from 'prop-types';
import { set, sub } from 'date-fns';
import React, { useState, useRef } from 'react';
// @mui
import {
  Box,
  List,
  Badge,
  Button,
  Avatar,
  Tooltip,
  Divider,
  Typography,
  IconButton,
  ListItemText,
  ListSubheader,
  ListItemAvatar,
  ListItemButton, ListItemIcon, ListItem,
} from '@mui/material';
// utils
import { fToNow } from './formatTime';
// components
import Iconify from './Iconify';
import Scrollbar from './Scrollbar';
import MenuPopover from './MenuPopover';
import {MemberImg} from "../../../styles/NotificationStyle";
// ----------------------------------------------------------------------

const NOTIFICATIONS = [
  {
    id: '1',
    name: '임지영',
    avatar: "https://dzfinal.s3-ap-northeast-2.amazonaws.com/profile-220102-54e9edbd-10b6-4b03-8924-c288f68f3b91.jpeg",
    time: null,
  },
  {
    id: '2',
    name: '이지은',
    avatar: "https://dzfinal.s3-ap-northeast-2.amazonaws.com/profile-220102-54e9edbd-10b6-4b03-8924-c288f68f3b91.jpeg" ,
    time: null,
  },
  {
    id: '3',
    name: '이한용',
    avatar: "https://dzfinal.s3-ap-northeast-2.amazonaws.com/profile-220102-54e9edbd-10b6-4b03-8924-c288f68f3b91.jpeg",
    time: "9:12:00",
  },
  {
    id: '4',
    name: '신중호',
    avatar: 'https://dzfinal.s3-ap-northeast-2.amazonaws.com/profile-220102-54e9edbd-10b6-4b03-8924-c288f68f3b91.jpeg',
    time: "9:10:00",
  },
  {
    id: '5',
    name: '주승범',
    avatar: "https://dzfinal.s3-ap-northeast-2.amazonaws.com/profile-220102-54e9edbd-10b6-4b03-8924-c288f68f3b91.jpeg",
    time: null,
  },
];

export default function NotificationsPopover() {
  const anchorRef = useRef(null);

  const [notifications, setNotifications] = useState(NOTIFICATIONS);

  const tardy = notifications.filter((item) => item.time === null).length;

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
        color={open ? 'primary' : 'default'}
        onClick={handleOpen}
        sx={{ width: 40, height: 40 }}
      >
        <Badge badgeContent={tardy} color="error">
          <Iconify icon="eva:bell-fill" width={20} height={20} />
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
    name: PropTypes.string,
    avatar: PropTypes.any,
  }),
};

function NotificationItem({ notification }) {
  const { avatar, name } = renderContent(notification);

  return (
    <ListItemButton
      sx={{
        py: 1.5,
        px: 2.5,
        mt: '1px',
        ...(notification.time === null && {
          bgcolor: 'action.selected',
        }),
      }}
    >
      <ListItemAvatar>
        <MemberImg src = {notification.avatar} />
      </ListItemAvatar>
      <ListItemText
        primary={notification.name}
        secondary={notification.time ===null ? "미출근" : notification.time }
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
    avatar: notification.avatar ? <img alt={notification.name} src={notification.avatar} /> : null,
    name,
  };
}
