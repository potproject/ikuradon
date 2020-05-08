import * as React from "react";
import MainScreen from "../screens/MainScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import t from "../services/I18n";
import * as RouterName from "../constants/RouterName";

const Tab = createBottomTabNavigator();

export default function MainNavigator() {
    return (
        <Tab.Navigator>
            <Tab.Screen name={RouterName.Main_Home} component={MainScreen} options={{ title: t("navigation_home")}} />
            <Tab.Screen name={RouterName.Main_Local} component={MainScreen} options={{ title: t("navigation_local")}} />
            <Tab.Screen name={RouterName.Main_Federal} component={MainScreen} options={{ title: t("navigation_federal")}} />
            <Tab.Screen name={RouterName.Main_Notifications} component={MainScreen} options={{ title: t("navigation_notifications")}} />
            <Tab.Screen name={RouterName.Main_Setting} component={MainScreen} options={{ title: t("navigation_setting")}} />
        </Tab.Navigator>
    );
}
