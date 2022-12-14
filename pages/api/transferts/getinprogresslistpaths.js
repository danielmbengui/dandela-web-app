import Cors from 'cors';
import { firestore } from "../../../config.firebase"
import { COLLECTION_TRANSFERT } from "../../../constants";
import initMiddleware from '../../../functions/init-middleware';

const cors = initMiddleware(
    // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
    Cors({
      // Only allow requests with GET and POST
      methods: ["GET", "POST"],
    })
  )

export default async function handler(req, res) {
    //console.log('REEEEQ', req.query);
    await cors(req, res);
    if (req.body.userType == 'Admin') {
        firestore.collection(COLLECTION_TRANSFERT).where("valide", "==", true)
            .get()
            .then((querySnapshot) => {
                const transfertsId = [];
                querySnapshot.forEach((doc) => {
                    const transfert = doc.data();
                    if (!transfert.recu_expediteur || !transfert.recu_destinataire || !transfert.recu_agence)
                        transfertsId.push(doc.data().id);
                });
                //setTransfertList(cities);
                //console.log("Current Transfert length: ", transfertsId.length);
                //res.status(200).json(transfertsList);
                res.status(200).json(transfertsId);
                //console.log("DOC UID serverSide:", transfertsList.length);

            });
    } else {
        res.status(200).json([])
    }

}