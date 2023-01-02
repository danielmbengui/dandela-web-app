import React, { useState, useEffect } from 'react';
import About from '../components/About/About';
import Dashboard from '../components/App/Dashboard/Dashboard';

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