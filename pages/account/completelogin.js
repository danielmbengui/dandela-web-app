import React from 'react';
import CompleteLogin from '../../components/Home/Login/CompleteLogin';

export default function CompleteLoginPage({logo, firebase, firestore, userFirebase, handleUser}) {
  return (
    <CompleteLogin logo={logo} firebase={firebase} firestore={firestore} userFirebase={userFirebase} handleUser={handleUser} />
  )
}