import React, { useContext, useMemo, memo } from "react";
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
import Bookmark from "./item/Bookmark";
import Reaction  from "./item/Reaction";
import Action from "./item/Action";

import { ThemeContext } from "react-native-elements";
import MastoRowBody from "./MastoRowBody";
import MastoRowImage from "./MastoRowImage";
import MastoRowPoll from "./MastoRowPoll";
import OpenSticker from "./OpenSticker";

import { icon } from "../constants/visibility";
import { getMisskeyCustomEmojiReaction, isReactioned } from "../util/reactions";
import { accountURLMigrate, urlMigrate } from "../util/account";

const MastoRow = ({ item, current, actions, background, fontSize, openStickerData = {} }) => {
    // Toot data
    let {
        id,
        created_at,
        sensitive,
        spoiler_text,
        reblog,
        account,
        media_attachments,
        content,
        reblogged,
        reblogs_count,
        favourited,
        bookmarked,
        uri,
        url,
        favourites_count,
        visibility,
        emojis,
        poll,
        emoji_reactions,
    } = item;
    // current
    let { user_credentials, domain, access_token, notification_count, instance, sns } = current;
    // Actions
    let { ReplyAction, BoostAction, FavouriteAction, BookmarkAction, ReactionAction, HideAction, DeleteAction, OpenImageViewerAction, CloseImageViewerAction, TouchAction } =
        actions;
    // Theme
    const { theme } = useContext(ThemeContext);
    let reblogFlag = false;
    let rebloggedName = "";
    let reblogedImage = null;
    let reblogEmojis = [];
    let tootID = id;
    if (reblog) {
        reblogFlag = true;
        rebloggedName = account.display_name !== "" ? account.display_name : account.username;
        reblogedImage = account.avatar;
        reblogEmojis = account.emojis;
        tootID = reblog.id;
        ({
            created_at,
            sensitive,
            reblog,
            account,
            media_attachments,
            content,
            reblogged,
            reblogs_count,
            favourited,
            bookmarked,
            uri,
            url,
            favourites_count,
            visibility,
            emojis,
            poll,
        } = reblog);
    }
    const reactioned = sns === "misskey" && isReactioned(emoji_reactions);
    let myself = user_credentials && user_credentials.acct === account.acct;
    return (
        <View key={id} style={[styles.container, { backgroundColor: !background ? theme.customColors.charBackground : null }]}>
            <TouchableOpacity delayPressIn={150} onPress={() => TouchAction(tootID)}>
                {reblogFlag &&
                    useMemo(
                        () => (
                            <View style={styles.isReplyContainer}>
                                <View style={{ width: 68, borderWidth: 0, alignItems: "flex-end" }}>
                                    <FontAwesome name={"retweet"} size={fontSize.text+2} color={theme.customColors.item.boost} style={{ marginRight: 5 }} />
                                </View>
                                <CustomEmoji emojiStyle={{ width: fontSize.userNameEmoji, height: fontSize.userNameEmoji, resizeMode: "contain" }} style={{ flex: 1 }} emojis={emojisArrayToObject(reblogEmojis)}>
                                    <Text style={{ color: theme.colors.grey0, fontSize: fontSize.text }} ellipsizeMode="tail" numberOfLines={1}>
                                        {rebloggedName + t("notifications.boosted")}{" "}
                                    </Text>
                                </CustomEmoji>
                            </View>
                        ),
                        [rebloggedName]
                    )}
                <View style={styles.date}>
                    <Text style={[styles.dateText, { fontSize: fontSize.dateText }, { color: theme.colors.grey2 }]}>
                        {poll && <FontAwesome name={"comments"} size={fontSize.dateText} color={theme.colors.grey0} style={{ marginRight: 5 }} />}
                        {sensitive && (
                            <FontAwesome name={"exclamation"} size={fontSize.dateText} color={theme.colors.grey0} style={{ marginRight: 5 }} />
                        )}{" "}
                        <FontAwesome name={icon[visibility]} size={fontSize.dateText} color={theme.colors.grey0} style={{ marginRight: 5 }} />
                        {" " + dateFormat(created_at)}
                    </Text>
                </View>
                {Object.keys(openStickerData).length !== 0 && <OpenSticker acct={account.acct} currentDomain={domain} data={openStickerData} />}
                <View style={styles.innerContainer}>
                    <View style={styles.photoContainer}>
                        {useMemo(
                            () => (
                                <View style={styles.innerPhotoContainer}>
                                    <TouchableOpacity onPress={() => null}>
                                        <Image source={{ uri: account.avatar }} style={styles.photo} />
                                        {reblogedImage && <Image source={{ uri: reblogedImage }} style={styles.photoByReblogged} />}
                                    </TouchableOpacity>
                                </View>
                            ),
                            [account]
                        )}
                    </View>
                    <View style={styles.info}>
                        {useMemo(
                            () => (
                                <View style={styles.userDetails}>
                                    <CustomEmoji emojiStyle={{ width: fontSize.userNameEmoji, height: fontSize.userNameEmoji, resizeMode: "contain" }} emojis={emojisArrayToObject(account.emojis)}>
                                        <Text style={[styles.userName, { fontSize: fontSize.userName }, { color: theme.customColors.char }]} ellipsizeMode="tail" numberOfLines={1}>
                                            {account.display_name !== "" ? account.display_name : account.username}
                                            <Text style={[styles.userHandleAndTime, { fontSize: fontSize.userName }, { color: theme.colors.grey2 }]}>{" @" + account.acct}</Text>
                                        </Text>
                                    </CustomEmoji>
                                </View>
                            ),
                            [account]
                        )}
                        <View style={styles.tootContainer}>
                            <MastoRowBody
                                content={content}
                                linkStyle={{ color: theme.customColors.link }}
                                style={[styles.tootText, { fontSize: fontSize.text }, { color: theme.customColors.char }]}
                                cwfontSize={fontSize.text}
                                sensitiveButtonColor={theme.colors.primary}
                                emojis={emojis}
                                sensitive={sensitive}
                                spoilerText={spoiler_text}
                                customEmojiFontSize={fontSize.emoji}
                            />
                        </View>
                        {poll && (
                            <View style={styles.tootContainer}>
                                <MastoRowPoll poll={poll} fontSize={fontSize.text} />
                            </View>
                        )}
                        {media_attachments && media_attachments.length > 0 && (
                            <View style={styles.tootContainer}>
                                <MastoRowImage
                                    mediaAttachments={media_attachments}
                                    sensitive={sensitive}
                                    openImageViewer={OpenImageViewerAction}
                                    closeImageViewer={CloseImageViewerAction}
                                />
                            </View>
                        )}
                        { emoji_reactions && emoji_reactions.length > 0 && (
                            <View style={styles.reactionsContainer}>
                                {
                                    emoji_reactions.map((emoji_reaction) => {
                                        const { count, emoji, me, url } = getMisskeyCustomEmojiReaction(emoji_reaction, emojis);
                                        return <TouchableOpacity
                                            key={id + "_" + emoji_reaction.name + "_reaction"}
                                            style={styles.reaction}
                                            onPress={() => { emoji.indexOf("@") === -1 && !reactioned && ReactionAction(id, id, true, emoji)}}
                                        >
                                            {url &&
                                            <Image style={styles.reactionImg} source={{ uri: url }} />
                                            }
                                            {!url &&
                                            <Text style={[styles.reactionText, { fontSize: fontSize.text }]}>{emoji}</Text>
                                            }
                                            <Text style={[{ color: me ? theme.colors.primary :  theme.customColors.char }, { fontSize: fontSize.text }]}>{count}</Text>
                                        </TouchableOpacity>
                                        ;
                                    })
                                }
                            </View>
                        )}
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
                                count={0}
                                style={styles.itemFlex}
                                onBoost={BoostAction}
                                disabled={visibility === "private" || visibility === "direct"}
                            />
                            <Favourite id={id} tootid={tootID} favourited={favourited} count={0} style={styles.itemFlex} onFavourite={FavouriteAction} />
                            { sns !== "misskey" && 
                            <Bookmark id={id} tootid={tootID} bookmarked={bookmarked} style={styles.itemFlex} onBookmark={BookmarkAction} />
                            }
                            { sns === "misskey" && 
                            <Reaction id={id} tootid={tootID} reactioned={reactioned} style={styles.itemFlex} onReaction={ReactionAction} />
                            }
                            <Action
                                id={id}
                                tootid={tootID}
                                style={styles.itemFlex}
                                url={urlMigrate(sns, domain, url, tootID)}
                                account_url={accountURLMigrate(sns, domain, account.url)}
                                user={account.display_name !== "" ? account.display_name : account.username}
                                acct={account.acct}
                                image={account.avatar}
                                body={content}
                                myself={myself}
                                onReply={ReplyAction}
                                onHide={HideAction}
                                onDeleting={DeleteAction}
                            />
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};
MastoRow.propTypes = {
    navigation: PropTypes.any,
    item: PropTypes.shape({
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
    }),
    current: PropTypes.shape({
        user_credentials: PropTypes.object,
        domain: PropTypes.string,
        access_token: PropTypes.string,
        notification_count: PropTypes.number,
        instance: PropTypes.object,
    }),
    actions: PropTypes.object,
    background: PropTypes.bool,
    openStickerData: PropTypes.object,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 8,
        paddingBottom: 5,
    },
    isReplyContainer: {
        flex: 1,
        flexDirection: "row",
        borderWidth: 0,
        marginTop: 2,
    },
    date: {
        marginRight: 10,
    },
    dateText: {
        textAlign: "right",
    },
    innerContainer: {
        flex: 1,
        borderColor: "green",
        flexDirection: "row",
        borderWidth: 0,
        height: "auto",
    },
    photoContainer: {
        width: 68,
        borderColor: "yellow",
        flexDirection: "column",
        borderWidth: 0,
    },
    innerPhotoContainer: {
        height: 50,
        alignItems: "center",
    },
    photo: {
        width: 50,
        height: 50,
        borderRadius: 5,
    },
    photoByReblogged: {
        marginTop: 2,
        marginLeft: 24,
        width: 26,
        height: 26,
        borderRadius: 2,
    },
    info: {
        flex: 1,
        borderColor: "yellow",
        flexDirection: "column",
        borderWidth: 0,
    },
    userDetails: {
        borderWidth: 0,
    },
    userName: {
        fontWeight: "bold",
    },
    userHandleAndTime: {
        fontWeight: "normal",
    },
    tootContainer: {
        flex: 1,
        borderWidth: 0,
        marginTop: 2,
    },
    tootText: {
        paddingTop: 2,
        paddingRight: 10,
    },
    tootActionsContainer: {
        flex: 1,
        borderColor: "blue",
        borderWidth: 0,
        marginTop: 5,
        flexDirection: "row",
        paddingBottom: 5,
    },
    item: {
        flex: 1,
        marginTop: 10,
        marginBottom: 5,
        flexDirection: "row",
    },
    itemFlex: {
        flex: 1,
        paddingRight: 10,
    },
    reactionsContainer: {
        flex: 1,
        flexDirection: "row",
        borderWidth: 0,
        marginTop: 6
    },
    reaction:{
        marginLeft: 6,
        marginRight: 6,
        flexDirection: "row",
    },
    reactionText:{
        marginRight: 2,
    },
    reactionImg: {
        width:18,
        height:18,
        marginRight: 5,
        alignSelf: "center"
    },
});
export default memo(MastoRow, (p, n) => {
    // TODO: boostもmemoしたい
    return (
        p.item.id === n.item.id &&
        p.item.reblogged === n.item.reblogged &&
        p.item.reblogs_count === n.item.reblogs_count &&
        p.item.favourited === n.item.favourited &&
        p.item.favourites_count === n.item.favourites_count &&
        p.item.emojis === n.item.emojis &&
        p.item.emoji_reactions === n.item.emoji_reactions &&
        p.item.reblog === null
    );
});
