// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin');
//const { initializeApp, applicationDefault } = require('firebase-admin/app');
//const { getMessaging } = require('firebase-admin/messaging');
// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
const functions = require('firebase-functions');
admin.initializeApp();
/*
initializeApp({
    credential: applicationDefault(),
    //databaseURL: 'https://<DATABASE_NAME>.firebaseio.com'
});
*/
const messaging = admin.messaging();
const firestore = admin.firestore();
//const messaging = getMessaging();
//const messaging = 
const tokens = [
    "eJrSSFwrGgun-0Yrj9xLha:APA91bE1v8C5TVdZA9OUx0FTOnWVArtB6C4kvbOV749ZSForXZwX5_nuPpl1mA1gsrtejp60KnY4UmeRpEkOtESh3OHVbqDoo1EnvK4QXzCjiezcqwnCLYY0RdLLCFJuEGw_bTtDiH8g",
    "fKvZ5cp6JX3r6TrBy-EDe9:APA91bHfw18tmY5DBWSc9187ebWtCirRRBfhByneXRciot2dvFT1YvcvSTKE5mfQZSqStsTX9rpNGJpr1Y7CVFUZENnV1E4MSQIHSm_fB3eiJNGunxL0NAUV0XOjY6vfzDMhqNtjgsp5",
    // "fKvZ5cp6JX3r6TrBy-EDe9:APA91bGkVCAyBxruthCWG_C29dSiX67rAKaYibTcuYMgnNsNJ9EfVm41JPusAVMMovYzDG-h_Lw9Pc_Ajp44bQbnT-ntSTCf0U_uU-hFGQPwkPzhrp2Bqk-87IPAB6zjBPIZOmPwFYi8",
    // "cKQ-cj4WcckfT3l-lg9X_E:APA91bEuVXurZUvaVHJHR2kTfZo7k44oYFjJiMSxhaU4zqYpleKnexgsIfB0z2M3P2HkYkzEaqksNwYFLkna4Nw6d9d2w2lCl3Xs0P9YTbr5PgVdpay0gpQfkRSoVV0QGwrVuGgIWWKk",
]

const deviceToken = "eJrSSFwrGgun-0Yrj9xLha:APA91bE1v8C5TVdZA9OUx0FTOnWVArtB6C4kvbOV749ZSForXZwX5_nuPpl1mA1gsrtejp60KnY4UmeRpEkOtESh3OHVbqDoo1EnvK4QXzCjiezcqwnCLYY0RdLLCFJuEGw_bTtDiH8g";

//console.log("FIREBASE asdmin", adminApp);
//console.log("FIREBASE messaging", getMessaging(adminApp));
async function getTokens(type) {
    const registrationTokens = await firestore.collection("USER")
        .where("type", "==", type)
        //.where("type", "==", 'Employé Angola')
        .get()
        .then((docs) => {
            const _registrationTokens = [];
            docs.forEach((doc) => {
                if (doc.exists) {
                    const user = doc.data();
                    user.tokens.forEach((token) => {
                        _registrationTokens.push(token);
                    })
                    console.log("Exist user", doc.data());
                } else {
                    console.log("NO user", "null");
                }
            });

            return (_registrationTokens);
        })
        .catch(() => {
            console.log("ERROR NO user", "null");
            return ([]);
        });
    return (registrationTokens);
}
/*

*/
exports.updateTokenUser = functions.firestore
    .document('USER/{userId}')
    .onUpdate(async (change, context) => {
        // Get an object representing the document
        // e.g. {'name': 'Marie', 'age': 66}
        const newValue = change.after.data();

        // ...or the previous value before this update
        const previousValue = change.before.data();

        // access a particular field as you would any JS property
        const name = newValue.name;
        const _user = change.after.data();
        //const registrationTokens = _user.tokens;
        const topic = "/topics/" + _user.type;
        //const _normalize = messaging.normalizeTopic(topic)

        //firestore.doc('some/otherdoc').set({ ... });
        const registrationTokensAdmin = await getTokens('Admin');
        const registrationTokensAngola = await getTokens('Employé Angola');
        console.log("CONTXT", context)
        console.log("TOKENS Admin", registrationTokensAdmin, registrationTokensAdmin.length);
        console.log("TOKENS Angola", registrationTokensAngola, registrationTokensAngola.length);
        /*
                messaging.subscribeToTopic(registrationTokens, topic)
                    .then((response) => {
                        // See the MessagingTopicManagementResponse reference documentation
                        // for the contents of response.
                        console.log('Successfully subscribed to topic:', response);
                    })
                    .catch((error) => {
                        console.log('Error subscribing to topic:', error);
                    });
                    */

        // perform desired operations ...
    });


