import React, { Component } from "react";
import { View, Text, Linking } from "react-native";
import ImagePlaceholder from "react-native-image-placeholder";
import Hyperlink from "react-native-hyperlink";
import MastoMedia from "./mastomedia";
import MastoCard from "./mastocard";
import { FontAwesome } from "@expo/vector-icons";
import Reply from "./mainitem/reply";
import Boost from "./mainitem/boost";
import Favourite from "./mainitem/favourite";
import Action from "./mainitem/action";
import { bodyFormat, dateFormat, bodySearchUrl } from "../util/parser";
import CustomEmoji from "react-native-customemoji";
import VisibilityIcon from "./visibilityicon";
import PropTypes from "prop-types";
import styles from "../stylesheets/default/mastorow";
import {open as openUrl} from "../util/url";

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
        card: PropTypes.object,
        account_url: PropTypes.string,
        account_emojis: PropTypes.array,
        url: PropTypes.string,
        emojis: PropTypes.array,
        visibility: PropTypes.string,
        sensitive: PropTypes.bool,
        spoiler_text: PropTypes.string,
        application_name: PropTypes.string,
        my: PropTypes.bool,
        smartMode: PropTypes.bool,

        onReply: PropTypes.func,
        onBoost: PropTypes.func,
        onFavourite: PropTypes.func,
        onHide: PropTypes.func,
        onDeleting: PropTypes.func,
        onDetail: PropTypes.func
    };
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
            <View style={this.props.my ? [styles.mycolor, styles.main] : styles.main}>
                {/*<TouchableOpacity onPress={()=>this.props.onDetail(this.props.id)}> */}
                <View style={styles.container}>
                    <ImagePlaceholder
                        borderRadius={8}
                        isShowActivity={false}
                        placeholderSource={require("../../assets/image/placeholder.png")}
                        customImagePlaceholderDefaultStyle={styles.photo}
                        source={{ uri: this.props.image }}
                        style={styles.photo}
                    />
                    <View style={styles.textarea}>
                        <CustomEmoji emojis={this.changeEmojis(this.props.account_emojis)} style={styles.header}>
                            <Text ellipsizeMode="tail" numberOfLines={1}>
                                <Text style={styles.name}>{this.props.user}</Text>
                                <Text> </Text>
                                <Text style={styles.acct}>{this.props.acct}</Text>
                            </Text>
                        </CustomEmoji>
                        {this.mastorowBodyFormat(this.props.body, this.props.emojis)}
                        {this.mastorowMediaFormat(this.props.media_attachments, this.props.sensitive)}
                        {this.mastorowCardFormat(this.props.card, this.props.sensitive)}
                    </View>
                </View>
                {!this.props.smartMode && (
                <View style={styles.container}>
                    <Text style={styles.dateFlex}>
                        {dateFormat(this.props.date) + " "}
                        <VisibilityIcon visibility={this.props.visibility} size={12} /> {this.props.sensitive ? <FontAwesome name={"exclamation-circle"} size={12} /> : ""}
                        {this.props.application_name ? " via " + this.props.application_name : ""}
                    </Text>
                </View>
                )}
                { this.notificationFormat(this.props.notification_type, this.props.notification_name)}
                {!this.props.smartMode && (
                    <View style={styles.container}>
                        <View style={styles.item}>
                            <Reply
                                id={this.props.id}
                                tootid={this.props.tootid}
                                user={this.props.user}
                                acct={this.props.acct}
                                image={this.props.image}
                                body={this.props.body}
                                style={styles.itemFlex}
                                onReply={this.props.onReply}
                            />
                            <Boost
                                id={this.props.id}
                                tootid={this.props.tootid}
                                reblogged={this.props.reblogged}
                                count={this.props.reblogs_count}
                                style={styles.itemFlex}
                                onBoost={this.props.onBoost}
                                disabled={this.props.visibility === "private" || this.props.visibility === "direct"}
                            />
                            <Favourite
                                id={this.props.id}
                                tootid={this.props.tootid}
                                favourited={this.props.favourited}
                                count={this.props.favourites_count}
                                style={styles.itemFlex}
                                onFavourite={this.props.onFavourite}
                            />
                            <Action
                                id={this.props.id}
                                style={styles.itemFlex}
                                url={this.props.url}
                                account_url={this.props.account_url}
                                tootid={this.props.tootid}
                                user={this.props.user}
                                acct={this.props.acct}
                                image={this.props.image}
                                body={this.props.body}
                                my={this.props.my}
                                onReply={this.props.onReply}
                                onHide={this.props.onHide}
                                onDeleting={this.props.onDeleting}
                            />
                        </View>
                    </View>
                )}
            </View>
        );
    }
    mastorowBodyFormat(body, emojis) {
        let newbody = bodyFormat(body);
        let existsURL = bodySearchUrl(newbody);
        if (this.props.sensitive) {
            newbody = "[NSFW] " + this.props.spoiler_text + "\n" + newbody;
        }
        if (emojis.length > 0 && existsURL) {
            return (
                <Hyperlink linkStyle={styles.link} onPress={url => openUrl(url)}>
                    {this.mastorowSetCustomEmoji(newbody, emojis, styles.body)}
                </Hyperlink>
            );
        }
        if (emojis.length > 0) {
            return this.mastorowSetCustomEmoji(newbody, emojis, styles.body);
        }
        if (existsURL) {
            return (
                <Hyperlink linkStyle={styles.link} onPress={url => openUrl(url)}>
                    <Text style={styles.body}>{newbody}</Text>
                </Hyperlink>
            );
        }
        return <Text style={styles.body}>{newbody}</Text>;
    }
    changeEmojis(emojis) {
        let emojiArray = {};
        if (emojis.length < 1) {
            return emojiArray;
        }
        emojis.forEach(emoji => {
            emojiArray[emoji.shortcode] = { uri: emoji.url };
        });
        return emojiArray;
    }
    mastorowSetCustomEmoji(text, emojis, style) {
        let emojiArray = this.changeEmojis(emojis);
        return (
            <CustomEmoji emojis={emojiArray}>
                <Text style={style}>{text}</Text>
            </CustomEmoji>
        );
    }

    mastorowMediaFormat(media_attachments, sensitive) {
        if (media_attachments && media_attachments.length > 0) {
            return <MastoMedia width={300} height={100} media_attachments={media_attachments} sensitive={sensitive} />;
        }
        return;
    }

    mastorowCardFormat(card, sensitive) {
        if (card) {
            return <MastoCard width={300} height={60} card={card} sensitive={sensitive} />;
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
        return (
            <View style={styles.notification}>
                <Text style={[styles.dateFlex, { color }]}>
                    <Text>
                        {" "}
                        <FontAwesome name={faName} size={12} color={color} />
                        {" " + name}
                    </Text>
                </Text>
            </View>
        );
    }
}
