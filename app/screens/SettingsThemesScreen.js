import React, { useContext } from "react";
import { Text, StyleSheet, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { ListItem, Icon, ThemeContext, withTheme } from "react-native-elements";
import t from "../services/I18n";

import { setTheme } from "../actions/actioncreators/config";
import { settingTheme } from "../util/theme";
const reducerSelector =  state => ({
    config: state.configReducer
});

function SettingsThemesScreen({ updateTheme }) {
    const dispatch = useDispatch();
    const { config } = useSelector(reducerSelector);
    const { theme }  = useContext(ThemeContext);
    return (
        <View style={styles.container}>
            <Text style={[{ color: theme.colors.grey0 }, styles.label]}>{t("setting_themes_light")}</Text>
            <ListItem
                bottomDivider
                onPress={()=>{
                    settingTheme(updateTheme, "default");
                    dispatch(setTheme("default"));
                }}
            >
                <ListItem.Content>
                    <ListItem.Title>{t("themes.default")}</ListItem.Title>
                </ListItem.Content>
                <Icon name={"check"} color={config.theme === "default" ? theme.colors.primary : "#FFFFFF"} />
            </ListItem>
            <ListItem
                bottomDivider
                onPress={()=>{
                    settingTheme(updateTheme, "mikugreen");
                    dispatch(setTheme("mikugreen"));
                }}
            >
                <ListItem.Content>
                    <ListItem.Title>{t("themes.mikugreen")}</ListItem.Title>
                </ListItem.Content>
                <Icon name={"check"} color={config.theme === "mikugreen" ? theme.colors.primary : "#FFFFFF"} />
            </ListItem>
            <ListItem
                bottomDivider
                onPress={()=>{
                    settingTheme(updateTheme, "tootblue");
                    dispatch(setTheme("tootblue"));
                }}
            >
                <ListItem.Content>
                    <ListItem.Title>{t("themes.tootblue")}</ListItem.Title>
                </ListItem.Content>
                <Icon name={"check"} color={config.theme === "tootblue" ? theme.colors.primary : "#FFFFFF"} />
            </ListItem>
            <Text style={[{ color: theme.colors.grey0 }, styles.label]}>{t("setting_themes_dark")}</Text>
            <ListItem
                bottomDivider
                onPress={()=>{
                    settingTheme(updateTheme, "dark");
                    dispatch(setTheme("dark"));
                }}
            >
                <ListItem.Content>
                    <ListItem.Title>{t("themes.dark")}</ListItem.Title>
                </ListItem.Content>
                <Icon name={"check"} color={config.theme === "dark" ? theme.colors.primary : "#FFFFFF"} />
            </ListItem>
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
