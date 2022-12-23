import React, { useState, useEffect, useContext } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import Avatar from '@mui/material/Avatar';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import { Button, Grid } from '@mui/material';
import styles from './BarApp.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { connectUser } from '../../../redux/user/userActions';
import { useUserContext } from '../../../context/UserProvider';

export default function BarApp(props) {
    const {  drawerWidth, mobileOpen, setMobileOpen } = props;
    const [user, setUser] = useUserContext();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <AppBar
            position="fixed"
            sx={{
                background: 'var(--menu-background)',
                color: "var(--primary)",
                width: { md: `calc(100% - ${drawerWidth}px)` },
                ml: { md: `${drawerWidth}px` },
            }}
        >
            <Toolbar>
                <Grid container
                    direction={"row"}
                    justifyContent={'stretch'}
                    alignItems={'center'}
                    columns={{ xs: 12, sm: 12 }}
                >
                    <Grid item justifyContent={'center'} alignItems={'center'}
                        xs sm
                    >
                        <Stack direction={"row"} alignItems={"center"} p={1} spacing={0.5}
                        >
                            <IconButton
                                color="primary"
                                aria-label="open drawer"
                                edge="start"
                                onClick={handleDrawerToggle}
                                sx={{
                                    mr: { xs: 2, sm: 0 }, display: { md: 'none' },
                                }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Avatar id="avatar-user" className={styles['fullscreen']} src={user.profilPhotoURL} sx={{ width: 40, height: 40 }} />
                            <Typography variant="h8" noWrap component="div" className='evidence' sx={{ fontWeight: 'bold' }}>
                                {user.phoneNumber}
                            </Typography>
                        </Stack>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );

}