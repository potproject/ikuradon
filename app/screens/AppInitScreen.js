import * as React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Button } from "react-native-elements";
import * as RouterName from "../constants/RouterName";

function AppInitScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require("../../assets/image/icon250.png")} />
            <Button
                title="Go to Details"
                onPress={() => {navigation.navigate(RouterName.Login)}}
            />
        </View>
    );
}

AppInitScreen.navigationOptions = {
    header: null
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    logo: {
        width: 100,
        height: 100,
    },
});

export default AppInitScreen;
