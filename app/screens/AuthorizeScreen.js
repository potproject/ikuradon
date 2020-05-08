import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import { useDispatch } from "react-redux";

import { getAccessTokenWithHomeAction } from "../actions/actioncreators/authorize";

function AuthorizeScreen({ route }) {
    const dispatch = useDispatch();

    const { url, domain, client_id, client_secret } = route.params;
    const [call, useCall] = useState(false);
    const onWebViewRequest = (navState, domain, client_id, client_secret) => {
        //mastodon.potproject.net
        const complateUrl = `https://${domain}/oauth/authorize/`;
        const index = navState.url.indexOf(complateUrl);
        if (!call && index !== -1) {
            useCall(true);
            //complete!
            let authorizeCode = navState.url.substring(complateUrl.length);
            //v2.5.0 Support
            if (authorizeCode.substr(0, 12) === "native?code=") {
                authorizeCode = authorizeCode.substr(12);
            }
            dispatch(getAccessTokenWithHomeAction(domain, client_id, client_secret, authorizeCode));
        }
        return true;
    };
    return (
        <WebView
            source={{ url }}
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

export default AuthorizeScreen;