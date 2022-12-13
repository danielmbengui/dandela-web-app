import React from 'react';
import Head from 'next/head';
import Dashboard from '../../components/Dashboard/Dashboard';
import NewTransfert from '../../components/Dashboard/Transfert/NewTransfert';

export default function ProfilePage({logo, user, firebase, firestore, storage, userFirebase, handleUserFirebase, handleUser, auth, dashboard, screenMode}) {
    return(
        <Dashboard pages={{ newtransfert: true, }} title={"Nouveau"} firebase={firebase} user={user} storage={storage}>
             <Head>
            <title>Dandela Web App - Nouveau transfert</title>
            <meta name="description" content="Créer un nouveau transfert" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
            <NewTransfert />
        </Dashboard>
    )
}