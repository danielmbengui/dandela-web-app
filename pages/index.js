import React from 'react';
import { withAuthUser, AuthAction } from 'next-firebase-auth'
import ContainerAuthentication from '../components/App/Authentication/ContainerAuthentication';
import Login from '../components/App/Authentication/Login/Login';
import PermanentBackdrop from '../components/App/CustomComponents/PermanentBackdrop';

//initAuth();

const MyLoader = () => <PermanentBackdrop />
const LoginPage = () => <ContainerAuthentication><Login /></ContainerAuthentication>

export default withAuthUser({
    whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
    whenAuthed: AuthAction.REDIRECT_TO_APP,
    whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
    whenUnauthedAfterInit: AuthAction.RENDER,
    whenAuthedBeforeRedirect: AuthAction.REDIRECT_TO_APP,
    LoaderComponent: MyLoader,
})(LoginPage);