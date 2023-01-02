import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import { COLLECTION_TRANSFERT, USER_TYPE_ADMIN, USER_TYPE_EMPLOYE_ANGOLA } from '../../../../../constants';
import Link from 'next/link';
import { isTransfertInProgress } from '../../../../../lib/functions/firestore/TransfertFunctions';
import { Card, Grid, Stack, Typography } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Avatar from '@mui/material/Avatar';
import { border } from '@mui/system';
import { useUserContext } from '../../../../../context/UserProvider';
import Transfert, { transfertConverter } from '../../../../../classes/TransfertClass';
//import OneTransfertDialog from '../OneTransfertDialog';
import { useTranslation } from 'react-i18next';
import ListTransfersCustom from '../../../CustomComponents/ListTransfersCustom';
import OneTransferDialog from './OneTransferDialog';


export default function InProgressTransfers({ firestore, }) {
    const theme = useTheme();
    const [transfertList, setTransfertList] = useState([]);
    const [user,] = useUserContext();
    const [transfert, setTransfert] = useState(null);
    const [componentTransfert, setComponentTransfert] = useState(<></>);
    const [showTransfert, setShowTransfert] = useState(false);
    const [totalAmountList, setTotalAmountList] = useState(0);

    useEffect(() => {
        if (user) {
            firestore.collection(COLLECTION_TRANSFERT)
                //.orderBy("uid")
                .withConverter(transfertConverter)
                .where("valide", "==", true)
                .where("date_create", "!=", null)
                .orderBy("date_create", "desc")
                //.orderBy("valide")
                //.orderBy("date_create", "desc")
                .onSnapshot((querySnapshot) => {
                    const transferts = [];
                    var transfertsLength = 0;
                    var totalAmount = 0;
                    querySnapshot.forEach((doc) => {
                        const _transfert = new Transfert(doc.data());
                        console.log("DOC UID:", _transfert);
                        if (isTransfertInProgress(user, _transfert)) {
                            console.log("DATE create", _transfert.date_create.seconds);

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
                    console.log("Current cities in CA: ", transferts.length);
                });
        }
        const number = 123456.789;

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