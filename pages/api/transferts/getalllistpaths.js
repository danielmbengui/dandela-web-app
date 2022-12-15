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
    await cors(req, res);
    try {
        firestore.collection(COLLECTION_TRANSFERT)
            .get()
            .then((querySnapshot) => {
                const transfertsId = [];
                querySnapshot.forEach((doc) => {
                    transfertsId.push(doc.data().id);
                });
                //setTransfertList(cities);
                //console.log("Current Transfert length: ", transfertsId.length);
                //res.status(200).json(transfertsList);
                res.status(200).json({transfertsId: transfertsId, success: true});
                //console.log("DOC UID serverSide:", transfertsList.length);

            });
    } catch(error) {
        res.status(500).json({transfertsId: [], success: false})
    }
}