import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dashboard from '../../../components/Dashboard/Dashboard';
import Head from "next/head";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Card, Container, Divider, Grid, Stack, Typography } from "@mui/material";
import { useRouter } from 'next/router';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import Image from "next/image";
import { myLoader } from '../../../functions/ImageLoader';
import UndoIcon from '@mui/icons-material/Undo';
import CloseIcon from '@mui/icons-material/Close';
import { COLLECTION_TRANSFERT, DEFAULT_TRANSFERT } from '../../../constants';
import { formatTransfertCode, getTransfertsAllList, getTransfertsNoValidList, getTransfertStateString } from '../../../functions/firestore/TransfertFunctions';
import OneTransfert from '../../../components/Dashboard/Transfert/OneTransfert';

export default function OneTransfertNoValidPage({ id, firebase, firestore, user, storage, logo }) {
    //const {params} = paths;
    // Render post...
    const [transfert, setTransfert] = useState(DEFAULT_TRANSFERT);

    useEffect(() => {
        firestore.collection(COLLECTION_TRANSFERT).doc(id)
            .onSnapshot((doc) => {
                const _transfert = doc.data();
                setTransfert(_transfert);
            });
    }, [firestore]);

    return (
        <Dashboard pages={{ novalid: true, }} title={`Transfert n°${formatTransfertCode(transfert.code)}`} firebase={firebase} user={user} storage={storage}>
            <Head>
                <title>Dandela Web App - Transfert</title>
                <meta name="description" content={`Transfert ${formatTransfertCode(transfert.code)}`} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <OneTransfert firestore={firestore} user={user} transfert={transfert} />
        </Dashboard>
    )
}
// Generates `/posts/1` and `/posts/2`
export async function getStaticPaths({ }) {
    const transfertsId = await getTransfertsAllList();
    console.log('AXIOS transfert', transfertsId);
    //console.log('OKKKKAY TESt', okay);
    //const transfertsId = res;

    const paths = transfertsId.map((uid) => ({
        params: { id: uid },
    }))

    return {
        paths: paths,
        fallback: true, // can also be true or 'blocking'
    }
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps(props) {
    const { params } = props;
    //const res = await axios.get(`http://localhost:3000//api/transferts/getone?uid=${params.uid}`);
    //console.log('AXIOS transfert', params.uid);
    //const transfert = res.data;
    const id = params.id;
    //console.log('AXIOS ONE transfert', transfert);

    return {
        // Passed to the page component as props
        props: { id },
    }
}