import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { firestore } from '../../../config.firebase';
import firebase from '../../../config.firebase';

export default function Login(){
    const theme = useTheme();
    useEffect(() => {
        var firebaseui = require('firebaseui');
        var uiConfig = {
            callbacks: {
                signInSuccessWithAuthResult: function (authResult, redirectUrl) {
                    // User successfully signed in.
                    // Return type determines whether we continue the redirect automatically
                    // or whether we leave that to developer to handle.
                    //handleUser(auth.currentUser);
                    var userFirebase = authResult.user;
                    var docRef = firestore.collection("USER").doc(userFirebase.phoneNumber);

                    docRef.get().then((doc) => {
                        if (doc.exists) {
                            console.log("Document data:", doc.data());
                            const _user = JSON.parse(JSON.stringify(doc.data()));
                            _user.phoneNumber = userFirebase.phoneNumber;
                            _user.uid = userFirebase.uid;
                            
                            firestore.collection("USER").doc(_user.phoneNumber).set(_user).then(() => {
                                console.log("Document successfully written!");
                                //handleUser(_user);
                            });
                            window.location.href = "/profil";
                        } else {
                            // doc.data() will be undefined in this case
                            console.log("No such document!");
                            //handleUser(null);
                            window.location.href = "/authentication/errorlogin";
                        }
                    }).catch((error) => {
                        console.log("Error getting document:", error);
                        //window.location.href = "/authentication/errorlogin";
                    });
                    return true;
                },
                signInFailure: function (error) {
                    // Some unrecoverable error occurred during sign-in.
                    // Return a promise when error handling is completed and FirebaseUI
                    // will reset, clearing any UI. This commonly occurs for error code
                    // 'firebaseui/anonymous-upgrade-merge-conflict' when merge conflict
                    // occurs. Check below for more details on this.
                    //return handleUIError(error);
                    window.location.href = "/authentication/errorfirebase";
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
            signInSuccessUrl: '/about',
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
            pb={5}
        >
            <Grid item p={0} style={{ textAlign: 'center' }}>
                <div id="firebaseui-auth-container"></div>
                <div id="loader">Loading...</div>
            </Grid>
        </Grid>
    );
}