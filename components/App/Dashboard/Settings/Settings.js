import { Grid, Stack, Typography } from '@mui/material';
import { Container } from '@mui/system';
import Head from 'next/head'
import Image from "next/image";
import Link from 'next/link';
import { useUserContext } from '../../../../context/UserProvider';
import { COMPANY_NAME, PAGE_LINK_PROFILE } from '../../../../constants';
import styles from './Settings.module.css';

const logo = '/img/logo.png';
export default function Settings(props) {
  const [user, setUser] = useUserContext();

  return (
    <Container sx={{maxWidth: '100%', fontFamily:'ChangaOneRegular'}}>
          <Head>
            <title>Create Next App</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Grid container direction={'column'} justifyContent={'center'} alignItems={'center'}>
            <Grid item sx={{display:'none'}}>
            <h1 className={styles.subtitle}>
              Salut {user && <span>{user.displayName}!</span>}
            </h1>
            </Grid>
            <Grid item xs={12} mb={{xs:5, sm:4, md:0}}>
              <Typography sx={{fontFamily: 'ChangaOneRegular', fontSize: 'x-large'}}>
              Voir profil :{' '}
              <Link href={PAGE_LINK_PROFILE}><code className={styles.code}>/profil</code></Link>
              </Typography>
            </Grid>
          </Grid>
          <main className={styles.main}>

            <div className={styles.grid}>
              <a href="https://nextjs.org/docs" className={styles.card}>
                <h2>Documentation &rarr;</h2>
                <p>Find in-depth information about Next.js features and API.</p>
              </a>

              <a href="https://nextjs.org/learn" className={styles.card}>
                <h2>Learn &rarr;</h2>
                <p>Learn about Next.js in an interactive course with quizzes!</p>
              </a>

              <a
                href="https://github.com/vercel/next.js/tree/canary/examples"
                className={styles.card}
              >
                <h2>Examples &rarr;</h2>
                <p>Discover and deploy boilerplate example Next.js projects.</p>
              </a>

              <a
                href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.card}
              >
                <h2>Deploy &rarr;</h2>
                <p>
                  Instantly deploy your Next.js site to a public URL with Vercel.
                </p>
              </a>
            </div>
          </main>
        </Container>
  );
}
