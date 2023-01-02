// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin');
// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
const functions = require('firebase-functions');
admin.initializeApp();
const messaging = admin.messaging();
//const messaging = 
const tokens = [
    "eJrSSFwrGgun-0Yrj9xLha:APA91bHmroblTrfLvEC-Qs5VobWUnKmgE-d9BHvjsnmb68glmtHC41VG3cTN8FT3xIdTWMqlZV3RYchz2kgRQJ_fez5q8qTjxcOCMszfWEPC10Y4XI15-6VBiL0_8FKEJiPDSVmbOkAu",
   "fKvZ5cp6JX3r6TrBy-EDe9:APA91bGkVCAyBxruthCWG_C29dSiX67rAKaYibTcuYMgnNsNJ9EfVm41JPusAVMMovYzDG-h_Lw9Pc_Ajp44bQbnT-ntSTCf0U_uU-hFGQPwkPzhrp2Bqk-87IPAB6zjBPIZOmPwFYi8",
    // "fKvZ5cp6JX3r6TrBy-EDe9:APA91bGkVCAyBxruthCWG_C29dSiX67rAKaYibTcuYMgnNsNJ9EfVm41JPusAVMMovYzDG-h_Lw9Pc_Ajp44bQbnT-ntSTCf0U_uU-hFGQPwkPzhrp2Bqk-87IPAB6zjBPIZOmPwFYi8",
   // "cKQ-cj4WcckfT3l-lg9X_E:APA91bEuVXurZUvaVHJHR2kTfZo7k44oYFjJiMSxhaU4zqYpleKnexgsIfB0z2M3P2HkYkzEaqksNwYFLkna4Nw6d9d2w2lCl3Xs0P9YTbr5PgVdpay0gpQfkRSoVV0QGwrVuGgIWWKk",
]

//console.log("FIREBASE asdmin", adminApp);
//console.log("FIREBASE messaging", getMessaging(adminApp));
const message = {
    notification: {
        title: 'Nouveau transfert',
        body: 'Sita Maria - 150',
        icon: 'https:/webapp.dandela.com/img/logo.png'
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


    
// Take the text parameter passed to this HTTP endpoint and insert it into 
// Firestore under the path /messages/:documentId/original
exports.createUser = functions.firestore
    .document(`transfert/{uid}`)
    .onCreate((snap, context) => {
      // Get an object representing the document
      // e.g. {'name': 'Marie', 'age': 66}
      const newValue = snap.data();

      // access a particular field as you would any JS property
      const name = newValue.name;
        console.log("OKKKKKAY", snap.data);
        messaging.sendMulticast(message)
    .then((response) => {
        // Response is a message ID string.
        console.log('Successfully sent message:', response);
        //adminApp.delete('admin');
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