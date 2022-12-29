import React, { useState, useEffect } from 'react';
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
import { Divider, Grid, Stack } from '@mui/material';
import { formatTransfertCode } from '../../../functions/firestore/TransfertFunctions';
import { COLLECTION_TRANSFERT } from '../../../constants';
import { TextFieldCustom } from '../../MyComponents/TextFieldCustom';
import { useTranslation } from 'react-i18next';
import Transfert, { transfertConverter } from '../../../classes/TransfertClass';

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
    <DialogTitle sx={{ m: 0, p: 2, background: 'var(--primary)', }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'var(--background-color)',
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

export default function OneTransfertDialog(props) {
  const { t } = useTranslation('transferts/one');

  const { firestore, uid, setComponentTransfert } = props;
  const [transfert, setTransfert] = useState(null);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    firestore.collection(COLLECTION_TRANSFERT).doc(uid)
      .withConverter(transfertConverter)
      .onSnapshot((doc) => {
        if (doc.exists) {
          setTransfert(new Transfert(doc.data()));
      } else {
          setTransfert(null);
      }
      });
  }, [])

  const handleClose = () => {
    setOpen(false);
    setComponentTransfert(<></>);
  };

  return (
    <BootstrapDialog
      aria-labelledby="customized-dialog-title"
      open={open}
      TransitionComponent={Transition}
      keepMounted
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        <Typography sx={{
          fontSize: 'x-large',
          fontFamily: 'ChangaOneRegular',
          mr: 1,
          color: 'var(--background-color)',
          display: 'inline-block',
        }}
        >Transfert
        </Typography>
        <Typography sx={{
          display: 'inline-block',
          fontSize: 'x-large',
          fontFamily: 'ChangaOneRegular',
          color: 'var(--background-color)'
        }}>
          {` ${formatTransfertCode(transfert ? transfert.code : '')}`}
        </Typography>
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <Stack
          direction={'column'}
          justifyContent={'start'}
          alignItems={'center'}
        >
          <TextFieldCustom
            //fullWidth
            //error={errorReceiver}
            //fontSize={'x-large'}
            id="receiver"
            label={t('Receiver')}
            required
            //controlled
            type={'text'}
            //defaultValue="Hello World"
            //value={receiver}
            //onChange={onChangeReceiver}
            //helperText={messogeReceiver}
            //theme={theme}
            placeholder={t('Receiver')}
          />
          <Grid container columns={{ xs: 12 }}
            sx={{
              bgcolor: 'red'
            }}
          >
            <Grid item xs={6} sx={{
              bgcolor: 'cyan',
              textAlign: { xs: 'left', sm: 'right' },
            }}>
              <Typography sx={{

                fontWeight: 'bold',
                fontFamily: 'ChangaOneRegular',
                fontSize: 'x-large',
                display: 'inline-block',
                marginRight: '1vw',
                color: 'var(--primary)'
              }}>{`${t('Receiver')} : `}</Typography>
            </Grid>
            <Grid item xs={6} sx={{
              textAlign: { xs: 'right', sm: 'left' },
              bgcolor: 'green',
              width: '100%'
            }}>
              <Typography sx={{

                fontFamily: 'ChangaOneRegular',
                fontSize: 'x-large',
                display: 'inline-block'
              }}>{transfert ? ` ${transfert.receiver}` : ''}</Typography>
            </Grid>
          </Grid>
          <Divider sx={{color: 'var(--divider-color)'}} />
          <Grid container columns={{ xs: 12 }}
            sx={{
              bgcolor: 'red'
            }}
          >
            <Grid item xs={6} sx={{
              bgcolor: 'cyan',
              textAlign: { xs: 'left', sm: 'right' },
            }}>
              <Typography sx={{

                fontWeight: 'bold',
                fontFamily: 'ChangaOneRegular',
                fontSize: 'x-large',
                display: 'inline-block',
                marginRight: '1vw',
                color: 'var(--primary)'
              }}>{`${t('Amount')} : `}</Typography>
            </Grid>
            <Grid item xs={6} sx={{
              textAlign: { xs: 'right', sm: 'left' },
              bgcolor: 'green',
              width: '100%'
            }}>
              <Typography sx={{

                fontFamily: 'ChangaOneRegular',
                fontSize: 'x-large',
                display: 'inline-block'
              }}>{transfert ? ` ${transfert.amount}` : ''}</Typography>
            </Grid>
          </Grid>
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
        <Button autoFocus variant='contained' color='error' onClick={() => {
          firestore.collection(COLLECTION_TRANSFERT).doc(transfert.uid).delete().then(() => {
            handleClose();
            console.log("Document successfully deleted!");
          }).catch((error) => {
            console.error("Error removing document: ", error);
          });
        }}>
          Supprimer
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
}