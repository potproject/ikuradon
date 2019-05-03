import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1
    },
    mediaview: {
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 12,
        paddingTop: 3,
        paddingBottom: 3,
        backgroundColor: "#cecece",
        borderRadius: 8
    },
    media: {
        position: "absolute",
        borderRadius: 8
    },
    mediaicon: {
        margin: 5,
        position: "absolute"
    },
    mediaiconSensitive: {
        margin: 20,
        position: "absolute"
    },
    description: {
        margin: 5,
        paddingLeft: 30,
        fontSize: 18,
        position: "absolute"
    }
});