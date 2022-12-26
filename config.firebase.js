// v9 compat packages are API compatible with v8 code
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import "firebase/compat/analytics";
import "firebase/compat/messaging";


//import "firebase/messaging";
//importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js");
//import { getMessaging } from "firebase/compat/messaging";
//import { getMessaging } from "firebase/messaging";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
  };

const app = firebase.initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging and get a reference to the service
//const messaging = firebase.messaging();
//const messaging = getMessaging(app);
export const firestore = firebase.firestore(app);
// Initialize Cloud Storage and get a reference to the service
export const storage = firebase.storage(app);
//const messaging = firebase.messaging();


export default firebase;