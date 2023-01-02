import React from 'react';
import { AppBar, FormControlLabel, Grid, Stack, Toolbar, } from "@mui/material";
import Image from "next/image";
import MaterialUISwitch from '../CustomComponents/MaterialUISwitch';
import { myLoader } from '../../../lib/functions/ImageLoader';

const srcLogo = "/img/logo.png";

const AppBarLogin = () => {
    return (
        <AppBar position="static" elevation={0} sx={{ height: '10vh', background: 'transparent' }}>
            <Toolbar>
                <Grid container justifyContent={'flex-end'} alignItems={'center'}
                >
                    <Grid item>
                        <FormControlLabel
                            control={<MaterialUISwitch />}
                        />
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
}

export default function ContainerAuthentication({ children }) {

    return (
        <Stack style={{ maxWidth: '100%', width: '100%' }} direction={'column'}>
            <AppBarLogin  />
            <Grid container
                direction={'column'}
                justifyContent={'center'}
                alignItems={'center'}
                mt={5}
            >
                <Grid item p={3} style={{ display: 'block', bgcolor: 'red' }} >
                    <Image
                        src={srcLogo}
                        width={72}
                        height={72}
                        alt="logo"
                        priority
                        quality={100}
                        loader={myLoader}
                        style={{
                            maxWidth: "100%",
                            height: "auto",
                          }}
                    />
                </Grid>
            </Grid>
            {children}
        </Stack>
    )
};