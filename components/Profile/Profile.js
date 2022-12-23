import React, { useEffect, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
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
import InstallApp from '../InstallApp/InstallApp';
import { COLLECTION_USER, USER_LINK_PHOTO_URL } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { connectUser, updateProfilPhotoURL } from '../../redux/user/userActions';
import { useUserContext } from '../../context/UserProvider';
const { Configuration, OpenAIApi } = require("openai");

import { TextFieldCustom } from '../MyComponents/TextFieldCustom';
import { AccordionCustom, AccordionDetailsCustom, AccordionSummaryCustom } from '../MyComponents/AccordionCustom';

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


const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  //borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function Profile({ logo, firebase, firestore, handleUser, storage }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  //const user = useSelector((state) => state.user);
  const [user, setUser] = useUserContext();
  const storageRef = storage.ref();
  const [uid, setUid] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userType, setUserType] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [errorName, setErrorName] = useState(false);
  const [password, setPassword] = useState('');
  const [photoURL, setPhotoURL] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);

  const [expanded, setExpanded] = useState(true);

  const handleExpanded = (expanded) => {
    //console.log("EVENT Acoordeon", event.expanded);
    setExpanded(expanded);
  };
  /*
  const updateUserInfo = () => {
    dispatch(connectUser());
  }
  useEffect(() => {
    updateUserInfo();
    console.log("USER_REDUX Dashboard", user);
    //setShowInstallApp(true);
  }, [user.uid, user.phoneNumber, user.type]);
*/
  useEffect(() => {
    if (user) {
      setPhotoURL(user.profilPhotoURL);
      setDisplayName(user.displayName);
      setUid(user.uid);
      setPhoneNumber(user.phoneNumber);
      setUserType(user.type);
      setPhotoURL(user.profilPhotoURL);
      console.log("USER Profile", user);
    }else {
      setPhotoURL('');
      setDisplayName('');
      setUid('');
      setPhoneNumber('');
      setUserType('');
      setPhotoURL(null);
    }
  }, [user]);

  

