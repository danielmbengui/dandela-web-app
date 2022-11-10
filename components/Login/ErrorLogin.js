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

export default function ErrorLogin({logo, firestore}) {
  const [open, setOpen] = React.useState(true);

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
            //fill
            //width="responsive"
            //layout="responsive"
            width={250}
            height={250}
            //height={320}
            alt="logo"
            //loading='lazy'
            priority
            sizes="(min-width: 60em) 24vw,
                    (min-width: 28em) 45vw,
                    100vw"
            style={{
                width: "100%",
                height: "auto"
            }} />
    </Grid>
    <Grid item p={3} style={{ textAlign: 'center' }}>
    <Box sx={{ width: '100%' }}>
      <Collapse in={open}>
        <Alert
        severity='error'
        variant='filled'
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2, textAlign: 'start' }}
        >
            <AlertTitle sx={{ mb: 0.5, alignItems: 'flex-start' }}>This action is prohibited</AlertTitle>
        You can't access to this website sorry — <strong>contact the owner!</strong>
          
        </Alert>
      </Collapse>
      <Link href="/index">
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
