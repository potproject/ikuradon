import lang_en_US from "../lang/en-US";
import lang_ja_JP from "../lang/ja-JP";
import * as Localization from "expo-localization";
import i18n from "i18n-js";

i18n.translations = {
    en: lang_en_US,
    ja: lang_ja_JP,
};
i18n.locale = Localization.locale;
i18n.fallbacks = true;

export default function t(key){
    return i18n.t(key);
}