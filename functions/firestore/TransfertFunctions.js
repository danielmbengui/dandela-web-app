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
        if (user.type == USER_TYPE_EMPLOYE_ANGOLA){
            if (!transfert.recu_destinataire){
                return (true);
            }
        }else if (user.type == USER_TYPE_CLIENT){
            if (!transfert.recu_destinataire || !transfert.recu_expediteur){
                return (true);
            }
        }else if (user.type == USER_TYPE_ADMIN || user.type == USER_TYPE_EMPLOYE_EUROPE){
            if (!transfert.recu_destinataire || !transfert.recu_expediteur || !transfert.recu_agence){
                return (true);
            }
        }
    }
    return (false);
}

export const isTransfertFinished = (user, transfert) => {
    if (isTransfertValide(transfert)) {
        if (user.type == USER_TYPE_EMPLOYE_ANGOLA){
            if (transfert.recu_destinataire){
                return (true);
            }
        }else if (user.type == USER_TYPE_CLIENT){
            if (transfert.recu_destinataire && transfert.recu_expediteur){
                return (true);
            }
        }else if (user.type == USER_TYPE_ADMIN || user.type == USER_TYPE_EMPLOYE_EUROPE){
            if (transfert.recu_destinataire && transfert.recu_expediteur && transfert.recu_agence){
                return (true);
            }
        }
    }
    return (false);
}

export const getTransfertStateString = (user, transfert) => {
    if (!isTransfertValide(transfert)){
        return (TRANSFERT_STATE_NO_VALID);
    }else if (isTransfertInProgress(user, transfert)){
        return (TRANSFERT_STATE_IN_PROGRESS);
    }else if (isTransfertFinished(user, transfert)){
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