import React, { useEffect, useState, useContext } from "react";
import '../styles/globals.css';
import '../styles/firebaseui.css';
// Import the functions you need from the SDKs you need
import { firestore, storage } from "../config.firebase";
import firebase from "../config.firebase";
import store from "../redux/store";
import { Provider } from "react-redux";
//import {hashResult} from "../functions/HashResult";
import hashResult from "../functions/ConvertToHash";
import Head from "next/head";
import ThemeModeProvider from "../context/ThemeProvider";
import { UserProvider } from "../context/UserProvider";
import AppProvider, { AppContext } from "../context/AppProvider";
import initAuth from '../initAuth' // the module you created above
import { DEFAULT_SCREEN_MODE } from "../constants";




const logo = "/img/logo.png";

const links = {
  errorlogin: "/account/errorlogin",
}

function MyApp({ Component, pageProps, }) {
  //const { state } = useContext(AppContext);
  const [uid, setUid] = useState(null);
  const [user, setUser] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [userFirebase, setUserFirebase] = useState(null);
  const [screenMode, setScreenMode] = useState(DEFAULT_SCREEN_MODE);

  /*
  firebase.auth().signOut().then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
  */
  

  const hash = hashResult("123456");
  console.log("HAAAASH", hash);
  console.log("ADMIN KEY", process.env.FIREBASE_ADMIN_PRIVATE_KEY_ID);
  
  /*
  useEffect(() => {
    if( window.localStorage.getItem('screenMode') ){
      setScreenMode(window.localStorage.getItem('screenMode'));
      console.log('SECREEEN MODE storage', window.localStorage.getItem('screenMode'))
    }
    //screenMode
  }, [screenMode])
  */

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        //var uid = user.uid;
        //var docRef = firestore.collection("USER").doc(user.phoneNumber);
        setUid(user.id);
        setPhoneNumber(user.phoneNumber);
        console.log("onAuthStateChanged user", user.phoneNumber);
        // ...
      } else {
        // User is signed out
        // ...
        //setUid(null);
        console.log("onAuthStateChanged user", "null");
        setUid(user.id);
        setPhoneNumber(null);
        //window.location.href = "/";
      }

    });

    if( window.localStorage.getItem('screenMode') !== null ){
      //_screenMode = window.localStorage.getItem('screenMode');
      setScreenMode(window.localStorage.getItem('screenMode'));
      console.log('STORAGE aaaaap', window.localStorage.getItem('screenMode'))
    }else{
      
    }
  }, []);

  useEffect(() => {
    if (phoneNumber) {
      var docRef = firestore.collection("USER").doc(phoneNumber);

      docRef.get().then((doc) => {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          // Set with cityConverter
          setUserFirebase(doc.data());
          setUser(doc.data());
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
          setUserFirebase(null);
          setUser(null);
          //window.location.href = "/account/errorlogin";
        }
      }).catch((error) => {
        console.log("Error getting document:", error);
        setUserFirebase(null);
        setUser(null);
        //setPhoneNumber(null);
      });

      docRef.onSnapshot((doc) => {
        console.log("Current data: ", doc.data());
        if (doc.exists) {
          console.log("Document data:", doc.data());
          // Set with cityConverter
          setUserFirebase(doc.data());
          setUser(doc.data());
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
          setUserFirebase(null);
          setUser(null);
          //window.location.href = "/account/errorlogin";
        }
    });
    }
  }, [phoneNumber]);


  const handleUser = (pUser) => {
    setUser(pUser);
  }

  const handleUserFirebase = (_user) => {
    setUserFirebase(_user);
  }

  initAuth();
  

  return (
    <Provider store={store}>
    <ThemeModeProvider screenMode={screenMode}>
        <Head>
          <title>Dandela Web App</title>
          <meta
            name='viewport'
            content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover'
          />
        </Head>
        <Component {...pageProps}
          logo={logo} links={links}
          phoneNumber={phoneNumber}
          firebase={firebase} firestore={firestore} storage={storage}
          user={user} handleUser={handleUser}
          userFirebase={userFirebase} handleUserFirebase={handleUserFirebase}
          uid={uid} 
          />
     
    </ThemeModeProvider>
    </Provider>

  )
}

export default MyApp
