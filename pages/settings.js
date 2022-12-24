import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import Dashboard from '../components/Dashboard/Dashboard';
import Settings from '../components/Dashboard/Settings/Settings';

export default function SettingsPage({ langage, setLangage, auth, user, firebase, storage }) {
    const { t, i18n } = useTranslation('common');
    console.log("TRANSLATE", t('profil'))
    
    useEffect(() => {
      onChangeLanguage(langage);
    }, [langage]);
    const onChangeLanguage = (language) => {
      i18n.changeLanguage(language);
      //setLangage(language);
    };
    return (
        <>
            <Dashboard langage={langage} setLangage={setLangage} pages={{ settings: true, }} title={"Settings"} firebase={firebase} user={user} storage={storage}>
            <Settings user={user} />
            </Dashboard>
        </>
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