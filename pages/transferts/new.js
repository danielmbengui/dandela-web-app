import React from 'react';
import Head from 'next/head';
import Dashboard from '../../components/Dashboard/Dashboard';
import AllTransfert from '../../components/Dashboard/Transfert/All/AllTransfert';
import NewTransfert from '../../components/Dashboard/Transfert/NewTransfert';

export default function AllTransfertsPage({logo, user, firebase, firestore, storage, userFirebase, handleUserFirebase, handleUser, auth, dashboard, screenMode}) {
    return(
        <Dashboard pages={{ newtransfert: true, }} title={"Nouveau transfert"} firebase={firebase} user={user} storage={storage}>
             <Head>
            <title>Dandela Web App - Tous les transferts</title>
            <meta name="description" content="Voir tous les transferts" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
            <NewTransfert firestore={firestore} user={user} />
        </Dashboard>
    )
}