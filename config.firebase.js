// v9 compat packages are API compatible with v8 code
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyArSaR9DcR2UpEZxRrIb7FuhnyG5-TfWB8",
    authDomain: "dandelawebapp.firebaseapp.com",
    projectId: "dandelawebapp",
    storageBucket: "dandelawebapp.appspot.com",
    messagingSenderId: "277196487914",
    appId: "1:277196487914:web:91bae7b1a1065c0a51eb93",
    measurementId: "G-MJ6X1M1YRR",
  };


const app = firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
// Initialize Cloud Storage and get a reference to the service
export const storage = firebase.storage();


export default firebase;