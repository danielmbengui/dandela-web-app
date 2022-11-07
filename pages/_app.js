import React, { useEffect, useState } from "react";
import '../styles/globals.css';
// Import the functions you need from the SDKs you need
import {firestore} from "../config.firebase";
import firebase from "../config.firebase";
import store from "../redux/store";
import { Provider } from "react-redux";


function MyApp({ Component, pageProps }) {
  const [uid, setUid] = useState(null);
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);

  

  const handleUser = (pUser) => {
    setUser(pUser);
  }

  

 

  /*
   useEffect(() => {
    //setUser(auth.currentUser);
    //console.log("AUTHOOO", auth);
    
    //console.log("USER", user);
  }, [auth]);


  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const updateUserInfo = () => {
    dispatch(updateUser());
  }
  useEffect(() => {
    updateUserInfo();
    console.log("USER general", user);
  }, [user.phoneNumber]);
  */

  return(
    <Provider store={store}>
      <Component {...pageProps} firebase={firebase} firestore={firestore} uid={uid} user={user} handleUser={handleUser} />
    </Provider>
  )
}

export default MyApp
