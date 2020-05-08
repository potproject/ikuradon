import * as React from "react";
import MainScreen from "../screens/MainScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

export default function HomeNavigator() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="MainScreenA" component={MainScreen} />
            <Tab.Screen name="MainScreenB" component={MainScreen} />
        </Tab.Navigator>
    );
}
