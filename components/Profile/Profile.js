import React, { useEffect, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { useTranslation } from 'next-i18next'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import { AlertTitle, Avatar, Badge, Grid, Stack, Typography } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import styles from './Profile.module.css';
//import { Configuration, OpenAIApi } from "openai";
//import axios from 'axios';
import { COLLECTION_USER, USER_LINK_PHOTO_URL } from '../../constants';
import { useUserContext } from '../../context/UserProvider';
const { Configuration, OpenAIApi } = require("openai");

import { TextFieldCustom } from '../MyComponents/TextFieldCustom';
import { AccordionCustom, AccordionDetailsCustom, AccordionSummaryCustom } from '../MyComponents/AccordionCustom';
import { SnackbarProvider, useSnackbar } from 'notistack';


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

function SnackBarCustomBis(props) {
  const { t } = useTranslation('profil');
  const { enqueueSnackbar } = useSnackbar();
  const { user, showSnackBarSuccess, setShowSnackBarSuccess } = props;

  useEffect(() => {
    if (showSnackBarSuccess) {
      enqueueSnackbar(t('messageSucces'), { variant: 'success' });
      enqueueSnackbar(`${t('Phone')} : ${user.phoneNumber}`);
      setShowSnackBarSuccess(false);
    }
  }, [showSnackBarSuccess])

  return (
    <>
    </>
  );
}

const ShowSnackBarSuccess = (props) => {
  const { user, showSnackBarSuccess, setShowSnackBarSuccess } = props;

  return (
    <SnackbarProvider maxSnack={3} autoHideDuration={3000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
      <SnackBarCustomBis user={user} showSnackBarSuccess={showSnackBarSuccess} setShowSnackBarSuccess={setShowSnackBarSuccess} />
    </SnackbarProvider>
  );
}


export default function Profile({ firebase, firestore, storage }) {
  const theme = useTheme();
  const { t } = useTranslation("profil");
  //const {g} = useTranslation("common");
  console.log("TTTTTTZTTTT", t("profil"));
  //const user = useSelector((state) => state.user);
  const [user, setUser] = useUserContext();
  const storageRef = storage.ref();
  const [displayName, setDisplayName] = useState('');
  const [errorName, setErrorName] = useState(false);
  const [photoURL, setPhotoURL] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);

  const [expanded, setExpanded] = useState(false);
  const [editing, setEditing] = useState(false);
  const [userEdit, setUserEdit] = useState(user);
  const [showSnackBarSuccess, setShowSnackBarSuccess] = useState(false);

  const handleExpanded = (expanded) => {
    //console.log("EVENT Acoordeon", event.expanded);
    setExpanded(expanded);
  };
  /*
  const updateUserInfo = () => {
    dispatch(connectUser());
  }
  useEffect(() => {
  }, [user.uid, user.phoneNumber, user.type]);
*/
  useEffect(() => {
    if (user) {
      setPhotoURL(user.profilPhotoURL);
      setDisplayName(user.displayName);
      console.log("USER Profile", user);
    } else {
      setPhotoURL('');
      setDisplayName('');
    }
  }, [user, user.profilPhotoURL]);

  const onChangeName = (e) => {
    setDisplayName(e.target.value);
    if (e.target.value !== user.displayName) {
      setEditing(true);
    } else {
      setEditing(false);
    }
  }

  useEffect(() => {
    const image_input = document.querySelector("#image-input");
    image_input.addEventListener("change", function (event) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        const files = event.target.files;
        const srcUploaded = reader.result;
        setPhotoURL(srcUploaded);
        setPhotoFile(files[0]);
        if (srcUploaded !== user.profilPhotoURL) {
          setEditing(true);
        } else {
          setEditing(false);
        }
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
    console.log('click modify',);
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
              .then(async (url) => {
                profilPhotoURL = url;
                setPhotoURL(url);
                userApp.profilPhotoURL = url;

                await firestore.collection(COLLECTION_USER).doc(userApp.uid).update({
                  displayName: displayName,
                  photoURL: userApp.photoURL,
                  profilPhotoURL: url,
                  verified: true
                })
                  .then(() => {
                    console.log("Document successfully updated!");
                    //window.location.href = '/about';
                    setShowSnackBarSuccess(true);
                  })
                  .catch((error) => {
                    // The document probably doesn't exist.
                    console.error("Error updating document: ", error);
                    //window.location.href = '/login/errorlogin';
                  });
                setUser(userApp);
                console.log("url photo!", url);
              })
              .catch((error) => {
                // Handle any errors
                setPhotoURL('');
                console.log("Error USER", 'Error URL');
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
    console.log("USEEEEER aaaaa", userApp)
    setUser(userApp);
    setShowSnackBarSuccess(false);
    setEditing(false);
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
            sx={{
              mb: 2, textAlign: 'start',
              display: user.displayName && user.profilPhotoURL ? 'none' : 'block',
            }}
          >
            <AlertTitle sx={{ mb: 0.5, alignItems: 'flex-start' }}>{t('completeProfile')}</AlertTitle>
            {t('message')} {" —"} <strong>{t('security')}!</strong>
          </Alert>

        </Box>
      </Grid>
      <Grid container spacing={1.5} direction={'column'} justifyContent={'center'} alignItems={'center'}
        //sx={{background:'yellow',}}
        pl={1} pr={1}
        columns={{ xs: 12, md: 6 }}
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
              label={t('Name')}
              required
              //controlled
              //defaultValue="Hello World"
              value={displayName}
              onChange={onChangeName}
              helperText={errorName ? "Incorrect entry." : ''}
              //theme={theme}
              placeholder={t('Name')}
            />
            <AccordionCustom expanded={expanded} onChange={() => {
              handleExpanded(expanded ? false : true);
            }} sx={{
              //width:'60%',
            }}>
              <AccordionSummaryCustom aria-controls="panel1d-content" id="panel1d-header">
                <Typography sx={{ fontFamily: fontFamilyMain }}>{t('informations')}</Typography>
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
                    label={t('Id')}
                    disabled
                    value={user.uid}
                  />
                  <TextFieldCustom
                    fullWidth
                    //error={false}
                    id="phoneNumber"
                    label={t('Phone')}
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
                    label={t('Country')}
                    //required
                    disabled
                    //defaultValue={displayName}
                    value={t(`${user.country.name}`)}
                  //helperText="Incorrect entry."
                  //theme={theme}
                  //placeholder={"Name"}
                  />
                  <TextFieldCustom
                    fullWidth
                    //error={false}
                    id="userType"
                    label={t('Type')}
                    //required
                    disabled
                    //defaultValue={displayName}
                    value={t(`${user.type}`)}
                  //helperText="Incorrect entry."
                  //theme={theme}
                  //placeholder={"Name"}
                  />
                </Stack>
              </AccordionDetailsCustom>
            </AccordionCustom>



            <Grid container pt={3} justifyContent={'center'} sx={{
              display: editing ? 'flex' : 'none'
            }}>
              <Button variant='contained' onClick={() => {
                //setDisplayName('Claav');
                //setPassword('123456');
                clickModifyUser();
              }


              }>
                {t('edit')}
              </Button>
            </Grid>
          </Stack>
        </Grid>

      </Grid>
      <ShowSnackBarSuccess user={user} showSnackBarSuccess={showSnackBarSuccess} setShowSnackBarSuccess={setShowSnackBarSuccess} />
    </Grid>
  );
}
