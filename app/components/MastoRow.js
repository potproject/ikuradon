import React, { useContext, useMemo } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "react-native-elements";
import PropTypes from "prop-types";
import { FontAwesome } from "@expo/vector-icons";
import { bodyFormat, dateFormat, bodySearchUrl, emojisArrayToObject } from "../util/parser";
import CustomEmoji from "react-native-customemoji";

import t from "../services/I18n";

import Reply from "./item/Reply";
import Boost from "./item/Boost";
import Favourite from "./item/Favourite";
import Action from "./item/Action";

import { ThemeContext } from "react-native-elements";
import MastoRowBody from "./MastoRowBody";
import Detail from "./item/Detail";

const MastoRow = ({ navigation, item, current, actions }) => {
    // Toot data
    let { id, created_at, sensitive, reblog, account, content, reblogged, reblogs_count, favourited, uri, url, favourites_count, visibility, emojis} = item;
    // current
    let { user_credentials, domain, access_token, notification_count, instance } = current;
    // Actions
    let { ReplyAction, BoostAction, FavouriteAction, HideAction, DeleteAction, DetailAction } = actions;
    // Theme
    const { theme } = useContext(ThemeContext);
    let rebloggedName = "";
    let reblogEmojis = [];
    let tootID = id;
    if(reblog){
        rebloggedName = account.display_name !== "" ? account.display_name : account.username;
        reblogEmojis = account.emojis;
        tootID = reblog.id;
        content = reblog.content;
        account = reblog.account;
    }
    let myself = user_credentials && user_credentials.acct === account.acct;
    return (
        <View key={id} style={[styles.container,{backgroundColor: theme.customColors.charBackground}]}>
            { reblog && useMemo(() =>
                <View style={styles.isReplyContainer}>
                    <View style={{flex:0.18, borderWidth:0, alignItems:"flex-end"}}>
                        <FontAwesome name={"retweet"} size={16} color={theme.customColors.item.boost} style={{marginRight:5}}/>
                    </View>
                    <CustomEmoji style={{flex:0.82}} emojis={emojisArrayToObject(reblogEmojis)}>
                        <Text style={{color: theme.colors.grey0}} ellipsizeMode="tail" numberOfLines={1}>{rebloggedName + t("notifications.boosted")} </Text>
                    </CustomEmoji>
                </View>
            , [rebloggedName])}
            <View style={styles.innerContainer}>
                <View style={styles.photoContainer}>
                    { useMemo(() =>
                        <View style={styles.innerPhotoContainer}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate("Profile")}>
                                <Image
                                    source={{uri: account.avatar}}
                                    style={styles.photo}/>
                            </TouchableOpacity>
                        </View>
                    , [account])}
                </View>
                <View style={styles.info}>
                    { useMemo(() =>
                        <View style={styles.userDetails}>
                            <CustomEmoji emojis={emojisArrayToObject(account.emojis)}>
                                <Text style={styles.userName} ellipsizeMode="tail" numberOfLines={1}>{account.display_name !== "" ? account.display_name : account.username}
                                    <Text style={styles.userHandleAndTime}>{" @"+account.acct}</Text>
                                </Text>
                            </CustomEmoji>
                        </View>
                    , [account])
                    }
                    <View style={styles.tootTextContainer}>
                        <MastoRowBody content={content} linkStyle={{color: theme.customColors.link}} style={styles.tootText} emojis={emojis} sensitive={sensitive} />
                    </View>
                    <View style={styles.item}>
                        <Reply
                            id={id}
                            tootid={tootID}
                            user={account.display_name !== "" ? account.display_name : account.username}
                            acct={account.acct}
                            image={account.avatar}
                            body={content}
                            style={styles.itemFlex}
                            onReply={ReplyAction}
                        />
                        <Boost
                            id={id}
                            tootid={tootID}
                            reblogged={reblogged}
                            count={reblogs_count}
                            style={styles.itemFlex}
                            onBoost={BoostAction}
                            disabled={visibility === "private" || visibility === "direct"}
                        />
                        <Favourite
                            id={id}
                            tootid={tootID}
                            favourited={favourited}
                            count={favourites_count}
                            style={styles.itemFlex}
                            onFavourite={FavouriteAction}
                        />
                        <Action
                            id={id}
                            tootid={tootID}
                            style={styles.itemFlex}
                            url={url}
                            account_url={account.url}
                            user={account.display_name !== "" ? account.display_name : account.username}
                            acct={account.acct}
                            image={account.avatar}
                            body={content}
                            myself={myself}
                            onReply={ReplyAction}
                            onHide={HideAction}
                            onDeleting={DeleteAction}
                        />
                        <Detail date={created_at} style={[styles.itemFlex,{fontWeight: "bold", fontSize: 15, color: theme.customColors.item.none}]} />
                    </View>
                </View>
            </View>
        </View>
    );
};
MastoRow.propTypes = {
    navigation: PropTypes.any,
    item: PropTypes.shape(
        {
            id: PropTypes.string.isRequired,
            created_at: PropTypes.string,
            in_reply_to_id: PropTypes.string,
            in_reply_to_account_id: PropTypes.string,
            sensitive: PropTypes.bool,
            spoiler_text: PropTypes.string,
            visibility: PropTypes.string,
            uri: PropTypes.string,
            url: PropTypes.string,
            replies_count: PropTypes.number,
            reblogs_count: PropTypes.number,
            favourites_count: PropTypes.number,
            favourited: PropTypes.bool,
            reblogged: PropTypes.bool,
            muted: PropTypes.bool,
            bookmarked: PropTypes.bool,
            content: PropTypes.string,
            reblog: PropTypes.any,
            application: PropTypes.object,
            account: PropTypes.object,
            media_attachments: PropTypes.array,
            mentions: PropTypes.array,
            tags: PropTypes.array,
            emojis: PropTypes.array,
            card: PropTypes.object,
            poll: PropTypes.any,
        }
    ),
    current: PropTypes.shape(
        {
            user_credentials: PropTypes.object,
            domain: PropTypes.string,
            access_token: PropTypes.string,
            notification_count: PropTypes.number,
            instance: PropTypes.object
        }
    ),
    actions: PropTypes.object
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 8,
        paddingBottom: 5
    },
    isReplyContainer: {
        flex: 1,
        flexDirection: "row",
        borderWidth: 0,
        height: 20,
        marginTop: 2
    },
    innerContainer: {
        flex: 1,
        borderColor: "green",
        flexDirection: "row",
        borderWidth: 0,
        height: "auto"
    },
    photoContainer: {
        flex: 0.18,
        borderColor: "yellow",
        flexDirection: "column",
        borderWidth: 0
    },
    innerPhotoContainer: { 
        height: 50, alignItems: "center"
    },
    photo: {
        width: 50,
        height: 50,
        borderRadius: 5
    },
    info: {
        flex: 0.82,
        borderColor: "yellow",
        flexDirection: "column",
        borderWidth: 0
    },
    userDetails: {
        borderWidth: 0
    },
    userName: {
        color: "black",
        fontWeight: "bold",
        fontSize: 16,
    },
    userHandleAndTime: {
        color: "#8899a6",
        fontWeight: "normal",
        fontSize: 15,
    },
    tootTextContainer: { 
        flex: 1, 
        borderWidth: 0,
        marginTop:2,
    },
    tootText: {
        color: "black",
        paddingTop: 2,
        paddingRight: 10,
        fontSize: 16,
    },
    tootActionsContainer: {
        flex: 1,
        borderColor: "blue",
        borderWidth: 0,
        marginTop: 5,
        flexDirection: "row",
        paddingBottom: 5
    },
    item: {
        flex: 1,
        paddingRight:10,
        paddingTop: 5,
        paddingBottom: 5,
        flexDirection: "row"
    },
    itemFlex: {
        flex: 1,
        paddingRight: 10,
    }
});
export default MastoRow;