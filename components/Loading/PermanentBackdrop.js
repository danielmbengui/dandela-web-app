import React, {useState} from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import { styled, useTheme } from '@mui/material/styles';

export default function PermanentBackdrop() {
  const theme = useTheme();

  return (
    <div>
      <Backdrop
        sx={{ color: theme.palette.primary.main, zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}