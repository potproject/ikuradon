import * as React from "react";
import TimelineNavigator from "./TimelineNavigator";
import { createDrawerNavigator } from "@react-navigation/drawer";

import DrawerContainer from "./DrawerContainer";
import t from "../services/I18n";
import * as RouterName from "../constants/RouterName";

const Drawer = createDrawerNavigator();

export default function MainNavigator() {
    return (
        <Drawer.Navigator drawerContent={(props) => <DrawerContainer {...props} />}>
            <Drawer.Screen name={RouterName.Timeline} component={TimelineNavigator} options={{ title: t("timeline_title") }} />
        </Drawer.Navigator>
    );
}
