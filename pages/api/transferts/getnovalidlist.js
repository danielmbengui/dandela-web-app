import { firestore } from "../../../config.firebase"
import { COLLECTION_TRANSFERT } from "../../../constants";

export default function handler(req, res) {
    console.log('REEEEQ', req.query);
    if (req.query.userType == 'Admin'){
        
    firestore.collection(COLLECTION_TRANSFERT).where("valide", "==", false)
    .onSnapshot((querySnapshot) => {
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
    res.status(200).json({name: 'meeeeerde'})
    }
    
  }