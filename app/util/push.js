import { Notifications } from 'expo';
import { Platform, Vibration } from "react-native";
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import DropDownHolder from '../services/DropDownHolder';
import Networking from '../services/Networking';

const DefaultPushServerSubscribeEndpoints = "https://salmon.potproject.net/api/v1/subscribe"; 

export async function setup(domain, accessToken) {
    if (Constants.isDevice && (Platform.OS === "ios" || Platform.OS === "android")) {
        const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            DropDownHolder.error('Notification Setting Error!', 'Failed to get push token for push notification!');
            return;
        }
        let expoToken = await Notifications.getExpoPushTokenAsync();
        try{
            const res = await Networking.pushSubscribe(DefaultPushServerSubscribeEndpoints, domain, expoToken, accessToken);
            DropDownHolder.success('Notification Setting Success!', "Subscribed to " + DefaultPushServerSubscribeEndpoints); 
        }catch(e){
            DropDownHolder.error('Notification Setting Error!', e.message); 
        }
    } else {
        DropDownHolder.error('Notification Setting Error!', 'Unsupported Devices!');
        return;
    }

    if (Platform.OS === 'android') {
        Notifications.createChannelAndroidAsync('default', {
            name: 'default',
            sound: true,
            priority: 'max',
            vibrate: [0, 250, 250, 250],
        });
    }
    pull();
}

export function pull() {
    Notifications.addListener(notification => {
        if(typeof notification.title === "string" && typeof notification.body === "string"){
            Vibration.vibrate();
            DropDownHolder.success(notification.title, notification.body);
        }
    });
}