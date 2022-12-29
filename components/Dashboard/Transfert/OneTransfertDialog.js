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
import { COLLECTION_TRANSFERT, COLLECTION_USER, USER_TYPE_ADMIN, USER_TYPE_EMPLOYE_ANGOLA } from '../../../constants';
import { TextFieldCustom } from '../../MyComponents/TextFieldCustom';
import { useTranslation } from 'react-i18next';
import Transfert, { transfertConverter } from '../../../classes/TransfertClass';
import CheckBoxGroupCustom from '../../MyComponents/CheckBoxGroupCustom';
import CheckBoxCustom from '../../MyComponents/CheckBoxCustom';
import User, { userConverter } from '../../../classes/UserClass';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
    background: 'var(--background-color)'
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
    background: 'var(--background-color)'
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

  const { firestore, user, uid, setComponentTransfert } = props;
  const [transfert, setTransfert] = useState(null);
  const [open, setOpen] = useState(true);
  const [receiptReceiver, setReceiptReceiver] = useState(false);
  const [receiptDandela, setReceiptDandela] = useState(false);
  const [receiptSender, setReceiptSender] = useState(false);

  useEffect(() => {
    firestore.collection(COLLECTION_TRANSFERT).doc(uid)
      .withConverter(transfertConverter)
      .onSnapshot(async (doc) => {
        if (doc.exists) {
          const _transfert = new Transfert(doc.data());
          var _userCreate = new User({});
          if (_transfert.user_create_uid) {
            _userCreate = await firestore.collection(COLLECTION_USER).doc(_transfert.user_create_uid)
              .withConverter(userConverter)
              .get()
              .then((doc) => {
                var _user = new User({});
                if (doc.exists) {
                  _user = new User(doc.data());
                  _transfert.user_create = _user;
                  console.log("USER FIIIIIINd", _user);
                  return (new User(doc.data()));
                } else {
                  _user.uid = _transfert.user_create_uid;
                  console.log("USER not finnnd", _user.uid);
                  return (new User({uid: _transfert.user_create_uid}));
                }
              })
          }
          _transfert.user_create = _userCreate;
          console.log("USER FIIIIIINAAAAAL", _userCreate);
          setTransfert(_transfert);
            setReceiptReceiver(_transfert.receipt_receiver);
            setReceiptSender(_transfert.receipt_sender);
            setReceiptDandela(_transfert.receipt_dandela);

        } else {
          setTransfert(null);
          setReceiptReceiver(false);
          setReceiptSender(false);
          setReceiptDandela(false);
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
          {
            /**
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
             */
          }
          <Grid container columns={{ xs: 12 }}
            direction={{ xs: 'column', sm: 'row' }}
            sx={{
              //bgcolor: 'red'
              border: "3px solid var(--divider-color)",
              borderTopLeftRadius: '10px',
              borderTopRightRadius: '10px',
            }}
          >
            <Grid item xs={6} sx={{
              //bgcolor: 'cyan',
              textAlign: { xs: 'center', sm: 'right' },
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
              textAlign: { xs: 'center', sm: 'left' },
              //bgcolor: 'green',
              width: '100%'
            }}>
              <Typography sx={{

                fontFamily: 'ChangaOneRegular',
                fontSize: 'x-large',
                display: 'inline-block'
              }}>{transfert ? ` ${transfert.receiver}` : ''}</Typography>
            </Grid>
          </Grid>
          <Grid container columns={{ xs: 12 }}
            direction={{ xs: 'column', sm: 'row' }}
            sx={{
              //bgcolor: 'red'
              border: "3px solid var(--divider-color)",
              borderTop: "0px solid transparent",
            }}
          >
            <Grid item xs={6} sx={{
              //bgcolor: 'cyan',
              textAlign: { xs: 'center', sm: 'right' },
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
              textAlign: { xs: 'center', sm: 'left' },
              //bgcolor: 'green',
              width: '100%'
            }}>
              <Typography sx={{

                fontFamily: 'ChangaOneRegular',
                fontSize: 'x-large',
                display: 'inline-block'
              }}>{transfert ? ` ${transfert.amount}` : ''}</Typography>
            </Grid>
          </Grid>

          <Grid container columns={{ xs: 12 }}
            direction={{ xs: 'column', sm: 'row' }}
            sx={{
              //bgcolor: 'red'
              border: "3px solid var(--divider-color)",
              borderTop: "0px solid transparent",
            }}
          >
            <Grid item xs={6} sx={{
              //bgcolor: 'cyan',
              textAlign: { xs: 'center', sm: 'right' },
            }}>
              <Typography sx={{

                fontWeight: 'bold',
                fontFamily: 'ChangaOneRegular',
                fontSize: 'x-large',
                display: 'inline-block',
                marginRight: '1vw',
                color: 'var(--primary)'
              }}>{`${t('UserCreator')} : `}</Typography>
            </Grid>
            <Grid item xs={6} sx={{
              textAlign: { xs: 'center', sm: 'left' },
              //bgcolor: 'green',
              width: '100%'
            }}>
              <Typography sx={{

                fontFamily: 'ChangaOneRegular',
                fontSize: 'x-large',
                display: 'inline-block'
              }}>{
                  transfert ?
                    (transfert.user_create.displayName ? transfert.user_create.displayName :
                      (
                        (transfert.user_create.uid ? transfert.user_create.uid : (` ${transfert.user_create_uid}`))
                      (transfert.user_create.uid ? transfert.user_create.uid : (` ${transfert.user_create_uid}`))
                      )
                    )
                    : ''
                }</Typography>
            </Grid>
          </Grid>


          <Grid container columns={{ xs: 12 }}
            direction={{ xs: 'column', sm: 'row' }}
            sx={{
              //bgcolor: 'red'
              border: "3px solid var(--divider-color)",
              borderTop: "0px solid transparent",
            }}
          >
            <Grid item xs={6} sx={{
              //bgcolor: 'cyan',
              textAlign: { xs: 'center', sm: 'right' },
            }}>
              <Typography sx={{
                fontWeight: 'bold',
                fontFamily: 'ChangaOneRegular',
                fontSize: 'x-large',
                display: 'inline-block',
                marginRight: '1vw',
                color: 'var(--primary)'
              }}>{`${t('StateReceiver')} : `}</Typography>
            </Grid>
            <Grid item xs={6} sx={{
              textAlign: { xs: 'center', sm: 'left' },
              //bgcolor: 'green',
              width: '100%'
            }}>
              <CheckBoxCustom
                disabled
                checked={receiptReceiver}
                setChecked={setReceiptReceiver} />
            </Grid>
          </Grid>
          <Grid container columns={{ xs: 12 }}
            direction={{ xs: 'column', sm: 'row' }}
            sx={{
              //bgcolor: 'red'
              border: "3px solid var(--divider-color)",
              borderTop: "0px solid transparent",
            }}
          >
            <Grid item xs={6} sx={{
              //bgcolor: 'cyan',
              textAlign: { xs: 'center', sm: 'right' },
            }}>
              <Typography sx={{
                fontWeight: 'bold',
                fontFamily: 'ChangaOneRegular',
                fontSize: 'x-large',
                display: 'inline-block',
                marginRight: '1vw',
                color: 'var(--primary)'
              }}>{`${t('StateSender')} : `}</Typography>
            </Grid>
            <Grid item xs={6} sx={{
              textAlign: { xs: 'center', sm: 'left' },
              //bgcolor: 'green',
              width: '100%'
            }}>
              <CheckBoxCustom
                disabled
                checked={receiptSender}
                setChecked={setReceiptSender} />
            </Grid>
          </Grid>
          <Grid container columns={{ xs: 12 }}
            direction={{ xs: 'column', sm: 'row' }}
            sx={{
              //bgcolor: 'red'
              border: "3px solid var(--divider-color)",
              borderTop: "0px solid transparent",
            }}
          >
            <Grid item xs={6} sx={{
              //bgcolor: 'cyan',
              textAlign: { xs: 'center', sm: 'right' },
            }}>
              <Typography sx={{
                fontWeight: 'bold',
                fontFamily: 'ChangaOneRegular',
                fontSize: 'x-large',
                display: 'inline-block',
                marginRight: '1vw',
                color: 'var(--primary)'
              }}>{`${t('StateDandela')} : `}</Typography>
            </Grid>
            <Grid item xs={6} sx={{
              textAlign: { xs: 'center', sm: 'left' },
              //bgcolor: 'green',
              width: '100%'
            }}>
              <CheckBoxCustom
                disabled={true}
                checked={receiptDandela}
                setChecked={setReceiptDandela} />
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