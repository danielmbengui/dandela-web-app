import Country from "./classes/CountryClass";
import Currency from "./classes/CurrencyClass";

export const COMPANY_NAME = 'Dandela';
export const APP_NAME = 'Dandela Web App';
export const DEFAULT_SCREEN_MODE = 'light';
export const COLLECTION_USER = 'USER';
export const COLLECTION_USER_TYPE = 'USER_TYPE';
export const COLLECTION_TRANSFERT = 'TRANSFERT';
export const COLLECTION_COUNTRY = 'COUNTRY';
export const COLLECTION_CURRENCY = 'CURRENCY';

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

/* --------------- STORAGE -------------- */
export const STORAGE_UID = 'uid';
export const STORAGE_PHONE_NUMBER = 'phoneNumber';
export const STORAGE_DISPLAY_NAME = 'displayName';
export const STORAGE_PROFIL_PHOTO_URL = 'profilPhotoURL';
export const STORAGE_IS_CONNECTED = 'isConnected';

export const STORAGE_SCREEN_MODE = 'screenMode';
