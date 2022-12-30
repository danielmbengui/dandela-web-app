import React, { createContext, useContext, useState, useEffect } from "react";
import { app, firestore } from "../config.firebase";
import firebase from "../config.firebase";
import { COLLECTION_COUNTRY, COLLECTION_CURRENCY, COLLECTION_USER, DEFAULT_USER } from "../constants";
import User, { userConverter } from "../classes/UserClass";
import Country, { countryConverter } from "../classes/CountryClass";
import Currency, { currencyConverter } from "../classes/CurrencyClass";
import { addCurrencyFirestore, getCurrenciesFirestore, getCurrencyFirestore, getCurrencySnapshot, isCurrencyFirestore } from "../lib/firebase-functions/Currency/CurrencyFunctions";

const UserContext = createContext();

export default function UserProvider({ children }) {
    const [user, setUser] = useState(DEFAULT_USER);
    const [_user, _setUser] = useState(new User({}));
    const [uid, setUid] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [connected, setConnected] = useState(false);

    const [currencySnap, setCurrencySnap] = useState(new Currency({}));

    async function requestPermission() {
        console.log('Requesting permission...');
        await Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
                console.log('Notification permission granted.');
                //alert('Notification permission granted.');
                //return (true);
            }
        })
    }

    function isGranted() {
        console.log('Requesting granted permission...');
        if (Notification.permission === "granted") {
            return (true);
        }
        return (false);
    }

    useEffect(() => {
        async function initRequestNotif() {
            if (("Notification" in window)) {
                if (Notification.permission !== "denied") {
                    await requestPermission();
                }
            }
        }
        initRequestNotif();
    })

    useEffect(() => {
        firebase.auth().onAuthStateChanged((_user) => {
            if (_user) {
                setPhoneNumber(_user.phoneNumber);
                setUid(_user.uid);
                setConnected(true);
                console.log("onAuthStateChanged user", _user.phoneNumber);
            } else {
                console.log("onAuthStateChanged user", "null");
                console.log("onAuthStateChanged USER", _user);
                setPhoneNumber(null);
                setUid(null);
                setConnected(false);
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
        if (uid) {
            initUserSnapshot(uid);
            if (isGranted()) {
                if (window && 'serviceWorker' in navigator) {
                    console.log('Firebase Worker Registered');
                    const messaging = firebase.messaging(app);
                    messaging.getToken({ validKey: 'BNokC6pq_1RHx0D17Tp2KKA7Hz2PuZ7AuAN1gwLQmSCy-heuLpZQsc1FPVnWeXjA9cB4W604jRBDTQIdfvRAA_4' }).then(async (currentToken) => {
                        if (currentToken) {
                            firestore.collection(COLLECTION_USER).doc(uid)
                                .withConverter(userConverter)
                                .update({
                                    tokens: firebase.firestore.FieldValue.arrayUnion(currentToken),
                                });
                            messaging.onMessage((payload) => {
                                console.log('[firebase-messaging-sw.js] Received message ', payload);
                            });
                        } else {
                            console.log('No registration token available. Request permission to generate one.');

                            if (Notification.permission !== 'denied') {
                                requestPermission();
                            }
                        }
                    });
                }
            }
        } else {
            setUser(DEFAULT_USER);
        }
        async function init() {
            const _currency = await getCurrencyFirestore("D67e1mNUB4beMUeIYr23");
            const _currencies = await getCurrenciesFirestore();
            const _isCurrencyFirestore = await isCurrencyFirestore(new Currency({ symbol: "CHF" }));
            //addCurrencyFirestore(new Currency({}))
            console.log("UseEffect UserProvider isCurrencyFirestore", _isCurrencyFirestore);
            console.log("UseEffect UserProvider CURRENCIES", _currencies);
            getCurrencySnapshot("D67e1mNUB4beMUeIYr23", setCurrencySnap);
            //console.log("UseEffect UserProvider COUNTRY SNAP", currencySnap);
        }
        init();
    }, [uid]);

    useEffect(() => {
        console.log("UseEffect UserProvider CURRENCY SNAP", currencySnap);
    }, [currencySnap]);

    function initUserSnapshot(uid) {
        var user = DEFAULT_USER;
        const unsubscribe = firestore.collection(COLLECTION_USER).doc(phoneNumber)
            .withConverter(userConverter)
            .onSnapshot(async (doc) => {
                if (doc.exists) {
                    // Convert to City object
                    user = new User(doc.data());
                    user.uid = uid;
                    user.country = await getCountry(user.country_uid);
                    const userRef = firestore.collection(COLLECTION_USER).doc(uid)
                        .withConverter(userConverter)
                        .set(user)
                        .then((data) => {
                            console.log("Successfully update!");
                        })
                    // Use a City instance method
                    console.log("USEEEEEER Class", user);
                    //setUser(_user);
                } else {
                    console.log("No such document USER class!");
                    user = new User({ phoneNumber: phoneNumber });
                    //user.phoneNumber = phoneNumber;
                    console.log("USEEEEEER Clas NULL", user);
                    unsubscribe();
                }
                setUser(user);
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