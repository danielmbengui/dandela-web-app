import React from 'react';
import Head from 'next/head';
import Dashboard from '../../components/Dashboard/Dashboard';
import InProgressTransfert from '../../components/Dashboard/Transfert/All/InProgressTransfert';

export default function InProgressPage({logo, user, firebase, firestore, storage, userFirebase, handleUserFirebase, handleUser, auth, dashboard, screenMode}) {
    return(
        <Dashboard pages={{ inprogress: true, }} title={"Transferts en cours"} firebase={firebase} user={user} storage={storage}>
             <Head>
            <title>Dandela Web App - Tous les transferts</title>
            <meta name="description" content="Voir tous les transferts" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
            <InProgressTransfert firestore={firestore} user={user} />
        </Dashboard>
    )
}