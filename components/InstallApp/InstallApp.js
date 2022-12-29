/*
import React from 'react'
//import usePWA from 'react-pwa-install-prompt'
//const usePWA = require('react-pwa-install-prompt');
const InstallApp = () => {
  //const {usePWA} = props;
  const { isStandalone, isInstallPromptSupported, promptInstall } = usePWA()
 
  const onClickInstall = async () => {
    const didInstall = await promptInstall()
    if (didInstall) {
      // User accepted PWA install
    }
  }
 
const renderInstallButton = () => {
    if (isInstallPromptSupported && isStandalone)
 
      return (
        <button onClick={onClickInstall}>Prompt PWA Install</button>
      )
    return null
  }
 
  return (<div>
    <h2>PWA Infos</h2>
    <p>Is Install Prompt Supported ? {isInstallPromptSupported ? 'true' : 'false'}</p>
    <p>Is Standalone ? {isStandalone ? 'true' : 'false'}</p>
    {renderInstallButton()}
  </div>)
}
 
export default InstallApp
*/


import React, { useEffect } from 'react';
//import PWAInstallerPrompt from 'react-pwa-installer-prompt';
import { Button, Grid } from '@mui/material';
import styles from './InstallApp.module.css';
import { styled } from '@mui/material/styles';

const MaterialUIButton = styled(Button)(() => ({
  backgroundColor: 'var(--primary)',
  fontFamily: 'ChangaOneRegular',
  color: 'var(text-secondary)',
}));

export default function InstallApp() {

  useEffect(() => {
    
  }, [window])

  return (
    <>
      {
        /*
    <PWAInstallerPrompt
          render={({ onClick }) => (
            <Grid container direction={'column'}>
              <Grid item>
              <div className={styles.grid}>
                <div className={styles.card}>
                  <p style={{paddingBottom: '2vh',}}>Installer l&apos;application sur mobile/ordinateur.</p>
                  <MaterialUIButton  variant="contained" onClick={onClick}>
                  Install
                </MaterialUIButton>
                </div>
                </div>
              </Grid>
            </Grid>
          )}
          callback={(data) => (
            <>
            {console.log('RESULT InstallApp', data)}
            <span>MEEEEEEEEERDE</span>   
            </>
            
          )}
        />
        */
      }

    </>
  )
}
