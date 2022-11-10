import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import Image from "next/image";
import Home from '../components/Home/Home';
import Profile from '../components/Profile/Profile';
import Menu from '../components/Account/Menu';


export default function ProfilePage({firebase, auth, dashboard}) {
    return(
        <>
        {
            /*
            <Dashboard pages={{ profile: true, }} content={<Profile />} />
            */
        }
        <Menu pages={{ profile: true, }} title={"Profile"}>
            <Profile />
        </Menu>
        </>

        
    )
}