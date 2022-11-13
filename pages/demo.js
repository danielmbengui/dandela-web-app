// ./pages/demo
import React from 'react'
import { withAuthUser, AuthAction } from 'next-firebase-auth'

const MyLoader = () => <div>Loading...</div>

const LoginPage = () => <div>My login page</div>

export default withAuthUser({
    whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.RENDER,
  LoaderComponent: MyLoader,
})(LoginPage)