import React, { useEffect, useState } from "react";
import { Button, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import Transfert, { transfertConverter } from "../../../classes/TransfertClass";
import { COLLECTION_TRANSFERT, USER_TYPE_ADMIN } from "../../../constants";
import { useUserContext } from "../../../context/UserProvider";
import { createRandomCode, formatTransfertCode } from "../../../functions/firestore/TransfertFunctions";
import SlideInDialog from "../../MyComponents/SlideInDialog";
import SnackBarCustom from "../../MyComponents/SnackBarCustom";
import { TextFieldCustom } from "../../MyComponents/TextFieldCustom";
import { SnackbarProvider, useSnackbar } from 'notistack';

function SnackBarCustomBis(props) {
  const { t } = useTranslation('transferts/new');
  const { enqueueSnackbar } = useSnackbar();
  const { transfert, showSnackBarSuccess, setShowSnackBarSuccess } = props;

  useEffect(() => {
    if (showSnackBarSuccess) {
      enqueueSnackbar(t('messageSucces'), { variant: 'success' });
      enqueueSnackbar(`${t('Code')} : ${formatTransfertCode(transfert.code)}`);
      setShowSnackBarSuccess(false);
    }
  }, [showSnackBarSuccess])

  return (
    <>
    </>
  );
}

const ShowSnackBarSuccess = (props) => {
  const { transfert, showSnackBarSuccess, setShowSnackBarSuccess } = props;

  return (
    <SnackbarProvider maxSnack={3} autoHideDuration={3000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
      <SnackBarCustomBis transfert={transfert} showSnackBarSuccess={showSnackBarSuccess} setShowSnackBarSuccess={setShowSnackBarSuccess} />
    </SnackbarProvider>
  );
}



export default function NewTransfert({ langage, firestore, logo }) {
  const { t } = useTranslation('transferts/new');

  const [user, setUser] = useUserContext();
  const [receiver, setReceiver] = useState('');
  const [errorReceiver, setErrorReceiver] = useState(false);
  const [messogeReceiver, setMessageReceiver] = useState('');
  const isErrorReceiver = (_receiver) => {
    if (!_receiver.toString().length || _receiver.toString().length < 5 || _receiver.toString().length > 30) {
      setErrorReceiver(true);
      setMessageReceiver(t('messageErrorReceiver'));
      return (true);
    }
    setErrorReceiver(false);
    setMessageReceiver("");
    return (false);
  }
  const [amount, setAmount] = useState('');
  const [errorAmount, setErrorAmount] = useState(false);
  const [messageAmount, setMessageAmount] = useState('');
  const isErrorAmount = (_amount) => {
    if (!_amount.toString().length || parseInt(_amount) < 50) {
      setErrorAmount(true);
      setMessageAmount(t('messageErrorAmount'));
      return (true);
    }
    setErrorAmount(false);
    setMessageAmount("");
    return (false);
  }
  const [isTransfertValide, setIsTransfertValide] = useState(false);
  const [transfert, setTransfert] = useState(new Transfert({}));
  const [showSnackBarSuccess, setShowSnackBarSuccess] = useState();

  function initComponents() {
    setReceiver('');
    setErrorReceiver(false);
    setMessageReceiver('');
    setAmount('');
    setErrorAmount(false);
    setMessageAmount('');
  }
  /*
  uid: transfert.uid,
            code: transfert.code,
            receiver: transfert.receiver,
            amount: transfert.amount,
            receipt_receiver: transfert.receipt_receiver,
            receipt_dandela: transfert.receipt_dandela,
            receipt_sender: transfert.receipt_sender,
            valide: transfert.valide,
  */
  useEffect(() => {
    if (user && user.type === USER_TYPE_ADMIN) {
      setIsTransfertValide(true);
    }
  }, [user]);

  useEffect(() => {
    if (errorReceiver)
      setMessageReceiver(t('messageErrorReceiver'));
    if (errorAmount)
      setMessageAmount(t('messageErrorAmount'));
  }, [langage])

  const onChangeReceiver = (event) => {
    setReceiver(event.target.value);
    console.log("RECEIVER", event.target.value);
  }

  const onChangeAmount = (event) => {
    setAmount(event.target.value);
    console.log("AMOUNT", event.target.value);
  }
  const addTransfert = () => {
    const _isErrorReceiver = isErrorReceiver(receiver);
    const _isErrorAmount = isErrorAmount(amount);
    if (!_isErrorReceiver && !_isErrorAmount) {
      // Add a new document with a generated id.
      var newTransfertRef = firestore.collection(COLLECTION_TRANSFERT).doc();
      const _transfert = new Transfert({});
      _transfert.uid = newTransfertRef.id;
      _transfert.code = createRandomCode();
      _transfert.receiver = receiver;
      _transfert.amount = amount;
      _transfert.receipt_receiver = false;
      _transfert.receipt_dandela = false;
      _transfert.receipt_sender = false;
      _transfert.valide = isTransfertValide;
      // later...
      newTransfertRef.withConverter(transfertConverter).set(_transfert);
      initComponents();
      setTransfert(_transfert);
      setShowSnackBarSuccess(true);
    }
  }

  useEffect(() => {
    console.log("RANDOM code", createRandomCode());
  })

  return (
    <>
      <Stack
        direction={'column'}
        justifyContent={'center'} alignItems={'stretch'}
        spacing={2}
        mb={3}
      >
        <TextFieldCustom
          //fullWidth
          error={errorReceiver}
          id="receiver"
          label={t('Receiver')}
          required
          //controlled
          type={'text'}
          //defaultValue="Hello World"
          value={receiver}
          onChange={onChangeReceiver}
          helperText={messogeReceiver}
          //theme={theme}
          placeholder={t('Receiver')}
        />
        <TextFieldCustom
          //fullWidth
          error={errorAmount}
          id="amount"
          label={t('Amount')}
          required
          type={'number'}
          //controlled
          //defaultValue="Hello World"
          value={amount}
          onChange={onChangeAmount}
          helperText={messageAmount}
          //theme={theme}
          placeholder={t('Amount')}
        />
      </Stack>

      <Button
        variant="contained"
        onClick={addTransfert}
      >
        {t('Add')}
      </Button>
      <ShowSnackBarSuccess transfert={transfert} showSnackBarSuccess={showSnackBarSuccess} setShowSnackBarSuccess={setShowSnackBarSuccess} />
    </>
  );
};
