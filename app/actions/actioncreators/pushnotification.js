import * as Notifications from "expo-notifications";
import DropDownHolder from "../../services/DropDownHolder";
import { grantNotifications } from "../../util/push";
import Networking from "../../services/Networking";
import * as PushNotification from "../actiontypes/pushnotification";

const DefaultPushServer = "salmon.potproject.net";
const PushServerSubscribeEndpoints = "/api/v1/subscribe"; 
const PushServerUnSubscribeEndpoints = "/api/v1/unsubscribe"; 

export function subscribe(domain, accessToken, server = DefaultPushServer){
    const uniq = `${domain}:${accessToken}`;
    return async dispatch => {
        let granted = await grantNotifications();
        if (!granted){
            return;
        }
        let { data : expoToken } = await Notifications.getExpoPushTokenAsync();
        try {
            const endpoints = `https://${server}${PushServerSubscribeEndpoints}`;
            let data = await Networking.pushServer(endpoints, domain, expoToken, accessToken);
            if (data && data.data && typeof data.data.subscribe_id === "string"){
                dispatch({ 
                    type: PushNotification.PUSHNOTIFICATION_SUBSCRIBE,
                    id: uniq,
                    subscribeID: data.data.subscribe_id,
                    expoToken,
                    accessToken,
                    server
                });
                DropDownHolder.success("Notification Setting Success!", "Subscribed to " + endpoints); 
            } else {
                throw new Error("Invalid Server Param.");
            }
        } catch (e){
            DropDownHolder.error("Notification Setting Error!", e.message); 
        }
    };
};

export function unsubscribe(domain, accessToken, server = DefaultPushServer){
    const uniq = `${domain}:${accessToken}`;
    return async dispatch => {
        let granted = await grantNotifications();
        if (!granted){
            return;
        }
        let { data : expoToken } = await Notifications.getExpoPushTokenAsync();
        try {
            const endpoints = `https://${server}${PushServerUnSubscribeEndpoints}`;
            await Networking.pushServer(endpoints, domain, expoToken, accessToken);
            dispatch({ 
                type: PushNotification.PUSHNOTIFICATION_UNSUBSCRIBE,
                id: uniq
            });
            DropDownHolder.success("Notification Setting Success!", "unsubscribed to " + endpoints); 
        } catch (e){
            DropDownHolder.error("Notification Setting Error!", e.message); 
        }
    };
}