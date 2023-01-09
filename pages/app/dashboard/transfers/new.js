import React, {useEffect} from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Dashboard from '../../../../components/App/Dashboard/Dashboard';
import { LANGAGE_ENGLISH, LANGAGE_FRENCH, LANGAGE_PORTUGUESE, NAMESPACE_LANGAGE_COMMON, NAMESPACE_LANGAGE_INPROGRESS_LIST, NAMESPACE_LANGAGE_NEW_TRANSFER, NAMESPACE_LANGAGE_PROFILE } from '../../../../constants';
import NewTransfer from '../../../../components/App/Dashboard/Transfers/NewTransfer';
import firebase from "../../../../config.firebase";
import {firestore} from "../../../../config.firebase";

export default function AddTransfertPage({langage, setLangage}) {
    const { t, i18n } = useTranslation(NAMESPACE_LANGAGE_NEW_TRANSFER);

const onChangeLanguage = (language) => {
  i18n.changeLanguage(language);
};

useEffect(() => {
  onChangeLanguage(langage);
}, [langage]);

    return (
        <>
        <Head>
          <title>
            {`${t('menuTransferts', {ns: NAMESPACE_LANGAGE_COMMON})} - ${t('menuTransfertsNew', {ns: NAMESPACE_LANGAGE_COMMON})}`}
            </title>
        </Head>
        <Dashboard
        firebase={firebase} 
        langage={langage} setLangage={setLangage}
        pages={{ addtransferPage: true, }} 
        title={t('NewTransfert')} 
        >
        <NewTransfer langage={langage} firestore={firestore} />
        </Dashboard>
        </>
    )
}

export async function getStaticProps({ locale }) {
  return {
      props: {
          ...(await serverSideTranslations(locale, [
              NAMESPACE_LANGAGE_COMMON,
              NAMESPACE_LANGAGE_PROFILE,
              NAMESPACE_LANGAGE_NEW_TRANSFER,
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