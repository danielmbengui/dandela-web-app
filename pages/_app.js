import React, { useEffect, useState } from "react";
import '../styles/globals.css';
import '../styles/firebaseui.css';
// Import the functions you need from the SDKs you need
import { firestore, storage } from "../config.firebase";
import firebase from "../config.firebase";
import store from "../redux/store";
import { Provider } from "react-redux";
import ColorMode from "../components/ColorMode";
//import {hashResult} from "../functions/HashResult";
import hashResult from "../functions/ConvertToHash";
import User, { userConverter } from "../classes/UserClass";
import Head from "next/head";
const logo = "/img/logo.png";

const links = {
  errorlogin: "/account/errorlogin",
}

function MyApp({ Component, pageProps }) {
  const [uid, setUid] = useState(null);
  const [user, setUser] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [userFirebase, setUserFirebase] = useState(null);

  const hash = hashResult("123456");
  console.log("HAAAASH", hash);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        var uid = user.uid;
        //var docRef = firestore.collection("USER").doc(user.phoneNumber);
        
setPhoneNumber(user.phoneNumber);
/*
    firestore.collection("USER").where("phoneNumber", "==", user.phoneNumber)
    .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
                console.log("New value: ", change.doc.data());
            }
            if (change.type === "modified") {
                console.log("Modified value: ", change.doc.data());
            }
            if (change.type === "removed") {
                console.log("Removed value: ", change.doc.data());
            }
        });
    });
    */
    
        //setUid(uid);
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
    if( phoneNumber){
      var docRef = firestore.collection("USER").doc(phoneNumber);
    //.withConverter(userConverter);
//.get();

    docRef.get().then((doc) => {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        // Set with cityConverter
        setUserFirebase(doc.data());
        //setPhoneNumber(doc.data().phoneNumber);
        //window.location.href = "/about";
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        setUserFirebase(null);
        //window.location.href = "/account/errorlogin";
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
      setUserFirebase(null);
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





  /*
   useEffect(() => {
    //setUser(auth.currentUser);
    //console.log("AUTHOOO", auth);
    
    //console.log("USER", user);
  }, [auth]);


  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const updateUserInfo = () => {
    dispatch(updateUser());
  }
  useEffect(() => {
    updateUserInfo();
    console.log("USER general", user);
  }, [user.phoneNumber]);
  */

  return (
    <ColorMode>
      <Provider store={store}>
        <Head>
        <title>Dandela Web App</title>
        <meta
  name='viewport'
  content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover'
/>
        </Head>
        <Component {...pageProps} 
        logo={logo} links={links} firebase={firebase} firestore={firestore} storage={storage} 
        userFirebase={userFirebase} handleUserFirebase={handleUserFirebase}
        uid={uid} user={user} handleUser={handleUser} />
      </Provider>
    </ColorMode>

  )
}

export default MyApp
