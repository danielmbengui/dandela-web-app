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
import { COLLECTION_USER, DEFAULT_LANGAGE, DEFAULT_SCREEN_MODE, STORAGE_LANGAGE, STORAGE_SCREEN_MODE } from "../constants";
import { appWithTranslation } from 'next-i18next'
import { getLangageStorage, getScreenModeStorage } from "../functions/storage/UserStorageFunctions";
import { getMessaging, getToken } from "firebase/messaging";
import axios from "axios";
//import { messaging } from "../public/firebase-messaging-sw";
//import usePWA from 'react-pwa-install-prompt';
require('dotenv').config();

initAuth();



import Script from 'next/script'
import { initializeApp } from "firebase-admin/app";
import { applicationDefault } from "firebase-admin/app";
import User, { userConverter } from "../classes/UserClass";

const logo = "/img/logo.png";

const links = {
  errorlogin: "/account/errorlogin",
}

async function requestPermission() {
  console.log('Requesting permission...');
  await Notification.requestPermission().then((permission) => {
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

const showNotification = () => {
  // create a new notification

  const notification = new Notification('JavaScript Notification API', {
    body: 'This is a JavaScript Notification API demo',
    icon: '/favicon.ico'
  });

  // close the notification after 10 seconds
  setTimeout(() => {
    notification.close();
  }, 10 * 1000);
  console.log("SHOW notiiiiiif")
  // navigate to a URL when clicked
  notification.addEventListener('click', () => {

    window.open('https://www.javascripttutorial.net/web-apis/javascript-notification/', '_blank');
  });
}

// show an error message
const showError = () => {
  const error = document.querySelector('.error');
  error.style.display = 'block';
  error.textContent = 'You blocked the notifications';
}


const admin = require("firebase-admin/app");

function App({ Component, pageProps, }) {


  //var serviceAccount = require("path/to/serviceAccountKey.json");



  /**
   * initializeApp({
    credential: admin.credential.cert(serviceAccount)
  }, 'admin');
   */
  const [isNotif, setIsNotif] = useState(false);
  const hash = hashResult("123456");
  console.log("HAAAASH", hash);
  console.log("ADMIN KEY", process.env.FIREBASE_ADMIN_PRIVATE_KEY_ID);

  useEffect(() => {

  }, [])
  useEffect(() => {

    //console.log('AAAAAAAADMIN', adminApp);
    if (window) {
      window.dataLayer = window.dataLayer || [];
      function gtag() { dataLayer.push(arguments); }
      gtag('js', new Date());

      gtag('config', 'GT-57Z6PD7');
      gtag('event', 'conversion', { 'send_to': 'AW-599823263/44fACKGKqYYYEJ-ngp4C' });

    }

    async function initRequestNotif() {
      if (("Notification" in window)) {
        if (Notification.permission === "default") {
          await requestPermission();
          if (isGranted()) {
            setIsNotif(true);
          }
        } else if (isGranted()) {
          setIsNotif(true);
        } else {
          setIsNotif(false);
        }
      }
    }
    initRequestNotif();
  })

  useEffect(() => {
    if (isGranted()) {
      if (window && 'serviceWorker' in navigator) {
        console.log('Firebase Worker Registered');
        //const messaging = firebase.messaging(app);
        //const messaging = getMessaging(app);
        const messaging = firebase.messaging(app);
        messaging.getToken({ validKey: 'BNokC6pq_1RHx0D17Tp2KKA7Hz2PuZ7AuAN1gwLQmSCy-heuLpZQsc1FPVnWeXjA9cB4W604jRBDTQIdfvRAA_4' }).then(async (currentToken) => {
          if (currentToken) {
            // Send the token to your server and update the UI if necessary
            // ...
            console.log('current token for client: ', currentToken);
            const _user = await firestore.collection(COLLECTION_USER).doc("Wug9H3cqwCcBjGmrKEGyXX8siUm2")
              .withConverter(userConverter)
              .get().then((doc) => {
                if (doc.exists) {
                  return (new User(doc.data()));
                }
                return (null);
              });
            console.log("USER messaging gettoken before", _user);
            firestore.collection(COLLECTION_USER).doc(_user.uid)
              .withConverter(userConverter)
              .update({
                tokens: firebase.firestore.FieldValue.arrayUnion(currentToken),
              })
              .then(() => {
                console.log("Document successfully updated!");
                //window.location.href = '/about';

              })
              .catch((error) => {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
                //window.location.href = '/login/errorlogin';
              });
            console.log("USER messaging gettoken after", _user);




            // Send a message to the device corresponding to the provided
            // registration token.
            /*
            getMessaging().send(message)
              .then((response) => {
                // Response is a message ID string.
                console.log('Successfully sent message:', response);
              })
              .catch((error) => {
                console.log('Error sending message:', error);
              });
              */

            //showNotification();
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

          <Script async src="https://www.googletagmanager.com/gtag/js?id=GT-57Z6PD7" />
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

export async function getStaticProps(props) {
  //const { params } = props;
  //const res = await axios.get(`http://localhost:3000//api/transferts/getone?uid=${params.uid}`);
  //console.log('AXIOS transfert', params.uid);
  //const transfert = res.data;
  const id = 18;
  const admin = 'aie';
  /*
  var admin = require("firebase-admin/app");
  
  //var serviceAccount = require("path/to/serviceAccountKey.json");
  var serviceAccount = require("../dandelawebapp-firebase-adminsdk-e28au-add7b105a3.json");
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  */

  //console.log('AXIOS ONE transfert', transfert);

  return {
    // Passed to the page component as props
    props: { id, admin },
  }
}



export default appWithTranslation(App)