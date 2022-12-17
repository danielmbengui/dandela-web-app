import React, { useState, useEffect } from 'react';
import Dashboard from '../components/Dashboard/Dashboard';
import Settings from '../components/Dashboard/Settings/Settings';
import Install from '../components/Install';

export default function SettingsPage({ auth, user, firebase, storage }) {
    return (
        <>
            <Dashboard pages={{ settings: true, }} title={""} firebase={firebase} user={user} storage={storage}>
            <>
            <Settings user={user} />
                <Install />
            </>
            </Dashboard>
        </>
    )
}