import { firestore } from "../../../config.firebase";
import { COLLECTION_COUNTRY } from "../../../constants";

export function getCountryFirestore(id) {
    const countryRef = firestore.collection(COLLECTION_COUNTRY).doc(id);
    const result = countryRef.get().then((doc) => {
        if (doc.exists) {
            //console.log("Document data USER_TYPE:", doc.data());
            return (doc.data());
        } else {
            //console.log("No such document USER_TYPE!");
            return (null);
        }
    });
    return (result);
}