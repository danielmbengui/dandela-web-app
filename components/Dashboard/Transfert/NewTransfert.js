import { Button, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Transfert, { transfertConverter } from "../../../classes/TransfertClass";
import { COLLECTION_TRANSFERT, USER_TYPE_ADMIN } from "../../../constants";
import { useUserContext } from "../../../context/UserProvider";
import { createRandomCode } from "../../../functions/firestore/TransfertFunctions";
import SlideInDialog from "../../MyComponents/SlideInDialog";
import { TextFieldCustom } from "../../MyComponents/TextFieldCustom";




export default function NewTransfert({firestore, logo}) {
  const { t, i18n } = useTranslation('transferts/new');

  const [user, setUser] = useUserContext();
  const [receiver, setReceiver] = useState('');
  const [amount, setAmount] = useState('');
  const [isTransfertValide, setIsTransfertValide] = useState(false);
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
 }, [user])

 const onChangeReceiver = (event) => {
    setReceiver(event.target.value);
    console.log("RECEIVER", event.target.value);
 }

 const onChangeAmount = (event) => {
  setAmount(event.target.value);
  console.log("AMOUNT", event.target.value);
}
 const addTransfert = () => {
// Add a new document with a generated id.
var newTransfertRef = firestore.collection(COLLECTION_TRANSFERT).doc();
const transfert = new Transfert({});
const uid = newTransfertRef.id;
transfert.uid = newTransfertRef.id;
transfert.code = createRandomCode();
transfert.receiver = receiver;
transfert.amount = amount;
transfert.receipt_receiver = false;
transfert.receipt_dandela = false;
transfert.receipt_sender = false;
transfert.valide = isTransfertValide;
// later...
newTransfertRef.withConverter(transfertConverter).set(transfert);
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
        //error={errorName}
        id="dest"
        label={t('Receiver')}
        required
        //controlled
        //defaultValue="Hello World"
        value={receiver}
        onChange={onChangeReceiver}
        //helperText={errorName ? "Incorrect entry." : ''}
        //theme={theme}
        placeholder={t('Receiver')}
      />
      <TextFieldCustom
        //fullWidth
        //error={errorName}
        id="amount"
        label={t('Amount')}
        required
        type={'number'}
        //controlled
        //defaultValue="Hello World"
        value={amount}
        onChange={onChangeAmount}
        //helperText={errorName ? "Incorrect entry." : ''}
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

    <Button onClick={() => {
      let promise = Notification.requestPermission();
      function notifyMe() {
        if (!("Notification" in window)) {
          // Check if the browser supports notifications
          alert("This browser does not support desktop notification");
        } else if (Notification.permission === "granted") {
          // Check whether notification permissions have already been granted;
          // if so, create a notification
          const notification = new Notification("Hi there!");
          console.log("PERMISSION notif GRANTED", 'granted')
          // …
        } else if (Notification.permission !== "denied") {
          console.log("PERMISSION notif", 'denied')
          // We need to ask the user for permission
          Notification.requestPermission().then((permission) => {
            // If the user accepts, let's create a notification
            if (permission === "granted") {
              const notification = new Notification("Hi there!");
              console.log("PERMISSION notif DENIED", 'granted')
              // …
            }
          });
        }
      
        // At last, if the user has denied notifications, and you
        // want to be respectful there is no need to bother them anymore.
      }
      notifyMe();
    }}>
      Notif
    </Button>
    
    </>
  );
};
