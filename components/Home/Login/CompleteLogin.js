import React, {useEffect, useState} from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { AlertTitle, Avatar, Badge, FormHelperText, Grid, Stack } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

import { alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import styles from './CompleteLogin.module.css';
import { UploadSharp } from '@mui/icons-material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

const TexFieldCustom = styled(TextField)(({ theme }) => ({
    '& .MuiInputBase-input': {
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
      /*
      '&:focus': {
        boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        //borderColor: theme.palette.primary.main,
        border: `1px solid ${theme.palette.primary.main}`,
      },
      */
      
    },
  }));

  const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
      marginTop: theme.spacing(3),
    },
    '& .placeholder' : {
        color:'red',
    },
    '& .MuiInputBase-input': {
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

export default function CompleteLogin({logo, firebase, firestore, storage, userFirebase, handleUserFirebase}) {
    const theme = useTheme();
    const storageRef = firebase.storage().ref();
  const [open, setOpen] = useState(true);
  const [srcAvatar, setSrcAvatar] = useState('');

  console.log("FIREBASE USER", userFirebase);

  function handle(_u){
    handleUserFirebase(_u);
  }

  useEffect(() => {
    if (userFirebase){
      //const link = userFirebase.photoURL ? userFirebase.phone
      console.log('Before requesting download URL');

      var profileImgRef = storageRef.child(`${userFirebase.photoURL}`);

      profileImgRef.getDownloadURL()
  .then((url) => {
    // `url` is the download URL for 'images/stars.jpg'
    console.log('Got download URL', url);
    // This can be downloaded directly:
    /*
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = (event) => {
      var blob = xhr.response;
    };
    xhr.open('GET', url);
    xhr.send();

    const reader = new FileReader(url);
    reader.addEventListener("load", () => {
      //const files = event.target.files;
      const uploaded_image = reader.result;
      setSrcAvatar(uploaded_image);

    });
    */
    setSrcAvatar(url);
    // Or inserted into an <img> element
    //var img = document.getElementById('myimg');
    //img.setAttribute('src', url);
    //srcAvatar(url);
  })
  .catch((error) => {
    // Handle any errors
    console.log('Error URL');
  });
    }
    console.log('After requesting download URL');
  }, [])

  useEffect(() => {
    const image_input = document.querySelector("#image-input");
    image_input.addEventListener("change", function(event) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        const files = event.target.files;
        const uploaded_image = reader.result;
        
        var profileImgRef = storageRef.child(`${userFirebase.phoneNumber}/profile`);
        var metadata = {
            contentType: files[0].type,
          };
        profileImgRef.put(files[0], metadata).then((snapshot) => {
            console.log('Uploaded a blob or file! Snapshot:', snapshot);
            const _user = JSON.parse(JSON.stringify(userFirebase));
            _user.photoURL = `${userFirebase.phoneNumber}/profile`;
            handleUserFirebase(_user);
            
            firestore.collection("USER").doc(_user.phoneNumber).set(_user).then(() => {
              console.log("Document successfully written!");
          });
          
          });
        console.log("FFFFFFIILE", files[0].type, metadata);
        //document.querySelector("#display-image").style.backgroundImage = `url(${uploaded_image})`;
        setSrcAvatar(uploaded_image);
      });
      reader.readAsDataURL(this.files[0]);
    });
  });



  const makeFullScreen = () => {
    var divObj = document.getElementById("avatar-user");
  //Use the specification method before using prefixed versions
 if (divObj.requestFullscreen) {
   divObj.requestFullscreen();
 }
 else if (divObj.msRequestFullscreen) {
   divObj.msRequestFullscreen();               
 }
 else if (divObj.mozRequestFullScreen) {
   divObj.mozRequestFullScreen();      
 }
 else if (divObj.webkitRequestFullscreen) {
   divObj.webkitRequestFullscreen();       
 } else {
   console.log("Fullscreen API is not supported");
 } 

}

  const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 30,
    height: 30,
    border: `2px solid ${theme.palette.primary.main}`,
    padding: '1.5vw',
  }));

  return (
    <Grid container
    direction={'column'}
    justifyContent={'center'}
    alignItems={'center'}
    //style={{ width: "100%" }}
    //spacing={1.5}
>
    <Grid item p={3} style={{ textAlign: 'center',}} justifyContent={'center'} alignItems={'center'}>
    <Box 
    //sx={{background:'green'}}
    >
      <Collapse in={open}>
        <Alert
        severity='info'
        variant='outlined'
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2, textAlign: 'start' }}
        >
            <AlertTitle sx={{ mb: 0.5, alignItems: 'flex-start' }}>Complete</AlertTitle>
            Fill the informations to continue. — <strong>the last step!</strong>
          
        </Alert>
      </Collapse>
      
    </Box>
    </Grid>
