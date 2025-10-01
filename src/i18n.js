import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en/translation.json";
import gu from "./locales/gu/translation.json";
import hi from "./locales/hi/translation.json";
import be from "./locales/be/translation.json";
import te from "./locales/te/translation.json";
import mr from "./locales/mr/translation.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      gu: { translation: gu },
      hi: { translation: hi },
      be: { translation: be },
      te: { translation: te },
      mr: { translation: mr },


    
    },
    lng: "en", // default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;

