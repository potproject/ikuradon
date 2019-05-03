import { StyleSheet } from "react-native";

export default StyleSheet.create({
    main: {
        paddingTop: 5,
        paddingBottom: 5
    },
    mycolor: {
        backgroundColor: "#cecece66"
    },
    container: {
        flex: 1,
        padding: 4,
        flexDirection: "row",
        paddingTop: 5,
        paddingBottom: 5
    },
    notification: {
        flex: 1,
        flexDirection: "row"
    },
    textarea: {
        flex: 1
    },
    header: {
        flex: 1,
        paddingLeft: 12
    },
    name: {
        fontWeight: "bold",
        fontSize: 16
    },
    acct: {
        color: "#5f5f5f",
        fontSize: 12
    },
    body: {
        flex: 2,
        marginLeft: 12,
        fontSize: 15,
        paddingTop: 3,
        paddingBottom: 3
    },
    link: {
        color: "#2980b9",
        fontSize: 14,
        textDecorationLine: "underline"
    },
    photo: {
        height: 50,
        width: 50
    },
    item: {
        flex: 1,
        marginLeft: 50,
        paddingLeft: 12,
        paddingTop: 0,
        paddingBottom: 0,
        flexDirection: "row"
    },
    itemFlex: {
        flex: 1
    },
    dateFlex: {
        marginLeft: 50,
        paddingLeft: 12,
        paddingTop: 0,
        paddingBottom: 0,
        color: "#5f5f5f",
        fontSize: 12
    }
});
