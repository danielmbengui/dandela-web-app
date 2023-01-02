import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { styled, useTheme } from '@mui/material/styles';
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
import { Grid, Stack, useMediaQuery } from '@mui/material';
import { formatTransfertCode } from '../../../../../lib/functions/firestore/TransfertFunctions';
import { COLLECTION_TRANSFERT, COLLECTION_USER, USER_TYPE_EMPLOYE_ANGOLA } from '../../../../../constants';
import { useTranslation } from 'react-i18next';
import Transfert, { transfertConverter } from '../../../../../classes/TransfertClass';
import CheckBoxCustom from '../../../CustomComponents/CheckBoxCustom';
import User, { userConverter } from '../../../../../classes/UserClass';
import LoadingButton from '@mui/lab/LoadingButton';
//import DialogEditTransfert from '../../MyComponents/DialogEditTransfert';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DialogCustom from '../../../CustomComponents/DialogCustom';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    //minWidth: 300,
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

export default function OneTransferDialog(props) {
  const { t } = useTranslation('transferts/one');
const theme = useTheme();
  const { firestore, user, uid, setComponentTransfert } = props;

  const [transfert, setTransfert] = useState(null);
  const [open, setOpen] = useState(true);
  const [receiptReceiver, setReceiptReceiver] = useState(false);
  const [receiptDandela, setReceiptDandela] = useState(false);
  const [receiptSender, setReceiptSender] = useState(false);
  const [editingMode, setEditingMode] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

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
                  return (new User({ uid: _transfert.user_create_uid }));
                }
              })
          }
          _transfert.user_create = _userCreate;
          console.log("USER FIIIIIINAAAAAL", _userCreate);
          setTransfert(_transfert);
          setReceiptReceiver(_transfert.receipt_receiver);
          setReceiptSender(_transfert.receipt_sender);
          setReceiptDandela(_transfert.receipt_dandela);
          var _editingReceiver = _transfert.receiptReceiver != receiptReceiver;
          console.log("REEECEIVER", receiptReceiver)
          setEditingMode(_editingReceiver);

        } else {
          setTransfert(null);
          setReceiptReceiver(false);
          setReceiptSender(false);
          setReceiptDandela(false);
          setEditingMode(false);
        }
      });
  }, [])

  useEffect(() => {
    if (transfert) {
      const _editReceiver = transfert.receipt_receiver !== receiptReceiver;
      setEditingMode(_editReceiver);
    } else {
      setEditingMode(false);
      setLoadingEdit(false);
      setShowConfirmationDialog(false);
    }
    console.log("REEEECEIVER 2", receiptReceiver, transfert ? transfert : null)
  }, [transfert, receiptReceiver]);

  const onActionConfirm = () => {
    const _transfert = JSON.parse(JSON.stringify(transfert));
    _transfert.receipt_receiver = receiptReceiver;
    console.log("click edit transfert", _transfert);
    firestore.collection(COLLECTION_TRANSFERT).doc(transfert.uid)
      .withConverter(transfertConverter)
      .set(_transfert)
      .then(() => {
        setTransfert(_transfert);
        //setReceiptReceiver(_transfert.receipt_receiver);
        //setReceiptSender(_transfert.receipt_sender);
        //setReceiptDandela(_transfert.receipt_dandela);
        setEditingMode(false);
        setLoadingEdit(false);
        //console.log("edit success", new Transfert(doc.data()));
        handleClose();
        console.log("Document successfully updated!");
      }).catch(() => {
        console.log("edit error",);
      })
  }


  const handleClose = () => {
    setOpen(false);
    setComponentTransfert(<></>);
  };

  return (
    <BootstrapDialog
      aria-labelledby="customized-dialog-title"
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      keepMounted
      scroll='body'
      //width={350}
      fullScreen={fullScreen}
      fullWidth
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        <Typography sx={{
          fontSize: 'x-large',
          fontFamily: 'ChangaOneRegular',
          mr: 1,
          color: 'var(--background-color)',
          display: 'none',
          cursor: 'none'
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
          alignItems={'stretch'}
          //minWidth={{xs:'100%',sm:300}}
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
            justifyContent={'center'}
            alignItems={'center'}
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
              {
                
user && user.type === USER_TYPE_EMPLOYE_ANGOLA ? <CheckBoxCustom
                  //disabled
                  checked={receiptReceiver}
                  setChecked={setReceiptReceiver}
                /> : (transfert && transfert.receipt_receiver ? <CheckCircleIcon color={'success'} /> : <CancelIcon color={'error'} />)
                
              }
              
              {
                /*
                <CheckBoxCustom
                //disabled
                checked={receiptReceiver}
                setChecked={setReceiptReceiver}
              />
              */
              }
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
       
      </DialogContent>
      <DialogActions>
        <Stack direction={'row'} alignItems={'stretch'}>
          <LoadingButton
            loading={loadingEdit}
            //loadingIndicator="Loading…"
            startIcon={<ModeEditIcon />}
            variant={'contained'}
            sx={{ display: editingMode ? 'flex' : 'none' }}
            onClick={() => {
              setLoadingEdit(true);
              setShowConfirmationDialog(true);
            }}
          >
            Modifier
          </LoadingButton>
          {
transfert && <DialogCustom
              onActionConfirm={onActionConfirm}
              //transfert={transfert}
              //receiptReceiver={receiptReceiver}
              open={showConfirmationDialog}
              setOpen={setShowConfirmationDialog}
              setLoadingEdit={setLoadingEdit}
              title={"Modification"}
              textButtonCancel={'Annuler'}
              textButtonConfirm={'Enregistrer'}
              message={"Etes vous surs de vouloir modifier ce transfert ?"}
            />
          }
          {
            /*
  <DialogCustom />
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
            */
          }
        </Stack>
      </DialogActions>

    </BootstrapDialog>
  );
}