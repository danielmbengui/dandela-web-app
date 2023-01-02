import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { LANGAGE_ENGLISH, LANGAGE_FRENCH, LANGAGE_PORTUGUESE, NAMESPACE_LANGAGE_COMMON, NAMESPACE_LANGAGE_PROFILE, PAGE_LINK_HOME } from '../../../constants';
import Dashboard from '../../../components/App/Dashboard/Dashboard';
import Profile from '../../../components/App/Dashboard/Profile/Profile';

export default function ProfilePage({ firebase, firestore, storage, langage, setLangage }) {
    const { t, i18n } = useTranslation(NAMESPACE_LANGAGE_COMMON);
    const router = useRouter();

    const onChangeLanguage = (language) => {
        i18n.changeLanguage(language);
    };

    useEffect(() => {
        onChangeLanguage(langage);
    }, [langage]);
    return (
        <Dashboard
            firebase={firebase}
            langage={langage} setLangage={setLangage}
            pages={{ profilePage: true, }} title={t('menuProfile')}
        >
            <Profile 
            firebase={firebase}
            firestore={firestore}
            storage={storage} 
            />
        </Dashboard>
    )
}

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, [
                NAMESPACE_LANGAGE_COMMON,
                NAMESPACE_LANGAGE_PROFILE,
                //'footer',
            ], null, [
                LANGAGE_FRENCH, 
                LANGAGE_ENGLISH, 
                LANGAGE_PORTUGUESE
            ])),
            // Will be passed to the page component as props
        },
    }
}