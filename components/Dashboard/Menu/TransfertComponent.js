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

const data = {
    title: 'Transferts',
    subtitle: "Créer, voir, statistiques",
    menu: [
        { icon: <AddCircleIcon />, label: 'Nouveau', link: '/' },
        { icon: <Dns />, label: 'In progress', link: '/' },
        { icon: <PermMedia />, label: 'All', link: '/' },
        { icon: <Public />, label: 'Statistics', link: '/' },
    ],
};

export default function TransfertComponent() {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
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
                        fontSize: 15,
                        fontWeight: 'medium',
                        lineHeight: '20px',
                        mb: '2px',
                        color: theme.palette.primary.main,
                    }}

                    secondary={data.subtitle}
                    secondaryTypographyProps={{
                        noWrap: true,
                        fontSize: 12,
                        lineHeight: '16px',
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
                                color: 'var(--text-primary)',
                                '&:hover': {
                                    backgroundColor: 'var(--primary)',
                                    color: 'var(--text-secondary)',
                                },
                            
                            }}
                        >
                            <ListItemIcon sx={{ color: 'inherit' }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={item.label}
                                primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
                            />
                        </ListItemButton>
                    </Link>
                ))}
        </Box>
    );
}