import React, { useContext } from "react";
import { Text, View, StyleSheet } from "react-native";
import MastoRow from "../components/MastoRow";
import { emojisArrayToObject } from "../util/parser";

import t from "../services/I18n";
import CustomEmoji from "react-native-customemoji";

import { NEW_NOTIFICATION_TYPE } from "../util/notification";

import { FontAwesome } from "@expo/vector-icons";
import { ThemeContext, Image } from "react-native-elements";
import Follow from "./item/Follow";

const MAX_DISPLAY_IMAGE = 8;

const NotificationsRow = ({ item, current, actions, background }) => {
    const { id, type } = item;
    const { theme } = useContext(ThemeContext);
    if (type === NEW_NOTIFICATION_TYPE.FAVOURITEANDBOOST){
        const { status, favouriteAccounts, boostAccounts } = item;
        const boostAccountNames = boostAccounts.map((account) => account.display_name !== "" ? account.display_name : account.username);
        const favouriteAccountNames = favouriteAccounts.map((account) => account.display_name !== "" ? account.display_name : account.username);
        let emojis = {};
        return (
            <View key={id} style={[styles.container, { backgroundColor: !background ? theme.customColors.charBackground : null }]}>
                { boostAccounts.length > 0 &&
                <View style={styles.favAndBoostContainer}>
                    <View style={styles.paddingReverse}>
                        <FontAwesome name={"retweet"} size={22} color={theme.customColors.item.boost} style={styles.icon}/>
                        <Text style={[{ color: theme.colors.grey0 }, styles.count]}>{boostAccounts.length}</Text>
                    </View>
                    <View style={[styles.info, { flexDirection: "row", color: theme.colors.grey0 }]}>
                        {boostAccounts.map((account, i) => {
                            if (i+1 > MAX_DISPLAY_IMAGE){
                                return null;
                            }
                            emojis = Object.assign(emojis, emojisArrayToObject(account.emojis));
                            return (
                                <Image key={i} style={styles.photo} source={{ uri: account.avatar }} />
                            );
                        })
                        }
                        { boostAccounts.length > MAX_DISPLAY_IMAGE &&
                            <Text style={{ color: theme.colors.grey0 }}>...</Text>
                        }
                    </View>
                </View>
                }
                { favouriteAccounts.length > 0 &&
                <View style={styles.favAndBoostContainer}>
                    <View style={styles.paddingReverse}>
                        <FontAwesome name={"star"} size={22} color={theme.customColors.item.favourite} style={styles.icon}/>
                        <Text style={[{ color: theme.colors.grey0 }, styles.count]}>{favouriteAccounts.length}</Text>
                    </View>
                    <View style={[styles.info, { flexDirection: "row", color: theme.colors.grey0 }]}>
                        {favouriteAccounts.map((account, i) => {
                            if (i+1 > MAX_DISPLAY_IMAGE){
                                return null;
                            }
                            emojis = Object.assign(emojis, emojisArrayToObject(account.emojis));
                            return (
                                <Image key={i} style={styles.photo} source={{ uri: account.avatar }} />
                            );
                        })
                        }
                        { favouriteAccounts.length > MAX_DISPLAY_IMAGE &&
                            <Text style={{ color: theme.colors.grey0 }}>...</Text>
                        }
                    </View>
                </View>
                }
                <View style={styles.favAndBoostMessage}>
                    <View style={styles.paddingEnd}></View>
                    <CustomEmoji style={styles.info} emojis={emojis}>
                        <Text style={{ color: theme.colors.grey0 }} ellipsizeMode="tail" numberOfLines={2}>
                            {boostAccountNames.concat(favouriteAccountNames).filter((x, i, self) => (self.indexOf(x) === i)).join(", ")}
                        </Text>
                    </CustomEmoji>
                </View>
                <MastoRow item={status} current={current} actions={actions} background={background} />
            </View>
        );
    } else if (type === NEW_NOTIFICATION_TYPE.FOLLOW){
        const { account } = item;
        return (
            <View key={id} style={[styles.container, { backgroundColor: !background ? theme.customColors.charBackground : null }]}>
                <View style={styles.favAndBoostContainer}>
                    <View style={styles.paddingReverse}>
                        <FontAwesome name={"user"} size={22} color={theme.customColors.item.boost} style={styles.icon}/>
                    </View>
                    <View style={[styles.info, { flexDirection: "row", color: theme.colors.grey0 }]}>
                        <Image style={styles.photo} source={{ uri: account.avatar }} />
                        <Follow id={account.id} style={styles.followIcon} onFollow={actions.FollowAction}/>
                    </View>
                </View>
                <View style={styles.followMessage}>
                    <View style={{ flex:0.18, borderWidth:0, alignItems:"flex-end" }}></View>
                    <CustomEmoji style={styles.info} emojis={emojisArrayToObject(account.emojis)}>
                        <Text style={[styles.followMessageName, { color: theme.customColors.char }]} ellipsizeMode="tail" numberOfLines={2}>
                            {(account.display_name !== "" ? account.display_name : account.username)}
                            <Text style={[styles.followMessageNotice, { color: theme.customColors.char }]}>{t("notifications.followed")}</Text>
                        </Text>
                    </CustomEmoji>
                </View>
            </View>
        );
    } else if (type === NEW_NOTIFICATION_TYPE.MENTION){
        const { status, account } = item;
        return (
            <View key={id} style={[styles.container, { backgroundColor: !background ? theme.customColors.charBackground : null }]}>
                <View style={styles.mention}>
                    <View style={styles.paddingEnd}>
                        <FontAwesome name={"reply"} size={22} color={theme.customColors.item.boost} style={{ marginRight:5 }}/>
                    </View>
                    <CustomEmoji style={styles.info} emojis={emojisArrayToObject(account.emojis)}>
                        <Text style={[styles.mentionMessageName, { color: theme.customColors.char }]} ellipsizeMode="tail" numberOfLines={2}>
                            {(account.display_name !== "" ? account.display_name : account.username)}
                            <Text style={[styles.mentionMessageNotice, { color: theme.customColors.char }]}>{t("notifications.mentioned")}</Text>
                        </Text>
                    </CustomEmoji>
                </View>
                <MastoRow item={status} current={current} actions={actions} background={background} />
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
    favAndBoostContainer: {
        flex: 1,
        flexDirection: "row",
        borderWidth: 0,
        height: 30,
        marginTop: 2
    },
    favAndBoostMessage: {
        flex: 1,
        flexDirection: "row",
    },
    photo: {
        marginLeft: 2,
        marginRight: 2,
        width: 30,
        height: 30,
        borderRadius: 4,
    },
    count: {
        fontSize: 16,
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
        fontWeight: "bold",
        fontSize: 16
    },
    followMessageNotice: {
        fontWeight: "normal",
        fontSize: 16
    },
    mention:{
        flex: 1,
        flexDirection: "row",
    },
    mentionMessageName: {
        fontWeight: "bold",
        fontSize: 16
    },
    mentionMessageNotice: {
        fontWeight: "normal",
        fontSize: 16
    },
    followIcon: {
        flex: 1,
        paddingLeft: 5,
    }
});

export default NotificationsRow;