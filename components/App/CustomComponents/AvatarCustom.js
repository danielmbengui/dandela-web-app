import React, { useEffect, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Avatar } from '@mui/material';

export const SmallAvatar = styled(Avatar)(() => ({
    width: 30,
    height: 30,
    border: `2px solid var(--primary)`,
    padding: '1.5vw',
  }));