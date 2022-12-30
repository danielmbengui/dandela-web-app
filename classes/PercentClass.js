class Percent {
    constructor({uid = null, value = '', }) {
            /* FIRESTORE variables */
            this.uid = uid;
        this.value = value;        
    }
    toString() {
        return [
            "UID: " + this.uid, 
            "VALUE: " + this.value, 
        ].join(', ');
    }
}

// Firestore data converter
export const percentConverter = {
    toFirestore: function(percent) {
        return {
            uid: percent.uid,
            value: percent.value,
            };
    },
    fromFirestore: function(snapshot, options){
        const data = snapshot.data(options);
        return new Percent({uid: data.uid, value: data.value,});
        /*
uid = null, phoneNumber = null, displayName = '', photoURL = '', profilPhotoURL = '',
        verified=false, screenMode=DEFAULT_SCREEN_MODE
        */
    }
};

export default Percent;
