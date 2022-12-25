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
import { COLLECTION_TRANSFERT, USER_TYPE_ADMIN, USER_TYPE_EMPLOYE_ANGOLA } from '../../../../constants';
import Link from 'next/link';
import { isTransfertInProgress, isTransfertValide } from '../../../../functions/firestore/TransfertFunctions';
import { Card, Container, Grid, Stack, Typography } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Avatar from '@mui/material/Avatar';
import { border } from '@mui/system';
import { useUserContext } from '../../../../context/UserProvider';
import Transfert, { transfertConverter } from '../../../../classes/TransfertClass';
import TitleDialog from '../../../MyComponents/TitleDialog';
import OneTransfertDialog from '../OneTransfertDialog';


export default function NoValidTransfertList({ firestore }) {
    const theme = useTheme();
    const [transfertList, setTransfertList] = useState([]);
    const [user, setUser] = useUserContext();
    const [transfert, setTransfert] = useState(null);
    const [showTransfert, setShowTransfert] = useState(false);
    const [totalAmountList, setTotalAmountList] = useState(0);


    useEffect(() => {
        if (user) {
            firestore.collection(COLLECTION_TRANSFERT)
            .withConverter(transfertConverter)
            .where("valide", "==", false)
                .onSnapshot((querySnapshot) => {
                    const transferts = [];
                    var totalAmount = 0;
                    querySnapshot.forEach((doc) => {
                        const transfert = new Transfert(doc.data());
                        if (!isTransfertValide(transfert)) {
                            transferts.push(transfert);
                            totalAmount += transfert.amount;
                        }
                    });
                    setTransfertList(transferts);
                    setTotalAmountList(totalAmount);
                    console.log("Current cities in CA: ", transferts.join(", "));
                });
        }
    }, [user]);

    return (
        <Box sx={{ width: '100%', bgcolor: 'var(--background-color)' }}>
            <Card sx={{ padding: 1, mb: 3, bgcolor: 'var(--card-background)'}}>
                <List sx={{ width: '100%', }}>
                    {
                        transfertList.map((item, index) => {
                            return (
                                <div key={item.uid + index}
                                onClick={() => {
                                    setTransfert(item);
                                    setShowTransfert(true);
                                    console.log("CLIIIIICK", item, )
                                }}
                                >
                                    <ListItem disablePadding>
                                        <ListItemButton>
                                            <ListItemText
                                                primary={`${item.receiver}`}
                                                primaryTypographyProps={{
                                                    fontFamily: 'ChangaOneRegular',
                                                    fontSize: {xs:'large', sm: 'x-large'},                                                    fontWeight: 'medium',
                                                    lineHeight: '20px',
                                                    color: 'var(--text-primary)',
                                                }}

                                            />
                                            <ListItemIcon>
                                                <Avatar sx={{
                                                    bgcolor: 'transparent',
                                                    width: 75,
                                                    height: 25,
                                                    border: '1px solid var(--primary)',
                                                }} variant="rounded">
                                                    <Typography sx={{
                                                        fontFamily: 'ChangaOneRegular',
                                                        color: 'var(--text-primary)',
                                                        fontSize: {xs:'large', sm: 'x-large'},
                                                    }}>
                                                        {item.amount}
                                                    </Typography>
                                                </Avatar>
                                            </ListItemIcon>
                                        </ListItemButton>
                                    </ListItem>
                                    {
                                        index !== transfertList.length - 1 && <Divider />
                                    }
                                </div>
                            )
                        })
                    }
                </List>
            </Card>
            <Grid container columns={{xs:12, sm:12}} justifyContent={{xs:'center', sm:'end'}} p={2.5} pr={1} sx={{
                //padding: 1,
                bgcolor: 'var(--card-background)',
                borderTop: '3px solid var(--primary)',
            }}>
                
                <Grid item xs={12} sm={6}
                //sx={{ bgcolor: 'green' }}
                >
                    <Avatar sx={{
                        bgcolor: 'transparent',
                        //minWidth: 90,
                        padding: 2,
                        width: '100%',
                        height: 25,
                        border: '1px solid var(--primary)',
                    }} variant="rounded">
                        <Typography sx={{
                            fontFamily: 'ChangaOneRegular',
                            color: 'var(--text-primary)',
                            fontSize: {xs:'x-large', sm: 'xx-large'},
                        }}>
                            Total : {totalAmountList}
                        </Typography>
                    </Avatar>
                </Grid>
            </Grid>
            <OneTransfertDialog firestore={firestore} user={user} transfert={transfert} showTransfert={showTransfert} setShowTransfert={setShowTransfert} />
        </Box>
    );
}