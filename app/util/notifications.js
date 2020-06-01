import { Notifications } from 'expo';
import { Platform, Vibration } from "react-native";
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import DropDownHolder from '../services/DropDownHolder';

export async function setup() {
    let token = "";
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
        token = await Notifications.getExpoPushTokenAsync();
        DropDownHolder.info('Getting Expo Token', token);
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
        Vibration.vibrate();
        console.log(notification.data);
        DropDownHolder.success(JSON.stringify(notification));
    });
}