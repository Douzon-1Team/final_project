import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Link, Button, Drawer, Typography, Avatar, Stack } from '@mui/material';
// mock
// import account from '../../_mock/account';
// hooks
import useResponsive from './useResponsive';
// components
import Scrollbar from '../Header/Scrollbar';
import NavSection from './NavSection';
//
import navConfig from './NavConfig';
import {LogoImgbox, UserImg} from "../Logo/LogoStyle";
import {useNavigate} from "react-router";
import {useSelector} from "react-redux";
import SideBar from "./SideBar";

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 300;

const RootStyle = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('lg')]: {
        flexShrink: 0,
        width: DRAWER_WIDTH,
    },
}));

const AccountStyle = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2, 2.5),
    borderRadius: Number(theme.shape.borderRadius) * 1.5,
    backgroundColor: theme.palette.grey[500_12],
}));

// ----------------------------------------------------------------------

DashboardSidebar.propTypes = {
    isOpenSidebar: PropTypes.bool,
    onCloseSidebar: PropTypes.func,
};

export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }) {
    const empInfo = useSelector((state) => state.EMP_INFO.empInfo);
    let empRole;
    if (empInfo[2] === "ROLE_MANAGER") {
        empRole = "근태관리자"
    } else if (empInfo[2] === "ROLE_USER") {
        empRole = "사원"
    } else if (empInfo[2] === "ROLE_ADMIN") {
        empRole = "admin"
    }
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const isDesktop = useResponsive('up', 'lg');

    useEffect(() => {
        if (isOpenSidebar) {
            onCloseSidebar();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    const renderContent = (
        <Scrollbar
            sx={{
                height: 1,
                '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
            }}
        >
            <Box sx={{ display: 'inline-flex' }}>
                <LogoImgbox onClick={() => {
                    navigate("/main");
                    window.location.reload("/main");
                }} />
            </Box>

            <Box sx={{ mb: 5, mx: 2.5 }}>
                <Link underline="none" component={RouterLink} to="#">
                    <AccountStyle>
                        <UserImg style={{height: '50px', width: '50px'}} src = {empInfo[3]} />
                        <Box sx={{ ml: 2 }}>
                            <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                                {empInfo[1]}({empInfo[0]})
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                {empRole}
                            </Typography>
                        </Box>
                    </AccountStyle>
                </Link>
            </Box>
            <SideBar />

            <Box sx={{ flexGrow: 1 }} />

        </Scrollbar>
    );

    return (
        <RootStyle>
            {!isDesktop && (
                <Drawer
                    open={isOpenSidebar}
                    onClose={onCloseSidebar}
                    PaperProps={{
                        sx: { width: DRAWER_WIDTH },
                    }}
                >
                    {renderContent}
                </Drawer>
            )}

            {isDesktop && (
                <Drawer
                    open
                    variant="persistent"
                    PaperProps={{
                        sx: {
                            width: DRAWER_WIDTH,
                            bgcolor: 'background.default',
                            borderRightStyle: 'dashed',
                        },
                    }}
                >
                    {renderContent}
                </Drawer>
            )}
        </RootStyle>
    );
}
