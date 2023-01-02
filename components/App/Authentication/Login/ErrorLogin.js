import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import { AlertTitle, Grid } from '@mui/material';
import { useUserContext } from '../../../../context/UserProvider';
import { useRouter } from 'next/router';
import { PAGE_LINK_HOME } from '../../../../constants';

export default function ErrorLogin(props) {
    const { firebase } = props;
    const [showUserPhone, setShowUserPhone] = useState('unknow');
    const [user,] = useUserContext();
    const router = useRouter();

    useEffect(() => {
        if (user.phoneNumber) {
            setShowUserPhone(user.phoneNumber);
        } else {
            setShowUserPhone('unknow');
        }
    }, [user]);

    return (
        <>
            <Grid container
                direction={'column'}
                justifyContent={'center'}
                alignItems={'center'}
                style={{ width: "100%" }}
            >

                <Grid item p={3} style={{ textAlign: 'center' }}>
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
                            onClick={() => {
                                firebase.auth().signOut().then(() => {
                                    // Sign-out successful.
                                    //location.href = "/";
                                    router.push(PAGE_LINK_HOME);
                                    //window.location.href = "/";
                                    console.log("Disconnected !!!");
                                }).catch((error) => {
                                    // An error happened.
                                    console.log("ERROR Disconnected !!!");
                                });
                            }}
                        >
                            Home
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </>

    );
}
