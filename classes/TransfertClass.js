
class Transfert {
    constructor({uid = null, code = null, receiver = null, sender = null, amount = null,
        receipt_receiver = null, receipt_dandela = null, receipt_sender = null, valide = null}) {
            /* FIRESTORE variables */
        this.uid = uid;
        this.code = code;
        this.receiver = receiver;
        this.amount = amount;
        this.receipt_receiver = receipt_receiver;
        this.receipt_dandela = receipt_dandela;
        this.receipt_sender = receipt_sender;
        this.valide = valide;
    }
    toString() {
        return [
            "UID: " + this.uid, 
            "CODE: " + this.code,
            "DESTINATAIRE: " + this.receiver,
            "MONTANT: " + this.amount,
            "RECU ANGOLA: " + this.receipt_receiver,
            "RECU AGENCE: " + this.receipt_dandela,
            "RECU EXPEDITEUR: " + this.receipt_sender,
            "VALIDE: " + this.valide,
        ].join(', ');
    }
}

// Firestore data converter
export const transfertConverter = {
    toFirestore: function(transfert) {
        return {
            uid: transfert.uid,
            code: transfert.code,
            receiver: transfert.receiver,
            amount: transfert.amount,
            receipt_receiver: transfert.receipt_receiver,
            receipt_dandela: transfert.receipt_dandela,
            receipt_sender: transfert.receipt_sender,
            valide: transfert.valide,
            };
    },
    fromFirestore: function(snapshot, options){
        const data = snapshot.data(options);
        return new Transfert({uid:data.uid, code: data.code, receiver: data.receiver, amount: data.amount, 
            receipt_receiver: data.receipt_receiver, receipt_dandela: data.receipt_dandela, receipt_sender: data.receipt_sender,
            valide: data.valide,});
        /*
uid = null, phoneNumber = null, displayName = '', photoURL = '', profilPhotoURL = '',
        verified=false, screenMode=DEFAULT_SCREEN_MODE
        */
    }
};

export default Transfert;
