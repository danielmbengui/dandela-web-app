import React, { useState, useEffect, useContext } from 'react';
import { styled } from '@mui/material/styles';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useTheme } from '@mui/material/styles';
import { Switch } from '@mui/material';
import { ThemeModeProviderContext } from '../../../../context/ThemeProvider';
import { updateScreenModeStorage } from '../../../../lib/functions/storage/UserStorageFunctions';
import MaterialUISwitch from '../../CustomComponents/MaterialUISwitch';
import { COMPANY_NAME } from '../../../../constants';



export default function SwitchThemeComponent({ }) {
    return (
        <>
            <ListItemButton style={{ marginTop: 7, marginBottom: 7 }}>
                <MaterialUISwitch  />
                <ListItemText
                    sx={{ my: 0 }}
                    primary={COMPANY_NAME}
                    primaryTypographyProps={{
                        fontSize: 'normal',
                        fontWeight: 'medium',
                        letterSpacing: 0,
                        fontFamily: 'EximaGeometric',
                        color: "var(--primary)",
                    }}
                />
            </ListItemButton>
        </>
    );
}