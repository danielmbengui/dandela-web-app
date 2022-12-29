import React from 'react';
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