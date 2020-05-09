import * as React from "react";
import TimelineScreen from "../screens/TimelineScreen";
import ItemTabBar from "../components/ItemTabBar";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import t from "../services/I18n";
import * as RouterName from "../constants/RouterName";

const Tab = createBottomTabNavigator();

export default function TimelineNavigator() {
    return (
        <Tab.Navigator tabBarOptions={{
            activeTintColor: "#FF3300",
        }}>
            <Tab.Screen name={RouterName.Timeline_Home} component={TimelineScreen} 
                options={{ 
                    tabBarLabel: t("navigation_home"),
                    tabBarIcon: ({ color }) => (<ItemTabBar name={"home"} badgeCount={0} color={color} size={26} />),
                }}
            />
            <Tab.Screen name={RouterName.Timeline_Local} component={TimelineScreen} 
                options={{
                    tabBarLabel: t("navigation_local"),
                    tabBarIcon: ({ color }) => (<ItemTabBar name={"users"} badgeCount={0} color={color} size={22} />),
                }} 
            />
            <Tab.Screen name={RouterName.Timeline_Federal} component={TimelineScreen} 
                options={{
                    tabBarLabel: t("navigation_federal"),
                    tabBarIcon: ({ color }) => (<ItemTabBar name={"globe"} badgeCount={0} color={color} size={26} />),
                }} 
            />
            <Tab.Screen name={RouterName.Timeline_Notifications} component={TimelineScreen} 
                options={{
                    tabBarLabel: t("navigation_notifications"),
                    tabBarIcon: ({ color }) => (<ItemTabBar name={"cogs"} badgeCount={0} color={color} size={22} />),
                }} 
            />
        </Tab.Navigator>
    );
}
