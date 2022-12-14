import { firestore } from "../../../config.firebase"
import { COLLECTION_TRANSFERT } from "../../../constants";

export default function handler(req, res) {
    const id = req.query.id ? req.query.id : null;
    //console.log('REEEEQ', req.query);
    if (id){
    firestore.collection(COLLECTION_TRANSFERT).doc(id)
    .onSnapshot((doc) => {

        //setTransfertList(cities);
        //console.log("Current Transfert length: ", transfertsId.length);
        //res.status(200).json(transfertsList);
        res.status(200).json(doc.data());
        //console.log("DOC UID serverSide:", transfertsList.length);

    });
    }else {
    res.status(200).json({name: 'meeeeerde'})
    }
    
  }