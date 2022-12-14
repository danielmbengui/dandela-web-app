import { FormatQuoteRounded } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';
import { Container } from '@mui/system';
import Head from 'next/head'
import Image from "next/image";
import { styled, useTheme } from '@mui/material/styles';
import { COMPANY_NAME } from '../../constants';
import styles from './Footer.module.css';
import { myLoader } from '../../functions/ImageLoader';

const logo = "/img/logo.png";
//const logoBlack = "/img/logos/logo-black.png";
//const logoWhite = "/img/logos/logo-white.png";

export default function Footer() {
    const theme = useTheme();
    //const logo = theme.palette.mode == 'dark' ? logoWhite : logoBlack;

    return (
        <Container sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '10vh',
            
        }}>
            <Image
                        src={logo}
                        width={70}
                        height={70}
                        alt="logo"
                        priority
                        quality={100}
                        loader={myLoader}
                        
                    />
        </Container>
    );
}