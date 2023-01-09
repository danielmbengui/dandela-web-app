import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { firestore } from '../../../../config.firebase';
import firebase from '../../../../config.firebase';
import { COLLECTION_USER, PAGE_LINK_ERROR_FIREBASE, PAGE_LINK_ERROR_LOGIN, PAGE_LINK_PROFILE, } from '../../../../constants';
import { useUserContext } from '../../../../context/UserProvider';
import PermanentBackdrop from '../../CustomComponents/PermanentBackdrop';
import { useRouter } from 'next/router';
import User from '../../../../classes/UserClass';

export default function Login() {
    const theme = useTheme();
    const [user, setUser] = useUserContext();
    const router = useRouter();
    const [signInURL, setSignInURL] = useState(PAGE_LINK_PROFILE);

    useEffect(() => {
        var firebaseui = require('firebaseui');
        //var signInURL = PAGE_LINK_ERROR_LOGIN;
        var uiConfig = {
            callbacks: {
                signInSuccessWithAuthResult: async function (authResult, redirectUrl) {
                    // User successfully signed in.
                    // Return type determines whether we continue the redirect automatically
                    // or whether we leave that to developer to handle.
                    //handleUser(auth.currentUser);
                    var userFirebase = authResult.user;
                    var docRef = firestore.collection(COLLECTION_USER).doc(userFirebase.uid);

                    docRef.get().then((doc) => {
                        if (doc.exists) {
                            const _user = new User(doc.data());
                            if (_user.authorized) {
                                //signInURL = PAGE_LINK_PROFILE;
                                //setSignInURL(PAGE_LINK_PROFILE);
                                setUser(_user);
                                router.push(PAGE_LINK_PROFILE);
                                //return false;
                            } else {
                                //setSignInURL(PAGE_LINK_ERROR_LOGIN);
                                setUser(new User({ uid: userFirebase.uid, phoneNumber: userFirebase.phoneNumber }));
                                router.push(PAGE_LINK_ERROR_LOGIN);
                            }
                        } else {
                            //setSignInURL(PAGE_LINK_ERROR_LOGIN);
                            setUser(new User({ uid: userFirebase.uid, phoneNumber: userFirebase.phoneNumber }));
                            router.push(PAGE_LINK_ERROR_LOGIN);
                        }
                        //router.push(PAGE_LINK_ERROR_LOGIN);
                        //return false;
                    });
                    //router.push(PAGE_LINK_ERROR_LOGIN);
                    return true;
                },
                signInFailure: function (error) {
                    // Some unrecoverable error occurred during sign-in.
                    // Return a promise when error handling is completed and FirebaseUI
                    // will reset, clearing any UI. This commonly occurs for error code
                    // 'firebaseui/anonymous-upgrade-merge-conflict' when merge conflict
                    // occurs. Check below for more details on this.
                    //return handleUIError(error);
                    //window.location.href = "/authentication/errorfirebase";
                    setUser(new User({}));
                    router.push(PAGE_LINK_ERROR_FIREBASE);
                    //router.push("/connected");
                    return false;
                },
                uiShown: function () {
                    // The widget is rendered.
                    // Hide the loader.
                    document.getElementById('loader').style.display = 'none';
                }
            },
            // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
            signInFlow: 'popup',
            //signInSuccessUrl: '/profil',
            //signInSuccessUrl: "/connected",
            signInSuccessUrl: '/',
            signInOptions: [
                // Leave the lines as is for the providers you want to offer your users.
                {
                    provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
                    buttonColor: theme.palette.primary.main,
                    recaptchaParameters: {
                        type: 'image', // 'audio'
                        size: 'normal', // 'invisible' or 'compact'
                        badge: 'bottomleft' //' bottomright' or 'inline' applies to invisible.
                    },
                    defaultCountry: 'CH', // Set default country to the United Kingdom (+44).
                    // For prefilling the national number, set defaultNationNumber.
                    // This will only be observed if only phone Auth provider is used since
                    // for multiple providers, the NASCAR screen will always render first
                    // with a 'sign in with phone number' button.
                    //defaultNationalNumber: '7',
                    // You can also pass the full phone number string instead of the
                    // 'defaultCountry' and 'defaultNationalNumber'. However, in this case,
                    // the first country ID that matches the country code will be used to
                    // populate the country selector. So for countries that share the same
                    // country code, the selected country may not be the expected one.
                    // In that case, pass the 'defaultCountry' instead to ensure the exact
                    // country is selected. The 'defaultCountry' and 'defaultNationaNumber'
                    // will always have higher priority than 'loginHint' which will be ignored
                    // in their favor. In this case, the default country will be 'GB' even
                    // though 'loginHint' specified the country code as '+1'.
                    loginHint: '+41',
                }

            ],
            // Terms of service url.
            tosUrl: '<your-tos-url>',
            // Privacy policy url.
            privacyPolicyUrl: '<your-privacy-policy-url>'
        };
        var ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());

        if (!ui.isPendingRedirect()) {
            ui.start('#firebaseui-auth-container', uiConfig);
        } else {
            ui.reset();
            ui.start('#firebaseui-auth-container', uiConfig);
        }

    }, []);

    return (
        <Grid
            container
            direction={'column'}
            justifyContent={'center'}
            alignItems={'center'}
            pb={10}
        >
            <Grid item p={0} style={{ textAlign: 'center', }}>
                <div id="firebaseui-auth-container"></div>
                <div id="loader">
                    <PermanentBackdrop />
                </div>
            </Grid>
        </Grid>
    );
}