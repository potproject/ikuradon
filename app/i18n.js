import lang_en_US from "./lang/en-US";
import lang_ja_JP from "./lang/ja-JP";
import Expo from "expo";

import i18next from "i18next";
import { reactI18nextModule } from "react-i18next";

const languageDetector = {
    type: "languageDetector",
    async: true, // async detection
    detect: (callback) => {
        return Expo.Util.getCurrentLocaleAsync().then(lng => { callback(lng) });
    },
    init: () => { },
    cacheUserLanguage: () => { }
};

i18next
    .use(languageDetector)
    .use(reactI18nextModule)
    .init({
        fallbackLng: "en-US",
        resources: {
            "en-US": { translation: lang_en_US },
            "ja-JP": { translation: lang_ja_JP },
            interpolation: {
                escapeValue: false // not needed for react
            }
        }
    });
export default i18next;