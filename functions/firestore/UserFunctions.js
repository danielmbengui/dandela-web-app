import { firestore, storage } from "../../config.firebase";
import { COLLECTION_COUNTRY, COLLECTION_USER, COLLECTION_USER_TYPE, DEFAULT_USER } from "../../constants";
import { getCountryFirestore } from "./CountryFunctions";

export function getUserFirestore(phoneNumber, handleUser){
    const docRef = firestore.collection(COLLECTION_USER).doc(phoneNumber);
      docRef.get().then((doc) => {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          handleUser(doc.data());
          //return (doc.data());
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
          handleUser(null);
          //return (null);
          //window.location.href = "/account/errorlogin";
        }
      }).catch((error) => {
        console.log("Error getting document:", error);
        handleUser(null);
        //return (null);
        //setPhoneNumber(null);
      });
}

export function getUserFirestoreSnapshot(phoneNumber){
    var docRef = firestore.collection(COLLECTION_USER).doc(phoneNumber);

      docRef.onSnapshot((doc) => {
        console.log("Current data: ", doc.data());
        if (doc.exists) {
          console.log("Document data:", doc.data());
          // Set with cityConverter
          return (doc.data());
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
          return (null);
          //window.location.href = "/account/errorlogin";
        }
    });
}

export function getUserTypeFirestore(id) {
    const userTypeRef = firestore.collection(COLLECTION_USER_TYPE).doc(id);
    const result = userTypeRef.get().then((doc) => {
        if (doc.exists) {
            //console.log("Document data USER_TYPE:", doc.data());
            return (doc.data());
        } else {
            //console.log("No such document USER_TYPE!");
            return (null);
        }
    });
    return (result);
}

export function setUserFirestoreSnapshot(phoneNumber, handleUser){
    var docRefBis = firestore.collection(COLLECTION_USER);
    var userType = docRefBis.doc("+41766795115").collection("USER_TYPE")
    .get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const transfert = doc.data();
            console.log("USER_TYPE", doc.data());
        });
    }).catch((error) => {
        console.log("Error getting document:", error);
        handleUser(null);
        //return (null);
        //setPhoneNumber(null);
      });


    var docUserTypeRef = firestore.collection("USER_TYPE");
    var docRef = firestore.collection(COLLECTION_USER).doc(phoneNumber);
      docRef.onSnapshot(async (doc) => {
        console.log("Current data: ", doc.data());
        if (doc.exists) {
            const user = doc.data();
          console.log("Document data user:", doc.data());
          docRef.collection(COLLECTION_USER_TYPE).doc(user.type_id)
          .get().then(async (doc) => {
            //const userType = await getUserTypeFirestore(user.type_id);
            if (doc.exists) {
                console.log("Document data user USER_TYPE:", doc.data());
            } else {
                console.log("No document for user USER_TYPE");
                const userType = await getUserTypeFirestore(user.type_id);
                docRef.collection(COLLECTION_USER_TYPE).doc(user.type_id).set(userType)
                    .then((doc) => {
                        console.log("Document written with ID: ", doc);
                        docRef.update({
                            type: userType.name
                        })
                        .then(() => {
                            console.log("Document successfully updated!");
                        })
                        .catch((error) => {
                            // The document probably doesn't exist.
                            console.error("Error updating document: ", error);
                        });
                    })
                    .catch((error) => {
                        console.error("Error adding document: ", error);
                    });
                    
            }
          }).catch((error) => {

          })

          docRef.collection(COLLECTION_COUNTRY).doc(user.country_id)
          .get().then(async (doc) => {
            //const userType = await getUserTypeFirestore(user.type_id);
            if (doc.exists) {
                console.log("Document data user COUNTRY:", doc.data());
            } else {
                console.log("No document for user COUNTRY");
                const country = await getCountryFirestore(user.country_id);
                docRef.collection(COLLECTION_COUNTRY).doc(user.country_id).set(country)
                    .then((doc) => {
                        console.log("Document written with ID: ", doc);
                        docRef.update({
                            country: country.name
                        })
                        .then(() => {
                            console.log("Document successfully updated!");
                        })
                        .catch((error) => {
                            // The document probably doesn't exist.
                            console.error("Error updating document: ", error);
                        });
                    })
                    .catch((error) => {
                        console.error("Error adding document: ", error);
                    });
            }
          }).catch((error) => {

          })
          //const userType = await getUserTypeFirestore(user.type_id);
          //console.log("Document data user USER_TYPE:", userType);
          /*
docUserTypeRef.doc(user.user_type_id).onSnapshot((doc) => {
                if (doc.exists ) {
                    console.log("Document data USER:", doc.data());
                    docRef.collection("USER_TYPE").add(doc.data())
                    .then((docRef) => {
                        console.log("Document written with ID: ", docRef.id);
                    })
                    .catch((error) => {
                        console.error("Error adding document: ", error);
                    });
                }else {
                    console.log("No such document USER!");
                }
          })
          */
          //console.log("Document data USER_TYPE:", doc.data().collection("USER_TYPE"));
          // Set with cityConverter
          
                //user.profilPhotoURL = profilPhotoURL;
                const _user = JSON.parse(JSON.stringify(user));
                
                console.log("USERFUNCTIONNNNNS user", user)
                console.log("USERFUNCTIONNNNNS _user", _user)
          handleUser(_user);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
          handleUser(DEFAULT_USER);
          //window.location.href = "/account/errorlogin";
        }
    });
}