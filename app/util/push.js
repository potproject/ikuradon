import { Notifications } from "expo";
import { Platform, Vibration } from "react-native";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
import DropDownHolder from "../services/DropDownHolder";

export async function grantNotifications(){
    if (Constants.isDevice && (Platform.OS === "ios" || Platform.OS === "android")) {
        const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }
        if (finalStatus !== "granted") {
            DropDownHolder.error("Notification Setting Error!", "Failed to get push token for push notification!");
            return false;
        }
        return true;
    } else {
        DropDownHolder.error("Notification Setting Error!", "Unsupported Devices!");
        return false;
    }
}

export function pull() {
    if (Platform.OS === "android") {
        Notifications.createChannelAndroidAsync("default", {
            name: "default",
            sound: true,
            priority: "max",
            vibrate: [0, 250, 250, 250],
        });
    }
    Notifications.addListener(notification => {
        if (notification && notification.data && typeof notification.data.title === "string" && typeof notification.data.body === "string"){
            Vibration.vibrate();
            DropDownHolder.success(notification.data.title, notification.data.body);
        }
    });
}