import React from 'react';
import ContainerLogin from '../components/Authentication/ContainerLogin';
import Login from '../components/Authentication/Login/Login';
import { withAuthUser, AuthAction } from 'next-firebase-auth'
import PermanentBackdrop from '../components/Loading/PermanentBackdrop';
import initAuth from '../initAuth';

//initAuth();

const MyLoader = () => <PermanentBackdrop />
const LoginPage = () => <ContainerLogin><Login /></ContainerLogin>

export default withAuthUser({
    whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
    whenAuthed: AuthAction.REDIRECT_TO_APP,
    whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
    whenUnauthedAfterInit: AuthAction.RENDER,
    LoaderComponent: MyLoader,
})(LoginPage);