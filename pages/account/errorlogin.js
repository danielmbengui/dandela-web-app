import React from 'react';
import ErrorLogin from '../../components/Login/ErrorLogin';

export default function ErrorLoginPage({logo, links, firebase, firestore, handleUser}) {
  return (
    <ErrorLogin logo={logo} links={links} firebase={firebase} firestore={firestore} handleUser={handleUser} />
  )
}