import { StyleSheet } from "react-native";
import Dimensions from "Dimensions";

export default StyleSheet.create({
    button: {
        margin: 20
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    textinput: {
        height: 40,
        width: Dimensions.get("window").width - 20,
        borderColor: "gray",
        borderWidth: 1,
        margin: 10,
        padding: 2
    },
    textinputAccessToken: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        margin: 10,
        padding: 2
    },
    text: {
        fontSize: 14,
        textAlign: "center",
        margin: 10
    },
    space: {
        height: 15
    },
    image: {
        width: 75,
        height: 75,
        marginTop: 0,
        marginBottom: 25
    }
});