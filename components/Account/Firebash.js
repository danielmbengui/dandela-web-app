import React, {useState, useEffect, useContext} from 'react';
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
import Home from '@mui/icons-material/Home';
import Settings from '@mui/icons-material/Settings';
import People from '@mui/icons-material/People';
import PermMedia from '@mui/icons-material/PermMedia';
import Dns from '@mui/icons-material/Dns';
import Public from '@mui/icons-material/Public';
import {useTheme } from '@mui/material/styles';
import { Switch } from '@mui/material';
import { updateScreenMode } from '../../redux/user/userActions';
import { ThemeModeProviderContext } from '../../context/ThemeProvider';
import { useDispatch } from 'react-redux';
import Link from 'next/link';

const dataTransfert = {
    title: 'Transfert',
    subtitle: "Create new, view transferts, statistics",
    data: [
        { icon: <People />, label: 'Create new', link:'/' },
        { icon: <Dns />, label: 'In progress', link:'/' },
        { icon: <PermMedia />, label: 'All', link:'/' },
        { icon: <Public />, label: 'Statistics', link:'/' },
      ],
};

const dataAccount = [
    { icon: <People />, label: 'Profile', link:'/profile' },
    { icon: <Dns />, label: 'Database', link:'/' },
    { icon: <PermMedia />, label: 'Storage', link:'/' },
    { icon: <Public />, label: 'Hosting', link:'/' },
  ];

const FireNav = styled(List)({
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

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
        margin: 1,
        padding: 0,
        transform: 'translateX(6px)',
        '&.Mui-checked': {
            color: '#fff',
            transform: 'translateX(22px)',
            '& .MuiSwitch-thumb:before': {
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                    'var(--text-secondary)',
                )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
            },
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: "var(--primary-opacity)"
            },
        },
    },
    '& .MuiSwitch-thumb': {
        backgroundColor: "var(--primary)",
        width: 32,
        height: 32,
        '&:before': {
            content: "''",
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                '#fff',
            )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
        },
    },
    '& .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: "var(--primary-opacity)",
        borderRadius: 20 / 2,
    },
}));

