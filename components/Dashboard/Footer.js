import { FormatQuoteRounded } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';
import { Container } from '@mui/system';
import Head from 'next/head'
import Image from "next/image";
import { styled, useTheme } from '@mui/material/styles';
import { COMPANY_NAME } from '../../constants';
import styles from './Footer.module.css';

//const logo = "/img/logo.png";
const logoBlack = "/img/logos/logo-black.png";
const logoWhite = "/img/logos/logo-white.png";

export default function Footer() {
    const theme = useTheme();
    const logo = theme.palette.mode == 'dark' ? logoWhite : logoBlack;

    return (
        <footer className={styles.footer} style={{
        }}>
            <Container sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1vh',
                
            }}>
                © 2023  {COMPANY_NAME}
            </Container>
            <Image
                src={logo}
                alt="Vercel Logo"
                width={72}
                height={16}
                style={{
                    maxWidth: "100%",
                    height: "auto",
                }} />
        </footer>
    );
}