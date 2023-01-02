import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import Image from "next/image";
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import Dashboard from '../../../components/App/Dashboard/Dashboard';
import { useTranslation } from 'react-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { LANGAGE_ENGLISH, LANGAGE_FRENCH, LANGAGE_PORTUGUESE, NAMESPACE_LANGAGE_COMMON, NAMESPACE_LANGAGE_PROFILE, PAGE_LINK_HOME } from '../../../constants';
import Settings from '../../../components/App/Dashboard/Settings/Settings';

export default function SettingsPage({ firebase, langage, setLangage }) {
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
            pages={{ settingsPage: true, }} title={t('menuSettings')}
        >
           <Settings />
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