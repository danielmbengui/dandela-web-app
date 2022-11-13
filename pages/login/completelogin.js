import React from 'react';
import CompleteLogin from '../../components/Index/Login/CompleteLogin';

export default function CompleteLoginPage({logo, firebase, firestore, user, handleUser}) {
  return (
    <CompleteLogin logo={logo} firebase={firebase} firestore={firestore} user={user} handleUser={handleUser} />
  )
}