import reactNativeI18n from "ex-react-native-i18n";
import lang_en_US from "./lang/en-US";
import lang_ja_JP from "./lang/ja-JP";

const supported = ["en-US", "ja-JP"];

// TODO ex-react-native-i18nが微妙で、保守もされてなさそうなのでi18next/react-i18nextに変更します
export default class I18n {
    static async init() {
        await reactNativeI18n.initAsync();
        if (!supported.includes(reactNativeI18n.locale)) {
            reactNativeI18n.locale = "en-US";
        }
        //force Set
        //reactNativeI18n.locale = "ja-JP";
    }

    static t(text) {
        return reactNativeI18n.t(text);
    }
}

reactNativeI18n.translations = {
    "en-US": lang_en_US,
    "ja-JP": lang_ja_JP
};

/*
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
        debug: true,
        fallbackLng: "en-US",
        resources: {
            "en-US": { translation: lang_en_US },
            "ja-JP": { translation: lang_ja_JP },
            interpolation: {
                escapeValue: false // not needed for react
            }
        }
    });
export default i18next;*/