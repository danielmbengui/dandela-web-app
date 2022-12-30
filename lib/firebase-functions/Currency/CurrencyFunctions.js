import Currency, { currencyConverter } from "../../../classes/CurrencyClass";
import { firestore } from "../../../config.firebase";
import { COLLECTION_CURRENCY } from "../../../constants";

export async function getCurrencyFirestore(uid) {
    const currency = await firestore.collection(COLLECTION_CURRENCY).doc(uid)
        .withConverter(currencyConverter)
        .get()
        .then((doc) => {
            if (doc.exists) {
                return (new Currency(doc.data()));
            }
            return (new Currency({ uid: uid }));
        }).catch(() => {
            return (new Currency({ uid: uid }));
        });
    return (currency);
}

export function getCurrencySnapshot(uid, setCurrency) {
    firestore.collection(COLLECTION_CURRENCY).doc(uid)
        .withConverter(currencyConverter)
        .onSnapshot((doc) => {
            if (doc.exists) {
                setCurrency(new Currency(doc.data()));
            } else {
                setCurrency(new Currency({ uid: uid }));
            }
        });
}

export async function getCurrenciesFirestore() {
    const currencies = await firestore.collection(COLLECTION_CURRENCY)
        .withConverter(currencyConverter)
        .get()
        .then((docs) => {
            const _currencies = [];
            docs.forEach((doc) => {
                const _currency = new Currency(doc.data());
                _currencies.push(_currency);
            });
            return (_currencies);
        }).catch(() => {
            return ([]);
        });
    return (currencies);
}

export function getCurrenciesSnapshot(setCurrencies) {
    firestore.collection(COLLECTION_CURRENCY)
        .withConverter(currencyConverter)
        .onSnapshot((docs) => {
            const _currencies = [];
            docs.forEach((doc) => {
                const _currency = new Currency(doc.data());
                _currencies.push(_currency);
            });
            setCurrencies(_currencies);
        }).catch(() => {
            setCurrencies([]);
        });
}

export async function isCurrencyFirestore(currency) {
    const currencies = await getCurrenciesFirestore();
    var _isCurrencyFirestore = false;
    var i = 0;
    while (i < currencies.length) {
        const _currency = currencies[0];
        if (_currency.uid === currency.uid || _currency.name === currency.name || _currency.symbol === currency.symbol) {
            _isCurrencyFirestore = true;
            //console.log("IIIIIIIS", _isCurrencyFirestore);
            return (true);
        }
        i++;
    }
    return (false);
}

export async function addCurrencyFirestore(currency) {
    // Add a new document with a generated id.
    const newCurrencyRef = firestore.collection(COLLECTION_CURRENCY).doc();
    if (!isCurrencyFirestore(currency)) {
        currency.uid = newCurrencyRef.id;
        newCurrencyRef.withConverter(currencyConverter).set(currency);
        return ({data: currency, success: true, message: ''});
    }
    return ({data: currency, success: false, message: 'This currency is already in db.'});
}
