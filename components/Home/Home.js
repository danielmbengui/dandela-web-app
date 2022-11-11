import React, {useContext, useEffect, useState} from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { AppBar, FormControlLabel, Grid, Switch, Toolbar, Typography } from "@mui/material";
import Image from "next/image";
import Login from './Login/Login';
import CompleteLogin from './Login/CompleteLogin';
import { myLoader } from '../../functions/ImageLoader';
import { ColorModeContext } from '../ColorMode';

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
        margin: 1,
        padding: 0,
        transform: 'translateX(6px)',
        '&.Mui-checked': {
            color: '#fff',
            transform: 'translateX(22px)',
            '& .MuiSwitch-thumb:before': {
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                    'var(--text-secondary)',
                )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
            },
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: "var(--primary-opacity)"
            },
        },
    },
    '& .MuiSwitch-thumb': {
        backgroundColor: "var(--primary)",
        width: 32,
        height: 32,
        '&:before': {
            content: "''",
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                '#fff',
            )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
        },
    },
    '& .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: "var(--primary-opacity)",
        borderRadius: 20 / 2,
    },
}));

const Home = ({logo, links, firebase, firestore, storage, userFirebase, handleUserFirebase}) => {
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);
    const [mode, setMode] = useState(theme.palette.mode);
    const [checked, setChecked] = useState(theme.palette.mode === 'dark' ? true : false);
    const [phoneNumber, setPhoneNumber] = useState('');

    const [content, setContent] = useState(<></>);

    const onChangeMode = (event) => {
        colorMode.toggleColorMode();
        setMode(event.target.checked ? 'dark' : 'light');
        setChecked(event.target.checked ? true : false);
        //dispatch(updateScreenMode(event.target.checked ? 'dark' : 'light'));
    }

    useEffect(() => {
        console.log("user firebase HOME", userFirebase);
        if (userFirebase ){
            setPhoneNumber(userFirebase.phoneNumber);
            if (!userFirebase.displayName){
                setContent(<CompleteLogin logo={logo} firebase={firebase} firestore={firestore} storage={storage} userFirebase={userFirebase} handleUserFirebase={handleUserFirebase} />);
            }
            
        }else{
            setContent(<Login logo={logo} firebase={firebase} firestore={firestore} userFirebase={userFirebase} />);
        }
    }, [userFirebase])

    function appBarLabel(label) {
        return (
          <Toolbar 
          //sx={{background: 'red'}} 
          justifyContent={'flex-end'}
          >
            <Grid container justifyContent={'flex-end'} alignItems={'center'} 
            //</Toolbar>sx={{background: 'green'}}
            >
            <Grid item>
            <FormControlLabel
                                    control={<MaterialUISwitch sx={{ m: 1 }} checked={checked} onChange={onChangeMode} />}
                                //label={`Mode ${theme.palette.mode}`}
                                //labelPlacement="start"
                                />
            </Grid>
            </Grid>
          </Toolbar>
        );
      }

    return(
        <>
        <AppBar position="static" elevation={0} sx={{height:'10vh', background:'transparent'}}>
          {appBarLabel('default')}
        </AppBar>
        <Grid container
        direction={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        //style={{ width: "100%", marginTop:10 }}
        mt={5}
        columns={{xs:12}}
    >
        <Grid item p={5} style={{ display: 'block' }} xs={12}>
            <Image
                src={logo}
                width={100}
                height={100}
                alt="logo"
                //layout="responsive"
                priority
                quality={100}
                loader={myLoader}
                />
        </Grid>
        <Grid item xs={12}>
        {}

{
     userFirebase && !userFirebase.displayName && <CompleteLogin logo={logo} firebase={firebase} firestore={firestore} storage={storage} userFirebase={userFirebase} handleUserFirebase={handleUserFirebase} />
}

{
    !userFirebase && <Login logo={logo} firebase={firebase} firestore={firestore} userFirebase={userFirebase} />
}
        </Grid>
    </Grid>
        </>
    )
}

export default Home;