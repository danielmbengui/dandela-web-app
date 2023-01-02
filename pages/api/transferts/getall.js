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
    await cors(req, res);
    if (firestore){
        
    firestore.collection(COLLECTION_TRANSFERT).where("valide", "==", true)
    .get()
    .then((querySnapshot) => {
        const transfertsList = [];
        querySnapshot.forEach((doc) => {
            transfertsList.push(doc.data());
        });
        //setTransfertList(cities);
        //console.log("Current Transfert length: ", transfertsId.length);
        //res.status(200).json(transfertsList);
        res.status(200).json(transfertsList);
        //console.log("DOC UID serverSide:", transfertsList.length);

    });
    }else {
    res.status(200).json([])
    }
    
  }