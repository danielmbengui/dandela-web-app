import React, { createContext, useContext, useState, useEffect } from "react";
import { firestore } from "../config.firebase";
import firebase from "../config.firebase";

const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState(null);

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                var docRef = firestore.collection("USER").doc(user.phoneNumber);
            docRef.get().then((doc) => {
                if (doc.exists) {
                    console.log("Document data:", doc.data());
                    setUser(doc.data());
                } else {
                    console.log("No such document!");
                    setUser(null);
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
                setUser(null);
            });
                setPhoneNumber(user.phoneNumber);
                console.log("onAuthStateChanged user", user.phoneNumber);
            } else {
                // User is signed out
                console.log("onAuthStateChanged user", "null");
                setUser(null);
                setPhoneNumber(null);
            }
        });
    }, []);
/*
    useEffect(() => {
        if (phoneNumber) {
            var docRef = firestore.collection("USER").doc(phoneNumber);
            docRef.get().then((doc) => {
                if (doc.exists) {
                    console.log("Document data:", doc.data());
                    setUser(doc.data());
                } else {
                    console.log("No such document!");
                    setUser(null);
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
                setUser(null);
            });
        } else {
            setUser(null);
        }
    }, [phoneNumber]);
    */

    return (
        <UserContext.Provider value={[user, setUser]}>
            {children}
        </UserContext.Provider>
    );
}

export function useUserContext() {
    return useContext(UserContext);
}