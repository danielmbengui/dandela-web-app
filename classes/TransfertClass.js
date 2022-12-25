
class Transfert {
    constructor({uid = null, code = null, receiver = null, sender = null, amount = null,
        date_create = null, date_last_edit = null, 
        date_receipt_receiver = null, date_receipt_dandela = null, date_receipt_sender = null,
        date_valide= null,
        receipt_receiver = null, receipt_dandela = null, receipt_sender = null, valide = null}) {
            /* FIRESTORE variables */
        this.uid = uid;
        this.code = code;
        this.receiver = receiver;
        this.amount = amount;
        this.date_create = date_create;
        this.date_last_edit = date_last_edit;
        this.date_valide = date_valide;
        this.date_receipt_receiver = date_receipt_receiver;
      this.date_receipt_dandela = date_receipt_dandela;
      this.date_receipt_sender = date_receipt_sender;
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
            "DATE CREATION: " + this.date_create,
            "DATE LAST MODIF: " + this.date_last_edit,
            "DATE RECU ANGOLA: " + this.date_receipt_receiver,
            "DATE RECU AGENCE: " + this.date_receipt_dandela,
            "DATE RECU CLIENT: " + this.date_receipt_sender,
            "DATE VALIDE: " + this.date_valide,
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
            date_create: transfert.date_create,
            date_last_edit: transfert.date_last_edit,
            date_receipt_receiver: transfert.date_receipt_receiver,
            date_receipt_dandela: transfert.date_receipt_dandela,
            date_receipt_sender: transfert.date_receipt_sender,
            date_valide: transfert.date_valide,
            receipt_receiver: transfert.receipt_receiver,
            receipt_dandela: transfert.receipt_dandela,
            receipt_sender: transfert.receipt_sender,
            valide: transfert.valide,
            };
    },
    fromFirestore: function(snapshot, options){
        const data = snapshot.data(options);
        return new Transfert({uid:data.uid, code: data.code, receiver: data.receiver, amount: data.amount, 
            date_create: data.date_create, date_last_edit: data.date_last_edit, 
            date_receipt_receiver: data.date_receipt_receiver, date_receipt_dandela: data.date_receipt_dandela, date_receipt_sender: data.date_receipt_sender,
            date_valide: data.date_valide,
            receipt_receiver: data.receipt_receiver, receipt_dandela: data.receipt_dandela, receipt_sender: data.receipt_sender,
            valide: data.valide,});
        /*
uid = null, phoneNumber = null, displayName = '', photoURL = '', profilPhotoURL = '',
        verified=false, screenMode=DEFAULT_SCREEN_MODE
        */
    }
};

export default Transfert;
