import Expo from "expo";

export default class Font {
    static async init() {
        await Expo.Font.loadAsync({
            /* custom font
            // Using font this:<Text style={{ fontFamily: 'Roboto', fontSize: 12 }}>
            "Roboto": require("native-base/Fonts/Roboto.ttf"),
            "Roboto_medium": require("native-base/Fonts/Roboto_medium.ttf"),
            "Ionicons": require("@expo/vector-icons/fonts/FontAwesome.ttf"),
            */
        });
    }
}