// v9 compat packages are API compatible with v8 code
//import firebase from 'firebase/compat/app';
//import 'firebase/compat/auth';
//import 'firebase/compat/firestore';
//import 'firebase/compat/storage';
//import "firebase/compat/analytics";
//import "firebase/compat/messaging";
//import importScripts from 'import-scripts';
//import { firebaseConfig } from '../config.firebase';
//const process = require('dotenv').config();
// Your web app's Firebase configuration
// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');
//importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-functions.js');
//importScripts('../.env');
//import firebase, { app } from "../config.firebase";
//import "firebase/messaging";
//import { firebaseConfig as config } from "../config.js";
//console.log("COOOONFIG SPAAAACE", config)
// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
//importScripts('/__/firebase/9.2.0/firebase-app-compat.js');
//importScripts('/__/firebase/9.2.0/firebase-messaging-compat.js');
//importScripts('/__/firebase/init.js');

const firebaseConfig = {
  apiKey: "AIzaSyArSaR9DcR2UpEZxRrIb7FuhnyG5-TfWB8",
  authDomain: "dandelawebapp.firebaseapp.com",
  projectId: "dandelawebapp",
  storageBucket: "gs://dandelawebapp.appspot.com",
  messagingSenderId: "277196487914",
  appId: "1:277196487914:web:91bae7b1a1065c0a51eb93",
  measurementId: "G-MJ6X1M1YRR",
};

/*
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
  //databaseURL: "https://dandelawebapp.firebaseio.com",
};
*/
//firebase.initializeApp(firebaseConfig);
const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging(app);
//console.log("MESSSSAGIN ervice worker", messaging)
/*
const createTransfert = functions.firestore
    .document(`TRANSFERT/{uid}`)
    .onCreate((snap, context) => {
      // Get an object representing the document
      // e.g. {'name': 'Marie', 'age': 66}
      const newValue = snap.data();
      console.log("NEW CREATE", snap.data());
      // access a particular field as you would any JS property
      //const name = newValue.name;
      // perform desired operations ...
    });
    */
// Initialize Firebase Cloud Messaging and get a reference to the service
//const messaging = firebase.messaging();
//const messaging = getMessaging(app);
//export const firestore = firebase.firestore(app);
// Initialize Cloud Storage and get a reference to the service
//export const storage = firebase.storage(app);
//const messaging = firebase.messaging();
//export default firebase;
// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
//const messaging = firebase.messaging(app);
/*
messaging.onMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Message body.',
    icon: '/firebase-logo.png'
  };
  self.registration.showNotification(notificationTitle,
    notificationOptions);
});
*/
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/img/logo.png',
  };
  self.registration.showNotification(notificationTitle,
    notificationOptions);
});


