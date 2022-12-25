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

import AddCircleIcon from '@mui/icons-material/AddCircle';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import ApprovalIcon from '@mui/icons-material/Approval';
import { USER_TYPE_ADMIN, USER_TYPE_EMPLOYE_ANGOLA } from '../../../constants';
import { useTranslation } from 'react-i18next';

export default function TransfertComponent(props) {
    const {user, openSub, pages, newtransfertPage, isAdmin} = props;
    const theme = useTheme();
    const [open, setOpen] = useState(openSub);
    const { t } = useTranslation('common');


    const menu = createMenu();

    function createMenu() {
        const menu = [];
        if (user) {
            if (user.type !== USER_TYPE_EMPLOYE_ANGOLA) {
                menu.push({ icon: <AddCircleIcon fontSize='large' />, label: t('menuTransfertsNew'), link: '/transferts/new', active: pages.newtransfert});
            }
            menu.push({ icon: <CurrencyExchangeIcon fontSize='large' />, label: t('menuTransfertsInProgress'), link: '/transferts/inprogress', active: pages.inprogress });
            if (isAdmin) {
                //menu.push({ icon: <ApprovalIcon fontSize='large' />, label: t('menuTransfertsToValidate'), link: '/transferts/novalidlist', active: pages.novalid});
            }
        }
        return menu;
    }

    const data = {
        title: t('menuTransferts'),
        subtitle: t('menuTransfertsSubtitle'),
        menu: createMenu(),
        /*
        [  
            { icon: <AddCircleIcon />, label: 'Nouveau', link: '/transferts/new', active: pages.newtransfert},
            { icon: <Dns />, label: 'En cours', link: '/transferts/inprogress', active: pages.inprogress },
            { icon: <PermMedia />, label: 'Tous', link: '/transferts/all', active: pages.alltransfert },
            { icon: <Public />, label: 'Statistics', link: '/', active: false },
            
        ],
        */
    };

    useEffect(() => {
        if (user) {
            menu.push({ icon: <AddCircleIcon />, label: 'Nouveau', link: '/transferts/new', active: pages.newtransfert});

        }
    })

    return (
        <Box
            sx={{
                //bgcolor: open ? 'rgba(71, 98, 130, 0.2)' : null,
                //bgcolor: open ? 'var(--primary-opacity)' : null,
                pb: open ? 2 : 0,
                '&:hover, &:focus': {
                    backgroundColor: 'var(--primary-opacity)',
                },
            }}
        >
            <ListItemButton
                alignItems="flex-start"
                onClick={() => setOpen(!open)}
                sx={{
                    px: 3,
                    pt: 2.5,
                    pb: open ? 0 : 2.5,
                    '&:hover, &:focus': { '& svg': { opacity: open ? 1 : 0 } },
                }}
            >
                <ListItemText
                    primary={data.title}
                    primaryTypographyProps={{
                        fontSize: 'x-large',
                        fontWeight: 'medium',
                        fontFamily:'ChangaOneRegular',
                        lineHeight: '20px',
                        mb: '1vh',
                        color: theme.palette.primary.main,
                    }}

                    secondary={data.subtitle}
                    secondaryTypographyProps={{
                        noWrap: true,
                        fontSize: 'large',
                        lineHeight: '16px',
                        fontFamily:'ChangaOneRegular',
                        color: open ? 'rgba(0,0,0,0)' : 'var(--text-primary)',
                        //color: open ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0.5)',
                    }}
                    sx={{ my: 0 }}
                />
                <KeyboardArrowDown
                    sx={{
                        mr: -1,
                        opacity: 0,
                        transform: open ? 'rotate(-180deg)' : 'rotate(180deg)',
                        transition: '0.2s',
                    }}
                />
            </ListItemButton>
            {open &&
                data.menu.map((item, index) => (
                    <Link href={item.link} key={item.label + index}
                        style={{ textDecoration: 'none' }}>
                        <ListItemButton
                            key={item.label}
                            sx={{ 
                                py: 0, 
                                minHeight: 32, 
                                color: item.active ? 'var(--text-secondary)' : 'var(--text-primary)',
                                backgroundColor: item.active ? 'var(--primary)' : '',
                                '&:hover': {
                                    backgroundColor: 'var(--primary)',
                                    color: 'var(--text-secondary)',
                                },
                            
                            }}
                        >
                            <ListItemIcon sx={{ color: 'inherit', }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={item.label}
                                primaryTypographyProps={{ fontSize: 'x-large', fontFamily:'ChangaOneRegular', }}
                            />
                        </ListItemButton>
                    </Link>
                ))}
        </Box>
    );
}