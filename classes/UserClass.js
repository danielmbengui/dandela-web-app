import { DEFAULT_SCREEN_MODE } from "../constants";
import Country from "./CountryClass";

class User {
    constructor({uid = '', phoneNumber = '', displayName = '', photoURL = '', profilPhotoURL = '',
        type = '', country_uid = '', verified=false, screenMode=DEFAULT_SCREEN_MODE}) {
            /* FIRESTORE variables */
        this.uid = uid;
        this.phoneNumber = phoneNumber;
        this.displayName = displayName;
        this.photoURL = photoURL;
        this.profilPhotoURL = profilPhotoURL;
        this.type = type;
        this.country_uid = country_uid;
        this.country = new Country({});
        this.verified = verified;
        this.screenMode = screenMode;
        /* CUSTOM variables */
        this.authorized = phoneNumber && verified;
        
    }
    toString() {
        return [
            "UID: " + this.uid, 
            "PHONE: " + this.phoneNumber,
            "NAME: " + this.displayName,
            "PHOTO URL: " + this.photoURL,
            "PROFIL PHOTO URL: " + this.profilPhotoURL,
            "TYPE: " + this.type,
            "COUNTRY UID: " + this.country_uid,
            "COUNTRY: " + this.country.toString(),
            "VERIFIED: " + this.verified,
            "AUTHORIZED: " + this.authorized,
            "SCREENMODE: " + this.screenMode
        ].join(', ');
    }
}

// Firestore data converter
export const userConverter = {
    toFirestore: function(user) {
        return {
            uid: user.uid,
            phoneNumber: user.phoneNumber,
            displayName: user.displayName,
            photoURL: user.photoURL,
            profilPhotoURL: user.profilPhotoURL,
            type: user.type,
            country_uid: user.country_uid,
            verified: user.verified,
            screenMode: user.screenMode,
            };
    },
    fromFirestore: function(snapshot, options){
        const data = snapshot.data(options);
        return new User({uid:data.uid, phoneNumber: data.phoneNumber, displayName: data.displayName, photoURL: data.photoURL,
            profilPhotoURL: data.profilPhotoURL, type: data.type, country_uid: data.country_uid, verified: data.verified, screenMode: data.screenMode});
        /*
uid = null, phoneNumber = null, displayName = '', photoURL = '', profilPhotoURL = '',
        verified=false, screenMode=DEFAULT_SCREEN_MODE
        */
    }
};

export default User;
