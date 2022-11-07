import React from 'react';
import Login from '../../components/Login/Login';

export default function LoginPage({firebase, handleUser}) {
  return (
    <Login firebase={firebase} handleUser={handleUser} />
  )
}
