import React from "react";
import { StyleSheet, WebView } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as AuthorizeActions from "../actions/actioncreators/authorize";

class Authorize extends React.Component {
    constructor(props) {
        super(props);
        const { url, domain, client_id, client_secret } = props.navReducer;
        this.url = url;
        this.domain = domain;
        this.client_id = client_id;
        this.client_secret = client_secret;
        this.call = false;
    }
    render() {
        const self = this;
        return (
            <WebView
                source={{ uri: this.url }}
                onShouldStartLoadWithRequest={navState => this.onWebViewRequest(navState, self.domain, self.client_id, self.client_secret)}
                onNavigationStateChange={navState => this.onWebViewRequest(navState, self.domain, self.client_id, self.client_secret)}
                style={styles.container}
            />
        );
    }
    onWebViewRequest(navState, domain, client_id, client_secret) {
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
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default connect(
    state => state,
    dispatch => ({
        AuthorizeActions: bindActionCreators(AuthorizeActions, dispatch)
    })
)(Authorize);
