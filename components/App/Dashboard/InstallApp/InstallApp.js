import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { NAMESPACE_LANGAGE_COMMON } from "../../../../constants";
import { useUserContext } from "../../../../context/UserProvider";
import MaterialUIButton from "../../CustomComponents/MaterialUIButton";
import styles from './InstallApp.module.css';

export default function InstallApp(props) {
    var {deferredPrompt} = props;
    const { t } = useTranslation(NAMESPACE_LANGAGE_COMMON);

    return (
        <Grid className={styles.installInstructions} container direction={'column'}>
            <Grid item>
                <div className={styles.grid}>
                    <div className={styles.card}>
                        <p style={{ paddingBottom: '2vh', }}>{t('InstallApp')}</p>
                        <MaterialUIButton
                            variant="contained"
                            text={"Install"}
                            onClick={async () => {
                                // deferredPrompt is a global variable we've been using in the sample to capture the `beforeinstallevent`
                                deferredPrompt.prompt();
                                // Find out whether the user confirmed the installation or not
                                const { outcome } = await deferredPrompt.userChoice;
                                // The deferredPrompt can only be used once.
                                deferredPrompt = null;
                                // Act on the user's choice
                                if (outcome === 'accepted') {
                                    console.log('User accepted the install prompt.');
                                } else if (outcome === 'dismissed') {
                                    console.log('User dismissed the install prompt');
                                }
                            }}
                        />
                    </div>
                </div>
            </Grid>
        </Grid>
    )
}