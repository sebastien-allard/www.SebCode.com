import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translation_fr from "./locales/fr/translation.json";
import translation_en from "./locales/en/translation.json";

const appLocales = ["fr-CA", "en-CA"];
const appResources = {
    fr: { translation: translation_fr },
    en: { translation: translation_en },
}

function init() {
    var preferedLanguage = getPreferedLanguageWithLocale();
    setCurrentLanguageInternal(preferedLanguage);

    i18n
        .use(initReactI18next) // passes i18n down to react-i18next
        .init({
            resources: appResources,
            lng: preferedLanguage,
            fallbackLng: appLocales[0],
            debug: false,
            keySeparator: false, // we do not use keys in form messages.welcome
            interpolation: {
                escapeValue: false // react already safes from xss
            }
        });
}

export function getCurrentLanguage() {
    if (i18n.language.startsWith("en")) {
        return "en";
    }
    else {
        return "fr";
    }
}

export function getCurrentLanguageWithLocale() {
    return i18n.language;
}

function getPreferedLanguageWithLocale() {
    // Define user's language. Different browsers have the user locale defined
    // on different fields on the `navigator` object, so we make sure to account
    // for these different by checking all of them
    var language =
        localStorage.getItem("language") || 
        (navigator.languages && navigator.languages[0]) ||
        navigator.language ||
        navigator.userLanguage;

    // Split locales with a region code
    const languageTokens = language.toLowerCase().split(/[_-]+/);
    if (languageTokens.length === 2) {
        languageTokens[1] = languageTokens[1].toUpperCase();
    }

    language = languageTokens.join("-");

    // Try full locale, try locale without region code, fallback to 'fr-CA'
    if (appLocales.includes(language))
        return language;

    if (!appLocales.includes(languageTokens[0] + "-CA"))
        return appLocales[0];

    return languageTokens[0] + "-CA";
}

export function setCurrentLanguage(language) {
    i18n.changeLanguage(language);
    setCurrentLanguageInternal(language);
}

function setCurrentLanguageInternal(language) {
    localStorage.setItem("language", language);
    document.cookie = "accept-language=" + language
        + ";domain=" + window.location.hostname + ";path=/";
}

export function switchLanguage() {
    if (i18n.language.startsWith("fr")) {
        setCurrentLanguage('en-CA');
    }
    else {
        setCurrentLanguage('fr-CA');
    }
}

init();
export default i18n;