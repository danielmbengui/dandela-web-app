import { FormatQuoteRounded } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';
import { Container } from '@mui/system';
import Head from 'next/head'
import Image from "next/image";
import { COMPANY_NAME } from '../../constants';
import styles from './Footer.module.css';

const logo = "/img/logo.png";

export default function Footer() {
    return (
        <footer className={styles.footer} style={{
        }}>
            <Container sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '3vh'
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