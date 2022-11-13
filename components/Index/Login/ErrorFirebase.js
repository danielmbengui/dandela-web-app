import * as React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { AlertTitle, Grid } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { myLoader } from '../../../functions/ImageLoader';

export default function ErrorFirebase({ logo, user }) {

    return (
        <Grid container
            direction={'column'}
            justifyContent={'center'}
            alignItems={'center'}
            style={{ width: "100%" }}
        >
            <Grid item p={5} style={{ display: 'block' }}>
                <Image
                    src={logo}
                    width={100}
                    height={100}
                    alt="logo"
                    priority
                    quality={100}
                    loader={myLoader}
                />
            </Grid>
            <Grid item p={3} style={{ textAlign: 'center' }}>
                <Box sx={{ width: '100%' }}>
                    <Alert
                        severity='error'
                        variant='filled'
                        sx={{ mb: 2, textAlign: 'start' }}
                    >
                        <AlertTitle sx={{ mb: 0.5, alignItems: 'flex-start' }}>Error</AlertTitle>
                        Some unrecoverable error occurred during sign-in with this number: {user.phoneNumber}. — <strong>retry to connect!</strong>
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
