import React from 'react';
import CompleteLogin from '../../components/Login/CompleteLogin';

export default function ErrorFirebasePage({logo, firebase, firestore, userFirebase, handleUser}) {
  return (
    <CompleteLogin logo={logo} firebase={firebase} firestore={firestore} userFirebase={userFirebase} handleUser={handleUser} />
  )
}