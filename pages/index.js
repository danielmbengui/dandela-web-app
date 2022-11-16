import React, { useState, useEffect, useContext } from 'react';
import Head from 'next/head'
import Image from "next/image";
import Home from '../components/Home/Home';
import Index from '../components/Index/Index';
import { firestore, storage } from "../config.firebase";
import firebase from "../config.firebase";
import ContainerLogin from '../components/Authentication/ContainerLogin';
import Login from '../components/Authentication/Login/Login';
import { withAuthUser, AuthAction } from 'next-firebase-auth'
import PermanentBackdrop from '../components/Loading/PermanentBackdrop';

const MyLoader = () => <PermanentBackdrop />

const LoginPage = () => <ContainerLogin><Login /></ContainerLogin>

export default withAuthUser({
    whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
    whenAuthed: AuthAction.REDIRECT_TO_APP,
    whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
    whenUnauthedAfterInit: AuthAction.RENDER,
    LoaderComponent: MyLoader,
})(LoginPage)