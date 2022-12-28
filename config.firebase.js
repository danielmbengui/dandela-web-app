// v9 compat packages are API compatible with v8 code
import firebase from 'firebase/compat/app';
//import getFirestore from 'firebase-admin/firestore';
//import {getStorage} from 'firebase-admin/storage';
//import {getDatabase} from 'firebase-admin/database';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import "firebase/compat/analytics";
import "firebase/compat/messaging";
import "firebase/compat/database";
import { initializeApp, applicationDefault, cert, GoogleOAuthAccessToken } from 'firebase-admin/app';
//import { getMessaging } from "firebase-admin/messaging";


//import "firebase/messaging";
//importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js");
//import { getMessaging } from "firebase/compat/messaging";
// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
//const functions = require('firebase-functions');




// Your web app's Firebase configuration
export const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
    //databaseURL: "https://dandelawebapp.firebaseio.com",
  };

export const app = firebase.initializeApp(firebaseConfig);

// The Firebase Admin SDK to access Firestore.
/*
const admin = require('firebase-admin/app');

const serviceAccount = require("./dandelawebapp-firebase-adminsdk-e28au-dd74d7fb38.json");
export const adminApp = admin.initializeApp({
  credential: cert(serviceAccount),
});
*/

//const messaging = admin.messaging();
console.log("FIREBASE config", app);
//console.log("FIREBASE ADMIN config", admin);
//console.log("FIREBASE MESSAGING config", messaging);
/*
const serviceAccount = require("./dandelawebapp-firebase-adminsdk-e28au-dd74d7fb38.json");
export const admin = initializeApp({
  credential: cert(serviceAccount),
  //credential: applicationDefault(),
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
}, 'app2');
var messagingBis;
console.log("ADMIN", admin)
*/

//console.log("GET APP", getApp('admin'))
//var admin = require("firebase-admin/app");

//var serviceAccount = require("./dandelawebapp-firebase-adminsdk-e28au-add7b105a3.json");
//export const appAdmin = firebase.initializeApp(serviceAccount, 'admin');
//const messaging = getMessaging(appAdmin);


// Initialize Firebase Cloud Messaging and get a reference to the service
//const messaging = firebase.messaging();
//const messaging = getMessaging(app);
export const firestore = firebase.firestore(app);
//export const firestore = getFirestore();
// Initialize Cloud Storage and get a reference to the service
export const storage = firebase.storage(app);
//export const storage = getStorage();
//const messaging = firebase.messaging();
export const database = firebase.database();
//export const database = getDatabase();

export default firebase;