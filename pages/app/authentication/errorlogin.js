import React from 'react';
import ContainerAuthentication from '../../../components/App/Authentication/ContainerAuthentication';
import ErrorLogin from '../../../components/App/Authentication/Login/ErrorLogin';
import firebase from "../../../config.firebase";

export default function ErrorLoginPage() {
  return (
    <ContainerAuthentication>
        <ErrorLogin firebase={firebase} />
    </ContainerAuthentication>
  )
}