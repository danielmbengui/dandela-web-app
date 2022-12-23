import { firestore } from "../config.firebase";
import { COLLECTION_CURRENCY, DEFAULT_SCREEN_MODE } from "../constants";
import Currency from "./CurrencyClass";

class Country {
    constructor({ uid = '', name = '', code = '', symbol = '', currency_uid = '' }) {
        /* FIRESTORE variables */
        this.uid = uid;
        this.name = name;
        this.code = code;
        this.symbol = symbol;
        this.currency_uid = currency_uid;
        this.currency = new Currency({});
    }
    
    toString() {
        return [
            "UID: " + this.uid,
            "NAME: " + this.name,
            "CODE: " + this.code,
            "SYBOL: " + this.symbol,
            "CURRENCY_UID: " + this.currency_uid,
            "CURRENCY: " + this.currency.toString(),
        ].join(', ');
    }
}

// Firestore data converter
export const countryConverter = {
    toFirestore: function (country) {
        return {
            uid: country.uid,
            name: country.name,
            code: country.code,
            symbol: country.symbol,
            currency_uid: country.currency_uid,
        };
    },
    fromFirestore: function (snapshot, options) {
        const data = snapshot.data(options);
        return new Country({ uid: data.uid, name: data.name, code: data.code, symbol: data.symbol, currency_uid: data.currency_uid });
        /*
uid = null, phoneNumber = null, displayName = '', photoURL = '', profilPhotoURL = '',
        verified=false, screenMode=DEFAULT_SCREEN_MODE
        */
    }
};

export default Country;
