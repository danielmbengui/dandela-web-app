import React, { useState, useEffect, useContext } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { ThemeModeProviderContext } from '../../context/ThemeProvider';
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

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import { Button, Grid } from '@mui/material';
import Image from 'next/image';

import { updateUser } from '../../redux/user/userActions';
import { updateScreenMode } from '../../redux/user/userActions';
import { useDispatch, useSelector } from "react-redux";
import PermanentBackdrop from '../Loading/PermanentBackdrop';
import ErrorLogin from '../Authentication/Login/ErrorLogin';
import ContainerLogin from '../Authentication/ContainerLogin';
import Firebash from './Firebash';
//import logo from "/img/logo.png";
const logo = "/img/logo.png";


const drawerWidth = 240;

const styleItem = {
    backgroundColor: 'transparent',
    color: 'grey',
}

const styleItemActive = {
    backgroundColor: 'var(--primary)',
    borderRadius: "5px",
    //color: 'white'
}

const styleTextActive = {
    color: 'white',
}

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

function Menu(props) {
    const { window, children, firebase, auth, content, pages, currentOpen, title, user } = props;
    const dispatch = useDispatch();
    const theme = useTheme();
    const themeMode = useContext(ThemeModeProviderContext);
    const [mode, setMode] = useState(theme.palette.mode);
    const [checked, setChecked] = useState(theme.palette.mode === 'dark' ? true : false);

    const [mobileOpen, setMobileOpen] = React.useState(false);

    const dashboard = [
        {
            name: 'Profile', link: '/profile',
            styleBackground: pages.profile !== undefined && pages.profile ? styleItemActive : styleItem,
            styleText: pages.profile !== undefined && pages.profile ? styleTextActive : styleItem,
        },
        {
            name: 'About', link: '/about',
            styleBackground: pages.about !== undefined && pages.about ? styleItemActive : styleItem,
            styleText: pages.about !== undefined && pages.about ? styleTextActive : styleItem,
        },
    ]

    useEffect(() => {
        setChecked(theme.palette.mode === 'dark' ? true : false);
    }, [theme.palette.mode])

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const onChangeMode = (event) => {
        themeMode.toggleColorMode();
        //setMode(event.target.checked ? 'dark' : 'light');
        setChecked(event.target.checked ? true : false);
        dispatch(updateScreenMode(event.target.checked ? 'dark' : 'light'));
    }

    const drawer = (
        <div style={{ textAlign: 'center', backgroundColor:theme.palette.background.paper.main }}>

            <Firebash drawerWidth={drawerWidth} />
            <Divider />
            <List>
                {dashboard.map((item, index) => (
                    <Link key={item.name + index} href={item.link}>
                        <ListItem disablePadding style={item.styleBackground}>
                            <ListItemButton >
                                <ListItemIcon style={item.styleText}>
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon>
                                <ListItemText primary={item.name} style={item.styleText} />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                ))}
            </List>
            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider sx={{ marginTop: '5vh', marginBottom: '3vh' }} />
            <Button fullWidth variant='contained' onClick={() => {
                firebase.auth().signOut().then(() => {
                    // Sign-out successful.
                    location.href = "/";
                    console.log("Disconnected !!!");
                }).catch((error) => {
                    // An error happened.
                    console.log("ERROR Disconnected !!!");
                });
                console.log("CLICK Disconnected !!!");
            }}>
                Disconnect
            </Button>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <>

            <div style={{ display: !user ? 'block' : 'none', }}>
                <ContainerLogin>
                    <ErrorLogin phoneNumber={''} />
                </ContainerLogin>
            </div>
            <Box sx={{ display: user ? 'flex' : 'none', }}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    sx={{
                        //background: theme.palette.background.menu,
                        //background: 'transparent',
                        background: 'var(--background-color)',
                        color: "var(--primary)",
                        width: { md: `calc(100% - ${drawerWidth}px)` },
                        ml: { md: `${drawerWidth}px` },
                    }}
                >
                    <Toolbar>
                        <Grid container
                            direction={"row"}
                            //sx={{background:'cyan'}}
                            justifyContent={'stretch'}
                            alignItems={'center'}
                            columns={{ xs: 12, sm: 12 }}
                        >
                            <Grid item justifyContent={'center'} alignItems={'center'}
                                //sx={{background:'yellow'}} 
                                xs sm
                            >
                                <Stack direction={"row"} alignItems={"center"} p={1} spacing={0.5}
                                //sx={{background:'green'}}
                                >
                                    <IconButton
                                        color="primary"
                                        aria-label="open drawer"
                                        edge="start"
                                        onClick={handleDrawerToggle}
                                        sx={{
                                            mr: { xs: 2, sm: 0 }, display: { md: 'none' },
                                            // background:'cyan'
                                        }}
                                    >
                                        <MenuIcon />
                                    </IconButton>
                                    <Typography variant="h8" noWrap component="div" className='evidence'
                                        sx={{ fontWeight: 'bold' }}
                                    >
                                        {user.phoneNumber}
                                    </Typography>
                                    {
                                        /*
<Image
                                        src={logo}
                                        width={40}
                                        height={40}
                                        //height={320}
                                        alt="logo"
                                        //loading='lazy'
                                        priority
                                        sizes="(min-width: 60em) 24vw,
                                        (min-width: 28em) 45vw,
                                        100vw"
                                        style={{
                                            //width: "100%",
                                            //height: "auto",
                                            //background:'red'
                                        }}
                                    />
                                    <Typography variant="h8" noWrap component="div" className='evidence'
                                        sx={{ fontWeight: 'bold' }}
                                    >
                                        {title}
                                    </Typography>
                                        */
                                    }
                                </Stack>

                            </Grid>
                            {
                                /*
<Grid item
                                xs={2} sm={1}
                            //sx={{background:'green'}}
                            >
                                <Stack direction={"row"} alignItems={"flex-end"}
                                //sx={{background:'green'}}
                                >
                                    <FormControlLabel
                                        control={<MaterialUISwitch sx={{ m: 1 }} checked={checked} onChange={onChangeMode} />}
                                    //label={`Mode ${theme.palette.mode}`}
                                    //labelPlacement="start"
                                    />
                                </Stack>
                            </Grid>
                                */
                            }
                        </Grid>

                    </Toolbar>
                </AppBar>
                <Box
                    component="nav"
                    sx={{ width: { md: drawerWidth }, flexShrink: { sm: 0 } }}
                    aria-label="mailbox folders"
                >
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                    <Drawer
                        container={container}
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                        sx={{
                            display: { xs: 'block', md: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                    >
                        {drawer}
                    </Drawer>
                    <Drawer
                        variant="permanent"
                        sx={{
                            display: { xs: 'none', md: 'block' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                        open
                    >
                        {drawer}
                    </Drawer>
                </Box>
                <Box
                    component="main"
                    sx={{ flexGrow: 1, p: 3, width: { md: `calc(100% - ${drawerWidth}px)` } }}
                >
                    <Toolbar />
                    
                    {children}
                    <Typography paragraph>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
                        enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
                        imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
                        Convallis convallis tellus id interdum velit laoreet id donec ultrices.
                        Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
                        adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
                        nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
                        leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
                        feugiat vivamus at augue. At augue eget arcu dictum varius duis at
                        consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
                        sapien faucibus et molestie ac.
                    </Typography>
                    <Typography paragraph>
                        Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
                        eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
                        neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
                        tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
                        sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
                        tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
                        gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
                        et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
                        tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
                        eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
                        posuere sollicitudin aliquam ultrices sagittis orci a.
                    </Typography>
                </Box>
            </Box>
        </>
    );
}

Menu.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default Menu;
