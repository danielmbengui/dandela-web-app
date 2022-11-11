import React, {useEffect, useState} from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { AlertTitle, Avatar, FormHelperText, Grid } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

import { alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import styles from './Login.module.css';
import { UploadSharp } from '@mui/icons-material';


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

export default function CompleteLogin({logo, firestore, userFirebase}) {
    const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [srcAvatar, setSrcAvatar] = useState('');

  console.log("FIREBASE USER", userFirebase);

  useEffect(() => {
    const image_input = document.querySelector("#image-input");
    image_input.addEventListener("change", function() {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        const uploaded_image = reader.result;
        document.querySelector("#display-image").style.backgroundImage = `url(${uploaded_image})`;
        setSrcAvatar(uploaded_image);
      });
      reader.readAsDataURL(this.files[0]);
    });
    
  })


  return (
    <Grid container
    direction={'column'}
    justifyContent={'center'}
    alignItems={'center'}
    style={{ width: "100%" }}
    //spacing={1.5}
>
  <Grid item>
  <Avatar
  alt="Dandela Web App"
  src={srcAvatar}
  sx={{ width: 100, height: 100 }}
/>
  </Grid>
  <Grid item>
  <label htmlFor="image-input" className="custom-file-upload">
    Custom Upload
</label>
<input id="image-input" type="file" accept="image/jpeg, image/png, image/jpg" style={{display: 'none'}} />
  </Grid>
  <Grid item>
    <Button onClick={()=>{
      const image_input = document.querySelector("#image-input");
      image_input.addEventListener("change", function() {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          const uploaded_image = reader.result;
          document.querySelector("#display-image").style.backgroundImage = `url(${uploaded_image})`;
        });
        reader.readAsDataURL(this.files[0]);
      });
    }}>OK</Button>
  </Grid>
  <Grid item>
  <input type="file" id="image-input1" accept="image/jpeg, image/png, image/jpg" />
  </Grid>
  <Grid item>
<div id="display-image" style={{
  width: '400px',
  height: '225px',
}}></div>
  </Grid>
    <Grid item p={5} style={{ display: 'block' }}>
        <Image
            src={logo}
            width={100}
            height={100}
            alt="logo"
            priority
            sizes="(min-width: 60em) 24vw,
                    (min-width: 28em) 45vw,
                    100vw"
            style={{
                width: "100%",
                height: "auto"
            }} />
    </Grid>
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
sx={{background:'red'}}
>
<Grid item 
sx={{background:'green'}}
>
    <TexFieldCustom
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
          }}
        />
    
    </Grid>
    <Grid item>
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
    <Grid item>
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
    
    <Grid item>
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
