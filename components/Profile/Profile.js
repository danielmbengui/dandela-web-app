import React, { useEffect, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { AlertTitle, Avatar, Badge, FormHelperText, Grid, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

import { alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import { UploadSharp } from '@mui/icons-material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import styles from './Profile.module.css';
//import { Configuration, OpenAIApi } from "openai";
//import axios from 'axios';
import VerifiedIcon from '@mui/icons-material/Verified';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
const { Configuration, OpenAIApi } = require("openai");

const fontFamilyMain = [
  'ChangaOneRegular',
  '-apple-system',
  'BlinkMacSystemFont',
  '"Segoe UI"',
  'Roboto',
  '"Helvetica Neue"',
  'Arial',
  'sans-serif',
  '"Apple Color Emoji"',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"',
].join(',');

const TexFieldCustom = styled(TextField)(({ theme }) => ({
  '& .MuiInputLabel-root': {
    fontFamily: fontFamilyMain,
    color:'var(--primary)',
  },
  '& .MuiInputBase-root': {
    color: 'var(--primary)',
    /*
  borderRadius: 4,
  position: 'relative',
  backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
  border: '1px solid #ced4da',
  fontSize: 16,
  width: 'auto',
  padding: '10px 12px',
  color:theme.palette.primary.main,
  
  transition: theme.transitions.create([
    'border-color',
    'background-color',
    'box-shadow',
  ]),
  */
    // Use the system font instead of the default Roboto font.
    fontFamily: fontFamilyMain,
    /*
    '&:focus': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      //borderColor: theme.palette.primary.main,
      border: `1px solid ${theme.palette.primary.main}`,
    },
    */

  },
  '&:focus': {
    boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
    //borderColor: theme.palette.primary.main,
    border: `1px solid ${theme.palette.primary.main}`,
  },
}));

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .placeholder': {
    color: 'red',
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
    border: '1px solid #ced4da',
    fontSize: 16,
    width: 'auto',
    padding: '10px 12px',
    color: theme.palette.primary.main,
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      'ChangaOneRegular',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      //borderColor: theme.palette.primary.main,
      border: `1px solid ${theme.palette.primary.main}`,
    },
  },
}));

