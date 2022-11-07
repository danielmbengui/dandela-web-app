import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import Image from "next/image";
import Home from '../components/Home/Home'
import Login from '../components/Login/Login'
import Menu from '../components/Menu/Menu';
import { firestore } from "../config.firebase";
import firebase from "../config.firebase";

export default function HomePage({ firebase, firestore, user, handleUser }) {
  const [uid, setUid] = useState(null);
  const auth = firebase.auth();
  console.log("AUTH index", auth);

  firebase.auth().signOut().then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });

  useEffect(() => {

    if (auth.currentUser) {
      window.location.href = "/about";
    }
    console.log("useEffect UID", uid);

  }, [auth]);

  /*
  auth.onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      let uid = user.uid;

      setUid(uid);
      // ...
    } else {
      //handleUser(null);
      setUid(null);
    }
    console.log("AUTH index onAuthStateChanged", user);

  });
  */

  const [content, setContent] = useState(<></>);
  /*
  useEffect(() => {
    //setUser(auth.currentUser);
    //console.log("AUTHOOO", auth);
    console.log("AUTH index", auth);
    //console.log("USER", user);
  }, [auth.currentUser]);
  */


  useEffect(() => {
    if (!user) {
      /*
      setContent(<Login firebase={firebase} handleUser={handleUser} />);
      firestore.collection("USER").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log('User FIRESTORE', `${doc.id} => ${JSON.stringify(doc.data())}`);
        });
        
       
    });
    */
      //window.location.href = "/users/login";
    } else {
      //handleUser();
      //window.location.href = "/about";
      //console.log("AUTHOOO index", user);
    }



  }, []);

  return (
    <Login firebase={firebase} handleUser={handleUser} />
    /*
<div className={styles.container}>
      <Menu firebase={firebase} />
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
    */
  )
}
