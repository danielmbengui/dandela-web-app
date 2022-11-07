import { useDispatch, useSelector } from "react-redux";


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

        dispatch(
          updateUserRequest({
              phoneNumber: '+41761234567',
              isConnected: false,
          })
        );

        
    }
}

export const connectUser = () => {
  return async (dispatch) => {
    
  }
}
