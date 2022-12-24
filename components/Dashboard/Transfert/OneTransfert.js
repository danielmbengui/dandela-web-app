import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Head from "next/head";
import { Card, Container, Divider, Grid, Stack, Typography } from "@mui/material";
import { useRouter } from 'next/router';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import CloseIcon from '@mui/icons-material/Close';

import { COLLECTION_TRANSFERT, DEFAULT_TRANSFERT } from '../../../constants';
import { formatTransfertCode, getTransfertStateString } from '../../../functions/firestore/TransfertFunctions';
import Dashboard from '../Dashboard';

export default function OneTransfert({ transfert, firebase, firestore, user, storage, logo }) {
    //const {params} = paths;
    // Render post...
    const router = useRouter();
    //const [transfert, setTransfert] = useState(DEFAULT_TRANSFERT);


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
                            {formatTransfertCode(transfert.code)}

                        </Typography>
                    </Grid>
                </Grid>
                <Divider />
                <Grid container direction={'row'} sx={{ textAlign: { xs: 'left', md: 'left' } }} >
                    <Grid item xs={6} md={3}>
                        Destinataire
                    </Grid>
                    <Grid item xs={6} md={9} >
                        <Typography>{transfert.receiver}</Typography>
                    </Grid>
                </Grid>
                <Divider />
                <Grid container direction={'row'} sx={{ textAlign: { xs: 'left', md: 'left' } }} >
                    <Grid item xs={6} md={3}>
                        Montant
                    </Grid>
                    <Grid item xs={6} md={9}>
                        <Typography>{transfert.amount}</Typography>
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
                    <Typography>UID : {transfert.uid}</Typography>
                    <Typography>Code : {transfert.code}</Typography>
                    <Stack
                        direction={'row'}
                        justifyContent={'start'}
                        alignItems={'center'}
                    >
                        <Typography>Valide : </Typography> {transfert.valide ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}
                    </Stack>
                    <span>{transfert ? transfert.receiver.toString().toUpperCase() : ''}</span>

                </Grid>

            </Grid>
            <div>
                UID : {
                    transfert.uid
                }
            </div>
            <div>
                CODE : {
                    transfert.code
                }
            </div>
            <div>
                DESTINATAIRE : {
                    transfert.receiver
                }
            </div>
            <div>
                MONTANT : {
                    transfert.amount
                }
            </div>
            <Stack
                direction={'row'}
                justifyContent={'start'}
                alignItems={'center'}
            >
                <span style={{ marginRight: '1vw' }}>VALIDE : </span> {transfert.valide ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}
            </Stack>
            <Stack
                direction={'row'}
                justifyContent={'start'}
                alignItems={'center'}
            >
                <span style={{ marginRight: '1vw' }}>RECU ANGOLA : </span> {transfert.receipt_receiver ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}

            </Stack>
            <Stack
                direction={'row'}
                justifyContent={'start'}
                alignItems={'center'}
            >
                <span style={{ marginRight: '1vw' }}>RECU AGENCE : </span> {transfert.receipt_dandela ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}

            </Stack>
            <Stack
                direction={'row'}
                justifyContent={'start'}
                alignItems={'center'}
            >
                <span style={{ marginRight: '1vw' }}>RECU EXPEDITEUR : </span> {transfert.receipt_sender ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}

            </Stack>
        </Container>
    )
}