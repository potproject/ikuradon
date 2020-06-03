import React, { useContext } from "react";
import { Text, StyleSheet, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { ListItem, ThemeContext, withTheme } from "react-native-elements";
import t from "../services/I18n";

import { setTheme } from "../actions/actioncreators/config";
import { settingTheme } from "../util/theme";
const reducerSelector =  state => ({
    config: state.configReducer
});

function SettingsThemesScreen({updateTheme}) {
    const dispatch = useDispatch();
    const { config } = useSelector(reducerSelector);
    const { theme }  = useContext(ThemeContext);
    return (
        <View style={styles.container}>
            <Text style={[{color: theme.colors.grey0},styles.label]}>{t("setting_themes_light")}</Text>
            <ListItem
                title={t("themes.default")}
                rightIcon={{ name: "check", color: config.theme === "default" ? theme.colors.primary : "#FFFFFF" }}
                bottomDivider
                onPress={()=>{
                    settingTheme(updateTheme, "default");
                    dispatch(setTheme("default"));
                }}
            />
            <ListItem
                title={t("themes.mikugreen")}
                rightIcon={{ name: "check", color: config.theme === "mikugreen" ? theme.colors.primary : "#FFFFFF" }}
                bottomDivider
                onPress={()=>{
                    settingTheme(updateTheme, "mikugreen");
                    dispatch(setTheme("mikugreen"));
                }}
            />
            <Text style={[{color: theme.colors.grey0},styles.label]}>{t("setting_themes_dark")}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    label: {
        fontWeight: "bold",
        fontSize: 16,
        paddingTop: 15,
        paddingLeft: 15,
        paddingRight: 10,
        paddingBottom: 10,
    }
});

export default withTheme(SettingsThemesScreen);
