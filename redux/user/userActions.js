import { useDispatch, useSelector } from "react-redux";
import { COLLECTION_USER, DEFAULT_SCREEN_MODE, STORAGE_IS_CONNECTED, STORAGE_PHONE_NUMBER, STORAGE_PROFIL_PHOTO_URL, STORAGE_SCREEN_MODE, STORAGE_UID, USER_LINK_PHOTO_URL } from "../../constants";
import firebase, { firestore, storage } from '../../config.firebase';

const connectRequest = () => {
  return {
    type: "CONNECTION_REQUEST",
  };
};

const connectFailed = (payload) => {
  return {
    type: "CONNECTION_FAILED",
    payload: payload,
  };
};

const updateUserRequest = (payload) => {
  return {
    type: "UPDATE_USER",
    payload: payload,
  };
};

const updateUidRedux = (payload) => {
  return {
    type: "UPDATE_UID",
    payload: payload,
  };
};
const updatePhoneNumberRedux = (payload) => {
  return {
    type: "UPDATE_PHONE_NUMBER",
    payload: payload,
  };
};
const updateDisplayNameRedux = (payload) => {
  return {
    type: "UPDATE_DISPLAY_NAME",
    payload: payload,
  };
};
const updatePhotoURLRedux = (payload) => {
  return {
    type: "UPDATE_PHOTO_URL",
    payload: payload,
  };
};
const updateProfilPhotoURLRedux = (payload) => {
  return {
    type: "UPDATE_PROFIL_PHOTO_URL",
    payload: payload,
  };
};
const updateTypeRedux = (payload) => {
  return {
    type: "UPDATE_TYPE",
    payload: payload,
  };
};
const updateVerifiedRedux = (payload) => {
  return {
    type: "UPDATE_VERIFIED",
    payload: payload,
  };
};

const updateConnectedRedux = (payload) => {
  return {
    type: "UPDATE_CONNECTED",
    payload: payload,
  };
};

const updateScreenModeUser = (payload) => {
  return {
    type: "UPDATE_SCREEN_MODE",
    payload: payload,
  };
};


const updateAdvertiseSessionAccount = (payload) => {
  return {
    type: "UPDATE_ADVERTISE_SESSION_ACCOUNT",
    payload: payload,
  };
};

const updateUserAccount = (payload) => {
  return {
    type: "UPDATE_USER_ACCOUNT",
    payload: payload,
  };
};

const updateNetworkRequest = (payload) => {
  return {
    type: "UPDATE_NETWORK",
    payload: payload,
  };
}

const connectUser = () => {
  return async (dispatch) => {
    dispatch(connectRequest());
    //const auth = firebase.auth();
    //console.log("AUTH redux", auth.currentUser);
    let _screenMode = DEFAULT_SCREEN_MODE;
    if (typeof (Storage) !== "undefined") {
      if (window.localStorage.getItem(STORAGE_SCREEN_MODE) === null) {
        window.localStorage.setItem(STORAGE_SCREEN_MODE, _screenMode);
      }
      _screenMode = window.localStorage.getItem(STORAGE_SCREEN_MODE);
    }
    dispatch(updateScreenModeUser({ screenMode: _screenMode }));

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("FIREBASE AUTH reddux test function", user.phoneNumber);
        const uid = user.uid;
        const phoneNumber = user.phoneNumber;
        const displayName = user.displayName;
        const photoURL = user.phoneNumber + USER_LINK_PHOTO_URL;

        firestore.collection(COLLECTION_USER).doc(phoneNumber).onSnapshot((doc) => {
          if (doc.exists) {
            const _user = doc.data();
            firestore.collection(COLLECTION_USER).doc(phoneNumber).update({
              phoneNumber: phoneNumber,
              uid: uid,
              displayName: displayName,
              photoURL: photoURL,
            }).then(() => {
              const storageRef = storage.ref();
              //const [mobileOpen, setMobileOpen] = useState(false);

              var profileImgRef = storageRef.child(`${photoURL}`);
              let profilPhotoURL = '';
              profileImgRef.getDownloadURL()
                .then((url) => {
                  profilPhotoURL = url;
                  console.log("URRRRRRL PHOTO", profilPhotoURL);
                  dispatch(
                    updateUserRequest({
                      uid: uid,
                      phoneNumber: phoneNumber,
                      displayName: displayName,
                      photoURL: photoURL,
                      profilPhotoURL: url,
                      type: _user.type,
                      connected: true,
                      //screenMode: _screenMode,
                      authorized: true,
                      verified: _user.verified,
                    })
                  );
                })
                .catch((error) => {
                  // Handle any errors
                  profilPhotoURL = '';
                  console.log("ERRRROR PHOTO")
                });

              //window.location.href = "/profil";

            });
          } else {
            dispatch(
              updateUserRequest({
                uid: uid,
                phoneNumber: phoneNumber,
                displayName: displayName,
                photoURL: "",
                profilPhotoURL: "",
                type: "",
                connected: true,
                //screenMode: _screenMode,
                authorized: false,
                verified: false,
              })
            );
            dispatch(connectFailed({
              errorMsg: "The user is not authorized",
            }));
          }
        })/*.catch((error) => {
          console.log("Error getting document:", error);
          //window.location.href = "/authentication/errorlogin";
          dispatch(
            updateUserRequest({
              uid: uid,
              phoneNumber: phoneNumber,
              displayName: displayName,
              photoURL: "",
              profilPhotoURL: "",
              type: "",
              connected: true,
              //screenMode: _screenMode,
              authorized: false,
              verified: false,
            })
          );
          dispatch(connectFailed({
            errorMsg: "The user is not authorized",
          }));
        });
        */
        // ...
      } else {
        console.log("NIIIK reddux test function");
        dispatch(
          updateUserRequest({
            uid: '',
            phoneNumber: '',
            displayName: '',
            photoURL: "",
            profilPhotoURL: "",
            type: "",
            connected: false,
            //screenMode: _screenMode,
            authorized: false,
            verified: false,
          })
        );
        dispatch(connectFailed("The user is not connected"));
      }
    });



  }
}

