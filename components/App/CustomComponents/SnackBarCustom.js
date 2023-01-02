import React, { useEffect } from 'react';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';

function ShowSnackBar(props) {
    const { t } = useTranslation('profil');
    const { enqueueSnackbar } = useSnackbar();
    const { variant, message, messages, showSnackBarSuccess, setShowSnackBarSuccess } = props;

    useEffect(() => {
        if (showSnackBarSuccess) {
            enqueueSnackbar(message, { variant: variant });
            for (let i = 0; i < messages.length; i++) {
                enqueueSnackbar(messages[i]);
            }
            setShowSnackBarSuccess(false);
        }
    }, [showSnackBarSuccess])

    return (<></>);
}

export default function SnackBarCustom(props){
    const { variant, message, messages, showSnackBarSuccess, setShowSnackBarSuccess } = props;

    return (
        <SnackbarProvider maxSnack={3} autoHideDuration={3000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
            <ShowSnackBar 
            variant={variant}
            message={message}
            messages={messages}
            showSnackBarSuccess={showSnackBarSuccess} 
            setShowSnackBarSuccess={setShowSnackBarSuccess}
            />
        </SnackbarProvider>
    );
}