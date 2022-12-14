import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Head from "next/head";
import { Card, Container, Divider, Grid, Stack, Typography } from "@mui/material";
import { useRouter } from 'next/router';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import CloseIcon from '@mui/icons-material/Close';

import { COLLECTION_TRANSFERT, DEFAULT_TRANSFERT } from '../../../constants';
import { getTransfertStateString } from '../../../functions/firestore/TransfertFunctions';
import Dashboard from '../Dashboard';

export default function OneTransfert({ transfert, firebase, firestore, user, storage, logo }) {
    //const {params} = paths;
    // Render post...
    const router = useRouter();
    //const [transfert, setTransfert] = useState(DEFAULT_TRANSFERT);
    function formatCode(code) {
        let _code = code.toString().substring(0, 3);
        _code += "-";
        _code += code.toString().substring(3, 6);
        _code += "-";
        _code += code.toString().substring(6, 10);
        return (_code);
    }

    console.log('PATTTTTHS', transfert);

    return (
        <Container>
            <Card elevation={5} sx={{ padding: 1 }}>
                <Grid container justifyContent={'end'} alignItems={'end'}>
                    <Grid item sx={{ textAlign: 'end' }}>
                        <CloseIcon
                            onClick={() => router.back()}
                            sx={{
                                cursor: 'pointer'
                            }}
                        />
                    </Grid>
                </Grid>
                <Grid container direction={'row'} sx={{ textAlign: { xs: 'left', md: 'left' } }} >
                    <Grid item xs={6} md={3}>
                        Code
                    </Grid>
                    <Grid item xs={6} md={9}>
                        <Typography>
                            {formatCode(transfert.code)}
                        </Typography>
                    </Grid>
                </Grid>
                <Divider />
                <Grid container direction={'row'} sx={{ textAlign: { xs: 'left', md: 'left' } }} >
                    <Grid item xs={6} md={3}>
                        Destinataire
                    </Grid>
                    <Grid item xs={6} md={9} >
                        <Typography>{transfert.destinataire}</Typography>
                    </Grid>
                </Grid>
                <Divider />
                <Grid container direction={'row'} sx={{ textAlign: { xs: 'left', md: 'left' } }} >
                    <Grid item xs={6} md={3}>
                        Montant
                    </Grid>
                    <Grid item xs={6} md={9}>
                        <Typography>{transfert.montant}</Typography>
                    </Grid>
                </Grid>
                <Divider />
                <Grid container direction={'row'} sx={{ textAlign: { xs: 'left', md: 'left' } }} >
                    <Grid item xs={6} md={3}>
                        État
                    </Grid>
                    <Grid item xs={6} md={9}>
                        <Typography>{transfert.state}</Typography>
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
    )
}