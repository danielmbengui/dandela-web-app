import React, { useEffect, useState } from "react";
import { Button, Grid, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import Transfert, { transfertConverter } from "../../../../classes/TransfertClass";
import { COLLECTION_TRANSFERT, NAMESPACE_LANGAGE_NEW_TRANSFER, PAGE_LINK_INPROGRESS_LIST, PERCENT_15 } from "../../../../constants";
import { useUserContext } from "../../../../context/UserProvider";
import { createRandomCode, formatTransfertCode } from "../../../../lib/functions/firestore/TransfertFunctions";
import { TextFieldCustom } from "../../CustomComponents/TextFieldCustom";
import SelectPercentCustom from "../../CustomComponents/SelectPercentCustom";
import SnackBarCustom from "../../CustomComponents/SnackBarCustom";
import { useRouter } from "next/router";
import { getPercentsSnapshot } from "../../../../lib/firebase-functions/Percent/PercentFunctions";


export default function NewTransfer({ firebase, langage, firestore, logo }) {
    const { t } = useTranslation(NAMESPACE_LANGAGE_NEW_TRANSFER);
    const router = useRouter();
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
    const [percent, setPercent] = useState(PERCENT_15);
    const [percents, setPercents] = useState([]);
    const [isTransfertValide, setIsTransfertValide] = useState(false);
    const [transfert, setTransfert] = useState(new Transfert({ percent: PERCENT_15, code: createRandomCode() }));
    const [showSnackBarSuccess, setShowSnackBarSuccess] = useState();

    useEffect(() => {
        getPercentsSnapshot(setPercents);
    }, []);

    useEffect(() => {
        if (errorReceiver)
            setMessageReceiver(t('messageErrorReceiver'));
        if (errorAmount)
            setMessageAmount(t('messageErrorAmount'));
    }, [langage])

    function initComponents() {
        setReceiver('');
        setErrorReceiver(false);
        setMessageReceiver('');
        setAmount('');
        setErrorAmount(false);
        setMessageAmount('');
        setPercent(PERCENT_15);
        setTransfert(new Transfert({ percent: PERCENT_15, code: createRandomCode() }));
        //setShowSnackBarSuccess(false);
    }

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
            const _transfert = JSON.parse(JSON.stringify(transfert));
            _transfert.uid = newTransfertRef.id;
            //_transfert.code = createRandomCode();
            _transfert.receiver = receiver;
            _transfert.amount = parseInt(amount);
            _transfert.percent = parseFloat(percent);
            _transfert.fees = parseFloat(amount) * parseFloat(percent);
            _transfert.total = parseFloat(amount) + (parseFloat(amount) * parseFloat(percent));
            _transfert.date_create = new Date();
            _transfert.user_create_uid = user.uid;
            //_transfert.addDateLastEdit(new Date());
            //_transfert.date_last_edits = firebase.firestore.FieldValue.arrayUnion(new Date());
            _transfert.receipt_receiver = false;
            _transfert.date_receipt_receiver = '';
            _transfert.receipt_dandela = false;
            _transfert.date_receipt_dandela = '';
            _transfert.receipt_sender = false;
            _transfert.date_receipt_sender = '';
            _transfert.valide = user.isAdmin;
            _transfert.date_valide = user.isAdmin ? new Date() : '';
            // later...
            newTransfertRef.withConverter(transfertConverter).set(_transfert);
            /*
            if (user.isAdmin) {
              newTransfertRef.withConverter(transfertConverter).update({
                date_last_edits: firebase.firestore.FieldValue.arrayUnion(new Date()),
                user_edit_uids: firebase.firestore.FieldValue.arrayUnion(user.uid),
              });
            }
            */
            setTransfert(_transfert);
            setShowSnackBarSuccess(true);
            initComponents();
            router.push(PAGE_LINK_INPROGRESS_LIST);
            //initComponents();
            //setTransfert(_transfert);

        }
    }

    useEffect(() => {
        console.log("RANDOM TRansfert", transfert);
    }, [transfert.percent])

    return (
        <>
            <Stack
                direction={'column'}
                justifyContent={'center'} alignItems={'stretch'}
                spacing={2}
                mb={3}
            >
                <Grid container columnSpacing={1} direction='row' alignItems={'center'}>
                    <Grid item>
                        <Typography sx={{
                            fontFamily: 'ChangaOneRegular',
                            color: 'var(--primary)',
                            fontSize: 'large'
                        }}>
                            {t('Percentage')}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <SelectPercentCustom
                            percent={percent}
                            setPercent={setPercent}
                            percents={percents}
                            setPercents={setPercents}
                        //disabled 
                        />
                    </Grid>
                </Grid>
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
                sx={{
                    display: receiver && amount ? 'block' : 'none'
                }}
            >
                {t('Add')}
            </Button>
            {
                /*
              <ShowSnackBarSuccess initComponents={initComponents} transfert={transfert} showSnackBarSuccess={showSnackBarSuccess} setShowSnackBarSuccess={setShowSnackBarSuccess} />
        
                */
            }
            <SnackBarCustom
                variant={'success'}
                message={t('messageSucces')}
                messages={[`${t('Code')} : ${formatTransfertCode(transfert.code)}`]}
                showSnackBarSuccess={showSnackBarSuccess}
                setShowSnackBarSuccess={setShowSnackBarSuccess}
            />
        </>
    );
};
