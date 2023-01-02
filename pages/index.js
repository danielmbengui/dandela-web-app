import React from 'react';
import { withAuthUser, AuthAction } from 'next-firebase-auth'
import PermanentBackdrop from '../components/Loading/PermanentBackdrop';
import initAuth from '../initAuth';
import ContainerAuthentication from '../components/App/Authentication/ContainerAuthentication';
import Login from '../components/App/Authentication/Login/Login';

initAuth();

const MyLoader = () => <PermanentBackdrop />
const LoginPage = () => <ContainerAuthentication><Login /></ContainerAuthentication>

export default withAuthUser({
    whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
    whenAuthed: AuthAction.REDIRECT_TO_APP,
    whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
    whenUnauthedAfterInit: AuthAction.RENDER,
    LoaderComponent: MyLoader,
})(LoginPage);