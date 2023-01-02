import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useUserContext } from '../../../context/UserProvider';
import ContainerAuthentication from '../Authentication/ContainerAuthentication';
import ErrorLogin from '../Authentication/Login/ErrorLogin';
import Unauthorized from '../Authentication/Login/Unauthorized';
import PermanentBackdrop from '../CustomComponents/PermanentBackdrop';
import BarApp from './BarApp/BarApp';
import { useTranslation } from 'react-i18next';
import { updateLangageStorage } from '../../../lib/functions/storage/UserStorageFunctions';
import { Box, CssBaseline, Divider, Drawer, Grid, Toolbar } from '@mui/material';
import DrawerCustom from '../CustomComponents/DrawerCustom';
import { Container } from '@mui/system';
import Footer from './Footer/Footer';
import InstallApp from './InstallApp/InstallApp';
import CompanyNameComponent from './Drawer/CompanyNameComponent';
import LangageComponent from './Drawer/LangageComponent';
import SwitchThemeComponent from './Drawer/SwitchThemeComponent';
import SettingsComponent from './Drawer/SettingsComponent';
import InProgressListComponent from './Drawer/InProgressListComponent';
import AddTransferComponent from './Drawer/AddTransferComponent';
import TransfersComponent from './Drawer/TransfersComponent';
import ProfileComponent from './Drawer/ProfileComponent';

const drawerWidth = 300;

export default function Dashboard(props) {
    const { children, firebase, langage, setLangage, pages, title, } = props;
    const [mobileOpen, setMobileOpen] = useState(false);
    const [contentInstall, setContentInstall] = useState(<></>);
    const [user,] = useUserContext();

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
    });

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <Box sx={{ display: user ? 'flex' : 'none', bgcolor: user.authorized ? 'var(--menu-background)' : 'var(--background-color)' }}>
            {!user.authorized && <><PermanentBackdrop /><Unauthorized firebase={firebase} /></>}
            {user.uid && user.phoneNumber && user.authorized && <>
                <CssBaseline sx={{ bgcolor: 'var(--menu-background)' }} />
            <BarApp drawerWidth={drawerWidth} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
            <DrawerCustom drawerWidth={drawerWidth} mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle}>
                <div style={{ textAlign: 'center', backgroundColor: 'var(--menu-background)' }}>
                    <SwitchThemeComponent />
                    <Divider />
                    <SettingsComponent settingsPage={pages.settingsPage} />
                    <Divider />
                    <TransfersComponent 
                    user={user}
                    openSub={pages.addtransferPage || pages.inprogressPage} 
                    pages={{
                        addtransfertPage: pages.addtransferPage,
                        inprogressPage: pages.inprogressPage,
                    }}
                     />
                    <Divider />
                    <ProfileComponent profilePage={pages.profilePage} />
                    
                    {
                        /* 
                        <AddTransferComponent addtransferPage={pages.addtransferPage} />
                    <Divider />
                    <InProgressListComponent inprogressPage={pages.inprogressPage} />
                        */
                    }
                    <Divider />

                    {
                        /**
                         * <TransfertComponent user={user} isAdmin={isAdmin} openSub={pages.newtransfert || pages.inprogress || pages.novalid || pages.alltransfert} pages={{
                newtransfert: pages.newtransfert,
                inprogress: pages.inprogress,
                novalid: pages.novalid,
                alltransfert: pages.alltransfert,
            }}
                         */
                    }

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

Dashboard.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};