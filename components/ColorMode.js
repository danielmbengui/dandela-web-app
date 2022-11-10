import React, { useState,useMemo, createContext, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export default function ColorMode({children}) {
    let screenMode = 'light';

    const [mode, setMode] = useState(screenMode);

    const greyLight = "var(--grey-light)";
    const greyDark = "var(--grey-dark)";


    useEffect( () => {
        document.documentElement.setAttribute("data-theme", mode);
      }, [mode]);
      

    const colorMode = useMemo(
      () => ({
        toggleColorMode: () => {
          setMode((prevMode) => (prevMode === 'dark' ? 'light' : 'dark'));
        },
      }),
      [],
    );
  
    const theme = useMemo(
      () =>
        createTheme({
          palette: {
              //divider: grey,
            mode,
            ...(mode === 'light'
            ? {  
                primary: {
                    //main: "rgb(9, 67, 151)",
                    main: 'rgb(var(--primary))',
                    
                    //contrastText: black,
                  }, 
                  background: {
                    menu : greyLight,
                },
                text: {
                },
                }
            : {
                primary: {
                    //main: "rgb(9, 67, 151)",
                    main: 'rgb(var(--primary))',
                    //contrastText: black,
                  },
                  
  
                // palette values for dark mode
                //backgroundColor: "rgb(" + 0 + "," + 0 + "," + 0 + ")",
                //primary: deepOrange,
                //divider: orangeBabytoshi,
                background: {
                    menu: greyDark,
                },
                text: {
                },
                }),
          },
        }),
      [mode],
    );
  
    return (
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>          
          {children}
        </ThemeProvider>
      </ColorModeContext.Provider>
    );
  }