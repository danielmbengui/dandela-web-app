// ./initAuth.js
import { init } from 'next-firebase-auth'
import adminFirebaseConfig from './config.admin.firebase';

const initAuth = () => {
  init({
    authPageURL: '/profile',
    appPageURL: '/completelogin',
    loginAPIEndpoint: '/api/login', // required
    logoutAPIEndpoint: '/api/logout', // required
    onLoginRequestError: (err) => {
      console.error(err);
      console.log('ERROR login', err);
    },
    onLogoutRequestError: (err) => {
      console.error(err)
      console.log('ERROR logout', err);

    },

    //firebaseAuthEmulatorHost: 'localhost:9099',
    firebaseAdminInitConfig: {
      credential: {
        projectId: 'dandelawebapp',
        clientEmail: 'daniel.mbengui@gmail.com',
        // The private key must not be accessible on the client side.
        privateKey: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY,
      },
      databaseURL: 'https://my-example-app.firebaseio.com',
    },

    // Use application default credentials (takes precedence over firebaseAdminInitConfig if set)
    // useFirebaseAdminDefaultCredential: true,
    firebaseClientInitConfig: {
        apiKey: "AIzaSyArSaR9DcR2UpEZxRrIb7FuhnyG5-TfWB8",
        authDomain: "dandelawebapp.firebaseapp.com",
        projectId: "dandelawebapp",
      databaseURL: 'https://my-example-app.firebaseio.com',


    storageBucket: "dandelawebapp.appspot.com",
    messagingSenderId: "277196487914",
    appId: "1:277196487914:web:91bae7b1a1065c0a51eb93",
    measurementId: "G-MJ6X1M1YRR",
    storageBucket: "gs://dandelawebapp.appspot.com/",
    },
    cookies: {
      name: 'Dandela Web App', // required
      // Keys are required unless you set `signed` to `false`.
      // The keys cannot be accessible on the client side.
      keys: [
        process.env.COOKIE_SECRET_CURRENT,
        process.env.COOKIE_SECRET_PREVIOUS,
      ],
      httpOnly: true,
      maxAge: 12 * 60 * 60 * 24 * 1000, // twelve days
      overwrite: true,
      path: '/',
      sameSite: 'strict',
      secure: false, // set this to false in local (non-HTTPS) development
      signed: false,
    },
    onVerifyTokenError: (err) => {
      console.error(err)
    },
    onTokenRefreshError: (err) => {
      console.error(err)
    },
  })
}

export default initAuth