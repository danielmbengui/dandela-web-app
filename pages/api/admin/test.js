import Cors from 'cors';
import initMiddleware from '../../../functions/init-middleware';
import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getMessaging } from "firebase-admin/messaging";

const cors = initMiddleware(
    // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
    Cors({
        // Only allow requests with GET and POST
        methods: ["GET", "POST"],
    })
)

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};
const serviceAccount = require("./dandelawebapp-firebase-adminsdk-e28au-dd74d7fb38.json");
const admin = require('firebase-admin/app');



export default async function handler(req, res) {
    await cors(req, res);
    try {

        const adminApp = admin.initializeApp({
            credential: cert(serviceAccount),
        }, 'admin');
       
            console.log("FIREBASE asdmin", adminApp);
            console.log("FIREBASE messaging", getMessaging(adminApp));
            const message = {
                notification: {
                  title: '$FooCorp up 1.43% on the day',
                  body: '$FooCorp gained 11.80 points to close at 835.67, up 1.43% on the day.'
                },
                data: {
                  score: '850',
                  time: '2:45'
                },
                to: currentToken,
                registration_id: currentToken,
                token: currentToken,
              };
  
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

        adminApp.delete('admin');
        //console.log('AAAAAAAADMIN', adminApp);




        console.log("AAAAA", process.env.FIREBASE_API_KEY)
        //const app = initializeApp({credential: applicationDefault(),}, '');
        //app.messagging();
        /*
        var admin = require("firebase-admin");


        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            //credential: applicationDefault(),
        });
        
        console.log("app", app)
        */



        //console.log("ADDDMIn", app)
        res.status(200).json({ result: serviceAccount, success: true });
    } catch (error) {
        console.log("ADDDMIn ERROR", error)
        res.status(500).json({ result: error, success: false })
    }
}