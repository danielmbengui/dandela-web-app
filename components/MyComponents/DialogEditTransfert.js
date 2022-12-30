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


export default function DialogEditTransfert(props) {
    const { onActionConfirm, transfert, receiptReceiver, open, setOpen, setLoadingEdit } = props;
    const [loadingSave, setLoadingSave] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClickOpen = () => {
        setOpen(true);
    };

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
                    {"Modification"}
                </DialogTitle>
                <DialogContent sx={{
                    bgcolor: 'var(--card-background)',
                }}>
                    <DialogContentText sx={{
                        color: 'var(--text-primary)',
                    }}>
                        {
                            transfert.receiptReceiver !== receiptReceiver && 
                            <>
                            <span>
                                {" Reçu Angola devient : "}
                            </span>
                            <span>
                                {
                                    receiptReceiver ? <CheckCircleIcon color={'success'} /> : <CancelIcon color={'error'} />
                                }
                            </span>
                            
                            <br />
                            </>
                        }
                        Let Google help apps determine location. This means sending anonymous
                        location data to Google, even when no apps are running.
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{
                    bgcolor: 'var(--card-background)',
                }}>
                    <Button autoFocus onClick={handleClose}>
                        Annuler
                    </Button>
                    <LoadingButton
            loading={loadingSave}
            //loadingIndicator="Loading…"
            startIcon={<SaveIcon />}
            variant={'contained'}
            //sx={{ display: editingMode ? 'flex' : 'none' }}
            onClick={() => {
                setLoadingSave(true);
                onActionConfirm();
                setLoadingSave(false);
                handleClose();
            }}
          >
            Enregistrer
          </LoadingButton>
                    <Button variant='contained' onClick={handleClose} autoFocus>
                        Enregistrer
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}