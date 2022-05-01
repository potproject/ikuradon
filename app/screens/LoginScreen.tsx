import React, { useState, useContext } from "react";
import { Platform, Text, StyleSheet, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Input, Button } from "react-native-elements";
import t from "../services/I18n";
import { ThemeContext } from "react-native-elements";

import KeyboardSpacer from "react-native-keyboard-spacer";

import { useDispatch } from "react-redux";

import { login, loginWithAccessToken } from "../actions/actioncreators/login";

function LoginScreen() {
    const dispatch = useDispatch();
    const { theme } = useContext(ThemeContext);
    const [domain, setDomain] = useState("mastodon.social");
    const [accessToken, setAccessToken] = useState("");
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{t("login_message")}</Text>
            <Input
                onChangeText={text => setDomain(text)}
                value={domain}
                label={t("login_domain_label")}
                leftIcon={
                    <FontAwesome5 name='mastodon' size={24} color={theme.colors.primary} />
                }
            />
            { Platform.OS !== "web" && <Button style={styles.button} onPress={() => dispatch(login(domain))} title={t("login_button")} />}
            <Input
                onChangeText={text => setAccessToken(text)}
                value={accessToken}
                label={t("login_token_label")}
                leftIcon={
                    <FontAwesome5
                        name='key'
                        size={24}
                        color={theme.colors.primary}
                    />
                }
            />
            <Button style={styles.button} onPress={() => dispatch(loginWithAccessToken(domain, accessToken))} title={t("login_token_button")} />
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
    },
    button: {
        marginTop: 5,
        marginBottom: 10
    }
});

export default LoginScreen;
