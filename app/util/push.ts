import * as Notifications from "expo-notifications";
import { Platform, Vibration } from "react-native";
import Constants from "expo-constants";
import DropDownHolder from "../services/DropDownHolder";

export async function grantNotifications(){
    if (Constants.isDevice && (Platform.OS === "ios" || Platform.OS === "android")) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
            const { status } = await Notifications.requestPermissionsAsync();
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
        Notifications.setNotificationChannelAsync("default", {
            name: "default",
            sound: "default",
            importance: Notifications.AndroidImportance.DEFAULT,
            vibrationPattern: [0, 250, 250, 250],
        });
    }
    Notifications.addNotificationReceivedListener(notification => {
        if (notification && notification.request && notification.request.content && typeof notification.request.content.title === "string" && typeof notification.request.content.body === "string"){
            Vibration.vibrate();
            DropDownHolder.success(notification.request.content.title, notification.request.content.body);
        }
    });
}