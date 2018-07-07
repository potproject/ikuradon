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
import PropTypes from "prop-types";

export default class MastoRow extends Component {
    static propTypes = {
        id: PropTypes.string,
        tootid: PropTypes.string,
        user: PropTypes.string,
        body: PropTypes.string,
        image: PropTypes.string,
        reblogged: PropTypes.bool,
        reblogs_count: PropTypes.number,
        favourited: PropTypes.bool,
        favourites_count: PropTypes.number,
        date: PropTypes.string,
        username: PropTypes.string,
        acct: PropTypes.string,
        notification_type: PropTypes.string,
        notification_name: PropTypes.string,
        media_attachments: PropTypes.array,
        url: PropTypes.string,
        emojis: PropTypes.array,
        visibility: PropTypes.string,
        sensitive: PropTypes.bool,
        spoiler_text: PropTypes.string,
        my: PropTypes.bool,
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.favourited !== nextProps.favourited) {
            this.props.favourited = nextProps.favourited;
        }
        if (this.props.favourites_count !== nextProps.favourites_count) {
            this.props.favourites_count = nextProps.favourites_count;
        }
        if (this.props.reblogged !== nextProps.reblogged) {
            this.props.reblogged = nextProps.reblogged;
        }
        if (this.props.reblogs_count !== nextProps.reblogs_count) {
            this.props.reblogs_count = nextProps.reblogs_count;
        }
    }
    render() {
        return (
            <View>
                <View style={styles.container}>
                    <Image source={{ uri: this.props.image }} style={styles.photo} />
                    <View style={styles.textarea}>
                        <Text style={styles.header} ellipsizeMode='tail' numberOfLines={1}>
                            <Text style={styles.name}>
                                {this.props.user}
                            </Text>
                            <Text style={styles.acct}>
                                {this.props.acct}
                            </Text>
                        </Text>
                        {this.mastorowBodyFormat(this.props.body, this.props.emojis)}
                        {this.mastorowMediaFormat(this.props.media_attachments, this.props.sensitive)}
                    </View>
                </View>
                <View style={styles.container}>
                    <Text style={styles.dateFlex}>
                        {dateFormat(this.props.date) + " "}
                        <VisibilityIcon visibility={this.props.visibility} size={12} />
                        {" "}
                        {this.props.sensitive ? <FontAwesome name={"exclamation-circle"} size={12} /> : ""}
                    </Text>
                </View>
                {this.notificationFormat(this.props.notification_type, this.props.notification_name)}
                <View style={styles.container}>
                    <View style={styles.item}>
                        <Reply id={this.props.id} tootid={this.props.tootid} user={this.props.user} acct={this.props.acct} image={this.props.image} body={this.props.body} style={styles.itemFlex} />
                        <Boost id={this.props.id} tootid={this.props.tootid} reblogged={this.props.reblogged} count={this.props.reblogs_count} style={styles.itemFlex} />
                        <Favourite id={this.props.id} tootid={this.props.tootid} favourited={this.props.favourited} count={this.props.favourites_count} style={styles.itemFlex} />
                        <Action id={this.props.id} style={styles.itemFlex} url={this.props.url} tootid={this.props.tootid} user={this.props.user} acct={this.props.acct} image={this.props.image} body={this.props.body} my={this.props.my} />
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
    mastorowBodyFormat(body, emojis) {
        let newbody = bodyFormat(body);
        if (this.props.sensitive) {
            newbody = "[!] " + this.props.spoiler_text + "\n\n" + newbody;
        }
        if (emojis.length > 0) {
            return <Hyperlink linkStyle={styles.link} onPress={(url) => this.openUrl(url)}>
                {this.mastorowSetCustomEmoji(newbody, emojis, styles.body)}
            </Hyperlink>;
        }
        return <Hyperlink linkStyle={styles.link} onPress={(url) => this.openUrl(url)}>
            <Text style={styles.body}>{newbody}</Text>
        </Hyperlink>;
    }

    mastorowSetCustomEmoji(text, emojis, style) {
        let emojiArray = {};
        emojis.forEach((emoji) => {
            emojiArray[emoji.shortcode] = { uri: emoji.url };
        });
        return <CustomEmoji emojis={emojiArray}>
            <Text style={style}>{text}</Text>
        </CustomEmoji>;
    }

    mastorowMediaFormat(media_attachments, sensitive) {
        if (media_attachments && media_attachments.length > 0) {
            return <MastoMedia
                width={300}
                height={100}
                media_attachments={media_attachments}
                sensitive={sensitive}
            />;
        }
        return;
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
        return <View style={styles.container}>
            <Text style={[styles.dateFlex, { color }]}>
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
        fontWeight: "bold",
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
    link: {
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