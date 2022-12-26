import React, { useState, useEffect } from 'react';
//import useTranslation from 'next-translate/useTranslation';
import Head from 'next/head'
import Profile from '../components/Profile/Profile';
import Dashboard from '../components/Dashboard/Dashboard';
import { useUserContext } from '../context/UserProvider';
import InstallApp from '../components/InstallApp/InstallApp';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { Button } from '@mui/material';
import { US, GB, FR, PT } from 'country-flag-icons/react/3x2'
import { STORAGE_LANGAGE } from '../constants';

export default function ProfilPage({ langage, setLangage, logo, user, firebase, firestore, storage, userFirebase, handleUserFirebase, handleUser, auth, dashboard, screenMode}) {
  const { t, i18n } = useTranslation('common');
console.log("TRANSLATE", t('profil'))

const onChangeLanguage = (language) => {
  i18n.changeLanguage(language);
  //setLangage(language);
};

useEffect(() => {
  onChangeLanguage(langage);
}, [langage]);


  return(
        <Dashboard langage={langage} setLangage={setLangage} pages={{ profile: true, }} title={t('menuProfile')} firebase={firebase} user={user} storage={storage}>
             <Head>
            <title>Dandela Web App - Profile</title>
            <meta name="description" content="Profil de l'utilisateur" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Profile logo={logo} user={user} handleUser={handleUser} firebase={firebase} firestore={firestore} storage={storage} userFirebase={userFirebase} handleUserFirebase={handleUserFirebase} />
        </Dashboard>
    )
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'profil',
        //'footer',
      ], null, ['en', 'fr', 'pt'])),
      // Will be passed to the page component as props
    },
  }
}