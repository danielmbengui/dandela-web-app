import React, {useState, useEffect, useDeferredValue} from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import { AlertTitle, Grid } from '@mui/material';
import Link from 'next/link';
import firebase from '../../../config.firebase';
import { useUserContext } from '../../../context/UserProvider';

export default function ErrorLogin() {
const [showUserPhone, setShowUserPhone] = useState('unknow');
const [user, setUser] = useUserContext();

useEffect(() => {
  if (user && user.phoneNumber) {
    setShowUserPhone(user.phoneNumber);
    /*
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
      //location.href = "/";
      //window.location.href = "/authentication/errorlogin";
      console.log("Disconnected !!!");
    }).catch((error) => {
      // An error happened.
      console.log("ERROR Disconnected !!!");
    });
    */
  }else {
    setShowUserPhone('unknow');
  }
}, [user])

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
            This action is not permitted with this number: <strong>{showUserPhone}</strong>.<br />
            You can not access to the WebApp sorry — <strong>please contact the owner!</strong>
        </Alert>
        <Button
        color='primary'
        variant="contained"
        onClick={() => {
          firebase.auth().signOut().then(() => {
            // Sign-out successful.
            //location.href = "/";
            window.location.href = "/";
            console.log("Disconnected !!!");
          }).catch((error) => {
            // An error happened.
            console.log("ERROR Disconnected !!!");
          });
        }}
        >
        Login
      </Button>
    </Box>
    </Grid>
</Grid>
   </>

  );
}
