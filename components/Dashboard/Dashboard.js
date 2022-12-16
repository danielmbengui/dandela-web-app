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
import Avatar from '@mui/material/Avatar';

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
import SwitchThemeComponent from './Menu/SwitchThemeComponent';
import ProfileComponent from './Menu/ProfileComponent';
import TransfertComponent from './Menu/TransfertComponent';
import SettingsComponent from './Menu/SettingsComponent';
import MenuDashboard from './Menu/MenuDashboard';
import Footer from './Footer';
import BarApp from './BarApp/BarApp';
import { COMPANY_NAME, USER_TYPE_ADMIN } from '../../constants';
import AdminComponent from './Menu/AdminComponent';
//import logo from "/img/logo.png";
const logo = "/img/logo.png";


const drawerWidth = 240;

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

function Dashboard(props) {
    const { window, children, firebase, auth, content, pages, currentOpen, title, user, storage } = props;
    const dispatch = useDispatch();
    const theme = useTheme();
    const themeMode = useContext(ThemeModeProviderContext);
    const [mode, setMode] = useState(theme.palette.mode);
    const [checked, setChecked] = useState(theme.palette.mode === 'dark' ? true : false);

    const [mobileOpen, setMobileOpen] = useState(false);

    const drawer = (
        <div style={{ textAlign: 'center', backgroundColor: 'var(--menu-background)' }}>
            <SwitchThemeComponent />
            <Divider />
            <SettingsComponent firebase={firebase} settingsPage={pages.settings} />
            <Divider />
            <TransfertComponent user={user} openSub={true} pages={{
                newtransfert: pages.newtransfert,
                inprogress: pages.inprogress,
                novalid: pages.novalid,
                alltransfert: pages.alltransfert,
            }}
                newtransfertPage={pages.newtransfert} />
            <Divider />
            {
                user && user.type === USER_TYPE_ADMIN && <>
                <AdminComponent  user={user} openSub={true} pages={{
                    users: pages.users,
                    countries: pages.countries,
                    statistics: pages.statistics,
                }}
                    newtransfertPage={pages.newtransfert} />
                    <Divider />
                </>
            }
            
            <ProfileComponent profilePage={pages.profile} />
            <Divider />
            <List sx={{display:'none'}}>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <Link href="/about" key={text + index}>
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                ))}
            </List>
            <Divider sx={{display:'none'}} />
            <List sx={{display:'none'}}>
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
            <Divider sx={{display:'none'}} />
            <Grid container sx={{height:'100%', bgcolor: 'var(--menu-background)'}} direction={'row'} justifyContent={'center'} alignItems={'flex-end'}>
                <Grid>
                <Typography sx={{
                fontFamily: 'ChangaOneRegular',
                fontSize: 'large',
                //fontWeight: 'medium',
                lineHeight: '20px',
                color: 'var(--text-primary)',
                marginTop: '5vh',
                marginBottom: '5vh',
            }}>
                © 2023  {COMPANY_NAME}
            </Typography>
                </Grid>
            </Grid>
        </div>
    );

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: user ? 'flex' : 'none', bgcolor:'var(--menu-background)'}}>
            <CssBaseline sx={{bgcolor:'var(--menu-background)'}} />
            <BarApp user={user} storage={storage} drawerWidth={drawerWidth} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
            <Box
                component="nav"
                sx={{ width: { md: drawerWidth }, flexShrink: { sm: 0 },
                bgcolor:'var(--menu-background)'
             }}
                aria-label="my dashboard"
            >
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
                        bgcolor:'var(--menu-background)',
                        width: '100%',
                        height: '100%',
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, 
                        bgcolor:'var(--menu-background)', height:'100%'},
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', md: 'block' },
                        bgcolor:'var(--menu-background)',
                        width: '100%',
                        height: '100%',
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth,
                        bgcolor:'var(--menu-background)', height:'100%' },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>

            <Box
                component="main"
                sx={{ 
                    flexGrow: 1, p: 1, 
                    width: { md: `calc(100% - ${drawerWidth}px)` },
                    bgcolor: 'var(--background-color)',
                 }}
            >
                <Toolbar />
                <Grid container direction={'row'} justifyContent={'center'} alignItems={'center'}>
                <Grid item>
                    <h1 style={{fontFamily:'ChangaOneRegular'}}>{title}</h1>
                </Grid>
            </Grid>
                {children}
                <Typography sx={{display:'none'}} paragraph>
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
                <Typography sx={{display:'none'}} paragraph>
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
                <div style={{marginTop: '30vh'}}>
                <Footer />
                </div>
            </Box>
        </Box>
    );
}

Dashboard.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default Dashboard;