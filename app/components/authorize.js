import React from "react";
import {
    StyleSheet,
    WebView
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as AuthorizeActions from "../actions/actioncreators/authorize";

class Authorize extends React.Component {
    constructor(props) {
        super(props);
        const {url,domain,client_id,client_secret} = props.navReducer;
        this.url = url;
        this.domain = domain;
        this.client_id = client_id;
        this.client_secret = client_secret;
    }
    render() {
        const self = this;
        return (
            <WebView 
                source={{uri:this.url}}
                onShouldStartLoadWithRequest={(navState) => this.onWebViewRequest(navState,self.domain,self.client_id,self.client_secret)}
                onNavigationStateChange={(navState) => this.onWebViewRequest(navState,self.domain,self.client_id,self.client_secret)}
                style={styles.container}
            >
            </WebView>
        );
    }
    onWebViewRequest(navState,domain,client_id,client_secret){
        //mastodon.potproject.net
        const complateUrl = `https://${domain}/oauth/authorize/`;
        const index = navState.url.indexOf(complateUrl);
        if(index !== -1){
            //complete!
            const authorizeCode= navState.url.substring(complateUrl.length);
            this.props.AuthorizeActions.getAccessTokenWithHomeAction(domain,client_id,client_secret,authorizeCode);
        }
        return true;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

export default connect(state => state,
    (dispatch) => ({
        AuthorizeActions:bindActionCreators(AuthorizeActions,dispatch)
    })
)(Authorize);