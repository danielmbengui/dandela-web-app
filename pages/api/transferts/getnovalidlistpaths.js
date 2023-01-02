import Cors from 'cors';
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
    //console.log('REEEEQ', req.query);
    await cors(req, res);
    console.log("YEEEEES", req.body);
    if (req.body.userType == 'Admin') {
        firestore.collection(COLLECTION_TRANSFERT).where("valide", "==", false)
            .get()
            .then((querySnapshot) => {
                const transfertsId = [];
                querySnapshot.forEach((doc) => {
                    transfertsId.push(doc.data().uid);
                });
                //setTransfertList(cities);
                //console.log("Current Transfert length: ", transfertsId);
                //res.status(200).json(transfertsList);
                res.status(200).json({transfertsId: transfertsId, success: true});
                //console.log("DOC UID serverSide:", transfertsList.length);

            });
    } else {
        res.status(200).json({transfertsId: [], success: false});
    }

}