import React, { useEffect, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { useTranslation } from 'next-i18next'
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import { AlertTitle, Avatar, Badge, Grid, Stack, Typography } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import styles from './Profile.module.css';
//import { Configuration, OpenAIApi } from "openai";
//import axios from 'axios';
import { COLLECTION_USER, NAMESPACE_LANGAGE_PROFILE, USER_LINK_PHOTO_URL } from '../../../../constants';
import { useUserContext } from '../../../../context/UserProvider';

import { TextFieldCustom } from '../../CustomComponents/TextFieldCustom';
import { AccordionCustom, AccordionDetailsCustom, AccordionSummaryCustom } from '../../CustomComponents/AccordionCutom';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { SmallAvatar } from '../../CustomComponents/AvatarCustom';
import SnackBarCustom from '../../CustomComponents/SnackBarCustom';
import { myLoader } from '../../../../lib/functions/ImageLoader';
import Image from 'next/image';


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


export default function Profile({ firebase, firestore, storage }) {
  const { t } = useTranslation(NAMESPACE_LANGAGE_PROFILE);
  const [user, setUser] = useUserContext();
  const storageRef = storage.ref();

  const [displayName, setDisplayName] = useState('');
  const [errorName, setErrorName] = useState(false);
  const [photoURL, setPhotoURL] = useState('');
  const [photoFile, setPhotoFile] = useState('');

  const [expanded, setExpanded] = useState(false);
  const [showSnackBarSuccess, setShowSnackBarSuccess] = useState(false);

  const handleExpanded = (expanded) => {
    setExpanded(expanded);
  };

  useEffect(() => {
    if (user) {
      setPhotoURL(user.profilPhotoURL);
      setDisplayName(user.displayName);
    } else {
      setPhotoURL('');
      setDisplayName('');
    }
  }, [user.displayName, user.profilPhotoURL]);

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
        if (srcUploaded !== user.profilPhotoURL) {
            setEditing(true);
        } else {
            setEditing(false);
        }
        */
      });
      reader.readAsDataURL(this.files[0]);
    });
  }, []);

  const onChangeName = (e) => {
    setDisplayName(e.target.value);
  }

  const clickModifyUser = () => {
    const userFirebase = firebase.auth().currentUser;
    const userApp = JSON.parse(JSON.stringify(user));
    userApp.photoURL = userApp.phoneNumber + USER_LINK_PHOTO_URL;
    if (photoURL && photoFile) {
      var profileImgRef = storageRef.child(`${userApp.photoURL}`);
      var profilPhotoURL = '';
      var metadata = {
        contentType: photoFile.type,
      };
      profileImgRef.put(photoFile, metadata).then(() => {
        profileImgRef.getDownloadURL()
          .then(async (url) => {
            setPhotoURL(url);
            userApp.profilPhotoURL = url;
            firestore.collection(COLLECTION_USER).doc(userApp.uid).update({
              photoURL: userApp.photoURL,
              profilPhotoURL: userApp.profilPhotoURL,
            });
            setUser(userApp);
          })
          .catch(() => {
            // Handle any errors
            setPhotoURL('');
          });
      });
    }
    if (userFirebase) {
      //UPDATE firebase auth
      userFirebase.updateProfile({
        displayName: displayName,
        photoURL: user.profilPhotoURL,
      });
    }

    if (userApp) {
      firestore.collection(COLLECTION_USER).doc(userApp.uid).update({
        displayName: displayName,
        verified: true
      });

    }
    setUser(userApp);
    setShowSnackBarSuccess(true);
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
        <Box>
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
                <SmallAvatar sx={{ bgcolor: 'var(--primary)' }}>
                  <PhotoCameraIcon />
                </SmallAvatar>
              </label>
            }
          >
            <Avatar id="avatar-user" alt='myProfile' className={styles['fullscreen']} src={photoURL} sx={{ width: 100, height: 100 }} />

            {
              /*
<Avatar sx={{ width: 100, height: 100 }} children={<Image 
                            id="avatar-user" 
                            src={user.profilPhotoURL} 
                            alt={'myProfile'}
                            quality={100}
                                loader={myLoader}
                            //width={100}
                            //height={100} 
                            fill
                            />} />
              */
            }

          </Badge>
          <input id="image-input" type="file" accept="image/jpeg, image/png, image/jpg" style={{ display: 'none' }} />
        </Grid>
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
                  id="uid"
                  label={t('Id')}
                  disabled
                  value={user.uid}
                />
                <TextFieldCustom
                  id="phoneNumber"
                  label={t('Phone')}
                  disabled
                  value={user.phoneNumber}
                />
                <TextFieldCustom
                  id="userCountry"
                  label={t('Country')}
                  disabled
                  value={t(`${user.country.name}`)}
                />
                <TextFieldCustom
                  id="userType"
                  label={t('Type')}
                  disabled
                  value={t(`${user.type}`)}
                />
              </Stack>
            </AccordionDetailsCustom>
          </AccordionCustom>

          <Grid container pt={3} justifyContent={'center'} sx={{
            display: user.displayName !== displayName || user.profilPhotoURL !== photoURL ? 'flex' : 'none'
          }}>
            <Button variant='contained' onClick={() => {
              clickModifyUser();
            }
            }>
              {t('edit')}
            </Button>
          </Grid>
        </Stack>
      </Grid>
      <SnackBarCustom
        variant={'success'}
        message={t('messageSucces')}
        messages={[`${t('Phone')} : ${user.phoneNumber}`]}
        showSnackBarSuccess={showSnackBarSuccess}
        setShowSnackBarSuccess={setShowSnackBarSuccess} />
    </Grid>
  );
}
