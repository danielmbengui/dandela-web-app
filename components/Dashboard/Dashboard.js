import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import PermanentBackdrop from '../Loading/PermanentBackdrop';
import SwitchThemeComponent from './Menu/SwitchThemeComponent';
import ProfileComponent from './Menu/ProfileComponent';
import TransfertComponent from './Menu/TransfertComponent';
import SettingsComponent from './Menu/SettingsComponent';
import Footer from './Footer';
import BarApp from './BarApp/BarApp';
import { COMPANY_NAME, LANGAGE_ENGLISH, LANGAGE_FRENCH, LANGAGE_PORTUGUESE, STORAGE_LANGAGE, USER_TYPE_ADMIN } from '../../constants';
import AdminComponent from './Menu/AdminComponent';
import InstallApp from '../InstallApp/InstallApp';
import { useUserContext } from '../../context/UserProvider';
import { useTranslation } from 'next-i18next';
import { GB, FR, PT } from 'country-flag-icons/react/3x2';
import styles from './Dashboard.module.css';
import { updateLangageStorage } from '../../functions/storage/UserStorageFunctions';
import { Button } from '@mui/material';

const logo = "/img/logo.png";

const drawerWidth = 300;

function requestPermission() {
    console.log('Requesting permission...');
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
        alert('Notification permission granted.')
      }
    })}

