import React from 'react';
import { Grid, Typography } from "@mui/material";
import { APP_NAME, COMPANY_NAME } from '../../../../constants';

export default function CompanyNameComponent() {
    return(
        <Grid container sx={{ height: '100%', bgcolor: 'var(--menu-background)' }} direction={'row'} justifyContent={'center'} alignItems={'flex-end'}>
                <Grid>
                    <Typography sx={{
                        fontFamily: 'ChangaOneRegular',
                        fontSize: 'normal',
                        fontWeight: 'normal',
                        lineHeight: '20px',
                        color: 'var(--primary)',
                        marginTop: '5vh',
                        marginBottom: '5vh',
                    }}>
                        ©{APP_NAME} 2022-{new Date().getFullYear()}  
                    </Typography>
                </Grid>
            </Grid>
    )
}