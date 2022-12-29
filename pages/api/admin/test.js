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
const functions = require('firebase-functions');


export default async function handler(req, res) {
    await cors(req, res);
    try {
        const tokens = [
            "cUxlFaIc-_f17ejSC1kjL2:APA91bGsc7uKCqXeXxDLRvSyY7H3DFwdKBeKxjQL7obn_8e7UjHabgzM2ZZqLDWtPQjxZi61yEw2EYmxRN2LMlTns_kZUq6-TqfQDRUjVelb8d9zSoKZUKMR5NnpXW3G7G1aw1fQpQkU",
            "fKvZ5cp6JX3r6TrBy-EDe9:APA91bGkVCAyBxruthCWG_C29dSiX67rAKaYibTcuYMgnNsNJ9EfVm41JPusAVMMovYzDG-h_Lw9Pc_Ajp44bQbnT-ntSTCf0U_uU-hFGQPwkPzhrp2Bqk-87IPAB6zjBPIZOmPwFYi8",
            "cKQ-cj4WcckfT3l-lg9X_E:APA91bEuVXurZUvaVHJHR2kTfZo7k44oYFjJiMSxhaU4zqYpleKnexgsIfB0z2M3P2HkYkzEaqksNwYFLkna4Nw6d9d2w2lCl3Xs0P9YTbr5PgVdpay0gpQfkRSoVV0QGwrVuGgIWWKk",
        ]

        const adminApp = admin.initializeApp({
            credential: cert(serviceAccount),
        }, 'admin');

        console.log("FIREBASE asdmin", adminApp);
        console.log("FIREBASE messaging", getMessaging(adminApp));
        const message = {
            notification: {
                title: 'Nouveau transfert',
                body: 'Sita Maria - 150',
                //icon: 'https:/webapp.dandela.com/favicon.ico'
            },
            data: {
                score: '850',
                time: '2:45'
            },
            //to: "fKvZ5cp6JX3r6TrBy-EDe9:APA91bGkVCAyBxruthCWG_C29dSiX67rAKaYibTcuYMgnNsNJ9EfVm41JPusAVMMovYzDG-h_Lw9Pc_Ajp44bQbnT-ntSTCf0U_uU-hFGQPwkPzhrp2Bqk-87IPAB6zjBPIZOmPwFYi8",
            //registration_id: "fKvZ5cp6JX3r6TrBy-EDe9:APA91bGkVCAyBxruthCWG_C29dSiX67rAKaYibTcuYMgnNsNJ9EfVm41JPusAVMMovYzDG-h_Lw9Pc_Ajp44bQbnT-ntSTCf0U_uU-hFGQPwkPzhrp2Bqk-87IPAB6zjBPIZOmPwFYi8",
            tokens: tokens,
            //messageId:"15252434",
        };
        getMessaging(adminApp).sendMulticast(message)
            .then((response) => {
                // Response is a message ID string.
                console.log('Successfully sent message:', response);
                adminApp.delete('admin');
            })
            .catch((error) => {
                console.log('Error sending message:', error);

            });
            /**
             * firestore.collection(COLLECTION_USER).doc(_user.phoneNumber).update({
                tokens: _user.tokens,
              })
                .then(() => {
                  console.log("Document successfully updated!");
                  //window.location.href = '/about';
  
                })
                .catch((error) => {
                  // The document probably doesn't exist.
                  console.error("Error updating document: ", error);
                  //window.location.href = '/login/errorlogin';
                });
             */
        // Send a message to the device corresponding to the provided
        // registration token.
        /*
       
          */


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