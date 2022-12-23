import React, { useState,useMemo, createContext, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useUserContext } from './UserProvider';
import { useDispatch, useSelector } from "react-redux";
import { updateScreenMode } from '../redux/user/userActions';
import { updateUser } from '../redux/user/userActions';
import { DEFAULT_SCREEN_MODE, STORAGE_SCREEN_MODE } from '../constants';

export const ThemeModeProviderContext = createContext({ toggleColorMode: () => {} });

export default function ThemeModeProvider({children}) {
    //let screenMode = 'light';
    const [user, setUser] = useUserContext();
    const dispatch = useDispatch();
    //dispatch(updateUser());
    //dispatch(updateScreenMode(event.target.checked ? 'dark' : 'light'));
    const [mode, setMode] = useState(DEFAULT_SCREEN_MODE);
    
    //const [primaryDecimal, setPrimaryDecimal] = useState("var(--blue-dandela-decimal)");

    const primary = "var(--primary)";
    const primaryDecimal = "var(--primary-decimal)";
    const secondaryDecimal = "var(--secondary-decimal)";
    const secondary = "var(--secondary)";
    const grey = "var(--grey)";
    const greyLight = "var(--grey-light)";
    const greyDark = "var(--grey-dark)";

    
    const updateUserInfo = () => {
      dispatch(updateUser());
    }
    useEffect(() => {
      //updateUserInfo();
      //setMode(user.screenMode);
      //const _screenMode = mode;
      if (user) {
        let _screenMode = DEFAULT_SCREEN_MODE;
    if (typeof (Storage) !== "undefined") {
      if (window.localStorage.getItem(STORAGE_SCREEN_MODE) === null) {
        window.localStorage.setItem(STORAGE_SCREEN_MODE, _screenMode);
      }
      _screenMode = window.localStorage.getItem(STORAGE_SCREEN_MODE);
    }
        setMode(_screenMode);
      //document.documentElement.setAttribute("data-theme", screenMode);
      console.log('Initial SCREEEN MODE theme', _screenMode);
      }
    }, [user]);
    
    useEffect( () => {
      document.documentElement.setAttribute("data-theme", mode);
      window.localStorage.setItem(STORAGE_SCREEN_MODE, mode);
        console.log('Change SCREEEN MODE theme', mode);
      }, [mode]);
      
    const themeMode = useMemo(
      () => ({
        toggleColorMode: () => {
          //let newScreenMode = mode === 'dark' ? 'light' : 'dark';
          setMode((prevMode) => (prevMode === 'dark' ? 'light' : 'dark'));
          //document.documentElement.setAttribute("data-theme", newScreenMode);

          console.log('SECREEEN MODE theme changeMode', window.localStorage.getItem('screenMode'))
        },
      }),
      [],
    );
  
    const theme = useMemo(
      () =>
        createTheme({
          palette: {
              //divider: grey,
          /*
warning: {
                main: 'rgb(255, 192, 203)'
                },
          */
                greyDark:{
                  main:greyDark,
                },
            mode,
            ...(mode === 'light'
            ? {  
                primary: {
                    //main: "rgb(9, 67, 151)",
                    main: `rgb(${primaryDecimal})`,
                    contrastText: 'white',
                  }, 
                  secondary: {
                    main: `rgb(${secondaryDecimal})`,
                  },
                  divider: grey,
                  background: {
                    menu : greyLight,
                    paper : {
                      main: greyLight,
                      contrastText: 'black',
                    },
                },
                text: {
                  primary: 'rgb(0,0,0)',
                  secondary: 'rgb(255,255,255)',
                  highlight: greyDark,
                },
                }
            : {
                primary: {
                    //main: "rgb(9, 67, 151)",
                    main: `rgb(${secondaryDecimal})`,
                    //contrastText: black,
                  },
                  secondary: {
                    main: `rgb(${primaryDecimal})`,
                  },
                  
                  
                // palette values for dark mode
                //backgroundColor: "rgb(" + 0 + "," + 0 + "," + 0 + ")",
                //primary: deepOrange,
                divider: grey,
                background: {
                    menu: greyDark,
                    paper: {
                      main: greyDark,
                      contrastText: 'rgb(255,255,255)',
                    },
                },
                text: {
                  primary: 'rgb(255,255,255)',
                  secondary: 'rgb(0,0,0)',
                  highlight: greyLight,
                },
                }),
          },
        }),
      [mode],
    );
  
    return (
      <ThemeModeProviderContext.Provider value={themeMode}>
        <ThemeProvider theme={theme}>          
          {children}
        </ThemeProvider>
      </ThemeModeProviderContext.Provider>
    );
  }