import React, { useState, useEffect } from 'react';
import useTranslation from 'next-translate/useTranslation';
import Head from 'next/head'
import Profile from '../components/Profile/Profile';
import Dashboard from '../components/Dashboard/Dashboard';
import { useUserContext } from '../context/UserProvider';
import InstallApp from '../components/InstallApp/InstallApp';

export default function ProfilPage({logo, user, firebase, firestore, storage, userFirebase, handleUserFirebase, handleUser, auth, dashboard, screenMode}) {
  const { t } = useTranslation('common');
console.log("TRANSLATE", t('profil'))
  return(
        <Dashboard pages={{ profile: true, }} title={t('profil')} firebase={firebase} user={user} storage={storage}>
             <Head>
            <title>Dandela Web App - Profile</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Profile logo={logo} user={user} handleUser={handleUser} firebase={firebase} firestore={firestore} storage={storage} userFirebase={userFirebase} handleUserFirebase={handleUserFirebase} />
        </Dashboard>
    )
}