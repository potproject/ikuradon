import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { WebView, WebViewNavigation } from "react-native-webview";
import { useDispatch } from "react-redux";

import { getAccessTokenWithHomeAction } from "../actions/actioncreators/authorize";
import { loginCallbackUrl } from "../constants/login";

function AuthorizeScreen({ route }) {
    const dispatch = useDispatch();

    const { sns, url, domain, client_id, client_secret } = route.params;
    const [call, useCall] = useState(false);
    const onWebViewRequest = (navState: WebViewNavigation, domain: any, client_id: any, client_secret: any) => {
        const index = navState.url.indexOf(loginCallbackUrl);
        if (!call && index !== -1) {
            const param = sns === "misskey" ? "session" : "code";
            const query = getUrlQuery(navState.url);
            const authorizeCode = query[param];
            if (authorizeCode) {
                useCall(true);
                dispatch(getAccessTokenWithHomeAction(sns, domain, client_id, client_secret, authorizeCode));
                return false;
            }
        }
        return true;
    };
    return (
        <WebView
            source={{ uri: url }}
            onShouldStartLoadWithRequest={navState => onWebViewRequest(navState, domain, client_id, client_secret)}
            onNavigationStateChange={navState => onWebViewRequest(navState, domain, client_id, client_secret)}
            style={styles.container}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

function getUrlQuery(url: string){
    const regex = /[?&]([^=#]+)=([^&#]*)/g;
    let params: { [key: string]: string } = {};
    let match: RegExpExecArray;
    while (match = regex.exec(url)) {
        params[match[1]] = match[2];
    }
    return params;
}

export default AuthorizeScreen;