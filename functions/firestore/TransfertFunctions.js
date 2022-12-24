import axios from "axios";
import { firestore } from "../../config.firebase";
import { COLLECTION_TRANSFERT, TRANSFERT_STATE_FINISHED, TRANSFERT_STATE_IN_PROGRESS, TRANSFERT_STATE_NO_VALID, USER_TYPE_ADMIN, USER_TYPE_CLIENT, USER_TYPE_EMPLOYE_ANGOLA, USER_TYPE_EMPLOYE_EUROPE } from "../../constants";

export const isTransfertValide = (transfert) => {
    if (transfert && transfert.valide)
        return (true);
    return (false);
}

export const isTransfertInProgress = (user, transfert) => {
    if (isTransfertValide(transfert)) {
        if (user.type === USER_TYPE_EMPLOYE_ANGOLA) {
            if (!transfert.receipt_receiver) {
                return (true);
            }
        } else if (user.type === USER_TYPE_CLIENT) {
            if (!transfert.receipt_receiver || !transfert.receipt_sender) {
                return (true);
            }
        } else if (user.type === USER_TYPE_ADMIN || user.type == USER_TYPE_EMPLOYE_EUROPE) {
            if (!transfert.receipt_receiver || !transfert.receipt_sender || !transfert.receipt_dandela) {
                return (true);
            }
        }
    }
    return (false);
}

export const isTransfertFinished = (user, transfert) => {
    if (isTransfertValide(transfert)) {
        if (user.type == USER_TYPE_EMPLOYE_ANGOLA) {
            if (transfert.receipt_receiver) {
                return (true);
            }
        } else if (user.type == USER_TYPE_CLIENT) {
            if (transfert.receipt_receiver && transfert.receipt_sender) {
                return (true);
            }
        } else if (user.type == USER_TYPE_ADMIN || user.type == USER_TYPE_EMPLOYE_EUROPE) {
            if (transfert.receipt_receiver && transfert.receipt_sender && transfert.receipt_dandela) {
                return (true);
            }
        }
    }
    return (false);
}

export const getTransfertStateString = (user, transfert) => {
    if (!isTransfertValide(transfert)) {
        return (TRANSFERT_STATE_NO_VALID);
    } else if (isTransfertInProgress(user, transfert)) {
        return (TRANSFERT_STATE_IN_PROGRESS);
    } else if (isTransfertFinished(user, transfert)) {
        return (TRANSFERT_STATE_FINISHED);
    }
    return ("Inconnu");
}

export function getTransfertsAllList() {
    const res = axios.post(`${process.env.ADDRESS_SERVER}api/transferts/getalllistpaths`, {

    }).then((response) => {
        return (response.data.transfertsId);
    }).catch(() => {
        return ([]);
    });
    return (res);
}

export function getTransfertsInProgressList() {
    const res = axios.post(`${process.env.ADDRESS_SERVER}api/transferts/getinprogresslistpaths`, {
        userType: "Admin",
    }).then((response) => {
        return (response.data.transfertsId);
    }).catch(() => {
        return ([]);
    });
    return (res);
}

export function getTransfertsNoValidList() {
    const res = axios.post(`${process.env.ADDRESS_SERVER}api/transferts/getnovalidlistpaths`, {
        userType: "Admin",
    }).then((response) => {
        return (response.data.transfertsId);
    }).catch(() => {
        return ([]);
    });
    return (res);
}

export function createRandomCode() {
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    var code = "";
    for(let i=0; i < 10; i++) {
        let random = getRandomInt(10);
        code += random;
    }
    return (code);
}

export function formatTransfertCode(code) {
    const _code_first = code.toString().substring(0, 3);
    const _code_second = code.toString().substring(3, 6);
    const _code_third = code.toString().substring(6, 10);
    const _code = _code_first.concat('-', _code_second, '-', _code_third);
    return (_code);
}