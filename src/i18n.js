import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en/translation.json";
import gu from "./locales/gu/translation.json";
import hi from "./locales/hi/translation.json";
import be from "./locales/be/translation.json";
import te from "./locales/te/translation.json";
import mr from "./locales/mr/translation.json";
import ta from "./locales/ta/translation.json";
import ka from "./locales/ka/translation.json";
import ma from "./locales/ma/translation.json";
import pu from "./locales/pu/translation.json";
import od from "./locales/od/translation.json";
import as from "./locales/as/translation.json";
import ur from "./locales/ur/translation.json";

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
      ta: { translation: ta },
      ka: { translation: ka },
      ma: { translation: ma },
      pu: { translation: pu },
      od: { translation: od },
      as: { translation: as },
      ur: { translation: ur },
    
    },
    lng: "en", // default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;

