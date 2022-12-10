import React, { useState, useEffect, useContext } from 'react';
import Box from '@mui/material/Box';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ArrowRight from '@mui/icons-material/ArrowRight';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import LogoutIcon from '@mui/icons-material/Logout';
import Home from '@mui/icons-material/Home';
import Settings from '@mui/icons-material/Settings';
import People from '@mui/icons-material/People';
import PermMedia from '@mui/icons-material/PermMedia';
import Dns from '@mui/icons-material/Dns';
import Public from '@mui/icons-material/Public';
import { useTheme } from '@mui/material/styles';
import Link from 'next/link';
import SwitchThemeComponent from './SwitchThemeComponent';
import ProfileComponent from './ProfileComponent';
import TransfertComponent from './TransfertComponent';
import { Container } from '@mui/material';

const Navigation = styled(List)({
    '& .MuiListItemButton-root': {
        paddingLeft: 24,
        paddingRight: 24,
    },
    '& .MuiListItemIcon-root': {
        minWidth: 0,
        marginRight: 16,
    },
    '& .MuiSvgIcon-root': {
        fontSize: 20,
    },
});

export default function MenuDashboard({ drawerWidth, firebase, profilePage }) {
    const themeGeneral = useTheme();

    return (
        <Box sx={{ display: 'flex', width: drawerWidth }}>
            <ThemeProvider
                theme={createTheme({
                    components: {
                        MuiListItemButton: {
                            defaultProps: {
                                disableTouchRipple: true,
                            },
                        },
                    },
                    palette: {
                        mode: themeGeneral.palette.mode,
                        primary: { main: themeGeneral.palette.primary.main },
                        background: { paper: themeGeneral.palette.background.paper.main },
                        divider: themeGeneral.palette.divider,
                    },
                })}
            >
                <Paper elevation={0} sx={{ maxWidth: drawerWidth }}>
                    <Navigation component="nav" disablePadding>
                    <TransfertComponent /> 
                    <Divider />
                    </Navigation>
                </Paper>
            </ThemeProvider>
        </Box>
    );
}