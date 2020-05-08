import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input, Button } from "react-native-elements";

import { useDispatch } from "react-redux";

import { login } from "../actions/actioncreators/login";

function LoginScreen() {
    const dispatch = useDispatch();
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
            <Button onPress={() => dispatch(login(domain))} title={"Login"} />
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
    }
});

export default LoginScreen;
