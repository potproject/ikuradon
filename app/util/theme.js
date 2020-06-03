import defaultTheme from "../themes/default";
import MikuGreenTheme from "../themes/mikugreen";

export function settingTheme(updateTheme, value){
    switch(value){
        case "mikugreen":
            updateTheme(MikuGreenTheme);
            return;
        default:
            updateTheme(defaultTheme);
            return;
    }
}