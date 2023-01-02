import Cors from 'cors';
import Transfert, { transfertConverter } from '../../../classes/TransfertClass';
import { firestore } from "../../../config.firebase"
import { COLLECTION_TRANSFERT } from "../../../constants";
import initMiddleware from '../../../lib/functions/init-middleware';

const cors = initMiddleware(
    // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
    Cors({
        // Only allow requests with GET and POST
        methods: ["GET", "POST"],
    })
)

export default async function handler(req, res) {
    await cors(req, res);
    try {
        firestore.collection(COLLECTION_TRANSFERT)
            //.where("uid", "!=", "")
            .withConverter(transfertConverter)
            .get()
            .then((querySnapshot) => {
                const transfertsUid = [];
                querySnapshot.forEach((doc) => {
                    const transfert = new Transfert(doc.data());
                    transfertsUid.push(transfert.uid);
                });
                //setTransfertList(cities);
                //console.log("Current Transfert length: ", transfertsId.length);
                //res.status(200).json(transfertsList);
                res.status(200).json({transfertsUid: transfertsUid, success: true});
                //console.log("DOC UID serverSide:", transfertsList.length);

            });
    } catch(error) {
        res.status(500).json({transfertsUid: [], success: false})
    }
}