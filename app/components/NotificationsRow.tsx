import React, { useContext, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Pressable } from "react-native";
import MastoRow from "../components/MastoRow";
import { emojisArrayToObject } from "../util/parser";

import t from "../services/I18n";
import CustomEmoji from "react-native-customemoji";

import { NEW_NOTIFICATION_TYPE } from "../util/notification";

import { FontAwesome } from "@expo/vector-icons";
import { ThemeContext, Image } from "react-native-elements";
import Follow from "./item/Follow";

import { open as openUrl } from "../util/url";
import { accountURLMigrate } from "../util/account";

const MAX_DISPLAY_IMAGE = 8;

const NotificationsRow = ({ item, current, actions, background, fontSize }) => {
    const { id, type } = item;
    const [displayImageLimit, useDisplayImageLimit] = useState(true);
    const { theme } = useContext(ThemeContext);
    if (type === NEW_NOTIFICATION_TYPE.FAVOURITEANDBOOSTANDREACTION){
        const { status, favouriteAccounts, boostAccounts, reactions } = item;
        const boostAccountNames = boostAccounts.map((account) => account.display_name !== "" ? account.display_name : account.username);
        const favouriteAccountNames = favouriteAccounts.map((account) => account.display_name !== "" ? account.display_name : account.username);
        const reactionAccountNames = reactions.map(({ accounts }) => accounts).flat().map((account) => account.display_name !== "" ? account.display_name : account.username);
        let emojis = {};
        return (
            <View key={id} style={[styles.container, { backgroundColor: !background ? theme.customColors.charBackground : null }]}>
                <Pressable
                    onPress={() => { useDisplayImageLimit(!displayImageLimit) }}
                >
                    { boostAccounts.length > 0 &&
                    <View style={styles.favAndBoostContainer}>
                        <View style={styles.paddingReverse}>
                            <FontAwesome name={"retweet"} size={fontSize.text+6} color={theme.customColors.item.boost} style={styles.icon}/>
                            <Text style={[{ color: theme.colors.grey0 }, { fontSize: fontSize.text }, styles.count]}>{boostAccounts.length}</Text>
                        </View>
                        <View style={[styles.imgContainer, { color: theme.colors.grey0 }]}>
                            {boostAccounts.map((account, i) => {
                                if (displayImageLimit && i+1 > MAX_DISPLAY_IMAGE){
                                    return null;
                                }
                                emojis = Object.assign(emojis, emojisArrayToObject(account.emojis));
                                return (
                                    <Image key={i} style={styles.photo} source={{ uri: account.avatar }} />
                                );
                            })
                            }
                            { displayImageLimit && boostAccounts.length > MAX_DISPLAY_IMAGE &&
                                <Text style={{ color: theme.colors.grey0 }}>...</Text>
                            }
                        </View>
                    </View>
                    }
                    { !displayImageLimit &&
                        <View style={styles.favAndBoostMessage}>
                            <View style={styles.paddingEnd}></View>
                            <CustomEmoji emojiStyle={{ width: fontSize.userNameEmoji, height: fontSize.userNameEmoji, resizeMode: "contain" }} style={styles.info} emojis={emojis}>
                                <Text style={{ color: theme.colors.grey0, fontSize: fontSize.userName }} ellipsizeMode="tail">
                                    { boostAccountNames.join(", ")}
                                </Text>
                            </CustomEmoji>
                        </View>
                    }   
                    { favouriteAccounts.length > 0 &&
                    <View style={styles.favAndBoostContainer}>
                        <View style={styles.paddingReverse}>
                            <FontAwesome name={"star"} size={fontSize.text+6} color={theme.customColors.item.favourite} style={styles.icon}/>
                            <Text style={[{ color: theme.colors.grey0 }, { fontSize: fontSize.text }, styles.count]}>{favouriteAccounts.length}</Text>
                        </View>
                        <View style={[styles.imgContainer, { color: theme.colors.grey0 }]}>
                            {favouriteAccounts.map((account, i) => {
                                if (displayImageLimit && i+1 > MAX_DISPLAY_IMAGE){
                                    return null;
                                }
                                emojis = Object.assign(emojis, emojisArrayToObject(account.emojis));
                                return (
                                    <Image key={i} style={styles.photo} source={{ uri: account.avatar }} />
                                );
                            })
                            }
                            { displayImageLimit && favouriteAccounts.length > MAX_DISPLAY_IMAGE &&
                                <Text style={{ color: theme.colors.grey0 }}>...</Text>
                            }
                        </View>
                    </View>
                    }
                    { !displayImageLimit &&
                        <View style={styles.favAndBoostMessage}>
                            <View style={styles.paddingEnd}></View>
                            <CustomEmoji emojiStyle={{ width: fontSize.userNameEmoji, height: fontSize.userNameEmoji, resizeMode: "contain" }} style={styles.info} emojis={emojis}>
                                <Text style={{ color: theme.colors.grey0, fontSize: fontSize.userName }} ellipsizeMode="tail">
                                    { favouriteAccountNames.join(", ")}
                                </Text>
                            </CustomEmoji>
                        </View>
                    }   
                    { reactions.length > 0 &&
                    reactions.map((reaction) => {
                        return <View key={reaction.emoji + "_reaction"} style={styles.favAndBoostContainer}>
                            <View style={styles.paddingReverse}>
                                { reaction.url && 
                                    <Image style={styles.reactionImg} source={{ uri: reaction.url }} />
                                }
                                { !reaction.url && 
                                    <Text style={[styles.reactionChar, { fontSize: fontSize.text }]}>{reaction.emoji}</Text>
                                }
                                <Text style={[{ color: theme.colors.grey0 }, { fontSize: fontSize.text }, styles.count]}>{reaction.accounts.length}</Text>
                            </View>
                            <View style={[styles.imgContainer, { color: theme.colors.grey0 }]}>
                                { reaction.accounts.map((account, i) => {
                                    if (displayImageLimit && i+1 > MAX_DISPLAY_IMAGE){
                                        return null;
                                    }
                                    emojis = Object.assign(emojis, emojisArrayToObject(account.emojis));
                                    return (
                                        <Image key={i} style={styles.photo} source={{ uri: account.avatar }} />
                                    );
                                })
                                }
                                { displayImageLimit && reactions.length > MAX_DISPLAY_IMAGE &&
                                <Text style={{ color: theme.colors.grey0 }}>...</Text>
                                }
                            </View>
                        </View>
                        ;
                    })
                    }
                    { !displayImageLimit &&
                        <View style={styles.favAndBoostMessage}>
                            <View style={styles.paddingEnd}></View>
                            <CustomEmoji emojiStyle={{ width: fontSize.userNameEmoji, height: fontSize.userNameEmoji, resizeMode: "contain" }} style={styles.info} emojis={emojis}>
                                <Text style={{ color: theme.colors.grey0, fontSize: fontSize.userName }} ellipsizeMode="tail">
                                    { reactionAccountNames.join(", ")}
                                </Text>
                            </CustomEmoji>
                        </View>
                    }   
                    <View style={styles.favAndBoostMessage}>
                        <View style={styles.paddingEnd}></View>
                        { displayImageLimit &&
                        <CustomEmoji emojiStyle={{ width: fontSize.userNameEmoji, height: fontSize.userNameEmoji, resizeMode: "contain" }} style={styles.info} emojis={emojis}>
                            <Text style={{ color: theme.colors.grey0, fontSize: fontSize.userName }} ellipsizeMode="tail" numberOfLines={4}>
                                { boostAccountNames.concat(favouriteAccountNames).concat(reactionAccountNames).filter((x, i, self) => (self.indexOf(x) === i)).join(", ")}
                            </Text>
                        </CustomEmoji>
                        }
                    </View>
                </Pressable>
                <MastoRow item={status} current={current} actions={actions} background={background} fontSize={fontSize} />
            </View>
        );
    } else if (type === NEW_NOTIFICATION_TYPE.FOLLOW){
        const { account } = item;
        return (
            <View key={id} style={[styles.container, { backgroundColor: !background ? theme.customColors.charBackground : null }]}>
                <TouchableOpacity delayPressIn={150} onPress={() => openUrl(accountURLMigrate(current.sns, current.domain, account.url))}>
                    <View style={styles.favAndBoostContainer}>
                        <View style={styles.paddingReverse}>
                            <FontAwesome name={"user"} size={fontSize.text+6} color={theme.customColors.item.boost} style={styles.icon}/>
                        </View>
                        <View style={[styles.info, { flexDirection: "row", color: theme.colors.grey0 }]}>
                            <Image style={styles.photo} source={{ uri: account.avatar }} />
                            <Follow id={account.id} style={styles.followIcon} onFollow={actions.FollowAction}/>
                        </View>
                    </View>
                    <View style={styles.followMessage}>
                        <View style={{ flex:0.18, borderWidth:0, alignItems:"flex-end" }}></View>
                        <CustomEmoji emojiStyle={{ width: fontSize.emoji, height: fontSize.emoji, resizeMode: "contain" }} style={styles.info} emojis={emojisArrayToObject(account.emojis)}>
                            <Text style={[styles.followMessageName, { fontSize: fontSize.text }, { color: theme.customColors.char }]} ellipsizeMode="tail" numberOfLines={4}>
                                {(account.display_name !== "" ? account.display_name : account.username)}
                                <Text style={[styles.followMessageNotice, { fontSize: fontSize.text }, { color: theme.customColors.char }]}>{t("notifications.followed")}</Text>
                            </Text>
                        </CustomEmoji>
                    </View>
                </TouchableOpacity>
            </View>
        );
    } else if (type === NEW_NOTIFICATION_TYPE.MENTION){
        const { status, account } = item;
        return (
            <View key={id} style={[styles.container, { backgroundColor: !background ? theme.customColors.charBackground : null }]}>
                <View style={styles.mention}>
                    <View style={styles.paddingEnd}>
                        <FontAwesome name={"reply"} size={fontSize.text+6} color={theme.customColors.item.boost} style={{ marginRight:5 }}/>
                    </View>
                    <CustomEmoji emojiStyle={{ width: fontSize.userNameEmoji, height: fontSize.userNameEmoji, resizeMode: "contain" }} style={styles.info} emojis={emojisArrayToObject(account.emojis)}>
                        <Text style={[styles.mentionMessageName, { fontSize: fontSize.text }, { color: theme.customColors.char }]} ellipsizeMode="tail" numberOfLines={4}>
                            {(account.display_name !== "" ? account.display_name : account.username)}
                            <Text style={[styles.mentionMessageNotice, { fontSize: fontSize.text }, { color: theme.customColors.char }]}>{t("notifications.mentioned")}</Text>
                        </Text>
                    </CustomEmoji>
                </View>
                <MastoRow item={status} current={current} actions={actions} background={background} fontSize={fontSize} />
            </View>
        );
    }

};

