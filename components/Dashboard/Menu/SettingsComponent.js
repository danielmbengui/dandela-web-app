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
import { Container, Stack } from '@mui/material';

export default function SettingsComponent({firebase, settingsPage}) {
    const theme = useTheme();

    return (
        <ListItem component="div" disablePadding>
            <ListItemButton
                onClick={() => {
                    firebase.auth().signOut().then(() => {
                        // Sign-out successful.
                        location.href = "/";
                        console.log("Disconnected !!!");
                    }).catch((error) => {
                        // An error happened.
                        console.log("ERROR Disconnected !!!");
                    });
                    console.log("CLICK Disconnected !!!");
                }}
                sx={{
                    height: 56,
                    color: theme.palette.text.primary,
                    '&:hover': {
                        backgroundColor: 'var(--primary-opacity)',
                    },
                }}
            >
                <ListItemIcon>
                    <LogoutIcon sx={{
                        color: 'var(--text-primary)',
                    }}  />
                </ListItemIcon>
                <ListItemText
                    primary="Déconnecter"
                    primaryTypographyProps={{
                        //color: '',
                        fontWeight: 'medium',
                        variant: 'body2',
                    }}
                />
            </ListItemButton>
            <Link href="/settings">
            <Stack sx={{
                bgcolor: settingsPage ? 'var(--primary)' : '',
                cursor: 'pointer',
                height: '100%',
                '&:hover': {
                    bgcolor: 'var(--primary)',
                },
            }}>
            <Tooltip title="Paramètres"  >
                <IconButton
                    size="large"
                    sx={{
                        '& svg': {
                            //color: 'rgba(255,255,255,0.8)',
                            //color: 'var(--text-primary)',
                            transition: '0.2s',
                            transform: 'translateX(0) rotate(0)',
                        },
                        '&:hover': {
                            '& svg:first-of-type': {
                                transform: 'translateX(-4px) rotate(-20deg)',
                                color: 'var(--text-secondary)',
                            },
                            '& svg:last-of-type': {
                                right: 0,
                                opacity: 1,
                            },
                        },
                        '&:after': {
                            content: '""',
                            position: 'absolute',
                            height: '80%',
                            display: 'block',
                            left: 0,
                            width: '1px',
                            bgcolor: 'divider',
                        },
                    }}
                >
                    <Settings sx={{color: 'var(--text-primary)'}} />
                    <ArrowRight sx={{ position: 'absolute', right: 4, opacity: 0, color: 'var(--text-secondary)' }} />
                </IconButton>
            </Tooltip>
            </Stack>
            </Link>
        </ListItem>
    );
}