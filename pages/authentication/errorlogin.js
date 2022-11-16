import React from 'react';
import ContainerLogin from '../../components/Authentication/ContainerLogin';
import ErrorLogin from '../../components/Authentication/Login/ErrorLogin';

export default function ErrorLoginPage({phoneNumber}) {
  return (
    <ContainerLogin>
        <ErrorLogin phoneNumber={phoneNumber} />
    </ContainerLogin>
  )
}