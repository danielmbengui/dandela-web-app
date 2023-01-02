import React, {useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import { Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';


export default function DialogCustom(props) {
    const { onActionConfirm, open, setOpen, setLoadingEdit, title, message, textButtonCancel, textButtonConfirm } = props;
    const [loadingConfirm, setLoadingConfirm] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClose = () => {
        setOpen(false);
        setLoadingEdit(false);
    };

    return (
        <div>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                //onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title" sx={{
                    bgcolor: 'var(--card-background)',
                }}>
                    <EditIcon />
                    {title}
                </DialogTitle>
                <DialogContent sx={{
                    bgcolor: 'var(--card-background)',
                }}>
                    <DialogContentText sx={{
                        color: 'var(--text-primary)',
                    }}>
                        {message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{
                    bgcolor: 'var(--card-background)',
                }}>
                    <Button autoFocus onClick={handleClose}>
                        {textButtonCancel}
                    </Button>
                    <LoadingButton
            loading={loadingConfirm}
            //loadingIndicator="Loading…"
            startIcon={<SaveIcon />}
            variant={'contained'}
            //sx={{ display: editingMode ? 'flex' : 'none' }}
            onClick={() => {
                setLoadingConfirm(true);
                onActionConfirm();
                setLoadingConfirm(false);
                handleClose();
            }}
          >
            {textButtonConfirm}
          </LoadingButton>
                </DialogActions>
            </Dialog>
        </div>
    );
}