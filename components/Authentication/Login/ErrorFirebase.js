import React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import { AlertTitle, Grid } from '@mui/material';
import Link from 'next/link';

export default function ErrorFirebase({phoneNumber}) {

    return (
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
                        variant='filled'
                        sx={{ mb: 2, textAlign: 'start' }}
                    >
                        <AlertTitle sx={{ mb: 0.5, alignItems: 'flex-start' }}>Error</AlertTitle>
                        Some unrecoverable error occurred during sign-in with this number: {phoneNumber ? phoneNumber : 'unknown'}. — <strong>retry to connect!</strong>
                    </Alert>
                    <Link href="/">
                        <Button
                            color='primary'
                            variant="outlined"
                        >
                            Go to Login
                        </Button>
                    </Link>
                </Box>
            </Grid>
        </Grid>
    );
}
