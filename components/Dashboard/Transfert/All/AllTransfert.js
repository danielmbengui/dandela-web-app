import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import { COLLECTION_TRANSFERT } from '../../../../constants';
import Link from 'next/link';

export default function AllTransfert({ firestore }) {
    const [transfertList, setTransfertList] = useState([]);

    useEffect(() => {
        firestore.collection(COLLECTION_TRANSFERT)
        .where("valide", "==", true)
            .onSnapshot((querySnapshot) => {
                var cities = [];
                querySnapshot.forEach((doc) => {
                    cities.push(doc.data());
                    console.log("DOC UID:", doc.uid);
                });
                setTransfertList(cities);
                console.log("Current cities in CA: ", cities.join(", "));
            });
    }, [firestore]);

    return (
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <nav aria-label="main mailbox folders">
                <List>
                    {
                        transfertList.map((item, index) => {
                            return (
                                <ListItem disablePadding key={item.uid + index}>
                        <Link href={`/transferts/${item.uid}`}>
                        <ListItemButton>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary={`${item.destinataire} - ${item.amount}`} />
                        </ListItemButton>
                        </Link>
                    </ListItem>
                            )
                        })
                    }
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary="Inbox" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <DraftsIcon />
                            </ListItemIcon>
                            <ListItemText primary="Drafts" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </nav>
            <Divider />
            <nav aria-label="secondary mailbox folders">
                <List>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemText primary="Trash" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component="a" href="#simple-list">
                            <ListItemText primary="Spam" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </nav>
        </Box>
    );
}