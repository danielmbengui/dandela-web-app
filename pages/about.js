import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import Image from "next/image";
import About from '../components/About/About';
import Menu from '../components/Account/Menu';

export default function AboutPage({ auth, user}) {
    return(
        <>
        {
            /*
            <Dashboard auth={auth} pages={{ about: true, }} >
            <About />
        </Dashboard>
        */
        }

        <Menu pages={{ about: true, }} title={"About"} user={user}>
<About />
        </Menu>
        </>
    )
}