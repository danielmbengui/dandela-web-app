import React from 'react';
import PWAInstallerPrompt from 'react-pwa-installer-prompt';
import { Button, Grid } from '@mui/material';

const Install = () => {       
  return (  
    <PWAInstallerPrompt 
      render={({ onClick }) => (
        <Grid container>
          <Grid item span={16}>
              Keep App, For Offline & Quick Access!
          </Grid>
          <Grid item span={6}>
            <Button type="dashed" onClick={onClick}>
              Install
            </Button>
          </Grid>
        </Grid>
      )}
      callback={(data) => console.log(data)} 
    />
  )
}
export default Install;