import * as React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Button } from "react-native-elements";

function AppInitScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require("../../assets/image/icon250.png")} />
            <Button
                title="Go to Details"
                onPress={() => {navigation.navigate("Home")}}
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
