import { DEFAULT_SCREEN_MODE } from "../../constants";

const initialState = {
  loading: false,
  uid: '',
  phoneNumber:'',
  photoURL: "",
  profilPhotoURL: "",
  editingPhotoUrl: false,
  type: "",
  connected: false,
  authorized: false,
  verified: false,
  errorMsg: "",
  screenMode: DEFAULT_SCREEN_MODE,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_UID":
    return {
      ...state,
      networkId: action.payload.uid,
    };
    case "UPDATE_PHONE_NUMBER":
    return {
      ...state,
      networkId: action.payload.phoneNumber,
    };
    case "UPDATE_IS_CONNECTED":
    return {
      ...state,
      networkId: action.payload.connected,
    };
    case "UPDATE_SCREEN_MODE":
    return {
      ...state,
      screenMode: action.payload.screenMode,
    };
    case "UPDATE_ADVERTISE_ACCOUNT":
    return {
      ...state,
      showAdvertise: action.payload.showAdvertise,
    };
    case "UPDATE_ADVERTISE_SESSION_ACCOUNT":
    return {
      ...state,
      showAdvertiseSession: action.payload.showAdvertiseSession,
    };
    case "UPDATE_USER_ACCOUNT":
    return {
      ...state,
      phoneNumber: action.payload.phoneNumber,
      connected: action.payload.connected,
    };
    case "UPDATE_USER":
      return {
        ...state,
        loading: false,
        editingPhotoUrl:false,
        uid: action.payload.uid,
        phoneNumber: action.payload.phoneNumber,
        photoURL: action.payload.photoURL,
        type: action.payload.type,
        connected: action.payload.connected,
        //screenMode: action.payload.screenMode,
        authorized: action.payload.authorized,
        verified: action.payload.verified,
      };
    case "CONNECTION_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "CONNECTION_FAILED":
      return {
        ...state,
        loading: false,
        errorMsg: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
