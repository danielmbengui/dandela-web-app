import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useUserContext } from '../../../context/UserProvider';
import PermanentBackdrop from '../CustomComponents/PermanentBackdrop';
import BarApp from './BarApp/BarApp';
import { Box, CssBaseline, Grid, Toolbar } from '@mui/material';
import DrawerCustom from '../CustomComponents/DrawerCustom';
import Footer from './Footer/Footer';
import InstallApp from './InstallApp/InstallApp';
import CompanyNameComponent from './Drawer/CompanyNameComponent';
import LangageComponent from './Drawer/LangageComponent';
import SwitchThemeComponent from './Drawer/SwitchThemeComponent';
import SettingsComponent from './Drawer/SettingsComponent';
import TransfersComponent from './Drawer/TransfersComponent';
import ProfileComponent from './Drawer/ProfileComponent';

const drawerWidth = 300;

export default function Dashboard(props) {
    const { children, firebase, langage, setLangage, pages, title, } = props;
    const [mobileOpen, setMobileOpen] = useState(false);
    const [contentInstall, setContentInstall] = useState(<></>);
    const [user,] = useUserContext();
    const router = useRouter();

    useEffect(() => {
        if (window) {
            //console.log("navigator", window.navigator);
            let deferredPrompt;
            window.addEventListener('beforeinstallprompt', (e) => {
                // Prevents the default mini-infobar or install dialog from appearing on mobile
                e.preventDefault();
                console.log("beforeinstallprompt InstallApp", 'okay');
                // Save the event because you'll need to trigger it later.
                deferredPrompt = e;
                // Show your customized install prompt for your PWA
                // Your own UI doesn't have to be a single element, you
                // can have buttons in different locations, or wait to prompt
                // as part of a critical journey.
                setContentInstall(<InstallApp deferredPrompt={deferredPrompt} />);
            });
        } else {
            setContentInstall(<></>);
        }
    }, [contentInstall]);


    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <Box sx={{ display: user ? 'flex' : 'none', bgcolor: user.authorized ? 'var(--menu-background)' : 'var(--background-color)' }}>
            {!user.authorized && <><PermanentBackdrop /></>}
            {user.uid && user.phoneNumber && user.authorized && <>
                <CssBaseline sx={{ bgcolor: 'var(--menu-background)' }} />
                <BarApp drawerWidth={drawerWidth} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
                <DrawerCustom drawerWidth={drawerWidth} mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle}>
                    <div style={{ textAlign: 'center', backgroundColor: 'var(--menu-background)' }}>
                        <SwitchThemeComponent />
                        <div style={{height: '0.5vh', backgroundColor: 'var(--grey)',}} />
                        <SettingsComponent firebase={firebase} settingsPage={pages.settingsPage} />
                        <div style={{height: '0.5vh', backgroundColor: 'var(--grey)',}} />
                        <TransfersComponent
                            user={user}
                            openSub={pages.addtransferPage || pages.inprogressPage}
                            pages={{
                                addtransfertPage: pages.addtransferPage,
                                inprogressPage: pages.inprogressPage,
                            }}
                        />
                        <div style={{height: '0.5vh', backgroundColor: 'var(--grey)',}} />
                        <ProfileComponent profilePage={pages.profilePage} />
                        <div style={{height: '0.5vh', backgroundColor: 'var(--grey)',}} />
                        <LangageComponent langage={langage} setLangage={setLangage} />
                        <CompanyNameComponent />
                    </div>
                </DrawerCustom>
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1, p: 1,
                        width: { xs: `calc(100% - ${drawerWidth - 60}px)`, md: `calc(100% - ${drawerWidth}px)` },
                        bgcolor: 'var(--background-color)',
                    }}
                >
                    <Toolbar />
                    {contentInstall}
                    <Grid container direction={'row'} justifyContent={'center'} alignItems={'center'}>
                        <Grid item>
                            <h1 style={{ fontFamily: 'ChangaOneRegular' }}>{title}</h1>
                        </Grid>
                    </Grid>
                    {children}
                    <div style={{ marginTop: '30vh' }}>
                        <Footer />
                    </div>
                </Box>
            </>}





        </Box>
    )
}