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
import { Container } from '@mui/material';
import { useTranslation } from 'next-i18next'
import { NAMESPACE_LANGAGE_COMMON, PAGE_LINK_INPROGRESS_LIST, PAGE_LINK_NEW_TRANSFER } from '../../../../constants';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export default function AddTransferComponent({ addtransferPage }) {
    const { t } = useTranslation(NAMESPACE_LANGAGE_COMMON);

    const theme = useTheme();

    return (
        <Link
            href={PAGE_LINK_NEW_TRANSFER}
            style={{ textDecoration: 'none' }}
            sx={{ py: 0, minHeight: 32, color: 'rgba(255,255,255,.8)', }}
        >
            <Container
                sx={{
                    backgroundColor: addtransferPage ? 'var(--primary)' : 'var(--menu-background)',
                    color: addtransferPage ? 'var(--text-secondary)' : 'var(--text-primary)',
                    '&:hover': {
                        backgroundColor: 'var(--primary)',
                        color: 'var(--text-secondary)',                    },
                }}
            >
                <ListItemButton
                    //key={item.label}
                    sx={{
                        //width: drawerWidth,
                        //backgroundColor: addtransferPage ? 'var(--primary)' : 'var(--menu-background)',
                    }}
                >
                    <ListItemIcon sx={{ color: 'inherit' }}>
                        <AddCircleIcon fontSize='large' sx={{
                            /*
color: addtransferPage ? 'var(--text-secondary)' : 'var(--text-primary)',
                            '&:hover': {
                                color: 'var(--text-secondary)',
                            },
                            */
                        }}
                        />
                    </ListItemIcon>
                    <ListItemText
                        primary={t('menuTransfertsNew')}
                        primaryTypographyProps={{
                            fontSize: 'x-large',
                            //fontWeight: 'bold',
                            fontFamily: 'ChangaOneRegular'
                            /*
                            color: addtransferPage ? 'var(--text-secondary)' : 'var(--text-primary)',
                            '&:hover': {
                                color: 'var(--text-secondary)',
                            },
                            */
                        }}
                    />
                </ListItemButton>
            </Container>
        </Link>
    );
}