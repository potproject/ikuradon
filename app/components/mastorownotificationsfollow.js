import React, { Component } from "react";
import { View, Text, StyleSheet, Image, Linking } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import PropTypes from "prop-types";

export default class MastoRowNotificationfollow extends Component {
    static propTypes = {
        id: PropTypes.string,
        type: PropTypes.string,
        user: PropTypes.string,
        image: PropTypes.string,
        username: PropTypes.string,
        acct: PropTypes.string
    };
    render() {
        return (
            <View>
                <View style={styles.container}>
                    <Image source={{ uri: this.props.image }} style={styles.photo} />
                    <View style={styles.textarea}>
                        <Text style={styles.text} ellipsizeMode="tail" numberOfLines={1}>
                            <Text style={styles.name}>{this.props.user}</Text>
                        </Text>
                        <Text style={styles.text} ellipsizeMode="tail" numberOfLines={1}>
                            <FontAwesome name={"user-plus"} size={16} />
                            <Text style={styles.username}>{" " + this.props.username}</Text>
                        </Text>
                        <Text style={styles.text} ellipsizeMode="tail" numberOfLines={1}>
                            <Text style={styles.acct}>{this.props.acct}</Text>
                        </Text>
                    </View>
                </View>
            </View>
        );
    }
    async openUrl(url) {
        try {
            let supported = await Linking.canOpenURL(url);
            if (supported) {
                await Linking.openURL(url);
            } else {
                console.log("not supported url");
            }
        } catch (e) {
            console.error("Linking error", e);
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 4,
        flexDirection: "row"
    },
    textarea: {
        flex: 1
    },
    body: {
        flex: 2,
        marginLeft: 12,
        fontSize: 12
    },
    photo: {
        height: 50,
        width: 50,
        borderRadius: 8
    },
    text: {
        flex: 1,
        paddingLeft: 12
    },
    name: {
        fontSize: 16
    },
    acct: {
        color: "#5f5f5f",
        fontSize: 12
    },
    username: {
        fontSize: 14
    }
});
