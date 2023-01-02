// ./pages/demo
import React from 'react'
import { withAuthUser, AuthAction } from 'next-firebase-auth'
import PermanentBackdrop from '../components/App/CustomComponents/PermanentBackdrop'


const MyLoader = () => <PermanentBackdrop />

const LoginPage = () => <></>

export default withAuthUser({
    whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
    whenAuthed: AuthAction.REDIRECT_TO_APP,
    whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
    whenUnauthedAfterInit: AuthAction.RENDER,
    LoaderComponent: MyLoader,
})(LoginPage)