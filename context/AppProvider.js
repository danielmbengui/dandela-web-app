import { createContext, useState, useEffect, useReducer, useContext } from "react";
import { firestore } from "../config.firebase";
import firebase from "../config.firebase";



export const AppContext = createContext();

const AppProvider = ({ children }) => {
    const initialState = {
      isLoggedIn: false,
      isLoginPending: false,
      loginError: null
    }
    const [state, setState] = useState(initialState);
      const [userReducer, handleUserReducer] = useReducer((state , newUser) => {
        return state = newUser.currentUser;
      }, null);

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                //7setPhoneNumber(user.phoneNumber);
                //console.log("onAuthStateChanged user", user.phoneNumber);
                var docRef = firestore.collection("USER").doc(user.phoneNumber);
            docRef.get().then((doc) => {
                if (doc.exists) {
                    console.log("Document data:", doc.data());
                    handleUserReducer(doc.data());
                } else {
                    console.log("No such document!");
                    handleUserReducer(null);
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
                handleUserReducer(null);
            });
                //handleUserReducer(user);
                initialState.isLoggedIn = true;
                initialState.isLoginPending = false;
                initialState.loginError = null;
            } else {
                // User is signed out
                //console.log("onAuthStateChanged user", "null");
                //setPhoneNumber(null);
                handleUserReducer(null);
                initialState.isLoggedIn = false;
                initialState.isLoginPending = false;
                initialState.loginError = null;
            }
        });
    }, []);

      

      return (
        <AppContext.Provider value={{ userReducer, handleUserReducer }}>
          {children}
        </AppContext.Provider>
      );
    };

  export function useAppContext() {
      return useContext(AppContext);
  }

    export default AppProvider;