import defaultTheme from "../themes/default";
import MikuGreenTheme from "../themes/mikugreen";
import TootBlueTheme from "../themes/tootblue";
import DarkTheme from "../themes/dark";

export function settingTheme(updateTheme, value){
    switch (value){
        case "mikugreen":
            updateTheme(MikuGreenTheme);
            return;
        case "tootblue":
            updateTheme(TootBlueTheme);
            return;
        case "dark":
            updateTheme(DarkTheme);
            return;
        default:
            updateTheme(defaultTheme);
            return;
    }
}