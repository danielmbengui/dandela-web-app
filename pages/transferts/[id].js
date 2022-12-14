import { firestore } from "../../config.firebase";
import { COLLECTION_TRANSFERT } from "../../constants";
import axios from 'axios';
import Dashboard from "../../components/Dashboard/Dashboard";
import Head from "next/head";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Card, Container, Divider, Grid, Stack, Typography } from "@mui/material";
import { useRouter } from 'next/router';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import Image from "next/image";
import { myLoader } from "../../functions/ImageLoader";
import UndoIcon from '@mui/icons-material/Undo';

export default function OneTransfert({ transfert, firebase, user, storage, logo }) {
    //const {params} = paths;
    // Render post...
    const router = useRouter();
    console.log('PATTTTTHS', transfert);
    return (
        <Dashboard pages={{}} title={`Un transfert`} firebase={firebase} user={user} storage={storage}>
            <Head>
                <title>Dandela Web App - Transfert</title>
                <meta name="description" content={`Transfert ${transfert.code}`} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Container>
                <Grid container direction={'column'} justifyContent={'center'} alignItems={'center'}>
                    <Grid item pt={3} pb={3}>
                        <Image
                            src={logo}
                            width={70}
                            height={70}
                            alt="logo"
                            priority
                            quality={100}
                            loader={myLoader}
                        />
                    </Grid>
                </Grid>
                <Card elevation={5} sx={{ padding: 1 }}>
                <UndoIcon
                    onClick={() => router.back()}
                    sx={{
                        cursor: 'pointer'
                    }}
                />
                    <Grid container direction={'column'} justifyContent={'center'} alignItems={'center'}>
                        <Grid container direction={'row'} sx={{ textAlign: { xs: 'center', md: 'left' } }} >
                            <Grid item xs={6} md={3} sx={{ background: 'red' }}>
                                Code
                            </Grid>
                            <Grid item xs={6} md={9} sx={{ background: 'green' }}>
                                <Typography>
                                    {transfert.code.substr(0, 3)}
                                    {"-"}
                                    {transfert.code.substr(3, 3)}
                                    {"-"}
                                    {transfert.code.substr(6, 4)}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Divider />
                        <Grid container direction={'row'} sx={{ textAlign: { xs: 'center', md: 'left' } }} >
                            <Grid item xs={6} md={3} sx={{ background: 'red' }}>
                                Destinataire
                            </Grid>
                            <Grid item xs={6} md={9} sx={{ background: 'green' }}>
                                <Typography>{transfert.destinataire}</Typography>
                            </Grid>
                        </Grid>
                        <Divider />
                        <Grid container direction={'row'} sx={{ textAlign: { xs: 'center', md: 'left' } }} >
                            <Grid item xs={6} md={3} sx={{ background: 'red' }}>
                                Montant
                            </Grid>
                            <Grid item xs={6} md={9} sx={{ background: 'green' }}>
                                <Typography>{transfert.montant}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Card>
                <Grid container>
                    <Grid item xs={3}>
                        Destinataire
                    </Grid>
                    <Grid item xs={6}>
                        <Typography>ID : {transfert.id}</Typography>
                        <Typography>Code : {transfert.code}</Typography>
                        <Stack
                            direction={'row'}
                            justifyContent={'start'}
                            alignItems={'center'}
                        >
                            <Typography>Valide : </Typography> {transfert.valide ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}
                        </Stack>
                        <span>{transfert.destinataire.toUpperCase()}</span>

                    </Grid>
                    <Grid item xs={3}>
                        {transfert.code.substr(0, 3)}
                        {"-"}
                        {transfert.code.substr(3, 3)}
                        {"-"}
                        {transfert.code.substr(6, 4)}
                    </Grid>
                </Grid>
                <div>
                    ID : {
                        transfert.id
                    }
                </div>
                <div>
                    CODE : {
                        transfert.code
                    }
                </div>
                <div>
                    DESTINATAIRE : {
                        transfert.destinataire
                    }
                </div>
                <div>
                    MONTANT : {
                        transfert.montant
                    }
                </div>
                <Stack
                    direction={'row'}
                    justifyContent={'start'}
                    alignItems={'center'}
                >
                    <span style={{ marginRight: '1vw' }}>RECU ANGOLA : </span> {transfert.recu_angola ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}
                </Stack>
                <Stack
                    direction={'row'}
                    justifyContent={'start'}
                    alignItems={'center'}
                >
                    <span style={{ marginRight: '1vw' }}>VALIDE : </span> {transfert.valide ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}
                </Stack>
            </Container>

        </Dashboard>
    )
}

// Generates `/posts/1` and `/posts/2`
export async function getStaticPaths({ }) {
    const res = await axios.get(`${process.env.ADDRESS_SERVER}api/transferts/getall`);
    console.log('AXIOS transfert', res.data);
    //console.log('OKKKKAY TESt', okay);
    const transferts = res.data;

    const paths = transferts.map((transfert) => ({
        params: { id: transfert.id },
    }))

    return {
        paths,
        fallback: false, // can also be true or 'blocking'
    }
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps(props) {
    const { params } = props;
    const res = await axios.get(`${process.env.ADDRESS_SERVER}api/transferts/getone?id=${params.id}`);
    console.log('AXIOS transfert', params.id);
    const transfert = res.data;
    console.log('AXIOS ONE transfert', transfert);

    return {
        // Passed to the page component as props
        props: { transfert },
    }
}