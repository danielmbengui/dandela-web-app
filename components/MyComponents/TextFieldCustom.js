import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { alpha } from '@mui/material/styles';

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
  
  export const TextFieldCustom = styled(TextField)(({ theme }) => ({
    '& .MuiInputLabel-root': {
      fontFamily: fontFamilyMain,
      color:'var(--primary)',
      'borderColor': 'red',
    },
    '& .MuiInputBase-root': {
      color: 'var(--primary)',
      'borderColor': 'red',
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