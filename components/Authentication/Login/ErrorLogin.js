import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import { AlertTitle, Grid } from '@mui/material';
import Link from 'next/link';

export default function ErrorLogin({phoneNumber}) {
  return (
   <>
     <Grid container
    direction={'column'}
    justifyContent={'center'}
    alignItems={'center'}
    style={{ width: "100%" }}
>

    <Grid item p={3} style={{textAlign: 'center'}}>
    <Box sx={{ width: '100%' }}>
    <Alert
        severity='error'
        variant='outlined'
          sx={{ mb: 2, textAlign: 'start' }}
        >
            <AlertTitle sx={{ mb: 0.5, alignItems: 'flex-start' }}>Action prohibited</AlertTitle>
            This action is not permitted with this number: {phoneNumber ? phoneNumber : 'unknow'}.<br />
            You can not access to the WebApp sorry — <strong>please contact the owner!</strong>
        </Alert>
      <Link href='/'>
      <Button
        color='primary'
        variant="contained"
        >
        Login
      </Button>
      </Link>
    </Box>
    </Grid>
</Grid>
   </>

  );
}
