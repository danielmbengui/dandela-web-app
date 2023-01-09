import React, { useEffect, useState } from "react";
import '../styles/globals.css';
import '../styles/firebaseui.css';
import Head from "next/head";
import ThemeModeProvider from "../context/ThemeProvider";
import UserProvider from "../context/UserProvider";
import { DEFAULT_LANGAGE, DEFAULT_SCREEN_MODE, } from "../constants";
import { appWithTranslation } from 'next-i18next'
import { getLangageStorage, getScreenModeStorage } from "../lib/functions/storage/UserStorageFunctions";
import initAuth from "../initAuth";

initAuth();

function App({ Component, pageProps, }) {
  const [screenMode, setScreenMode] = useState(getScreenModeStorage());
  const [langage, setLangage] = useState(getLangageStorage());
console.log("STOOOORAGE lang", getLangageStorage())
  useEffect(() => {
    /*
    let _screenMode = getScreenModeStorage();
    setScreenMode(_screenMode);
    let _langage = getLangageStorage();
    setLangage(_langage);

    if (window) {
      var ads = document.getElementsByClassName("adsbygoogle").length;
      for (var i = 0; i < ads; i++) {
        try {
          (adsbygoogle = window.adsbygoogle || []).push({});
          console.log("OK link")
        } catch (e) {console.log("no link") }
      }
      console.log("OK widnow")
    }
    */
  })

  return (
    <ThemeModeProvider screenMode={screenMode}>
      <UserProvider >
        <Head>
          <title>Dandela Web App</title>
          <meta name='viewport' content='minimum-scale=1, maximum-scale=5, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=yes, viewport-fit=cover' />
        </Head>

        <Component {...pageProps}
          langage={langage} setLangage={setLangage}
          //firebase={firebase} firestore={firestore} storage={storage}
        />
      {
        /*
                <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js" />

          <ins className="adsbygoogle"
          style={{ display: 'block', textAlign: 'center', }}
          data-ad-layout="in-article"
          data-ad-format="fluid"
          data-ad-client="ca-pub-2953886510697247"
          data-ad-slot="9442176526"></ins>
          */
      }
      </UserProvider>
    </ThemeModeProvider>
  )
}

export default appWithTranslation(App)