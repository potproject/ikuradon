import * as React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { ThemeProvider } from "react-native-elements";
import { SplashScreen } from "expo";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeNavigator from "./app/navigation/HomeNavigator";
import { useLinking } from "@react-navigation/native";

import reducers from "./app/reducers";
import { createMiddleware } from "./app/middleware";
import AppInitScreen from "./app/screens/AppInitScreen";

const Stack = createStackNavigator();

export default function App(props) {
    const [isLoadingComplete, setLoadingComplete] = React.useState(false);
    const [initialNavigationState, setInitialNavigationState] = React.useState();
    const containerRef = React.useRef();
    const { getInitialState } = useLinking(containerRef, {});
    const store = createStore(reducers, applyMiddleware(...createMiddleware()));
    // Load any resources or data that we need prior to rendering the app
    React.useEffect(() => {
        async function loadResourcesAndDataAsync() {
            try {
                SplashScreen.preventAutoHide();

                // Load our initial navigation state
                setInitialNavigationState(await getInitialState());

                // Load fonts
                await Font.loadAsync({
                    ...Ionicons.font,
                    "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf"),
                });
            } catch (e) {
                // We might want to provide this error information to an error reporting service
                console.warn(e);
            } finally {
                setLoadingComplete(true);
                SplashScreen.hide();
            }
        }

        loadResourcesAndDataAsync();
    }, []);

    if (!isLoadingComplete && !props.skipLoadingScreen) {
        return null;
    } else {
        return (
            <View style={styles.container}>
                <ThemeProvider>
                    <Provider store={store}>
                        {Platform.OS === "ios" && <StatusBar barStyle="default" />}
                        <NavigationContainer ref={containerRef} initialState={initialNavigationState}>
                            <Stack.Navigator>
                                <Stack.Screen name="AppInit" component={AppInitScreen} />
                                <Stack.Screen name="Home" component={HomeNavigator} />
                            </Stack.Navigator>
                        </NavigationContainer>
                    </Provider>
                </ThemeProvider>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
});
