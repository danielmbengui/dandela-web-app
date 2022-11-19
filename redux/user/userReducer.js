const initialState = {
  loading: false,
  phoneNumber:'',
  isConnected: null,
  screenMode: 'dark',
  errorMsg: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_NETWORK":
    return {
      ...state,
      networkId: action.payload.networkId,
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
      isConnected: action.payload.isConnected,
    };
    case "UPDATE_USER":
      return {
        ...state,
        loading: false,
        phoneNumber: action.payload.phoneNumber,
        isConnected: action.payload.isConnected,
        screenMode: action.payload.screenMode,
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
