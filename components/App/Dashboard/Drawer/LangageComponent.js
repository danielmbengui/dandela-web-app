import { Grid, Stack, Typography } from "@mui/material";
import { FR, GB, PT } from "country-flag-icons/react/3x2";
import { useTranslation } from "react-i18next";
import { LANGAGE_ENGLISH, LANGAGE_FRENCH, LANGAGE_PORTUGUESE } from "../../../../constants";
import { updateLangageStorage } from "../../../../lib/functions/storage/UserStorageFunctions";

export default function LangageComponent(props) {
    const { t, i18n } = useTranslation('common');
    const { langage, setLangage, } = props;

    const onChangeLanguage = (_language) => {
        i18n.changeLanguage(_language);
        setLangage(_language);
        updateLangageStorage(_language);
    };

    return(
        <Grid container mt={5} direction={'column'} justifyContent={'center'} alignItems={'center'} spacing={1}>
                <Grid item>
                    <Typography sx={{ fontFamily: 'ChangaOneRegular' }}>{t('menuChooseLangage')}</Typography>
                </Grid>
                <Grid item>
                    <Stack direction={'row'} spacing={3}>
                        <FR
                            //className={styles.dashboard}
                            onClick={() => { onChangeLanguage(LANGAGE_FRENCH); }}
                            title={t('langFrench')}
                            style={{
                                cursor: 'pointer',
                                border: langage === 'fr' ? '3px solid var(--primary)' : '',
                                borderRadius: '50%',
                                width: '50px',
                                height: '50px'
                            }}
                        />
                        <GB
                            //className={styles.dashboard}
                            onClick={() => { onChangeLanguage(LANGAGE_ENGLISH); }}
                            title={t('langEnglish')}
                            style={{
                                cursor: 'pointer',
                                border: langage === 'en' ? '3px solid var(--primary)' : '',
                                borderRadius: '50%',
                                width: '50px',
                                height: '50px'
                            }}
                        />
                        <PT
                            //className={styles.dashboard}
                            onClick={() => { onChangeLanguage(LANGAGE_PORTUGUESE); }}
                            title={t('langPortuguese')}
                            style={{
                                cursor: 'pointer',
                                border: langage === 'pt' ? '3px solid var(--primary)' : '',
                                borderRadius: '50%',
                                width: '50px',
                                height: '50px'
                            }}
                        />
                    </Stack>
                </Grid>
            </Grid>
    )
}