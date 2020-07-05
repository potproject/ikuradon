import { Notifications } from "expo";
import { Platform, Vibration } from "react-native";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
import DropDownHolder from "../services/DropDownHolder";
import Networking from "../services/Networking";

const DefaultPushServerSubscribeEndpoints = "https://salmon.potproject.net/api/v1/subscribe"; 
const DefaultPushServerUnSubscribeEndpoints = "https://salmon.potproject.net/api/v1/unsubscribe"; 

export async function subscribe(domain, accessToken) {
    let granted = await grantNotifications();
    if(!granted){
        return;
    }
    let expoToken = await Notifications.getExpoPushTokenAsync();
    try{
        await Networking.pushServer(DefaultPushServerSubscribeEndpoints, domain, expoToken, accessToken);
        DropDownHolder.success("Notification Setting Success!", "Subscribed to " + DefaultPushServerSubscribeEndpoints); 
    }catch(e){
        DropDownHolder.error("Notification Setting Error!", e.message); 
    }
    if (Platform.OS === "android") {
        Notifications.createChannelAndroidAsync("default", {
            name: "default",
            sound: true,
            priority: "max",
            vibrate: [0, 250, 250, 250],
        });
    }
    pull();
}

export async function unsubscribe(domain, accessToken) {
    let granted = await grantNotifications();
    if(!granted){
        return;
    }
    let expoToken = await Notifications.getExpoPushTokenAsync();
    try{
        await Networking.pushServer(DefaultPushServerUnSubscribeEndpoints, domain, expoToken, accessToken);
        DropDownHolder.success("Notification Setting Success!", "unsubscribed to " + DefaultPushServerUnSubscribeEndpoints); 
    }catch(e){
        DropDownHolder.error("Notification Setting Error!", e.message); 
    }
    if (Platform.OS === "android") {
        Notifications.createChannelAndroidAsync("default", {
            name: "default",
            sound: true,
            priority: "max",
            vibrate: [0, 250, 250, 250],
        });
    }
    pull();
}

async function grantNotifications(){
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
    Notifications.addListener(notification => {
        if(notification && notification.data && typeof notification.data.title === "string" && typeof notification.data.body === "string"){
            Vibration.vibrate();
            DropDownHolder.success(notification.data.title, notification.data.body);
        }
    });
}