/*
  useEffect(() => {
    setErrorName(user ? (user.displayName == '' ? true : false) : true);
  }, [user]);
  */

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
/*
  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName);
      //setPassword(user.password);
      if (user.photoURL) {
        var profileImgRef = storageRef.child(`${user.photoURL}`);
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
  */

  useEffect(() => {
    const image_input = document.querySelector("#image-input");
    image_input.addEventListener("change", function (event) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        const files = event.target.files;
        const srcUploaded = reader.result;
        setPhotoURL(srcUploaded);
        setPhotoFile(files[0]);
        /*
        if (user) {
          var profileImgRef = storageRef.child(`${user.phoneNumber}${USER_LINK_PHOTO_URL}`);
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
            photoURL: `${user.phoneNumber}${USER_LINK_PHOTO_URL}`,
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
        */

        //setPhotoFile(files[0]);
      });
      reader.readAsDataURL(this.files[0]);
    });
  }, []);

  const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 30,
    height: 30,
    border: `2px solid ${theme.palette.primary.main}`,
    padding: '1.5vw',
  }));

  const clickModifyUser = () => {
    const userFirebase = firebase.auth().currentUser;
    const userApp = JSON.parse(JSON.stringify(user));
    userApp.displayName = displayName;
    userApp.photoURL = userApp.phoneNumber + USER_LINK_PHOTO_URL;
    if (userFirebase) {
      userFirebase.updateProfile({
        displayName: displayName,
        photoURL: userApp.photoURL,
      }).then(() => {
        if (photoURL && photoFile) {
          var profileImgRef = storageRef.child(`${userApp.photoURL}`);
          var profilPhotoURL = '';
          var metadata = {
            contentType: photoFile.type,
          };
          profileImgRef.put(photoFile, metadata).then((snapshot) => {
            console.log('Uploaded a blob or file! Snapshot:', snapshot);
            //userApp.photoURL = `${user.phoneNumber}${USER_LINK_PHOTO_URL}`;
            //setPhotoURL(userApp.photoURL);
            profileImgRef.getDownloadURL()
            .then((url) => {
              profilPhotoURL = url;
              setPhotoURL(url);
              updateProfilPhotoURL(userApp.photoURL);
              dispatch(connectUser());
              userApp.profilPhotoURL = url;
              setUser(userApp);
              firestore.collection(COLLECTION_USER).doc(userApp.phoneNumber).update({
                displayName: displayName,
                photoURL: userApp.photoURL,
                profilPhotoURL: url,
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
            })
            .catch((error) => {
              // Handle any errors
              setPhotoURL('');
              console.log('Error URL');
            });
          }); 
        }
        // Update successful
        // ...
        // Set the "capital" field of the city 'DC'
        
      }).catch((error) => {
        // An error occurred
        // ...
      });
    }
    userApp.editingPhotoUrl = false;
    handleUser(userApp);
    setUser(userApp);
    //window.location.href = '/about';
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
            {"Ajoute un nom d'utilisateur et une photo de profil pour accéder aux services. —"} <strong>nous le gardons en sécurité!</strong>
          </Alert>

        </Box>
      </Grid>
      <Grid container spacing={1.5} direction={'column'} justifyContent={'center'} alignItems={'center'}
        //sx={{background:'yellow',}}
        pl={1} pr={1}
        columns={{ xs: 12, md:6 }}
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

        <Grid item xs={12} md={6}>
          <Stack direction={'column'} justifyContent={'center'} alignItems={'stretch'}
            spacing={2}
          //sx={{background:'cyan'}}
          >
            <TextFieldCustom
              //fullWidth
              error={errorName}
              id="name"
              label={'Nom'}
              required
              //controlled
              //defaultValue="Hello World"
              value={displayName}
              onChange={onChangeName}
              helperText={errorName ? "Incorrect entry." : ''}
              //theme={theme}
              placeholder={"Nom"}
            />
            <AccordionCustom expanded={expanded} onChange={() => {
              handleExpanded(expanded ? false : true);
            }}  sx={{
              //width:'60%',
            }}>
        <AccordionSummaryCustom aria-controls="panel1d-content" id="panel1d-header">
          <Typography sx={{fontFamily: fontFamilyMain}}>Plus d&apos;informations</Typography>
        </AccordionSummaryCustom>
        <AccordionDetailsCustom>

        <Stack 
        direction={'column'}
        justifyContent={'center'} 
        alignItems={'stretch'}
            spacing={2}
        >
<TextFieldCustom
              fullWidth
              id="uid"
              label="ID utilisateur"
              disabled
              value={user.uid}
            />
            <TextFieldCustom
              fullWidth
              //error={false}
              id="phoneNumber"
              label="Téléphone"
              //required
              disabled
              //defaultValue={displayName}
              value={user.phoneNumber}
            //helperText="Incorrect entry."
            //theme={theme}
            //placeholder={"Name"}
            />
            <TextFieldCustom
              fullWidth
              //error={false}
              id="userCountry"
              label="Pays"
              //required
              disabled
              //defaultValue={displayName}
              value={user.country.name}
            //helperText="Incorrect entry."
            //theme={theme}
            //placeholder={"Name"}
            />
                        <TextFieldCustom
              fullWidth
              //error={false}
              id="userType"
              label="Type utilisateur"
              //required
              disabled
              //defaultValue={displayName}
              value={user.type}
            //helperText="Incorrect entry."
            //theme={theme}
            //placeholder={"Name"}
            />
        </Stack>
        </AccordionDetailsCustom>
      </AccordionCustom>

            

            <Grid container pt={3} justifyContent={'center'}>
              <Button variant='contained' onClick={() => {
                //setDisplayName('Claav');
                //setPassword('123456');
                clickModifyUser();
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
