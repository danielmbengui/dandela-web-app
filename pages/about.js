import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import Image from "next/image";
import About from '../components/About/About';
import Menu from '../components/Account/Menu';
import Dashboard from '../components/Dashboard/Dashboard';

export default function AboutPage({ auth, user, firebase, storage }) {
    return (
        <>
            {
                /*
                <Dashboard auth={auth} pages={{ about: true, }} >
                <About />
            </Dashboard>
            */
            }

            <Dashboard pages={{ about: true, }} title={"About"} firebase={firebase} user={user} storage={storage}>
                <About />
            </Dashboard>
        </>
    )
}