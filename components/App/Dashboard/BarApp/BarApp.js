import React, { useState, useEffect, useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import styles from './BarApp.module.css';
import { useUserContext } from '../../../../context/UserProvider';

export default function BarApp(props) {
    const {  drawerWidth, mobileOpen, setMobileOpen } = props;
    const [user,] = useUserContext();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <AppBar
            position="fixed"
            sx={{
                background: 'var(--menu-background)',
                color: "var(--primary)",
                width: { xs:'100%', md: `calc(100% - ${drawerWidth}px)` },
                ml: { xs:0, md: `${drawerWidth}px` },
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
                            <Avatar id="avatar-user" alt='myProfile' className={styles['fullscreen']} src={user.profilPhotoURL} sx={{ width: 40, height: 40 }} />
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