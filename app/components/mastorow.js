import React, { Component } from "react";
import { View, Text, StyleSheet, Image, Linking } from "react-native";
import Hyperlink from "react-native-hyperlink";
import MastoMedia from "./mastomedia";
import { FontAwesome } from "@expo/vector-icons";
import Reply from "./mainitem/reply";
import Boost from "./mainitem/boost";
import Favourite from "./mainitem/favourite";
import Action from "./mainitem/action";
import { bodyFormat, dateFormat } from "../util/parser";

export default class MastoRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            tootid: props.tootid,
            user: props.user,
            body: props.body,
            image: props.image,
            reblogged: props.reblogged,
            favourited: props.favourited,
            date: props.date,
            username: props.username,
            acct: "@" + props.acct,
            notification_type: props.notification_type,
            notification_name: props.notification_name,
            media_attachments: props.media_attachments,
            url: props.url
        }
    }
    componentWillReceiveProps(nextProps) {
        if (this.state.favourited !== nextProps.favourited) {
            this.state.favourited = nextProps.favourited;
        }
        if (this.state.reblogged !== nextProps.reblogged) {
            this.state.reblogged = nextProps.reblogged;
        }
    }
    render() {
        return (
            <View>
                <View style={styles.container}>
                    <Image source={{ uri: this.state.image }} style={styles.photo} />
                    <View style={styles.textarea}>
                        <Text style={styles.header} ellipsizeMode='tail' numberOfLines={1}>
                            <Text style={styles.name}>
                                {this.state.user}
                            </Text>
                            <Text style={styles.acct}>
                                {this.state.acct}
                            </Text>
                        </Text>
                        <Hyperlink onPress={url => this.openUrl(url)}>
                            <View>
                                <Text style={styles.body}>
                                    {bodyFormat(this.state.body)}
                                </Text>
                            </View>
                        </Hyperlink>
                        <MastoMedia
                            media_attachments={this.state.media_attachments}
                        />
                    </View>
                </View>
                <View style={styles.container}>
                    <Text style={styles.dateFlex}>
                        {dateFormat(this.state.date)}
                    </Text>
                </View>
                {this.notificationFormat(this.state.notification_type, this.state.notification_name)}
                <View style={styles.container}>
                    <View style={styles.item}>
                        <Reply id={this.state.tootid} style={styles.itemFlex} />
                        <Boost id={this.state.tootid} reblogged={this.state.reblogged} style={styles.itemFlex} />
                        <Favourite id={this.state.tootid} favourited={this.state.favourited} style={styles.itemFlex} />
                        <Action id={this.state.tootid} style={styles.itemFlex} url={this.state.url} body={this.state.body} />
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
    notificationFormat(type, name) {
        if (type === null) {
            return;
        }
        let faName;
        switch (type) {
            case "favourite":
                faName = "star";
                break;
            case "reblog":
                faName = "retweet";
                break;
            case "mention":
                faName = "reply";
                break;
        }
        return  <View style={styles.container}>
            <Text style={styles.dateFlex}>
                <Text>{" "}<FontAwesome name={faName} size={12} />{" " + name}</Text>
            </Text>
        </View>;
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 4,
        flexDirection: "row",
    },
    textarea: {
        flex: 1,
    },
    header: {
        flex: 1,
        paddingLeft: 12,
    },
    name: {
        fontSize: 16,
    },
    acct: {
        color: "#5f5f5f",
        fontSize: 12,
    },
    body: {
        flex: 2,
        marginLeft: 12,
        fontSize: 12,
    },
    photo: {
        height: 50,
        width: 50,
        borderRadius: 8
    },
    item: {
        flex: 1,
        marginLeft: 50,
        paddingLeft: 12,
        paddingTop: 0,
        paddingBottom: 0,
        flexDirection: "row",
    },
    itemFlex: {
        flex: 1
    },
    dateFlex: {
        marginLeft: 50,
        paddingLeft: 12,
        paddingTop: 0,
        paddingBottom: 0,
        color: "#5f5f5f",
        fontSize: 12,
    }
});