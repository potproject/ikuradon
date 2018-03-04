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
import CustomEmoji from "react-native-customemoji";
import VisibilityIcon from "./visibilityicon";

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
            url: props.url,
            emojis:props.emojis,
            visibility:props.visibility,
            sensitive:props.sensitive,
            spoiler_text:props.spoiler_text
        };
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
                        <Hyperlink linkStyle={styles.link} onPress={(url) => this.openUrl(url)} /* onPress Not working? */>
                            <View>
                                {this.mastorowBodyFormat(this.state.body,this.state.emojis)}
                            </View>
                        </Hyperlink>
                        <MastoMedia
                            media_attachments={this.state.media_attachments}
                            sensitive={this.state.sensitive}
                        />
                    </View>
                </View>
                <View style={styles.container}>
                    <Text style={styles.dateFlex}>
                        {dateFormat(this.state.date)+" "}
                        <VisibilityIcon visibility={this.state.visibility} size={12} />
                        {" "}
                        {this.state.sensitive ? <FontAwesome name={"exclamation-circle"} size={12} /> :""}
                    </Text>
                </View>
                {this.notificationFormat(this.state.notification_type, this.state.notification_name)}
                <View style={styles.container}>
                    <View style={styles.item}>
                        <Reply id={this.state.tootid} tootid={this.state.tootid} user={this.state.user} acct={this.state.acct} image={this.state.image} body={this.state.body} style={styles.itemFlex} />
                        <Boost id={this.state.id} tootid={this.state.tootid} reblogged={this.state.reblogged} style={styles.itemFlex} />
                        <Favourite id={this.state.id} tootid={this.state.tootid} favourited={this.state.favourited} style={styles.itemFlex} />
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
    mastorowBodyFormat(body,emojis){
        let newbody = bodyFormat(body);
        if(this.state.sensitive){
            newbody = "[!] " + this.state.spoiler_text + "\n\n" + newbody;
        }
        if(emojis.length > 0){
            let emojiArray = {};
            emojis.forEach((emoji)=>{
                emojiArray[emoji.shortcode] = {uri:emoji.url};
            });
            return <CustomEmoji emojiStyle={{ width: 12, height:12}} emojis={emojiArray}>
                <Text style={styles.body}>{newbody}</Text>
            </CustomEmoji>;
        }
        return <Text style={styles.body}>{newbody}</Text>;
    }
    notificationFormat(type, name) {
        if (type === null) {
            return;
        }
        let faName;
        let color = "gray";
        switch (type) {
            case "favourite":
                faName = "star";
                color = "#ca8f04";
                break;
            case "reblog":
                faName = "retweet";
                color = "#2b90d9";
                break;
            case "mention":
                faName = "reply";
                break;
        }
        return  <View style={styles.container}>
            <Text style={[styles.dateFlex,{color}]}>
                <Text>{" "}<FontAwesome name={faName} size={12} color={color} />{" " + name}</Text>
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
        fontSize: 14,
        paddingTop: 3,
        paddingBottom: 3,
    },
    link:{
        color: "#2980b9",
        fontSize: 14,
        textDecorationLine: "underline"
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