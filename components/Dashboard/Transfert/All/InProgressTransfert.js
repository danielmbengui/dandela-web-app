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
import { isTransfertInProgress } from '../../../../functions/firestore/TransfertFunctions';
import { Card, Grid, Stack, Typography } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Avatar from '@mui/material/Avatar';
import { border } from '@mui/system';
import { useUserContext } from '../../../../context/UserProvider';
import Transfert, { transfertConverter } from '../../../../classes/TransfertClass';
import SlideInDialog from '../../../MyComponents/SlideInDialog';
import TitleDialog from '../../../MyComponents/TitleDialog';
import OneTransfertDialog from '../OneTransfertDialog';
import { useTranslation } from 'react-i18next';


export default function InProgressTransfert({ firestore, }) {
    const theme = useTheme();
    const [transfertList, setTransfertList] = useState([]);
    const [user,] = useUserContext();
    const [transfert, setTransfert] = useState(null);
    const [componentTransfert, setComponentTransfert] = useState(<></>);
    const [showTransfert, setShowTransfert] = useState(false);
    const [totalAmountList, setTotalAmountList] = useState(0);

    const isInListTransfert = (transfert, list) => {
        for (let i = 0; i < list.length; i++) {
            if (transfert.uid === list[i].uid) {
                return (true);
            }
            return (false);
        }
    }

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

        console.log(new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(number));
        // expected output: "123.456,79 €"

        // the Japanese yen doesn't use a minor unit
        console.log(new Intl.NumberFormat('us-US', { style: 'currency', currency: 'USD' }).format(number));
        // expected output: "￥123,457"

        // limit to three significant digits
        console.log(new Intl.NumberFormat('de-CH', { style: 'currency', currency: 'CHF', maximumSignificantDigits: 3 }).format(number));
        // expected output: "1,23,000"
        var value = (100000).toLocaleString(
            undefined, // leave undefined to use the visitor's browser 
            // locale or a string like 'en-US' to override it.
            { minimumFractionDigits: 2 }
        );
        console.log("VALUEEEe NUMBER", value);
        var locales = [
            undefined,  // Your own browser
            'en-US',    // United States
            'de-DE',    // Germany
            'ru-RU',    // Russia
            'hi-IN',    // India
            'de-CH',    // Switzerland
        ];
        var n = 100000;
        var opts = { minimumFractionDigits: 2 };
        for (var i = 0; i < locales.length; i++) {
            console.log("LOCAAALES", locales[i], n.toLocaleString(locales[i], opts));
        }

    }, [user, transfert && transfert.receiver]);

    return (
        <Box sx={{ width: '100%', bgcolor: 'var(--background-color)' }}>
            <Card sx={{ padding: 1, mb: 3, bgcolor: 'var(--card-background)' }}>
                <List sx={{ width: '100%', }}>
                    {
                        transfertList.map((item, index) => {
                            //const date1 = 
                            console.log("LIST transfert", item.date_create, new Date(item.date_create.seconds * 1000))
                            return (
                                <div key={item.uid + index}
                                    onClick={() => {
                                        setTransfert(item);
                                        setShowTransfert(true);
                                        setComponentTransfert(<OneTransfertDialog firestore={firestore} uid={item.uid} setComponentTransfert={setComponentTransfert} />);
                                        console.log("CLIIIIICK", item,)
                                    }}
                                >
                                    <ListItem disablePadding>
                                        <ListItemButton>
                                            <ListItemText
                                                primary={`${item.receiver}`}
                                                primaryTypographyProps={{
                                                    fontFamily: 'ChangaOneRegular',
                                                    fontSize: {xs:'large', sm: 'x-large'},
                                                    fontWeight: 'medium',
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
                   
                        /**
                         * .sort((item, item1) => {
                            const sorting = parseInt(item) > parseInt(item.date_create) ? 0 : 1;
                            console.log("item one", item)
                            console.log("item two", item1)
                            console.log("sorting", sorting)
                            
                            return(sorting);
                        })
                         */
                         
                    }
                </List>
            </Card>
            <Grid container columns={{xs:12, sm:12}} alignItems={'center'} justifyContent={{xs:'center', sm:'end'}} p={2.5} pr={1} sx={{
                //padding: 1,
                bgcolor: 'var(--card-background)',
                borderTop: '3px solid var(--primary)',
            }}>
                
                <Grid item xs={12} sm={6}
                //sx={{ bgcolor: 'green' }}
                >
                     <Stack direction={'row'} justifyContent={{xs:'center', sm: 'start'}} alignItems={'center'}>
                     <Typography sx={{
                            fontFamily: 'ChangaOneRegular',
                            color: 'var(--text-primary)',
                            fontSize: {xs:'x-large', sm: 'xx-large'},
                            
                        }}>
                            Nb : {transfertList.length}
                        </Typography>
                     </Stack>
                </Grid>
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
            {componentTransfert}
            {
                /**
                 * <OneTransfertDialog setComponentTransfert={setComponentTransfert} firestore={firestore} user={user} transfert={transfert} setTransfert={setTransfert} showTransfert={showTransfert} setShowTransfert={setShowTransfert} />
                 */
            }

        </Box>
    );
}