import { DEFAULT_LANGAGE, DEFAULT_SCREEN_MODE, STORAGE_LANGAGE, STORAGE_SCREEN_MODE } from "../../constants";

export function getScreenModeStorage() {
    let _screenMode = DEFAULT_SCREEN_MODE;
    if (typeof (Storage) !== "undefined") {
        if (window.localStorage.getItem(STORAGE_SCREEN_MODE)) {
            _screenMode = window.localStorage.getItem(STORAGE_SCREEN_MODE);
        }
    }
    return (_screenMode);
}

export function updateScreenModeStorage(_screenMode) {
    if (typeof (Storage) !== "undefined") {
        window.localStorage.setItem(STORAGE_SCREEN_MODE, _screenMode);
    }
}

export function getLangageStorage() {
    let _langage = DEFAULT_LANGAGE;
    if (typeof (Storage) !== "undefined") {
        if (window.localStorage.getItem(STORAGE_LANGAGE)) {
            _langage = window.localStorage.getItem(STORAGE_LANGAGE);
        }
    }
    return (_langage);
}

export function updateLangageStorage(_langage) {
    if (typeof (Storage) !== "undefined") {
        window.localStorage.setItem(STORAGE_LANGAGE, _langage);
    }
}

