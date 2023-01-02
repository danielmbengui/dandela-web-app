import React from 'react';
import ContainerAuthentication from '../../../components/App/Authentication/ContainerAuthentication';
import ErrorFirebase from '../../../components/App/Authentication/Login/ErrorFirebase';

export default function ErrorFirebasePage({firebase}) {
  return (
    <ContainerAuthentication>
        <ErrorFirebase firebase={firebase} />
    </ContainerAuthentication>
  )
}