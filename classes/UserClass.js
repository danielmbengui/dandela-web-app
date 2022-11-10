class User {
    constructor(uid = '', phoneNumber = '', password = '', displayName = '', photoURL = '',
        verified=false,) {
        this.uid = uid;
        this.phoneNumber = phoneNumber;
        this.password = password;
        this.displayName = displayName;
        this.photoURL = photoURL;
        this.verified = verified;
    }
}

// Firestore data converter
const userConverter = {
    toFirestore: function(user) {
        return {
            uid: user.uid,
            phoneNumber: user.phoneNumber,
            password: user.password,
            displayName: user.displayName,
            photoURL: user.photoURL,
            verified: user.verified,
            };
    },
    fromFirestore: function(snapshot, options){
        const data = snapshot.data(options);
        return new User(data.uid, data.phoneNumber, data.password, data.displayName, data.photoURL, data.verified);
    }
};

export default User;
export {userConverter};