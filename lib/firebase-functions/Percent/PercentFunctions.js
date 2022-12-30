import Percent, { percentConverter } from "../../../classes/PercentClass";
import { firestore } from "../../../config.firebase";
import { COLLECTION_PERCENT } from "../../../constants";

export async function getPercentFirestore(uid) {
    const percent = await firestore.collection(COLLECTION_PERCENT).doc(uid)
        .withConverter(percentConverter)
        .get()
        .then((doc) => {
            if (doc.exists) {
                return (new Percent(doc.data()));
            }
            return (new Percent({ uid: uid }));
        }).catch(() => {
            return (new Percent({ uid: uid }));
        });
    return (percent);
}

export function getPercentSnapshot(uid, setCurrency) {
    firestore.collection(COLLECTION_PERCENT).doc(uid)
        .withConverter(percentConverter)
        .onSnapshot((doc) => {
            if (doc.exists) {
                setCurrency(new Percent(doc.data()));
            } else {
                setCurrency(new Percent({ uid: uid }));
            }
        });
}

export async function getPercentsFirestore() {
    const percents = await firestore.collection(COLLECTION_PERCENT)
        .withConverter(percentConverter)
        .get()
        .then((docs) => {
            const _percents = [];
            docs.forEach((doc) => {
                const _percent = new Percent(doc.data());
                _percents.push(_percent);
            });
            return (_percents);
        }).catch(() => {
            return ([]);
        });
    return (percents);
}

export function getPercentsSnapshot(setPercents) {
    firestore.collection(COLLECTION_PERCENT)
        .withConverter(percentConverter)
        //.where("date_create", "!=", null)
        .orderBy("value", "asc")
        .onSnapshot((docs) => {
            const _percents = [];
            docs.forEach((doc) => {
                const _percent = new Percent(doc.data());
                _percents.push(_percent);
               
            });
            setPercents(_percents);
        });
}

export async function isPercentFirestore(percent) {
    const percents = await getPercentsFirestore();
    var _isPercentFirestore = false;
    var i = 0;
    while (i < percents.length) {
        const _percent = percents[0];
        if (_percent.uid === percent.uid || _percent.value === percent.value) {
            _isPercentFirestore = true;
            //console.log("IIIIIIIS", _isPercentFirestore);
            return (true);
        }
        i++;
    }
    return (false);
}

export async function addPercentFirestore(percent) {
    // Add a new document with a generated id.
    const newPercentRef = firestore.collection(COLLECTION_PERCENT).doc();
    if (!isPercentFirestore(percent)) {
        percent.uid = newPercentRef.id;
        newPercentRef.withConverter(percentConverter).set(percent);
        return ({ data: percent, success: true, message: '' });
    }
    return ({ data: percent, success: false, message: 'This percent is already in db.' });
}

export function formatPercentValue(value) {
    const _value = parseInt(parseFloat(value) * 100);
    return (_value + "%");
}