// Take the text parameter passed to this HTTP endpoint and insert it into 
// Firestore under the path /messages/:documentId/original
exports.createTransfer = functions.firestore
    .document(`TRANSFERT/{uid}`)
    .onCreate((snap, context) => {
        // Get an object representing the document
        // e.g. {'name': 'Marie', 'age': 66}
        //const newValue = snap.data();
        //const condition = "'Admin' in topics && 'Employé Angola' in topics";
        const condition = '\'Admin\' in topics || \'Employé Angola\' in topics';

        const transfer = snap.data();
        const message = {
            notification: {
                title: 'Nouveau transfert',
                body: `${transfer.receiver} - ${transfer.amount}`,
            },
            webpush: {
                headers: {
                    Urgency: "high"
                },
                notification: {
                    body: "This is a message from FCM to web",
                    requireInteraction: "true",
                    badge: "https://webapp.dandela.com/img/logo.png"
                }
            },
            /*
            android: {
                notification: {
                    icon: 'https://webapp.dandela.com/img/logo.png',
                    imageUrl: 'https://webapp.dandela.com/img/logo.png',
                    color: '#094397',
                    sound: 'default',
                }
            },
            apns: {
                payload: {
                    aps: {
                        'mutable-content': 1
                    }
                },
                fcm_options: {
                    image: 'https://webapp.dandela.com/img/logo.png',
                }
            },
            */

            data: {
                score: '850',
                time: '2:45'
            },

            //to: "fKvZ5cp6JX3r6TrBy-EDe9:APA91bGkVCAyBxruthCWG_C29dSiX67rAKaYibTcuYMgnNsNJ9EfVm41JPusAVMMovYzDG-h_Lw9Pc_Ajp44bQbnT-ntSTCf0U_uU-hFGQPwkPzhrp2Bqk-87IPAB6zjBPIZOmPwFYi8",
            //registration_id: "fKvZ5cp6JX3r6TrBy-EDe9:APA91bGkVCAyBxruthCWG_C29dSiX67rAKaYibTcuYMgnNsNJ9EfVm41JPusAVMMovYzDG-h_Lw9Pc_Ajp44bQbnT-ntSTCf0U_uU-hFGQPwkPzhrp2Bqk-87IPAB6zjBPIZOmPwFYi8",
            //tokens: tokens,
            condition: condition,
            //tokens: condition,
            //token: deviceToken
        };

        // access a particular field as you would any JS property
        //const name = newValue.name;
        //console.log("OKKKKKAY", snap.data());
        /*
        messaging.sendMulticast(message)
            .then((response) => {
                // Response is a message ID string.
                console.log('Successfully sent message:', response);
                //adminApp.delete('admin');
            })
            .catch((error) => {
                console.log('Error sending message:', error);

            });
            */

        messaging.send(message)
            .then((response) => {
                // Response is a message ID string.
                console.log('Successfully sent message:', response);
            })
            .catch((error) => {
                console.log('Error sending message:', error);
            });
        // perform desired operations ...
    });

exports.addMessage = functions.https.onRequest(async (req, res) => {
    // Grab the text parameter.
    const original = req.query.text;
    // Push the new message into Firestore using the Firebase Admin SDK.
    const writeResult = await admin.firestore().collection('messages').add({ original: original });
    // Send back a message that we've successfully written the message
    res.json({ result: `Message with ID: ${writeResult.id} added.` });
});
// Listens for new messages added to /messages/:documentId/original and creates an
// uppercase version of the message to /messages/:documentId/uppercase
exports.makeUppercase = functions.firestore.document('/messages/{documentId}')
    .onCreate((snap, context) => {
        // Grab the current value of what was written to Firestore.
        const original = snap.data().original;

        // Access the parameter `{documentId}` with `context.params`
        functions.logger.log('Uppercasing', context.params.documentId, original);
        const uppercase = original.toUpperCase();
        // You must return a Promise when performing asynchronous tasks inside a Functions such as
        // writing to Firestore.
        // Setting an 'uppercase' field in Firestore document returns a Promise.
        return snap.ref.set({ uppercase }, { merge: true });
    });