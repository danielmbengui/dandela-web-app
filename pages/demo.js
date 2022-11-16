// ./pages/demo
import React from 'react'
import { withAuthUser, AuthAction } from 'next-firebase-auth'
import PermanentBackdrop from '../components/Loading/PermanentBackdrop'
import Login from '../components/Index/Login/Login'
import Index from '../components/Index/Index'

const MyLoader = () => <PermanentBackdrop />

const LoginPage = () => <Index />

export default withAuthUser({
    whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
    whenAuthed: AuthAction.REDIRECT_TO_APP,
    whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
    whenUnauthedAfterInit: AuthAction.RENDER,
    LoaderComponent: MyLoader,
})(LoginPage)