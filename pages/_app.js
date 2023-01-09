import React, { useState } from "react";
import '../styles/globals.css';
import Head from "next/head";
import ThemeModeProvider from "../context/ThemeProvider";
import UserProvider from "../context/UserProvider";
import { appWithTranslation } from 'next-i18next'
import { getLangageStorage, getScreenModeStorage } from "../lib/functions/storage/UserStorageFunctions";
import initAuth from "../initAuth";

initAuth();
require("dotenv").config;

function App({ Component, pageProps, }) {
  const [screenMode,] = useState(getScreenModeStorage());
  const [langage, setLangage] = useState(getLangageStorage());
console.log("STOOOORAGE lang", getLangageStorage())

  return (
    <ThemeModeProvider screenMode={screenMode}>
      <UserProvider >
        <Head>
          <title>Dandela Web App</title>
          <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=yes, viewport-fit=cover' />
        </Head>

        <Component {...pageProps}
          langage={langage} setLangage={setLangage}
        />
      </UserProvider>
    </ThemeModeProvider>
  )
}

export default appWithTranslation(App)