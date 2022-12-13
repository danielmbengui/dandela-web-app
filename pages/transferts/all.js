import React from 'react';
import Head from 'next/head';
import Dashboard from '../../components/Dashboard/Dashboard';
import AllTransfert from '../../components/Dashboard/Transfert/All/AllTransfert';

export default function ProfilePage({logo, user, firebase, firestore, storage, userFirebase, handleUserFirebase, handleUser, auth, dashboard, screenMode}) {
    return(
        <Dashboard pages={{ alltransfert: true, }} title={"Nouveau"} firebase={firebase} user={user} storage={storage}>
             <Head>
            <title>Dandela Web App - Tous les transferts</title>
            <meta name="description" content="Voir tous les transferts" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
            <AllTransfert />
        </Dashboard>
    )
}