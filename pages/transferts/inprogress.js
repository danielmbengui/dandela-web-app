import React, {useEffect} from 'react';
import Head from 'next/head';
import Dashboard from '../../components/Dashboard/Dashboard';
import InProgressTransfert from '../../components/Dashboard/Transfert/All/InProgressTransfert';
import InstallApp from '../../components/InstallApp/InstallApp';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';

export default function InProgressPage({langage, setLangage, logo, user, firebase, firestore, storage, userFirebase, handleUserFirebase, handleUser, auth, dashboard, screenMode}) {
    const { t, i18n } = useTranslation('common')
    useEffect(() => {
        onChangeLanguage(langage);
      }, [langage]);
      const onChangeLanguage = (language) => {
        i18n.changeLanguage(language);
        //setLangage(language);
      };
    
    return(
        <Dashboard langage={langage} setLangage={setLangage} pages={{ inprogress: true, }} title={"Transferts en cours"} firebase={firebase} user={user} storage={storage}>
             <Head>
            <title>Dandela Web App - Tous les transferts</title>
            <meta name="description" content="Voir tous les transferts" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
            <InProgressTransfert firestore={firestore} user={user} />
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