export default function Firebash({drawerWidth, firebase}) {
    const themeGeneral = useTheme();
    const dispatch = useDispatch();
    const themeMode = useContext(ThemeModeProviderContext);
    const [checked, setChecked] = useState(themeGeneral.palette.mode === 'dark' ? true : false);
  const [openTransfert, setOpenTransfert] = useState(false);
  const [openAccount, setOpenAccount] = React.useState(false);
  //const [open, setOpen] = React.useState(false);

  useEffect(() => {
    setChecked(themeGeneral.palette.mode === 'dark' ? true : false);
}, [themeGeneral.palette.mode])

const onChangeMode = (event) => {
    themeMode.toggleColorMode();
    //setMode(event.target.checked ? 'dark' : 'light');
    setChecked(event.target.checked ? true : false);
    dispatch(updateScreenMode(event.target.checked ? 'dark' : 'light'));
}
  return (
    <Box sx={{ display: 'flex', width:drawerWidth }}>
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
            mode: 'dark',
            primary: { main: themeGeneral.palette.primary.main },
            background: { paper: themeGeneral.palette.background.paper.main },
            divider: themeGeneral.palette.divider,
          },
        })}
      >
        <Paper elevation={0} sx={{ maxWidth: drawerWidth }}>
          <FireNav component="nav" disablePadding>
            <ListItemButton style={{marginTop:7, marginBottom:7}} component="a" href="#customized-list">
            <MaterialUISwitch  checked={checked} onChange={onChangeMode} />
              <ListItemText
                sx={{ my: 0 }}
                primary="Dandela"
                primaryTypographyProps={{
                  fontSize: 14,
                  fontWeight: 'medium',
                  letterSpacing: 0,
                  fontFamily:'EximaGeometric',
                  color:themeGeneral.palette.text.primary,
                }}
              />
            </ListItemButton>
            <Divider />
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
                color:themeGeneral.palette.primary.main,
            '&:hover': { 
                backgroundColor: 'var(--primary-opacity)',
            }, }}
            >
                <ListItemIcon>
                  <Home sx={{color:themeGeneral.palette.primary.main}} />
                </ListItemIcon>
                <ListItemText
                  primary="Disconnect"
                  primaryTypographyProps={{
                    //color: '',
                    fontWeight: 'medium',
                    variant: 'body2',
                  }}
                />
              </ListItemButton>
              <Tooltip title="Settings">
                <IconButton
                  size="large"
                  sx={{
                    '& svg': {
                      //color: 'rgba(255,255,255,0.8)',
                        color: 'var(--text-primary)',
                      transition: '0.2s',
                      transform: 'translateX(0) rotate(0)',
                    },
                    '&:hover, &:focus': {
                      bgcolor: 'unset',
                      '& svg:first-of-type': {
                        transform: 'translateX(-4px) rotate(-20deg)',
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
                  <Settings />
                  <ArrowRight sx={{ position: 'absolute', right: 4, opacity: 0 }} />
                </IconButton>
              </Tooltip>
            </ListItem>
            <Divider />
            <Box
              sx={{
                //bgcolor: openTransfert ? 'rgba(71, 98, 130, 0.2)' : null,
                //bgcolor: openTransfert ? 'var(--primary-opacity)' : null,
                pb: openTransfert ? 2 : 0,
                '&:hover, &:focus': { 
                    backgroundColor: 'var(--primary-opacity)',
                },
              }}
            >
              <ListItemButton
                alignItems="flex-start"
                onClick={() => setOpenTransfert(!openTransfert)}
                sx={{
                  px: 3,
                  pt: 2.5,
                  pb: openTransfert ? 0 : 2.5,
                  '&:hover, &:focus': { '& svg': { opacity: openTransfert ? 1 : 0 } },
                }}
              >
                <ListItemText
                  primary={dataTransfert.title}
                  primaryTypographyProps={{
                    fontSize: 15,
                    fontWeight: 'medium',
                    lineHeight: '20px',
                    mb: '2px',
                    color:themeGeneral.palette.text.primary,
                  }}
                  
                  secondary={dataTransfert.subtitle}
                  secondaryTypographyProps={{
                    noWrap: true,
                    fontSize: 12,
                    lineHeight: '16px',
                    color:openTransfert ? 'rgba(0,0,0,0)' : 'var(--primary-opacity)',
                    //color: openTransfert ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0.5)',
                  }}
                  sx={{ my: 0 }}
                />
                <KeyboardArrowDown
                  sx={{
                    mr: -1,
                    opacity: 0,
                    transform: openTransfert ? 'rotate(-180deg)' : 'rotate(0)',
                    transition: '0.2s',
                  }}
                />
              </ListItemButton>
              {openTransfert &&
                dataTransfert.data.map((item, index) => (
                  <Link href={item.link} key={item.label + index}>
                  <ListItemButton
                    key={item.label}
                    sx={{ py: 0, minHeight: 32, color: 'rgba(255,255,255,.8)' }}
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
            <Divider />
            <Box
              sx={{
                bgcolor: openAccount ? 'rgba(71, 98, 130, 0.2)' : null,
                pb: openAccount ? 2 : 0,
              }}
            >
              <ListItemButton
                alignItems="flex-start"
                onClick={() => setOpenAccount(!openAccount)}
                sx={{
                  px: 3,
                  pt: 2.5,
                  pb: openAccount ? 0 : 2.5,
                  '&:hover, &:focus': { '& svg': { opacity: openAccount ? 1 : 0 } },
                }}
              >
                <ListItemText
                  primary="Build"
                  primaryTypographyProps={{
                    fontSize: 15,
                    fontWeight: 'medium',
                    lineHeight: '20px',
                    mb: '2px',
                  }}
                  secondary="Profile, Firestore Database, Realtime Database, Storage, Hosting, Functions, and Machine Learning"
                  secondaryTypographyProps={{
                    noWrap: true,
                    fontSize: 12,
                    lineHeight: '16px',
                    color: openAccount ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0.5)',
                  }}
                  sx={{ my: 0 }}
                />
                <KeyboardArrowDown
                  sx={{
                    mr: -1,
                    opacity: 0,
                    transform: openAccount ? 'rotate(-180deg)' : 'rotate(0)',
                    transition: '0.2s',
                  }}
                />
              </ListItemButton>
              {openAccount &&
                dataAccount.map((item, index) => (
                  <Link href={item.link} key={item.label + index}>
                  <ListItemButton
                    key={item.label}
                    sx={{ py: 0, minHeight: 32, color: 'rgba(255,255,255,.8)' }}
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
          </FireNav>
        </Paper>
      </ThemeProvider>
    </Box>
  );
}