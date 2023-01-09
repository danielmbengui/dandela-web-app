import React from 'react';
import ContainerAuthentication from '../../../components/App/Authentication/ContainerAuthentication';
import ErrorFirebase from '../../../components/App/Authentication/Login/ErrorFirebase';
import firebase from "../../../config.firebase";

export default function ErrorFirebasePage() {
  return (
    <ContainerAuthentication>
        <ErrorFirebase firebase={firebase} />
    </ContainerAuthentication>
  )
}