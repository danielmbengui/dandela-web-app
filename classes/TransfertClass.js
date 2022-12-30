import User from "./UserClass";

class Transfert {
    constructor({uid = null, code = null, receiver = null, sender = null, 
        amount = null, percent = null, fees = null, total = null,
        date_create = null, date_last_edits = [], 
        date_receipt_receiver = null, date_receipt_dandela = null, date_receipt_sender = null,
        date_valide= null,
        receipt_receiver = null, receipt_dandela = null, receipt_sender = null, 
        user_create_uid = null, user_edit_uids = [],
        valide = null}) {
        /* FIRESTORE variables */
        this.uid = uid;
        this.code = code;
        this.receiver = receiver;
        this.amount = amount;
        this.percent = percent;
        this.fees = fees;
        this.total = total;

        this.date_create = date_create;
        this.user_create_uid = user_create_uid;
        
        this.date_last_edits = date_last_edits;
        this.user_edit_uids = user_edit_uids;

        this.date_valide = date_valide;
        this.date_receipt_receiver = date_receipt_receiver;
        this.date_receipt_dandela = date_receipt_dandela;
        this.date_receipt_sender = date_receipt_sender;
        this.receipt_receiver = receipt_receiver;
        this.receipt_dandela = receipt_dandela;
        this.receipt_sender = receipt_sender;
        this.valide = valide;
        /* CUSTOM variables */
        this.user_create = new User({});
        this.user_edits = [];
    }

    addDateLastEdit(date) {
        if (!this.date_last_edits.includes(date)) {
            this.date_last_edits.push(date);
        }
    }

    toString() {
        return [
            "UID: " + this.uid, 
            "CODE: " + this.code,
            "DESTINATAIRE: " + this.receiver,
            "MONTANT: " + this.amount,
            "PERCENT: " + this.percent,
            "FEES: " + this.fees,
            "TOTAL: " + this.total,
            "DATE CREATION: " + this.date_create,
            "DATE LAST MODIF: " + this.date_last_edits,
            "DATE RECU ANGOLA: " + this.date_receipt_receiver,
            "DATE RECU AGENCE: " + this.date_receipt_dandela,
            "DATE RECU CLIENT: " + this.date_receipt_sender,
            "DATE VALIDE: " + this.date_valide,
            "RECU ANGOLA: " + this.receipt_receiver,
            "RECU AGENCE: " + this.receipt_dandela,
            "RECU EXPEDITEUR: " + this.receipt_sender,
            "USER CREATE ID: " + this.user_create_uid,
            "USER EDIT ID: " + this.user_edit_uids,
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
            percent: transfert.percent,
            fees: transfert.fees,
            total: transfert.total,
            date_create: transfert.date_create,
            date_last_edits: transfert.date_last_edits,
            date_receipt_receiver: transfert.date_receipt_receiver,
            date_receipt_dandela: transfert.date_receipt_dandela,
            date_receipt_sender: transfert.date_receipt_sender,
            date_valide: transfert.date_valide,
            receipt_receiver: transfert.receipt_receiver,
            receipt_dandela: transfert.receipt_dandela,
            receipt_sender: transfert.receipt_sender,
            user_create_uid: transfert.user_create_uid,
            user_edit_uids: transfert.user_edit_uids,
            valide: transfert.valide,
            };
    },
    fromFirestore: function(snapshot, options){
        const data = snapshot.data(options);
        return new Transfert({uid:data.uid, code: data.code, receiver: data.receiver, 
            amount: data.amount,  percent: data.percent, fees: data.fees, total: data.total, 
            date_create: data.date_create, date_last_edits: data.date_last_edits, 
            date_receipt_receiver: data.date_receipt_receiver, date_receipt_dandela: data.date_receipt_dandela, date_receipt_sender: data.date_receipt_sender,
            date_valide: data.date_valide,
            receipt_receiver: data.receipt_receiver, receipt_dandela: data.receipt_dandela, receipt_sender: data.receipt_sender,
            user_create_uid: data.user_create_uid, user_edit_uids: data.user_edit_uids,
            valide: data.valide,});
    }
};

export default Transfert;
