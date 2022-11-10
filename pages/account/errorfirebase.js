import React from 'react';
import ErrorLogin from '../../components/Login/ErrorLogin';

export default function ErrorFirebasePage({logo, firebase, firestore, handleUser}) {
  return (
    <ErrorFirebase logo={logo} firebase={firebase} firestore={firestore} handleUser={handleUser} />
  )
}