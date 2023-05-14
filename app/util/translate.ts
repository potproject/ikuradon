import * as Localization from "expo-localization";
import { open as openUrl } from "./url";

export function openGoogleTranslateLink(text: string) {
    const locale = Localization.locale;
    const url = `https://translate.google.com/?sl=auto&tl=${locale}&text=${text}&op=translate`;
    openUrl(url);
}