import React, { useState } from "react";
import { Platform, Text, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input, Button } from "react-native-elements";
import t from "../services/I18n";
import KeyboardSpacer from "react-native-keyboard-spacer";

import { useDispatch } from "react-redux";

import { login } from "../actions/actioncreators/login";

function LoginScreen() {
    const dispatch = useDispatch();
    const [domain, setDomain] = useState("mastodon.social");
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{t("login_message")}</Text>
            <Input
                onChangeText={text => setDomain(text)}
                value={domain}
                label={t("login_domain_label")}
                leftIcon={
                    <Icon
                        name='user'
                        size={24}
                        color='#FF3300'
                    />
                }
            />
            <Button onPress={() => dispatch(login(domain))} title={t("login_button")} />
            { Platform.OS === "ios" && <KeyboardSpacer /> }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 20,
        paddingRight: 20,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        marginTop: 10,
        marginBottom: 10,
        fontSize: 14,
        color: "#8899a6",
    }
});

export default LoginScreen;