export default function Profile({ logo, firebase, firestore, user, handleUser, storage }) {
  const theme = useTheme();
  const storageRef = storage.ref();
  const uid = user ? user.uid : '';
  const phoneNumber = user ? user.phoneNumber : '';
  const userType = user ? user.type : '';
  const [displayName, setDisplayName] = useState(user ? user.displayName : '');
  const [errorName, setErrorName] = useState(false);
  const [password, setPassword] = useState('');
  const [photoURL, setPhotoURL] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);

  useEffect(() => {
    setErrorName(user ? (user.displayName == '' ? true : false ) : true);
  }, [user]);

  const onChangeName = (e) => {
    setDisplayName(e.target.value);
  }

  /*
const configuration = new Configuration({
    organization: "org-pGzvq8dWxPVgP1htPYBS1yBD",
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);

  //const chatGPT = require('chat-gpt');

async function generateResponse() {
  const response = await openai.listEngines();
  console.log("CHATGPT response", response);
  return response;
}

async function getTest() {
  //axios.defaults.headers.common["Content-Type"] = "application/json";
  //axios.defaults.headers.common["Authorization"] = `Bearer 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`;
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "Say this is a test",
    max_tokens: 3,
    temperature: 0,
    "top_p": 1,
  "n": 1,
  "stream": false,
  "logprobs": null,
  "stop": "\n",
  });
  return (response);
}

useEffect(() => {
  generateResponse();
  const playerJson = getTest();
console.log("FFFFIRST TEST: ", playerJson);
})
*/

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName);
      setPassword(user.password);
      if (user.photoURL) {
        var profileImgRef = storageRef.child(`${user.phoneNumber}/profile`);
        profileImgRef.getDownloadURL()
          .then((url) => {
            setPhotoURL(url);
          })
          .catch((error) => {
            // Handle any errors
            setPhotoURL('');
            console.log('Error URL');
          });
      }
    }
  }, [user])

  useEffect(() => {
    const image_input = document.querySelector("#image-input");
    image_input.addEventListener("change", function (event) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        const files = event.target.files;
        const srcUploaded = reader.result;
        setPhotoURL(srcUploaded);
        if (user) {
          var profileImgRef = storageRef.child(`${user.phoneNumber}/profile`);
          var metadata = {
            contentType: files[0].type,
          };
          profileImgRef.put(files[0], metadata).then((snapshot) => {
            console.log('Uploaded a blob or file! Snapshot:', snapshot);
            const _user = JSON.parse(JSON.stringify(user));
            _user.photoURL = srcUploaded;
            handleUser(_user);
            //const _userFirebase = JSON.parse(JSON.stringify(user));
            //_userFirebase.photoURL = `${user.phoneNumber}/profile`;
            //handleUser(_userFirebase);
          });

          const userRef = firestore.collection("USER").doc(user.phoneNumber);
          userRef.update({
            photoURL: `${user.phoneNumber}/profile`,
          })
            .then(() => {
              console.log("Document successfully updated!");
              //window.location.href = '/about';
            })
            .catch((error) => {
              // The document probably doesn't exist.
              console.error("Error updating document: ", error);
              //window.location.href = '/login/errorlogin';
            });
        }
        
        //setPhotoFile(files[0]);
      });
      reader.readAsDataURL(this.files[0]);
    });
  });

  const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 30,
    height: 30,
    border: `2px solid ${theme.palette.primary.main}`,
    padding: '1.5vw',
  }));

  const clickContinue = () => {
    const userRef = firestore.collection("USER").doc(user.phoneNumber);
    const _userFirebase = JSON.parse(JSON.stringify(user));
    const _user = firebase.auth().currentUser;
    _userFirebase.displayName = displayName;
    //_userFirebase.password = hashResult('123456');
    _userFirebase.photoURL = photoURL;

    if (photoURL && photoFile) {
      var profileImgRef = storageRef.child(`${user.phoneNumber}/profile`);
      var metadata = {
        contentType: photoFile.type,
      };
      profileImgRef.put(photoFile, metadata).then((snapshot) => {
        console.log('Uploaded a blob or file! Snapshot:', snapshot);
        _userFirebase.photoURL = `${user.phoneNumber}/profile`;
      });
    }

    userRef.update({
      displayName: 'Claaav',
      photoURL: _userFirebase.photoURL,
      password: _userFirebase.password,
      verified: true
    })
      .then(() => {
        console.log("Document successfully updated!");
        //window.location.href = '/about';
      })
      .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
        //window.location.href = '/login/errorlogin';
      });

    _user.updateProfile({
      displayName: _userFirebase.displayName,
      photoURL: _userFirebase.photoURL,
    }).then(() => {
      // Update successful
      // ...
      // Set the "capital" field of the city 'DC'

    }).catch((error) => {
      // An error occurred
      // ...
    });
    handleUser(_userFirebase);
    window.location.href = '/about';
  }

  return (
    <Grid container
      direction={'column'}
      justifyContent={'center'}
      alignItems={'center'}
    //style={{ width: "100%" }}
    //spacing={1.5}
    >
      <Grid item style={{ textAlign: 'center', }} justifyContent={'center'} alignItems={'center'}>
        <Box
        //sx={{background:'green'}}
        >
          <Alert
            severity='warning'
            variant='outlined'
            sx={{ mb: 2, textAlign: 'start' }}
          >
            <AlertTitle sx={{ mb: 0.5, alignItems: 'flex-start' }}>Complete ton profil</AlertTitle>
            {"Rajoute un nom d'utilisateur pour accéder aux services. —"} <strong>nous le gardons en sécurité!</strong>
          </Alert>

        </Box>
      </Grid>
      <Grid container spacing={1.5} direction={'column'} justifyContent={'center'} alignItems={'center'}
        //sx={{background:'yellow',}}
        pl={1} pr={1}
        columns={{ xs: 12 }}
      >
        <Grid item mb={3} xs>
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={
              <label htmlFor="image-input" className={styles['custom-file-upload']}>
                <SmallAvatar sx={{ bgcolor: theme.palette.primary.main }}>
                  <PhotoCameraIcon />
                </SmallAvatar>
              </label>
            }
          >
            <Avatar id="avatar-user" className={styles['fullscreen']} src={photoURL} sx={{ width: 100, height: 100 }} />
          </Badge>
          <input id="image-input" type="file" accept="image/jpeg, image/png, image/jpg" style={{ display: 'none' }} />
        </Grid>

        <Grid item xs={12}>
          <Stack direction={'column'} justifyContent={'center'} alignItems={'stretch'}
            spacing={2}
          //sx={{background:'cyan'}}
          >
            <TexFieldCustom
              fullWidth
              error={errorName}
              id="name"
              label={'Nom'}
              required
              //defaultValue="Hello World"
              value={displayName}
              onChange={onChangeName}
              helperText={errorName ? "Incorrect entry." : ''}
              //theme={theme}
              placeholder={"Nom"}
            />
            <TexFieldCustom
              fullWidth
              //error={false}
              id="uid"
              label="ID utilisateur"
              //required
              disabled
              //defaultValue={displayName}
              value={uid}
              //helperText="Incorrect entry."
              //theme={theme}
              //placeholder={"Name"}
            />
            <TexFieldCustom
              fullWidth
              //error={false}
              id="phoneNumber"
              label="Téléphone"
              //required
              disabled
              //defaultValue={displayName}
              value={phoneNumber}
              //helperText="Incorrect entry."
              //theme={theme}
              //placeholder={"Name"}
            />
            <TexFieldCustom
              fullWidth
              //error={false}
              id="userType"
              label="Type utilisateur"
              //required
              disabled
              //defaultValue={displayName}
              value={userType}
              //helperText="Incorrect entry."
              //theme={theme}
              //placeholder={"Name"}
            />

            <Grid container pt={3} justifyContent={'center'}>
              <Button variant='contained' onClick={() => {
                //setDisplayName('Claav');
                //setPassword('123456');
                clickContinue();
              }


              }>
                Modifier
              </Button>
            </Grid>
          </Stack>
        </Grid>

      </Grid>
    </Grid>
  );
}
