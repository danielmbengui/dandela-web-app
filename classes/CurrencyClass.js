import { DEFAULT_SCREEN_MODE } from "../constants";

class Currency {
    constructor({uid = '', name = '', symbol = '',}) {
            /* FIRESTORE variables */
            this.uid = uid;
        this.name = name;
        this.symbol = symbol;
        
    }
    toString() {
        return [
            "UID: " + this.uid, 
            "NAME: " + this.name, 
            "SYMBOL: " + this.symbol,
        ].join(', ');
    }
}

// Firestore data converter
export const currencyConverter = {
    toFirestore: function(currency) {
        return {
            uid: currency.uid,
            name: currency.name,
            symbol: currency.symbol,
            };
    },
    fromFirestore: function(snapshot, options){
        const data = snapshot.data(options);
        return new Currency({uid: data.uid, name: data.name, symbol: data.symbol,});
        /*
uid = null, phoneNumber = null, displayName = '', photoURL = '', profilPhotoURL = '',
        verified=false, screenMode=DEFAULT_SCREEN_MODE
        */
    }
};

export default Currency;
