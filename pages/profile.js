import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import Image from "next/image";
import Home from '../components/Home/Home';
import Dashboard from '../components/Dashboard/Dashboard';
import Profile from '../components/Profile/Profile';


export default function ProfilePage({firebase, auth, dashboard}) {
    return(
        <Dashboard pages={{ profile: true, }} content={<Profile />} />
    )
}