const updateUser = () => {
  return async (dispatch) => {
    //dispatch(connectRequest());

    //const auth = firebase.auth();
    //console.log("AUTH redux", auth.currentUser);

    let _screenMode = DEFAULT_SCREEN_MODE;
    if (typeof (Storage) !== "undefined") {
      if (window.localStorage.getItem(STORAGE_SCREEN_MODE) === null) {
        window.localStorage.setItem(STORAGE_SCREEN_MODE, _screenMode);
      }
      _screenMode = window.localStorage.getItem(STORAGE_SCREEN_MODE);
    }

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("FIREBASE AUTH reddux test function", user.phoneNumber);
        const uid = user.uid;
        const phoneNumber = user.phoneNumber;
        const photoURL = user.phoneNumber + USER_LINK_PHOTO_URL;

        firestore.collection(COLLECTION_USER).doc(phoneNumber).get().then((doc) => {
          if (doc.exists) {
            const _user = doc.data();
            firestore.collection(COLLECTION_USER).doc(phoneNumber).update({
              phoneNumber: phoneNumber,
              uid: uid,
              photoURL: photoURL,
            }).then(() => {
              //window.location.href = "/profil";
              dispatch(
                updateUserRequest({
                  loading: false,
                  uid: uid,
                  phoneNumber: phoneNumber,
                  photoURL: photoURL,
                  connected: true,
                  screenMode: _screenMode,
                  authorized: true,
                  verified: _user.verified,
                })
              );
            });
          } else {
            dispatch(
              updateUserRequest({
                loading: false,
                uid: uid,
                phoneNumber: phoneNumber,
                connected: true,
                screenMode: _screenMode,
                authorized: false,
                verified: false,
              })
            );
          }
        }).catch((error) => {
          console.log("Error getting document:", error);
          //window.location.href = "/authentication/errorlogin";
          dispatch(
            updateUserRequest({
              loading: false,
              uid: uid,
              phoneNumber: phoneNumber,
              connected: true,
              screenMode: _screenMode,
              authorized: false,
              verified: false,
            })
          );
        });
        // ...
      } else {
        console.log("NIIIK reddux test function");
        dispatch(
          updateUserRequest({
            loading: false,
            uid: '',
            phoneNumber: '',
            displayName: '',
            connected: false,
            screenMode: _screenMode,
            authorized: false,
            verified: false,
          })
        );
      }
    });
  }
}

const updateUid = (_uid) => {
  return async (dispatch) => {
    //let _isConnected = _account !== null ? true: false;
    //window.localStorage.removeItem(STORAGE_SCREEN_MODE);
    if (typeof (Storage) !== "undefined") {
      window.localStorage.setItem(STORAGE_UID, _uid);
    }
    dispatch(updateUidRedux({ uid: _uid }));
  };
};

export const updatePhoneNumber = (_phoneNumber) => {
  return async (dispatch) => {
    //let _isConnected = _account !== null ? true: false;
    //window.localStorage.removeItem(STORAGE_SCREEN_MODE);
    if (typeof (Storage) !== "undefined") {
      window.localStorage.setItem(STORAGE_PHONE_NUMBER, _phoneNumber);
    }
    dispatch(updateUidRedux({ phoneNumber: _phoneNumber }));
  };
};

export const updateProfilPhotoURL = (photoURL) => {
  return async (dispatch) => {
    const storageRef = storage.ref();
    //const [mobileOpen, setMobileOpen] = useState(false);

    var profileImgRef = storageRef.child(`${photoURL}`);
    let profilPhotoURL = '';
    profileImgRef.getDownloadURL()
      .then((url) => {
        profilPhotoURL = url;
        console.log("URRRRRRL PHOTO", profilPhotoURL);
        if (typeof (Storage) !== "undefined") {
          window.localStorage.setItem(STORAGE_PROFIL_PHOTO_URL, url);
        }
        dispatch(updateProfilPhotoURLRedux({ profilPhotoURL: url }));
      });
    //let _isConnected = _account !== null ? true: false;
    //window.localStorage.removeItem(STORAGE_SCREEN_MODE);

  };
};

export const updateIsConnected = (_isConnected) => {
  return async (dispatch) => {
    //let _isConnected = _account !== null ? true: false;
    //window.localStorage.removeItem(STORAGE_SCREEN_MODE);
    if (typeof (Storage) !== "undefined") {
      window.localStorage.setItem(STORAGE_IS_CONNECTED, _isConnected);
    }
    dispatch(updateConnectedRedux({ connected: _isConnected }));
  };
};

export const updateScreenMode = (_screenMode) => {
  return async (dispatch) => {
    //let _isConnected = _account !== null ? true: false;
    //window.localStorage.removeItem(STORAGE_SCREEN_MODE);
    if (typeof (Storage) !== "undefined") {
      window.localStorage.setItem(STORAGE_SCREEN_MODE, _screenMode);
    }
    dispatch(updateScreenModeUser({ screenMode: _screenMode }));
  };
};

