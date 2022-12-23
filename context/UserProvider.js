import React, { createContext, useContext, useState, useEffect } from "react";
import { firestore } from "../config.firebase";
import firebase from "../config.firebase";
import { setUserFirestoreSnapshot } from "../functions/firestore/UserFunctions";
import { useDispatch, useSelector } from "react-redux";
import { connectUser, updateProfilPhotoURL, updateScreenMode } from "../redux/user/userActions";
import { COLLECTION_USER, COLLECTION_USER_TYPE, DEFAULT_USER } from "../constants";
import User, { userConverter } from "../classes/UserClass";

const UserContext = createContext();

export default function UserProvider({ children }) {
    const dispatch = useDispatch();
    //const user = useSelector((state) => state.user);
    const [user, setUser] = useState(DEFAULT_USER);

    //const [user, setUser] = useState(null);
    const [uid, setUid] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState(null);

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                //var uid = user.uid;
                //var docRef = firestore.collection("USER").doc(user.phoneNumber);
                //setUid(user.id);
                setPhoneNumber(user.phoneNumber);
                console.log("onAuthStateChanged user", user.phoneNumber);
                // ...
            } else {
                // User is signed out
                // ...
                //setUid(null);
                console.log("onAuthStateChanged user", "null");
                //setUid(null);
                setPhoneNumber(null);
                //window.location.href = "/";
            }

        });
    }, []);

    useEffect(() => {
        if (phoneNumber) {
            initUserSnapshot(phoneNumber);
        } else {
            setUser(DEFAULT_USER);
        }
    }, [phoneNumber]);

    function initUserSnapshot(phoneNumber) {
        firestore.collection(COLLECTION_USER).doc(phoneNumber)
            .withConverter(userConverter)
            .get().then((doc) => {
                var user = null;
                if (doc.exists) {
                    // Convert to City object
                    user = doc.data();
                    // Use a City instance method
                    console.log("USEEEEEER Class", user.toString());
                    setUser(user);
                } else {
                    console.log("No such document USER class!");
                    user = new User();
                    user.phoneNumber = phoneNumber;
                    setUser(user);
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
                setUser(DEFAULT_USER);
            });
    }

    return (
        <UserContext.Provider value={[user, setUser]}>
            {children}
        </UserContext.Provider>
    );
}

export function useUserContext() {
    return useContext(UserContext);
}