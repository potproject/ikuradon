import defaultTheme from "../themes/default";
import MikuGreenTheme from "../themes/mikugreen";
import TootBlueTheme from "../themes/tootblue";
import DarkTheme from "../themes/dark";
import MikuGreenDarkTheme from "../themes/mikugreendark";
import TootBlueDarkTheme from "../themes/tootbluedark";

import * as Storage from "../util/storage";
import * as CONST_Storage from "../constants/storage";

export async function getTheme(){
    const config = await Storage.getItem(CONST_Storage.Config);
    let themeName = "default";
    if (config !== null && typeof config.theme !== "undefined"){
        themeName = config.theme;
    }
    switch (themeName){
        case "mikugreen":
            return MikuGreenTheme;
        case "tootblue":
            return TootBlueTheme;
        case "dark":
            return DarkTheme;
        case "mikugreendark":
            return MikuGreenDarkTheme;
        case "tootbluedark":
            return TootBlueDarkTheme;
        default:
            return defaultTheme;
    }
}