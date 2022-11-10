import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import Image from "next/image";
import Home from '../components/Home/Home';
import Dashboard from '../components/Dashboard/Dashboard';
import About from '../components/About/About';
import Menu from '../components/Account/Menu';

export default function AboutPage({ auth,}) {
    return(
        <>
        {
            /*
            <Dashboard auth={auth} pages={{ about: true, }} >
            <About />
        </Dashboard>
        */
        }

        <Menu pages={{ about: true, }} title={"About"}>
<About />
        </Menu>
        </>
    )
}