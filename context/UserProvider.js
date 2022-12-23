import React, { createContext, useContext, useState, useEffect } from "react";
import { firestore } from "../config.firebase";
import firebase from "../config.firebase";
import { setUserFirestoreSnapshot } from "../functions/firestore/UserFunctions";
import { useDispatch, useSelector } from "react-redux";
import { connectUser, updateProfilPhotoURL, updateScreenMode } from "../redux/user/userActions";
import { COLLECTION_COUNTRY, COLLECTION_CURRENCY, COLLECTION_USER, COLLECTION_USER_TYPE, DEFAULT_USER } from "../constants";
import User, { userConverter } from "../classes/UserClass";
import Country, { countryConverter } from "../classes/CountryClass";
import Currency, { currencyConverter } from "../classes/CurrencyClass";
import { signInWithCustomToken } from "firebase/auth";
import PermanentBackdrop from "../components/Loading/PermanentBackdrop";

const UserContext = createContext();

export default function UserProvider({ children }) {
    const dispatch = useDispatch();
    //const user = useSelector((state) => state.user);
    const [user, setUser] = useState(null);

    //const [user, setUser] = useState(null);
    const [uid, setUid] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                //var uid = user.uid;
                //var docRef = firestore.collection("USER").doc(user.phoneNumber);
                //setUid(user.id);
                setPhoneNumber(user.phoneNumber);
                setConnected(true);
                console.log("onAuthStateChanged user", user.phoneNumber);
                // ...
            } else {
                // User is signed out
                // ...
                //setUid(null);
                console.log("onAuthStateChanged user", "null");
                //setUid(null);
                setPhoneNumber(null);
                setConnected(false);
                //window.location.href = "/";
            }

        });

    }, []);

    async function getCurrency(currency_uid) {
        const currency = firestore.collection(COLLECTION_CURRENCY).doc(currency_uid)
            .withConverter(currencyConverter)
            .get().then((doc) => {
                if (doc.exists) {
                    return (new Currency(doc.data()));
                }
                return (null);
            });
        return (currency);
    }

    async function getCountry(country_id) {
        const country = firestore.collection(COLLECTION_COUNTRY).doc(country_id)
            .withConverter(countryConverter)
            .get().then(async (doc) => {
                if (doc.exists) {
                    const _country = new Country(doc.data());
                    _country.currency = await getCurrency(_country.currency_uid);
                    return (_country);
                }
                return (null);
            });
        return (country);
    }

    useEffect(() => {
        /*
        async function initCurrency(){
        const currency = await getCountry("TjWjKEaF3if5nyIAnOTv");
        console.log("Country SPECIal", currency)
        }
        initCurrency();
        var myCountry = null;
        const countryG = firestore.collection(COLLECTION_COUNTRY).onSnapshot((querySnapshot) => {
            querySnapshot.forEach(async (doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log("COUUUNTRYYYY", doc.id, " => ", doc.data());
                const country = new Country(doc.data());
                country.currency = await getCurrency(country.currency_uid);
                myCountry = new Country(doc.data());
                console.log("COUNTRY CLASS getCountry", country);

                //country.getCurrency(country.currency_id);
                return firestore.collection(COLLECTION_CURRENCY).doc(country.currency_uid).onSnapshot((doc) => {
                    var currency = null;
                    if (doc.exists) {
                        console.log("CUUUURRRRRENCY getCurrency", doc.id, " => ", doc.data());
                        currency = new Currency(doc.data());
                        
                        myCountry.currency = new Currency(doc.data());
                        console.log("CURRENCY CLASS getCurrency", doc.id, " => ", currency);

                        console.log("MY country USERPROVIDER", myCountry);
                        return (country);
                    } else {
                        console.log("No such document USER class!");
                        currency = new Currency();
                        return (country);
                    }
                });
            });
        });
        */
        /*
                firestore.collection(COLLECTION_CURRENCY).onSnapshot((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        // doc.data() is never undefined for query doc snapshots
                        console.log("CUUUURRRRRENCY", doc.id, " => ", doc.data());
                        console.log("CURRENCY CLASS", doc.id, " => ", new Currency(doc.data()));
                    });
                });
                */
        if (phoneNumber && connected) {
            initUserSnapshot(phoneNumber);
        } else {
            setUser(null);
        }
    }, [phoneNumber]);

    function initUserSnapshot(phoneNumber) {
        const unsubscribe = firestore.collection(COLLECTION_USER).doc(phoneNumber)
            //.withConverter(userConverter)
            .onSnapshot(async (doc) => {
                var user = DEFAULT_USER;
                if (doc.exists) {
                    // Convert to City object
                    user = new User(doc.data());
                    user.country = await getCountry(user.country_uid);
                    // Use a City instance method
                    console.log("USEEEEEER Class", user);
                    //setUser(_user);
                } else {
                    console.log("No such document USER class!");
                    user = new User({ phoneNumber: phoneNumber });
                    //user.phoneNumber = phoneNumber;
                    console.log("USEEEEEER Clas NULL", user);

                }
                setUser(user);
            })/*.catch((error) => {
                console.log("Error getting document:", error);
                setUser(DEFAULT_USER);
            });
            */
        if (!phoneNumber || !connected) {
            unsubscribe();
            setUser(null);
        }
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