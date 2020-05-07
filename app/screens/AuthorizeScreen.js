import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
function AuthorizeScreen({ route, navigation }) {
    const { url, domain, client_id, client_secret } = route.params;
    const [call, useCall] = useState(false);
    return (
        <WebView
            source={{ url }}
            onShouldStartLoadWithRequest={navState => onWebViewRequest(navState, domain, client_id, client_secret)}
            onNavigationStateChange={navState => onWebViewRequest(navState, domain, client_id, client_secret)}
            style={styles.container}
        />
    );
}


function onWebViewRequest(navState, domain, client_id, client_secret) {
    //mastodon.potproject.net
    const complateUrl = `https://${domain}/oauth/authorize/`;
    const index = navState.url.indexOf(complateUrl);
    if (!this.call && index !== -1) {
        this.call = true;
        //complete!
        let authorizeCode = navState.url.substring(complateUrl.length);
        //v2.5.0 Support
        if (authorizeCode.substr(0, 12) === "native?code=") {
            authorizeCode = authorizeCode.substr(12);
        }
        this.props.AuthorizeActions.getAccessTokenWithHomeAction(domain, client_id, client_secret, authorizeCode);
    }
    return true;
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default AuthorizeScreen;