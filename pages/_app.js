import React, { useEffect, useState } from "react";
import '../styles/globals.css';
import '../styles/firebaseui.css';
// Import the functions you need from the SDKs you need
import { app, firebaseConfig, firestore, storage } from "../config.firebase";
import firebase from "../config.firebase";
import store from "../redux/store";
import { Provider, } from "react-redux";
//import {hashResult} from "../functions/HashResult";
import hashResult from "../functions/ConvertToHash";
import Head from "next/head";
import ThemeModeProvider from "../context/ThemeProvider";
import UserProvider from "../context/UserProvider";
import initAuth from '../initAuth' // the module you created above
import { DEFAULT_LANGAGE, DEFAULT_SCREEN_MODE, STORAGE_LANGAGE, STORAGE_SCREEN_MODE } from "../constants";
import { appWithTranslation } from 'next-i18next'
import { getLangageStorage, getScreenModeStorage } from "../functions/storage/UserStorageFunctions";
import { getMessaging, getToken } from "firebase/messaging";
//import { messaging } from "../public/firebase-messaging-sw";
require('dotenv').config();
initAuth();


const logo = "/img/logo.png";

const links = {
  errorlogin: "/account/errorlogin",
}

function requestPermission() {
  console.log('Requesting permission...');
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      console.log('Notification permission granted.');
      //alert('Notification permission granted.');
      //return (true);
    }
  })
}

function isGranted() {
  console.log('Requesting granted permission...');
  if (Notification.permission === "granted") {
    return (true);
  }
  return (false);
}


const App = ({ Component, pageProps, }) => {
  const [isNotif, setIsNotif] = useState(false);
  useEffect(() => {
    if (("Notification" in window)) {
      if (Notification.permission === "default") {
        requestPermission();
        if (isGranted()) {
          setIsNotif(true);
        }
      } else if (isGranted()) {
        setIsNotif(true);
      } else {
        setIsNotif(false);
      }
    }
  })

  useEffect(() => {
    if (isGranted()) {
      if (window && 'serviceWorker' in navigator) {
        console.log('Firebase Worker Registered');
        //const messaging = firebase.messaging(app);
        //const messaging = getMessaging(app);
        const messaging = firebase.messaging(app);
        getToken(messaging, { validKey: 'BIB5XYcFx-IyTrAqjINKFm2Xz4VBkZb6ec5PL-FH1GTTgGqK7Ro0mxcKM8TIiqFgn12b1AxJ-sb65zLVeampHII' }).then((currentToken) => {
          if (currentToken) {
            // Send the token to your server and update the UI if necessary
            // ...
            console.log('current token for client: ', currentToken);
            messaging.onMessage((payload) => {
              console.log('[firebase-messaging-sw.js] Received message ', payload);
              // Customize notification here
              /*
              const notificationTitle = 'Background Message Title';
              const notificationOptions = {
                body: 'Message body.',
                icon: '/firebase-logo.png'
              };
  
              self.registration.showNotification(notificationTitle,
                notificationOptions);
                */
            });

          } else {
            // Show permission request UI
            console.log('No registration token available. Request permission to generate one.');
            // ...
            //return (null);
          }
        }).catch((err) => {
          console.log('An error occurred while retrieving token. ', err);
          // ...
          //return (null);
        });

        messaging.onMessage((payload) => {
          console.log('[firebase-messaging-sw.js] Received message 2222222', payload);
          // Customize notification here
          /*
          const notificationTitle = 'Background Message Title';
          const notificationOptions = {
            body: 'Message body.',
            icon: '/firebase-logo.png'
          };

          self.registration.showNotification(notificationTitle,
            notificationOptions);
            */
        });
      }

    }
  }, [])
  //const { state } = useContext(AppContext);
  //firebaseApp = initializeApp(firebaseConfig);
  /*

    */

  const [uid, setUid] = useState(null);
  const [user, setUser] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [userFirebase, setUserFirebase] = useState(null);
  const [screenMode, setScreenMode] = useState(DEFAULT_SCREEN_MODE);
  const [langage, setLangage] = useState(DEFAULT_LANGAGE);

  useEffect(() => {
    let _screenMode = getScreenModeStorage();
    setScreenMode(_screenMode);
    console.log("SCREENMODE _app", _screenMode)
    let _langage = getLangageStorage();
    setLangage(_langage);
    console.log("LANGAGE _app", _langage)
  }, [])
  const hash = hashResult("123456");
  console.log("HAAAASH", hash);
  console.log("ADMIN KEY", process.env.FIREBASE_ADMIN_PRIVATE_KEY_ID);

  const handleUser = (pUser) => {
    setUser(pUser);
  }

  const handleUserFirebase = (_user) => {
    setUserFirebase(_user);
  }

  return (
    <Provider store={store}>
      <ThemeModeProvider screenMode={screenMode}>
        <UserProvider >

          <Head>
            <title>Dandela Web App</title>
            <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover' />

          </Head>
          <Component {...pageProps}
            langage={langage} setLangage={setLangage}
            logo={logo} links={links}
            phoneNumber={user ? user.phoneNumber : ''}
            firebase={firebase} firestore={firestore} storage={storage}
            user={user} handleUser={handleUser}
            userFirebase={userFirebase} handleUserFirebase={handleUserFirebase}
            uid={uid}
          />
        </UserProvider>
      </ThemeModeProvider>
    </Provider>
  )
}



export default appWithTranslation(App)