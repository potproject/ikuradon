import { Linking } from "react-native";

export async function open(url) {
    try {
        let supported = await Linking.canOpenURL(url);
        if (supported) {
            await Linking.openURL(url);
        } else {
            console.log("not supported url");
        }
    } catch (e) {
        console.error("Linking error", e);
    }
}