import { settingTheme } from "../../util/theme";

describe("Util/Theme", () => {
    it("settingTheme", done => {
        const updateTheme = () => done();
        settingTheme(updateTheme, "mikugreen");
        settingTheme(updateTheme, "tootblue");
        settingTheme(updateTheme, "dark");
        settingTheme(updateTheme, "mikugreendark");
        settingTheme(updateTheme, "tootbluedark");
        settingTheme(updateTheme, "defualt");
    });
});