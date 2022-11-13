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

  /*
  firebase.auth().signOut().then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
  */
  

  const hash = hashResult("123456");
  console.log("HAAAASH", hash);
  

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        //var uid = user.uid;
        //var docRef = firestore.collection("USER").doc(user.phoneNumber);

        setPhoneNumber(user.phoneNumber);
        console.log("onAuthStateChanged user", user.phoneNumber);
        // ...
      } else {
        // User is signed out
        // ...
        //setUid(null);
        console.log("onAuthStateChanged user", "null");
        setPhoneNumber(null);
      }

    });
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
    <ThemeModeProvider>
      <Provider store={store}>
        <Head>
          <title>Dandela Web App</title>
          <meta
            name='viewport'
            content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover'
          />
        </Head>
        <Component {...pageProps}
          logo={logo} links={links}
          firebase={firebase} firestore={firestore} storage={storage}
          user={user} handleUser={handleUser}
          userFirebase={userFirebase} handleUserFirebase={handleUserFirebase}
          uid={uid} />
      </Provider>
    </ThemeModeProvider>

  )
}



export default MyApp
