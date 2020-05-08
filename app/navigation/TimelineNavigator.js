import * as React from "react";
import TimelineScreen from "../screens/TimelineScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import t from "../services/I18n";
import * as RouterName from "../constants/RouterName";

const Tab = createBottomTabNavigator();

export default function TimelineNavigator() {
    return (
        <Tab.Navigator>
            <Tab.Screen name={RouterName.Timeline_Home} component={TimelineScreen} options={{ title: t("navigation_home")}} />
            <Tab.Screen name={RouterName.Timeline_Local} component={TimelineScreen} options={{ title: t("navigation_local")}} />
            <Tab.Screen name={RouterName.Timeline_Federal} component={TimelineScreen} options={{ title: t("navigation_federal")}} />
            <Tab.Screen name={RouterName.Timeline_Notifications} component={TimelineScreen} options={{ title: t("navigation_notifications")}} />
        </Tab.Navigator>
    );
}
