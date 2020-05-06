import * as React from "react";
import AppInitScreen from "../screens/AppInitScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

export default function HomeNavigator() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="AppInitScreenA" component={AppInitScreen} />
            <Tab.Screen name="AppInitScreenB" component={AppInitScreen} />
        </Tab.Navigator>
    );
}
