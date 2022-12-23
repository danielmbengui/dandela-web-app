import { DEFAULT_SCREEN_MODE } from "../constants";

class User {
    constructor(uid = null, phoneNumber = null, displayName = '', photoURL = '', profilPhotoURL = '',
        type = '', country = '', verified=false, screenMode=DEFAULT_SCREEN_MODE) {
            /* FIRESTORE variables */
        this.uid = uid;
        this.phoneNumber = phoneNumber;
        this.displayName = displayName;
        this.photoURL = photoURL;
        this.profilPhotoURL = profilPhotoURL;
        this.type = type;
        this.country = country;
        this.verified = verified;
        this.screenMode = screenMode;
        /* CUSTOM variables */
        this.authorized = uid && phoneNumber && verified;
        
    }
    toString() {
        return [
            "UID: " + this.uid, 
            "PHONE: " + this.phoneNumber,
            "NAME: " + this.displayName,
            "PHOTO URL: " + this.photoURL,
            "PROFIL PHOTO URL: " + this.profilPhotoURL,
            "TYPE: " + this.type,
            "COUNTRY: " + this.country,
            "VERIFIED: " + this.verified,
            "AUTHORIZED: " + this.authorized,
            "SCREENMODE: " + this.screenMode
        ].join(', ');
    }
}

// Firestore data converter
const userConverter = {
    toFirestore: function(user) {
        return {
            uid: user.uid,
            phoneNumber: user.phoneNumber,
            displayName: user.displayName,
            photoURL: user.photoURL,
            profilPhotoURL: user.profilPhotoURL,
            type: user.type,
            country: user.country,
            verified: user.verified,
            screenMode: user.screenMode,
            };
    },
    fromFirestore: function(snapshot, options){
        const data = snapshot.data(options);
        return new User(data.uid, data.phoneNumber, data.displayName, data.photoURL, data.profilPhotoURL, 
            data.type, data.country, data.verified, data.screenMode);
        /*
uid = null, phoneNumber = null, displayName = '', photoURL = '', profilPhotoURL = '',
        verified=false, screenMode=DEFAULT_SCREEN_MODE
        */
    }
};

export default User;
export {userConverter};