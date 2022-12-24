import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import { formatTransfertCode } from '../../functions/firestore/TransfertFunctions';
import { Stack } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
    background: 'var(--card-background)'
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
    background: 'var(--card-background)',
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2, background: 'var(--card-background)', }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'var(--text-primary)',
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function TitleDialog(props) {
    const {user, transfert, showTransfert, setShowTransfert} = props;
  const [open, setOpen] = useState(false);

  useEffect(() => {
        setOpen(showTransfert);
  }, [showTransfert])

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setShowTransfert(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open dialog
      </Button>
      <BootstrapDialog
        //onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        TransitionComponent={Transition}
        keepMounted
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          <Typography sx={{
            display:{xs:'none', sm:'inline-block'},
            //display:'inline-block',
            fontSize: 'large',
            fontFamily: 'ChangaOneRegular',
            mr:1,
        }}
            >Transfert
        </Typography>
        <Typography sx={{
            display:{xs:'inline-block', sm:'none'},
            //display:'inline-block',
            fontSize: 'large',
            fontFamily: 'ChangaOneRegular',
            mr:1,
        }}
            >Transf.
        </Typography>
            <Typography sx={{
            display:'inline-block',
            fontSize: 'large',
            fontFamily: 'ChangaOneRegular',
        
        }}>
            {` ${formatTransfertCode(transfert ? transfert.code : '')}`}
            </Typography>
        </BootstrapDialogTitle>
        <DialogContent dividers>
        <Stack
                direction={'row'}
                justifyContent={'start'}
                alignItems={'center'}
            >
                <span style={{ marginRight: '1vw' }}>VALIDE : </span> {transfert && transfert.valide ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}
            </Stack>
          <Typography gutterBottom>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros.
          </Typography>
          <Typography gutterBottom>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
            Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
          </Typography>
          <Typography gutterBottom>
            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus
            magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec
            ullamcorper nulla non metus auctor fringilla.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}