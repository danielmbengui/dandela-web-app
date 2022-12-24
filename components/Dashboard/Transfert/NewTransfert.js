import { Button, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import Transfert, { transfertConverter } from "../../../classes/TransfertClass";
import { COLLECTION_TRANSFERT, USER_TYPE_ADMIN } from "../../../constants";
import { useUserContext } from "../../../context/UserProvider";
import { createRandomCode } from "../../../functions/firestore/TransfertFunctions";
import SlideInDialog from "../../MyComponents/SlideInDialog";
import { TextFieldCustom } from "../../MyComponents/TextFieldCustom";




export default function NewTransfert({firestore}) {
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
transfert.valide = isTransfertValide,
console.log("UID", uid)
console.log("TRansfert", transfert)
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
        label={'Destinataire'}
        required
        //controlled
        //defaultValue="Hello World"
        value={receiver}
        onChange={onChangeReceiver}
        //helperText={errorName ? "Incorrect entry." : ''}
        //theme={theme}
        placeholder={"Destinataire"}
      />
      <TextFieldCustom
        //fullWidth
        //error={errorName}
        id="amount"
        label={'Montant'}
        required
        type={'number'}
        //controlled
        //defaultValue="Hello World"
        value={amount}
        onChange={onChangeAmount}
        //helperText={errorName ? "Incorrect entry." : ''}
        //theme={theme}
        placeholder={"Montant"}
      />
    </Stack>

    <Button
    variant="contained"
    onClick={addTransfert}
    >
      Ajouter
    </Button>
    
    </>
  );
};