<Grid container spacing={1.5} direction={'column'} justifyContent={'center'} alignItems={'center'}
//sx={{background:'yellow',}}
pl={1} pr={1}
columns={{xs:12}}
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
      <Avatar id="avatar-user" className={styles['fullscreen']} src={srcAvatar} sx={{ width: 100, height: 100 }} />
</Badge>
<input id="image-input" type="file" accept="image/jpeg, image/png, image/jpg" style={{display: 'none'}} />
  </Grid>

  <Grid item xs={12}>
  <Stack direction={'column'} justifyContent={'center'} alignItems={'stretch'}
  //sx={{background:'cyan'}}
  >
  <TextField
    fullWidth
          error={false}
          id="outlined-error-helper-text"
          label="Name"
          //required
          //defaultValue="Hello World"
          helperText="Incorrect entry."
          theme={theme}
          placeholder={"any name"}
          color="primary"
          sx={{
            color:theme.palette.primary,
            width:'100%'
          }}
        />
  </Stack>
  </Grid>

<Grid item 
xs={12}
//sx={{width:'90%', background: 'green'}}
>
    <TexFieldCustom
    fullWidth
          error={false}
          id="opppo"
          label="Name"
          //required
          //defaultValue="Hello World"
          helperText="Incorrect entry."
          theme={theme}
          placeholder={"any name"}
          color="primary"
          sx={{
            color:theme.palette.primary,
            width:'100%'
          }}
        />
    
    </Grid>
    <Grid item xs={12}>
    <TexFieldCustom
          error={false}
          id="yes1"
          required
          type={'password'}
          label="Password"
          //defaultValue="Hello World"
          helperText="Incorrect entry."
          theme={theme}
          placeholder={"AAAAAIE"}
          color="primary"
          sx={{
            color:theme.palette.primary
          }}
        />
    
    </Grid>
    <Grid item xs={12}>
    <TexFieldCustom
          error={true}
          id="yes2"
          required
          type={"password"}
          label="Repeat"
          //defaultValue="Hello World"
          helperText="Incorrect entry."
          theme={theme}
          placeholder={"AAAAAIE"}
          color="primary"
          sx={{
            color:theme.palette.primary
          }}
        />
    
    </Grid>

    <Grid item xs={12}>
        <Button variant='contained' onClick={() => {
var washingtonRef = firestore.collection("USER").doc(userFirebase.phoneNumber);
const _user = JSON.parse(JSON.stringify(userFirebase));
handleUserFirebase();
// Set the "capital" field of the city 'DC'
return washingtonRef.update({
    displayName: true
})
.then(() => {
    console.log("Document successfully updated!");
})
.catch((error) => {
    // The document probably doesn't exist.
    console.error("Error updating document: ", error);
});
        }}>
            Continue
        </Button>
    </Grid>
    
    <Grid item xs={12}>
    <FormControl variant="standard">
        <InputLabel shrink htmlFor="bootstrap-input" >
          Bootstrap
        </InputLabel>
        <BootstrapInput placeholder='Yes' defaultValue={""} id="bootstrap-input" />
        <FormHelperText id="standard-weight-helper-text">Merde</FormHelperText>
      </FormControl>
    </Grid>
</Grid>
</Grid>

  );
}