import React from 'react';
import Login from '../../components/Login/Login';

export default function LoginPage({links, firebase, handleUser}) {
  return (
    <Login links={links} firebase={firebase} handleUser={handleUser} />
  )
}
