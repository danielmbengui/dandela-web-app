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
import { Card, Grid, Stack, Typography } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Avatar from '@mui/material/Avatar';
import { border } from '@mui/system';
import { useUserContext } from '../../../../context/UserProvider';


export default function NoValidTransfertList({ firestore }) {
    const theme = useTheme();
    const [transfertList, setTransfertList] = useState([]);
    const [user, setUser] = useUserContext();


    useEffect(() => {
        if (user) {
            firestore.collection(COLLECTION_TRANSFERT).where("valide", "==", false)
                .onSnapshot((querySnapshot) => {
                    var cities = [];
                    const transferts = [];
                    querySnapshot.forEach((doc) => {
                        const transfert = doc.data();
                        if (!isTransfertValide(transfert)) {
                            transferts.push(transfert);
                        }
                        cities.push(doc.data());
                        console.log("DOC UID:", doc.id);
                    });
                    setTransfertList(transferts);
                    console.log("Current cities in CA: ", transferts.join(", "));
                });
        }
    }, [user]);

    return (
        <Box sx={{ width: '100%', bgcolor: 'var(--background-color)' }}>
            <Card elevation={5} sx={{ padding: 1 }}>
                <List sx={{ width: '100%', }}>
                    {
                        transfertList.map((item, index) => {
                            return (
                                <Link key={item.id + index} href={`/transferts/novalidlist/${item.id}`}
                                    style={{ textDecoration: 'none' }}
                                >
                                    <ListItem disablePadding>
                                        <ListItemButton>
                                            <ListItemText
                                                primary={`${item.destinataire}`}
                                                primaryTypographyProps={{
                                                    fontFamily: 'ChangaOneRegular',
                                                    fontSize: 'large',
                                                    fontWeight: 'medium',
                                                    lineHeight: '20px',
                                                    color: 'var(--text-primary)',
                                                }}

                                            />
                                            <ListItemIcon>
                                                <Avatar sx={{
                                                    bgcolor: 'transparent',
                                                    width: 70,
                                                    height: 24,
                                                    border: '1px solid var(--primary)',
                                                }} variant="rounded">
                                                    <Typography sx={{
                                                        fontFamily: 'ChangaOneRegular',
                                                        color: 'var(--text-primary)',
                                                    }}>
                                                        {item.montant}
                                                    </Typography>
                                                </Avatar>
                                            </ListItemIcon>
                                        </ListItemButton>
                                    </ListItem>
                                    {
                                        index !== transfertList.length-1 && <Divider />
                                    }
                                </Link>
                            )
                        })
                    }
                </List>
            </Card>
        </Box>
    );
}