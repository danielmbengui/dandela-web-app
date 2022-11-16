import React, { useContext, useEffect, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { AppBar, FormControlLabel, Grid, Switch, Toolbar, Typography } from "@mui/material";
import Image from "next/image";
import { ColorModeContext } from '../ColorMode';
import { myLoader } from '../../functions/ImageLoader';
import Login from './Login/Login';
import ContainerIndex from './ContainerIndex';
//import Login from './Login/Login';
//import CompleteLogin from './Login/CompleteLogin';
//import { myLoader } from '../../functions/ImageLoader';
//import { ColorModeContext } from '../ColorMode';



export default function Index({ state, userReducer, logo, firebase, firestore, user, handleUser }) {
    const theme = useTheme();
    const [content, setContent] = useState(<></>);

/*
    useEffect(() => {
        if (!userReducer) {
            setContent(<Login firebase={firebase} firestore={firestore} user={user} handleUser={handleUser} />);
        } else {
            if (user.displayName && user.password){
                window.location.href = '/about';
            }
            else{
                window.location.href = '/login/completelogin';
            }
            setContent(<></>);
        }
    }, []);
    */

    return (
        <ContainerIndex>
            <Login />
        </ContainerIndex>
    )
};