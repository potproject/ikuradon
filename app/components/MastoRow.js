import * as React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import PropTypes from "prop-types";
import { FontAwesome } from "@expo/vector-icons";
import { bodyFormat, dateFormat, bodySearchUrl } from "../util/parser";
import {open as openUrl} from "../util/url";
import Hyperlink from "react-native-hyperlink";

import Reply from "./item/Reply";
import Boost from "./item/Boost";
import Favourite from "./item/Favourite";
import Action from "./item/Action";

const MastoRow = (
    // Toot data
    { navigation, id, created_at, reblog, account, content, reblogged, reblogs_count, favourited, uri, url, favourites_count, visibility},
    // current
    { user_credentials, domain, access_token, notification_count, instance },
    // Actions
    { ReplyAction, BoostAction, FavouriteAction, HideAction, DeleteAction, DetailAction },
) => {
    let rebloggedName = "";
    let tootID = id;
    if(reblog){
        rebloggedName = account.display_name !== "" ? account.display_name : account.username;
        tootID = reblog.id;
        content = reblog.content;
        account = reblog.account;
    }
    let myself = user_credentials && user_credentials.acct === account.acct;
    return (
        <View key={id} style={styles.container}>
            { reblog &&
                <View style={styles.isReplyContainer}>
                    <View style={{flex:0.18, borderWidth:0, alignItems:"flex-end"}}>
                        <FontAwesome name={"retweet"} size={16} color={"#2b90d9"} style={{marginRight:5}}/>
                    </View>
                    <Text style={{flex:0.82, color:"#8899a6"}}>{rebloggedName} Reblogged</Text>
                </View>
            }
            <View style={styles.innerContainer}>
                <View style={styles.photoContainer}>
                    <View style={styles.innerPhotoContainer}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("Profile")}>
                            <Image
                                source={{uri: account.avatar}}
                                style={styles.photo}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.info}>
                    <View style={styles.userDetails}>
                        <Text style={styles.userName} ellipsizeMode="tail" numberOfLines={1} >{account.display_name !== "" ? account.display_name : account.username}
                            <Text style={styles.userHandleAndTime}>{" @"+account.acct}</Text>
                        </Text>
                    </View>
                    <View style={styles.tootTextContainer}>
                        <Text style={styles.tootText}>{bodyFormat(content)}</Text>
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
                    </View>
                </View>
            </View>
        </View>
    );
};

MastoRow.propTypes = {
    id: PropTypes.number.isRequired,
    created_at: PropTypes.number,
    in_reply_to_id: PropTypes.number,
    in_reply_to_account_id: PropTypes.number,
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
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
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
        paddingRight:60,
        paddingTop: 5,
        paddingBottom: 5,
        flexDirection: "row"
    },
    itemFlex: {
        flex: 1,
        paddingRight: 10,
    },
});

export default MastoRow;