const styles = StyleSheet.create({
    container: {
        paddingTop: 8,
    },
    paddingReverse:{ 
        width: 68,
        flexDirection: "row-reverse"
    },
    paddingEnd:{ 
        width: 68,
        borderWidth: 0,
        alignItems: "flex-end"
    },
    info:{
        flex: 1
    },
    imgContainer: {
        flex: 1,
        flexWrap: "wrap",
        flexDirection: "row",
        alignItems: "stretch",
    },
    favAndBoostContainer: {
        flex: 1,
        flexDirection: "row",
        borderWidth: 0,
        marginTop: 2,
        marginBottom: 6,
    },
    favAndBoostMessage: {
        flex: 1,
        flexDirection: "row",
    },
    reactionImg: {
        width:25,
        height:25,
        marginRight: 5,
        alignSelf: "center"
    },
    reactionChar: {
        marginLeft: 3,
        marginRight: 4,
        marginTop: 6,
        marginBottom: 2,
    },
    photo: {
        marginLeft: 2,
        marginRight: 2,
        marginTop: 2,
        marginBottom: 2,
        width: 30,
        height: 30,
        borderRadius: 4,
    },
    count: {
        fontWeight: "bold",
        marginRight: 5,
        alignSelf: "center",

    },
    icon:{
        width:25,
        height:25,
        marginRight: 5,
        alignSelf: "center"
    },
    followMessage: {
        flex: 1,
        flexDirection: "row",
        marginTop: 5,
        marginBottom:5
    },
    followMessageName: {
        fontWeight: "bold"
    },
    followMessageNotice: {
        fontWeight: "normal"
    },
    mention:{
        flex: 1,
        flexDirection: "row",
    },
    mentionMessageName: {
        fontWeight: "bold"
    },
    mentionMessageNotice: {
        fontWeight: "normal"
    },
    followIcon: {
        flex: 1,
        paddingLeft: 5,
        marginRight: 5,
    }
});

export default NotificationsRow;