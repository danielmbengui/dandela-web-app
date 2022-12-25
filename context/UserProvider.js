import React, { createContext, useContext, useState, useEffect } from "react";
import { firestore } from "../config.firebase";
import firebase from "../config.firebase";
import { COLLECTION_COUNTRY, COLLECTION_CURRENCY, COLLECTION_USER, DEFAULT_USER } from "../constants";
import User, { userConverter } from "../classes/UserClass";
import Country, { countryConverter } from "../classes/CountryClass";
import Currency, { currencyConverter } from "../classes/CurrencyClass";

const UserContext = createContext();

export default function UserProvider({ children }) {
    const [user, setUser] = useState(DEFAULT_USER);
    const [_user, _setUser] = useState(DEFAULT_USER);
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setPhoneNumber(user.phoneNumber);
                setConnected(true);
                console.log("onAuthStateChanged user", user.phoneNumber);
            } else {
                console.log("onAuthStateChanged user", "null");
                console.log("onAuthStateChanged USER", _user);
                setPhoneNumber(null);
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
        if (phoneNumber && connected) {
            initUserSnapshot(phoneNumber);
        } else {
            setUser(DEFAULT_USER);
        }
    }, [phoneNumber]);

    function initUserSnapshot(phoneNumber) {
        var user = DEFAULT_USER;
        const unsubscribe = firestore.collection(COLLECTION_USER).doc(phoneNumber)
            .withConverter(userConverter)
            .onSnapshot(async (doc) => {

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