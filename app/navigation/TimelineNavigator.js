import * as React from "react";
import TimelineScreen from "../screens/TimelineScreen";
import ItemTabBar from "../components/ItemTabBar";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSelector } from "react-redux";

const MainReducerSelector = state => state.mainReducer;

import t from "../services/I18n";
import * as RouterName from "../constants/RouterName";

const Tab = createBottomTabNavigator();

export default function TimelineNavigator() {
    const { home, local, federal, notifications } = useSelector(MainReducerSelector);
    return (
        <Tab.Navigator tabBarOptions={{
            activeTintColor: "#FF3300",
        }}>
            <Tab.Screen name={RouterName.Timeline_Home} component={TimelineScreen} 
                options={{ 
                    tabBarLabel: t("navigation_home"),
                    tabBarIcon: ({ color }) => (<ItemTabBar name={"home"} badgeCount={home.newArrival} color={color} size={26} />),
                }}
            />
            <Tab.Screen name={RouterName.Timeline_Local} component={TimelineScreen} 
                options={{
                    tabBarLabel: t("navigation_local"),
                    tabBarIcon: ({ color }) => (<ItemTabBar name={"users"} badgeCount={local.newArrival} color={color} size={22} />),
                }} 
            />
            <Tab.Screen name={RouterName.Timeline_Federal} component={TimelineScreen} 
                options={{
                    tabBarLabel: t("navigation_federal"),
                    tabBarIcon: ({ color }) => (<ItemTabBar type={"federal"} name={"globe"} badgeCount={federal.newArrival} color={color} size={26} />),
                }} 
            />
            <Tab.Screen name={RouterName.Timeline_Notifications} component={TimelineScreen} 
                options={{
                    tabBarLabel: t("navigation_notifications"),
                    tabBarIcon: ({ color }) => (<ItemTabBar name={"cogs"} badgeCount={notifications.newArrival} color={color} size={22} />),
                }} 
            />
        </Tab.Navigator>
    );
}
