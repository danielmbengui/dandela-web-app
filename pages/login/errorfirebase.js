import React from 'react';
import ErrorFirebase from '../../components/Index/Login/ErrorFirebase';

export default function ErrorFirebasePage({logo, user}) {
  return (
    <ErrorFirebase logo={logo} user={user} />
  )
}