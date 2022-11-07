import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { updateUser, connectUser } from "../../redux/user/userActions";
import { styled, useTheme } from '@mui/material/styles';
import { Grid } from '@mui/material';
import Image from "next/image";

//const logo = "/img/logo-pic-text.png";
const logo = "/img/logo.png";

const Login = ({ firebase, handleUser }) => {
    //var firebase = require('firebase');
    const auth = firebase.auth();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    const updateUserInfo = () => {
        dispatch(updateUser());
    }

    useEffect(() => {
        updateUserInfo();
        console.log("USER dashboard", user);
    }, [user.phoneNumber]);
    //console.log("AUTHOOO", auth);
    useEffect(() => {
        if (auth.currentUser === null){
            var firebaseui = require('firebaseui');
            //var ui = new firebaseui.auth.AuthUI(auth);
            var ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());
        var uiConfig = {
            callbacks: {
                signInSuccessWithAuthResult: function (authResult, redirectUrl) {
                    // User successfully signed in.
                    // Return type determines whether we continue the redirect automatically
                    // or whether we leave that to developer to handle.
                    //handleUser(auth.currentUser);
                    console.log("AUTH login", auth.currentUser);
                    updateUserInfo();
                    return true;
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
                 provider : firebase.auth.PhoneAuthProvider.PROVIDER_ID,
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
                  //defaultNationalNumber: '1234567890',
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
                  //loginHint: '+11234567890'
                }

            ],
            // Terms of service url.
            tosUrl: '<your-tos-url>',
            // Privacy policy url.
            privacyPolicyUrl: '<your-privacy-policy-url>'
        };
        if (!ui.isPendingRedirect()) {
            ui.start('#firebaseui-auth-container', uiConfig);
          }
        }else {
            /*
            firebase.auth().signOut().then(() => {
                // Sign-out successful.
              }).catch((error) => {
                // An error happened.
              });
              */
        }
        
    }, []);

    return (
        <Grid container 
        direction={'column'}
            justifyContent={'center'}
            alignItems={'center'}
            style={{width: "100%"}}
        >
            <Grid item p={5} style={{display: 'block'}}>
            
                <Image
                    src={'/img/logo.png'}
                    //fill
                    //width="responsive"
                    //layout="responsive"
                    width={250}
                    height={250}
                    //height={320}
                    alt="logo"
                    //loading='lazy'
                    priority
                    sizes="(min-width: 60em) 24vw,
                            (min-width: 28em) 45vw,
                            100vw"
                    style={{
                        width: "100%",
                        height: "auto"
                    }} />
            </Grid>
            <Grid item p={3} style={{textAlign: 'center'}}>
                <div id="firebaseui-auth-container"></div>
                <div id="loader">Loading...</div>
            </Grid>
        </Grid>
    );
}

export default Login;