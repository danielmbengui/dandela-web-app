import React, { useState,useMemo, createContext, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export default function ColorMode({children}) {
    let screenMode = 'dark';
    const [mode, setMode] = useState(screenMode);
    //const [primaryDecimal, setPrimaryDecimal] = useState("var(--blue-dandela-decimal)");

    const primary = "var(--primary)";
    const primaryDecimal = "var(--primary-decimal)";
    const secondaryDecimal = "var(--secondary-decimal)";
    const secondary = "var(--secondary)";
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
              warning: {
                main: 'rgb(255, 192, 203)'
                },

            mode,
            ...(mode === 'light'
            ? {  
                primary: {
                    //main: "rgb(9, 67, 151)",
                    main: `rgb(${primaryDecimal})`,
                  }, 
                  secondary: {
                    main: `rgb(${secondaryDecimal})`,
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
                    main: `rgb(${secondaryDecimal})`,
                    //contrastText: black,
                  },
                  secondary: {
                    main: `rgb(${primaryDecimal})`,
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