function Dashboard(props) {
    const { t, i18n } = useTranslation('common');
    const { langage, setLangage, windowDashboard, children, firebase, pages, title, storage, } = props;
    const [mobileOpen, setMobileOpen] = useState(false);
    const [user, ] = useUserContext();
    const [isAdmin, setIsAdmin] = useState(user ? user.type === USER_TYPE_ADMIN : false);

    useEffect(() => {
        if (user) {
            setIsAdmin(user.type === USER_TYPE_ADMIN);
        }
    }, [user]);

    const onChangeLanguage = (_language) => {
        i18n.changeLanguage(_language);
        setLangage(_language);
        updateLangageStorage(_language);
    };

    /*
        useEffect(() => {
            async function related(){
            const relatedApps = await navigator.getInstalledRelatedApps();
            const PWAisInstalled = relatedApps.length > 0;
            console.log('PWA INSTALLEEEEEEEEED', PWAisInstalled ? 'true' : 'false');
    
            }
            related();
            if (window.matchMedia('(display-mode: standalone)').matches) {
                console.log('display-mode is standalone');
            }else{
                console.log("DOOOOOOOOOOOONT MATCH");
                window.addEventListener('appinstalled', (evt) => {
                    console.log('a2hs installed');
                  });
            }
            window.addEventListener('appinstalled', () => {
                //setShowInstallApp(false);
                console.log("INSTALLEEEEEEEEEEEED!!!!!!")
            });
            return () => {
              window.removeEventListener('appinstalled', console.log("REMOVED"));
            }
          }, []);
          */

    const drawer = (
        <div style={{ textAlign: 'center', backgroundColor: 'var(--menu-background)' }}>
            <SwitchThemeComponent />
            <Divider />
            <SettingsComponent firebase={firebase} settingsPage={pages.settings} />
            <Divider />
            <TransfertComponent user={user} isAdmin={isAdmin} openSub={pages.newtransfert || pages.inprogress || pages.novalid || pages.alltransfert} pages={{
                newtransfert: pages.newtransfert,
                inprogress: pages.inprogress,
                novalid: pages.novalid,
                alltransfert: pages.alltransfert,
            }}
                newtransfertPage={pages.newtransfert} />
            <Divider />
            {
                isAdmin && <div style={{display:'none'}}>
                    <AdminComponent user={user} openSub={pages.users || pages.countries || pages.statistics} pages={{
                        users: pages.users,
                        countries: pages.countries,
                        statistics: pages.statistics,
                    }}
                        newtransfertPage={pages.newtransfert} />
                    <Divider />
                </div>
            }

            <ProfileComponent profilePage={pages.profile} />
            <Divider />
            <Grid container mt={5} direction={'column'} justifyContent={'center'} alignItems={'center'} spacing={1}>
                <Grid item>
                    <Typography sx={{ fontFamily: 'ChangaOneRegular' }}>{t('menuChooseLangage')}</Typography>
                </Grid>
                <Grid item>
                    <Stack direction={'row'} spacing={3}>
                        <FR
                            //className={styles.dashboard}
                            onClick={() => { onChangeLanguage(LANGAGE_FRENCH); }}
                            title={t('langFrench')}
                            style={{
                                cursor: 'pointer',
                                border: langage === 'fr' ? '3px solid var(--primary)' : '',
                                width: '50px',
                                height: '50px'
                            }}
                        />
                        <GB
                            className={styles.dashboard}
                            onClick={() => { onChangeLanguage(LANGAGE_ENGLISH); }}
                            title={t('langEnglish')}
                            style={{
                                cursor: 'pointer',
                                border: langage === 'en' ? '3px solid var(--primary)' : '',
                                width: '50px',
                                height: '50px'
                            }}
                        />
                        <PT
                            className={styles.dashboard}
                            onClick={() => { onChangeLanguage(LANGAGE_PORTUGUESE); }}
                            title={t('langPortuguese')}
                            style={{
                                cursor: 'pointer',
                                border: langage === 'pt' ? '3px solid var(--primary)' : '',
                                width: '50px',
                                height: '50px'
                            }}
                        />
                    </Stack>
                </Grid>
            </Grid>
            <List sx={{ display: 'none' }}>
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
            <Divider sx={{ display: 'none' }} />
            <List sx={{ display: 'none' }}>
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
            <Divider sx={{ display: 'none' }} />
            <Grid container sx={{ height: '100%', bgcolor: 'var(--menu-background)' }} direction={'row'} justifyContent={'center'} alignItems={'flex-end'}>
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



    return (
        <Box sx={{ display: user ? 'flex' : 'none', bgcolor: user.authorized ? 'var(--menu-background)' : 'var(--background-color)' }}>
            {
                (!user.uid || !user.phoneNumber || !user.authorized) && <PermanentBackdrop />
            }

            {
                user.authorized && <>
                    <CssBaseline sx={{ bgcolor: 'var(--menu-background)' }} />
                    <BarApp user={user} storage={storage} drawerWidth={drawerWidth} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

                    <Box
                        component="nav"
                        sx={{
                            width: { xs: 0, md: drawerWidth }, flexShrink: { sm: 0 },
                            bgcolor: 'var(--menu-background)'
                        }}
                        aria-label="my dashboard"
                    >
                        <Drawer
                            //container={container}
                            variant='temporary'
                            open={mobileOpen}
                            onClose={handleDrawerToggle}
                            ModalProps={{
                                keepMounted: true, // Better open performance on mobile.
                            }}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                                bgcolor: 'var(--menu-background)',
                                //width: '100%',
                                //height: '100%',
                                '& .MuiDrawer-paper': {
                                    boxSizing: 'border-box', width: drawerWidth - 60,
                                    bgcolor: 'var(--menu-background)', height: '100%'
                                },
                            }}
                        >
                            {drawer}
                        </Drawer>
                        <Drawer
                            variant="permanent"
                            sx={{
                                display: { xs: 'none', md: 'block' },
                                bgcolor: 'var(--menu-background)',
                                width: '100%',
                                height: '100%',
                                '& .MuiDrawer-paper': {
                                    boxSizing: 'border-box', width: drawerWidth,
                                    bgcolor: 'var(--menu-background)', height: '100%'
                                },
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
                            width: { xs: `calc(100% - ${drawerWidth - 60}px)`, md: `calc(100% - ${drawerWidth}px)` },
                            bgcolor: 'var(--background-color)',
                        }}
                    >
                        <Toolbar />
                        <InstallApp />
                        <Grid container direction={'row'} justifyContent={'center'} alignItems={'center'}>
                            <Grid item>
                                <h1 style={{ fontFamily: 'ChangaOneRegular' }}>{title}</h1>
                            </Grid>
                        </Grid>
                        {children}
                        <Button onClick={() => {
                            requestPermission();
                        }}>
                            Notif
                        </Button>
                        <Typography sx={{ display: 'none' }} paragraph>
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
                        <Typography sx={{ display: 'none' }} paragraph>
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
                        <div style={{ marginTop: '30vh' }}>
                            <Footer />
                        </div>
                    </Box>
                </>
            }
        </Box>
    );
}

Dashboard.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    windowDashboard: PropTypes.func,
};

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, [
                'common',
                //'footer',
            ], null, ['en', 'fr', 'pt'])),
            // Will be passed to the page component as props
        },
    }
}

export default Dashboard;