import lang_en_US from "../lang/en-US";
import lang_ja_JP from "../lang/ja-JP";
import * as Localization from "expo-localization";
import Moment from "moment/min/moment-with-locales";
import i18n from "i18n-js";

i18n.translations = {
    en: lang_en_US,
    ja: lang_ja_JP,
};
i18n.locale = Localization.locale;
i18n.fallbacks = true;
Moment.locale(Localization.locale, {
    relativeTime : {
        s  : "1s",
        ss : "%ds",
        m:  "1m",
        mm: "%dm",
        h:  "1h",
        hh: "%dh",
        d:  "1d",
        dd: "%dd",
        w:  "1w",
        ww: "%dw",
        M:  "1m",
        MM: "%dm",
        y:  "1y",
        yy: "%dy"
    }
});

export default function t(key){
    return i18n.t(key);
}