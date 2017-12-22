import reactNativeI18n from "ex-react-native-i18n";
import lang_en_US from "./lang/en-US";
import lang_ja_JP from "./lang/ja-JP";
import Moment from "moment/min/moment-with-locales";

const supported = ["en-US", "ja-JP"];

export default class I18n {
    static async init() {
        await reactNativeI18n.initAsync();
        if (!supported.includes(reactNativeI18n.locale)) {
            reactNativeI18n.locale = "en-US";
        }
        Moment.locale(reactNativeI18n.locale);
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
}