import { firestore } from "../../config.firebase";
import { COLLECTION_USER } from "../../constants";

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

export function setUserFirestoreSnapshot(phoneNumber, handleUser){
    var docRef = firestore.collection(COLLECTION_USER).doc(phoneNumber);
      docRef.onSnapshot((doc) => {
        console.log("Current data: ", doc.data());
        if (doc.exists) {
          console.log("Document data:", doc.data());
          // Set with cityConverter
          handleUser(doc.data());
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
          handleUser(null);
          //window.location.href = "/account/errorlogin";
        }
    });
}