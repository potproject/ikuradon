import React, { useState, useContext } from "react";
import { Platform, Text, StyleSheet, View, KeyboardAvoidingView, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Input, Button, Overlay } from "react-native-elements";
import t from "../services/I18n";
import { Image, ThemeContext } from "react-native-elements";

import { useDispatch } from "react-redux";

import { login, loginWithAccessToken } from "../actions/actioncreators/login";
import SnsModal from "../components/SnsModal";
import { sns as snsType } from "../constants/sns";

const snsImage = {
    "mastodon": require("../../assets/logo/mastodon.png"),
    "misskey": require("../../assets/logo/misskey.png"),
    "pleroma": require("../../assets/logo/mastodon.png"),
};

function LoginScreen() {
    const dispatch = useDispatch();
    const { theme } = useContext(ThemeContext);
    const [domain, setDomain] = useState("mastodon.social");
    const [accessToken, setAccessToken] = useState("");
    const [snsModal, useSnsModal] = useState(false);
    const [sns, useSns] = useState<snsType>("mastodon");
    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
            <Text style={styles.text}>{t("login_message")}</Text>
            <Input
                onChangeText={text => setDomain(text)}
                value={domain}
                label={t("login_domain_label")}
                leftIcon={
                    <FontAwesome5 name='mastodon' size={24} color={theme.colors.primary} />
                }
            />
            <TouchableOpacity style={{ flexDirection: "row" }} onPress={() => useSnsModal(true)}>
                <Image style={styles.logo} source={snsImage[sns]} />
                <Text style={styles.sns}>Target: {t(`sns.${sns}`)}</Text>
            </TouchableOpacity>
            { Platform.OS !== "web" && <Button style={styles.button} onPress={() => dispatch(login(domain, sns))} title={t(`login_button_${sns}`)} />}
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
            <Button style={styles.button} onPress={() => dispatch(loginWithAccessToken(sns, domain, accessToken))} title={t("login_token_button")} />
            <Overlay isVisible={snsModal} onBackdropPress={() => useSnsModal(false)}>
                <SnsModal onSelect={(selected)=>{
                    useSnsModal(false);
                    useSns(selected);
                }} />
            </Overlay>
        </KeyboardAvoidingView>
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
    },
    sns: {
        fontSize:20,
    },
    logo: {
        width: 32,
        height: 32,
    }
});

export default LoginScreen;
