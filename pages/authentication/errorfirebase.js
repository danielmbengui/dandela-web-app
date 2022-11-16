import React from 'react';
import ContainerLogin from '../../components/Authentication/ContainerLogin';
import ErrorFirebase from '../../components/Authentication/Login/ErrorFirebase';

export default function ErrorFirebasePage({phoneNumber}) {
  return (
    <ContainerLogin>
        <ErrorFirebase phoneNumber={phoneNumber} />
    </ContainerLogin>
  )
}