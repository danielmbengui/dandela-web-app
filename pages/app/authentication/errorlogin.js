import React from 'react';
import ContainerAuthentication from '../../../components/App/Authentication/ContainerAuthentication';
import ErrorLogin from '../../../components/App/Authentication/Login/ErrorLogin';

export default function ErrorLoginPage({firebase}) {
  return (
    <ContainerAuthentication>
        <ErrorLogin firebase={firebase} />
    </ContainerAuthentication>
  )
}