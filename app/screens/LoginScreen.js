import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input, Button } from "react-native-elements";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as LoginActions from "../actions/actioncreators/login";

function LoginScreen({ LoginActions }) {
    const [domain, setDomain] = useState("mastodon.potproject.net");
    return (
        <View style={styles.container}>
            <Input
                onChangeText={text => setDomain(text)}
                value={domain} 
                leftIcon={
                    <Icon
                        name='user'
                        size={24}
                        color='black'
                    />
                    
                }
            />
            <Button onPress={() => LoginActions.login(domain)} title={"Login"} />

        </View>
    );
}

LoginScreen.navigationOptions = {
    header: null
};

const styles = StyleSheet.create({
    container: {
        paddingLeft: 20,
        paddingRight: 20,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
});

export default connect(
    state => state,
    dispatch => ({
        LoginActions: bindActionCreators(LoginActions, dispatch)
    })
)(LoginScreen);
