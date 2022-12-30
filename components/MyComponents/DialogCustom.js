import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';

export default function DialogCustom(props) {
    const { transfert1, transfert2 } = props;
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Responsive
            </Button>
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
                    <Button variant='contained' onClick={handleClose} autoFocus>
                        Enregistrer
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}