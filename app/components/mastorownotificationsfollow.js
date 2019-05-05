import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import PropTypes from "prop-types";
import styles from "../stylesheets/default/mastorownotificationsfollow";

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
}