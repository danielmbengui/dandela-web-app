import { useDispatch, useSelector } from "react-redux";
import { DEFAULT_SCREEN_MODE } from "../../constants";
const STORAGE_SCREEN_MODE = 'screenMode';

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

const updateAdvertiseAccount = (payload) => {
  return {
    type: "UPDATE_ADVERTISE_ACCOUNT",
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

export const updateUser = () => {
    return async (dispatch) => {
        dispatch(connectRequest());

        //const auth = firebase.auth();
        //console.log("AUTH redux", auth.currentUser);

        let _screenMode = DEFAULT_SCREEN_MODE;
        if( typeof(Storage) !== "undefined" ){
          if( window.localStorage.getItem(STORAGE_SCREEN_MODE) === null ){
            window.localStorage.setItem(STORAGE_SCREEN_MODE, _screenMode);
          }
          _screenMode = window.localStorage.getItem(STORAGE_SCREEN_MODE);
        }

        dispatch(
          updateUserRequest({
              phoneNumber: '+41761234567',
              isConnected: false,
              screenMode: _screenMode,
          })
        );  
    }
}

export const updateScreenMode = (_screenMode) => {
  return async (dispatch) => {
    //let _isConnected = _account !== null ? true: false;
    //window.localStorage.removeItem(STORAGE_SCREEN_MODE);
    if( typeof(Storage) !== "undefined" ){
      window.localStorage.setItem(STORAGE_SCREEN_MODE, _screenMode);
    }
    dispatch(updateScreenModeUser({ screenMode: _screenMode }));
  };
};

export const connectUser = () => {
  return async (dispatch) => {
    
  }
}
