import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1
    },
    toottext: {
        height: 150,
        margin: 8,
        padding: 7,
        borderRadius: 4,
        borderWidth: 1,
        backgroundColor: "#FFFFFF"
    },
    warningtext: {
        height: 30,
        margin: 5,
        padding: 5,
        borderWidth: 1
    },
    buttonview: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    tootbuttonview: {
        width: 120,
        height: 40,
        flexDirection: "row"
    },
    button: {
        width: 40,
        height: 40,
        margin: 5,
        alignItems: "center"
    },
    reply: {
        backgroundColor: "#D2E5FF",
        margin: 5,
        padding: 5,
        borderRadius: 5
    },
    replyHeader: {
        alignItems: "center",
        flexDirection: "row",
        height: 26,
        margin: 2
    },
    replyPhoto: {
        margin: 3,
        height: 24,
        width: 24,
        borderRadius: 4
    },
    replyName: {
        width: 26,
        fontSize: 16,
        flex: 1,
        flexWrap: "wrap"
    },
    replyBody: {
        margin: 2,
        paddingTop: 3,
        paddingBottom: 3,
        fontSize: 12
    },
    textcw: {
        fontSize: 24
    },
    textvisibility: {
        fontSize: 12
    },
    textlimit: {
        color: "#2b90d9",
        fontSize: 20
    },
    textlimitwarning: {
        color: "#ff5050",
        fontSize: 20
    },
    tootbutton: {
        width: 60,
        height: 40,
        alignItems: "center",
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#2b90d9",
        backgroundColor: "#2b90d9"
    },
    tootbuttonwaiting: {
        width: 60,
        height: 40,
        alignItems: "center",
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#bfddf3",
        backgroundColor: "#bfddf3"
    },
    texttoot: {
        paddingTop: 5,
        fontSize: 20,
        color: "#FFFFFF"
    },
    mediaScroll: {
        width: 400,
        height: 140
    }
});