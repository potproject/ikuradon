import * as React from "react";
import { Platform, StatusBar, StyleSheet, View, Appearance } from "react-native";
import { ThemeProvider } from "react-native-elements";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { Provider as ReduxProvider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";

import MainNavigator from "./app/navigation/MainNavigator";


import DropdownAlert from "react-native-dropdownalert";
import DropDownHolder from "./app/services/DropDownHolder";

import * as RouterName from "./app/constants/RouterName";

import AppInitScreen from "./app/screens/AppInitScreen";
import LoginScreen from "./app/screens/LoginScreen";
import TimelineScreen from "./app/screens/TimelineScreen";
import TootScreen from "./app/screens/TootScreen";
import SearchScreen from "./app/screens/SearchScreen";
import t from "./app/services/I18n";

import defaultTheme from "./app/themes/default";
import darkTheme from "./app/themes/dark";
import AuthorizeScreen from "./app/screens/AuthorizeScreen";
import NavigationService from "./app/services/NavigationService";
import SettingsScreen from "./app/screens/SettingsScreen";
import SettingsThemesScreen from "./app/screens/SettingsThemesScreen";
import DetailScreen from "./app/screens/DetailScreen";
import ImageViewerScreen from "./app/screens/ImageViewerScreen";
import createStore from "./app/store/store";
import { getTheme } from "./app/util/theme";
const Stack = createStackNavigator();

export default function App(props) {
    const [isLoadingComplete, setLoadingComplete] = React.useState(false);
    const colorScheme = Appearance.getColorScheme();
    const [theme, setTheme] = React.useState(colorScheme === "dark" ? darkTheme : defaultTheme);
    const store = createStore();
    // Load any resources or data that we need prior to rendering the app
    React.useEffect(() => {
        async function loadResourcesAndDataAsync() {
            try {
                // Load fonts
                await Font.loadAsync({
                    ...Ionicons.font,
                    "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf"),
                });
                setTheme(await getTheme());
            } catch (e) {
                // We might want to provide this error information to an error reporting service
                console.warn(e);
            } finally {
                setLoadingComplete(true);
                SplashScreen.hideAsync();
            }
        }

        loadResourcesAndDataAsync();
    }, []);

    if (!isLoadingComplete && !props.skipLoadingScreen) {
        return null;
    } else {
        return (
            <View style={styles.container}>
                <ThemeProvider theme={theme}>
                    <ActionSheetProvider>
                        <ReduxProvider store={store}>
                            <NavigationContainer ref={navigatorRef => {
                                NavigationService.setTopLevelNavigator(navigatorRef);
                            }}>
                                <Stack.Navigator>
                                    <Stack.Screen name={RouterName.AppInit} component={AppInitScreen} options={{ headerShown: false, title: t("appinit_title") }} />
                                    <Stack.Screen name={RouterName.Login} component={LoginScreen} options={{ title: t("login_title") }} />
                                    <Stack.Screen name={RouterName.Authorize} component={AuthorizeScreen} options={{ title: t("authorize_title") }} />
                                    <Stack.Screen name={RouterName.Main} component={MainNavigator} options={{ title: t("timeline_title"), headerShown: false }} />
                                    <Stack.Screen name={RouterName.Favourites} component={TimelineScreen} options={{ headerShown: false }} />
                                    <Stack.Screen name={RouterName.Bookmarks} component={TimelineScreen} options={{ headerShown: false }} />
                                    <Stack.Screen name={RouterName.Settings} component={SettingsScreen} options={{ title: t("settings_title") }} />
                                    <Stack.Screen name={RouterName.Settings_Themes} component={SettingsThemesScreen} options={{ title: t("setting_themes") }} />
                                    <Stack.Screen name={RouterName.Toot} component={TootScreen} options={{ headerShown: false }} />
                                    <Stack.Screen name={RouterName.Detail} component={DetailScreen} options={{ headerShown: false }} />
                                    <Stack.Screen name={RouterName.Search} component={SearchScreen} options={{ headerShown: false }} />
                                </Stack.Navigator>
                            </NavigationContainer>
                            <ImageViewerScreen />
                        </ReduxProvider>
                    </ActionSheetProvider>
                </ThemeProvider>
                <DropdownAlert ref={ref => DropDownHolder.setDropDown(ref)} closeInterval={3000}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
});
