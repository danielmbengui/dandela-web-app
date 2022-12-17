import React from 'react';
import PWAInstallerPrompt from 'react-pwa-installer-prompt';
import { Button, Grid } from '@mui/material';
import styles from './InstallApp.module.css';

const InstallApp = () => {
  return (
    <PWAInstallerPrompt
      render={({ onClick }) => (
        <Grid container direction={'column'}>
          <Grid item>
          <div className={styles.grid}>
            <div className={styles.card}>
              <p style={{paddingBottom: '2vh',}}>Installer l'application sur mobile/ordinateur.</p>
              <Button className={styles.button} variant="contained" color='primary' onClick={onClick} sx={{

              }}>
              Install
            </Button>
            </div>
            </div>
          </Grid>
        </Grid>
      )}
      callback={(data) => console.log(data)}
    />
  )
}
export default InstallApp;