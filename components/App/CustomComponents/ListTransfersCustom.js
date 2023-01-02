import React, { useState, useEffect } from 'react';
import { Avatar, Box, Card, Divider, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Typography } from '@mui/material';
import OneTransferDialog from '../Dashboard/Transfers/Lists/OneTransferDialog';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

export default function ListTransfersCustom(props) {
    const { transfertList, totalAmountList, user, firestore } = props;
    const [componentTransfert, setComponentTransfert] = useState(<></>);

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
                                        //setTransfert(item);
                                        //setShowTransfert(true);
                                        setComponentTransfert(<OneTransferDialog user={user} firestore={firestore} uid={item.uid} setComponentTransfert={setComponentTransfert} />);
                                        //console.log("CLIIIIICK", item,)
                                    }}
                                >
                                    <ListItem disablePadding>
                                        <ListItemButton>
                                            <ListItemText
                                                primary={`${item.receiver}`}
                                                primaryTypographyProps={{
                                                    fontFamily: 'ChangaOneRegular',
                                                    fontSize: { xs: 'large', sm: 'x-large' },
                                                    fontWeight: 'medium',
                                                    lineHeight: '20px',
                                                    color: 'var(--text-primary)',
                                                }}

                                            />
                                            {
                                                item.special && <PriorityHighIcon color="error" />
                                            }
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
                                                        fontSize: { xs: 'large', sm: 'x-large' },
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
            <Grid container columns={{ xs: 12, sm: 12 }} alignItems={'center'} justifyContent={{ xs: 'center', sm: 'end' }} p={2.5} pr={1} sx={{
                //padding: 1,
                bgcolor: 'var(--card-background)',
                borderTop: '3px solid var(--primary)',
            }}>

                <Grid item xs={12} sm={6}
                //sx={{ bgcolor: 'green' }}
                >
                    <Stack direction={'row'} justifyContent={{ xs: 'center', sm: 'start' }} alignItems={'center'}>
                        <Typography sx={{
                            fontFamily: 'ChangaOneRegular',
                            color: 'var(--text-primary)',
                            fontSize: { xs: 'x-large', sm: 'xx-large' },

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
                            fontSize: { xs: 'x-large', sm: 'xx-large' },
                        }}>
                            Total : {totalAmountList}
                        </Typography>
                    </Avatar>
                </Grid>
            </Grid>
            {componentTransfert}
        </Box>
    )
}