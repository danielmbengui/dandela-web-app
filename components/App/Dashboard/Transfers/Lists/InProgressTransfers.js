import React, { useState, useEffect } from 'react';
import { COLLECTION_TRANSFERT, } from '../../../../../constants';
import { isTransfertInProgress } from '../../../../../lib/functions/firestore/TransfertFunctions';
import { useUserContext } from '../../../../../context/UserProvider';
import Transfert, { transfertConverter } from '../../../../../classes/TransfertClass';
import ListTransfersCustom from '../../../CustomComponents/ListTransfersCustom';

export default function InProgressTransfers({ firestore, }) {
    const [transfertList, setTransfertList] = useState([]);
    const [user,] = useUserContext();
    const [transfert, setTransfert] = useState(null);
    const [totalAmountList, setTotalAmountList] = useState(0);

    useEffect(() => {
        if (user) {
            firestore.collection(COLLECTION_TRANSFERT)
                .withConverter(transfertConverter)
                .where("valide", "==", true)
                .where("date_create", "!=", null)
                .orderBy("date_create", "desc")
                .onSnapshot((querySnapshot) => {
                    const transferts = [];
                    var transfertsLength = 0;
                    var totalAmount = 0;
                    querySnapshot.forEach((doc) => {
                        const _transfert = new Transfert(doc.data());
                        if (isTransfertInProgress(user, _transfert)) {
                            transferts.push(_transfert);
                            transfertsLength++;

                            totalAmount += parseInt(_transfert.amount);
                        }
                        if (transfert && transfert.uid === _transfert.uid) {
                            setTransfert(_transfert);
                        }
                    });
                    setTotalAmountList(totalAmount);
                    setTransfertList(transferts);
                });
        }
    }, [user, transfert && transfert.receiver]);

    return (
        <ListTransfersCustom
            transfertList={transfertList}
            totalAmountList={totalAmountList}
            user={user}
            firestore={firestore}
        />
    );
}