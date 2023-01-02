import Country from "./classes/CountryClass";
import Currency from "./classes/CurrencyClass";

export const COMPANY_NAME = 'Dandela';
export const APP_NAME = 'Dandela Web App';
export const DEFAULT_SCREEN_MODE = 'light';
export const DEFAULT_LANGAGE = 'fr';
export const LANGAGE_FRENCH = 'fr';
export const LANGAGE_ENGLISH = 'en';
export const LANGAGE_PORTUGUESE = 'pt';

export const PAGE_LINK_HOME = "/";
export const PAGE_LINK_ERROR_LOGIN = "/app/authentication/errorlogin";
export const PAGE_LINK_ERROR_FIREBASE = "/app/authentication/errorfirebase";
export const PAGE_LINK_PROFILE = "/app/dashboard/profile";
export const PAGE_LINK_SETTINGS = "/app/dashboard/settings";
export const PAGE_LINK_NEW_TRANSFER = "/app/dashboard/transfers/new";
export const PAGE_LINK_INPROGRESS_LIST = "/app/dashboard/transfers/lists/inprogress";

export const NAMESPACE_LANGAGE_COMMON = 'common';
export const NAMESPACE_LANGAGE_PROFILE = 'profile';
export const NAMESPACE_LANGAGE_NEW_TRANSFER = 'transferts/new';
export const NAMESPACE_LANGAGE_INPROGRESS_LIST = 'transferts/inprogress';

export const COLLECTION_USER = 'USER';
export const COLLECTION_USER_TYPE = 'USER_TYPE';
export const COLLECTION_TRANSFERT = 'TRANSFERT';
export const COLLECTION_COUNTRY = 'COUNTRY';
export const COLLECTION_CURRENCY = 'CURRENCY';
export const COLLECTION_PERCENT = 'PERCENT';

export const DEFAULT_PERCENT = {
    uid: '',
    name: '',
    symbol: '',
};
export const DEFAULT_CURRENCY = {
    uid: '',
    name: '',
    symbol: '',
};
export const DEFAULT_COUNTRY = {
    uid: '',
    name: '',
    code: '',
    symbol: '',
    currency_uid: '',
    currency: new Currency({}),
};
export const DEFAULT_USER = {
    uid: '',
    phoneNumber: '',
    displayName: '',
    photoURL: '',
    profilPhotoURL: '',
    country_uid: '',
    country: new Country({}),
    type: '',
    verified: false,
    connected: false,
    authorized: false,
};
export const DEFAULT_TRANSFERT = {
    id: '',
    code: '',
    destinataire: '',
    montant: 0,
    recu_destinataire: false,
    recu_expediteur: false,
    recu_agence: false,
    state: '',
    valide: false,
};
export const USER_TYPE_ADMIN = "Admin";
export const USER_TYPE_EMPLOYE_ANGOLA = "Employé Angola";
export const USER_TYPE_EMPLOYE_EUROPE = "Employé Europe";
export const USER_TYPE_CLIENT = "Client";
export const USER_LINK_PHOTO_URL = "/profil";
export const TRANSFERT_STATE_NO_VALID = "Non valide";
export const TRANSFERT_STATE_IN_PROGRESS = "En cours";
export const TRANSFERT_STATE_FINISHED = "Terminé";

export const PERCENT_0 = 0;
export const PERCENT_5 = 0.05;
export const PERCENT_10 = 0.10;
export const PERCENT_15 = 0.15;
/* --------------- STORAGE -------------- */
export const STORAGE_UID = 'uid';
export const STORAGE_PHONE_NUMBER = 'phoneNumber';
export const STORAGE_DISPLAY_NAME = 'displayName';
export const STORAGE_PROFIL_PHOTO_URL = 'profilPhotoURL';
export const STORAGE_IS_CONNECTED = 'isConnected';

export const STORAGE_SCREEN_MODE = 'screenMode';
export const STORAGE_LANGAGE = 'lang';
