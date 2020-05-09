import * as React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import PropTypes from "prop-types";
import { FontAwesome } from "@expo/vector-icons";
import { bodyFormat, dateFormat, bodySearchUrl } from "../util/parser";
import {open as openUrl} from "../util/url";
import Hyperlink from "react-native-hyperlink";

const MastoRow = ({ navigation, id, reblog, account, content }) => {
    let rebloggedName = "";
    if(reblog){
        rebloggedName = account.display_name !== "" ? account.display_name : account.username;
        content = reblog.content;
        account = reblog.account;
    }
    return (
        <View key={id} style={styles.container}>
            { reblog &&
                <View style={styles.isReplyContainer}>
                    <View style={{flex:0.23, borderWidth:0, alignItems:"flex-end"}}>
                        <FontAwesome name={"retweet"} size={16} color={"#2b90d9"} style={{marginRight:5}}/>
                    </View>
                    <Text style={{flex:0.77, color:"#8899a6"}}>{rebloggedName} Reblogged</Text>
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
                    <View style={styles.tweetTextContainer}>
                        <Text style={styles.tweetText}>{bodyFormat(content)}</Text>

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
    },
    isReplyContainer: {
        flex: 1,
        flexDirection: "row",
        borderWidth: 0,
        height: 20,
        marginTop: 5
    },
    innerContainer: {
        flex: 1,
        borderColor: "green",
        flexDirection: "row",
        borderWidth: 0,
        height: "auto"
    },
    photoContainer: {
        flex: 0.23,
        borderColor: "yellow",
        flexDirection: "column",
        borderWidth: 0
    },
    innerPhotoContainer: { height: 90, alignItems: "center" },
    photo: {
        width: 50,
        height: 50,
        borderRadius: 5
    },
    info: {
        flex: 0.77,
        borderColor: "yellow",
        flexDirection: "column",
        borderWidth: 0
    },
    userDetails: {
        borderWidth: 0
    },
    userName: { color: "black", fontWeight: "bold" },
    userHandleAndTime: {
        color: "#8899a6",
        fontWeight: "normal"
    },
    tweetTextContainer: { flex: 1, borderColor: "blue", borderWidth: 0 },
    tweetText: { color: "black", paddingRight: 10 },
    tweetActionsContainer: {
        flex: 1,
        borderColor: "blue",
        borderWidth: 0,
        marginTop: 5,
        flexDirection: "row",
        paddingBottom: 5
    },
});

export default MastoRow;