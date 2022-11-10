import React from 'react';
import ErrorFirebase from '../../components/Login/ErrorFirebase';

export default function ErrorFirebasePage({logo, firebase, firestore, handleUser}) {
  return (
    <ErrorFirebase logo={logo} firebase={firebase} firestore={firestore} handleUser={handleUser} />
  )
}