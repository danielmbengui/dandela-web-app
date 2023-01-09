import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import Image from "next/image";
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Dashboard from '../../../../../components/App/Dashboard/Dashboard';
import { LANGAGE_ENGLISH, LANGAGE_FRENCH, LANGAGE_PORTUGUESE, NAMESPACE_LANGAGE_COMMON, NAMESPACE_LANGAGE_INPROGRESS_LIST, NAMESPACE_LANGAGE_PROFILE } from '../../../../../constants';
import InProgressTransfers from '../../../../../components/App/Dashboard/Transfers/Lists/InProgressTransfers';
import firebase from "../../../../../config.firebase";
import {firestore} from "../../../../../config.firebase";

export default function InProgressListPage({langage, setLangage  }) {
    const { t, i18n } = useTranslation(NAMESPACE_LANGAGE_INPROGRESS_LIST);
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
        pages={{ inprogressPage: true, }} 
        title={t('InprogressTransfert')} 
        >
        <InProgressTransfers firestore={firestore} />
        </Dashboard>
    )
}

export async function getStaticProps({ locale }) {
  return {
      props: {
          ...(await serverSideTranslations(locale, [
              NAMESPACE_LANGAGE_COMMON,
              NAMESPACE_LANGAGE_PROFILE,
              NAMESPACE_LANGAGE_INPROGRESS_LIST,
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