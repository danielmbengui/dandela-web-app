import React from 'react';
import { Container } from '@mui/system';
import Head from 'next/head'
import Image from "next/image";
import { styled, useTheme } from '@mui/material/styles';
import styles from './Footer.module.css';
import { myLoader } from '../../../../lib/functions/ImageLoader';

const logo = "/img/logo.png";
//const logoBlack = "/img/logos/logo-black.png";
//const logoWhite = "/img/logos/logo-white.png";

export default function Footer() {
    const theme = useTheme();
    //const logo = theme.palette.mode == 'dark' ? logoWhite : logoBlack;

    return (
        <footer className={styles.footer} >
            <Container sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '3vh',
            marginBottom: '1vh',

        }}>
            <Image
                src={logo}
                width={72}
                height={55}
                alt="logo"
                priority
                //fill
                quality={100}
                loader={myLoader}
                
            />
        </Container>
        </footer>
    );
}