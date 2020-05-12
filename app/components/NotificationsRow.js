import React, { useContext } from "react";
import { Text, View, StyleSheet } from "react-native";
import MastoRow from "../components/MastoRow";
import { emojisArrayToObject } from "../util/parser";

import t from "../services/I18n";
import CustomEmoji from "react-native-customemoji";

import { NEW_NOTIFICATION_TYPE } from "../util/notification";

import { FontAwesome } from "@expo/vector-icons";
import { ThemeContext, Image } from "react-native-elements";

const NotificationsRow = ({ item, current, actions }) => {
    const {id, type } = item;
    const { theme } = useContext(ThemeContext);
    if(type === NEW_NOTIFICATION_TYPE.FAVOURITEANDBOOST){
        const { status, favouriteAccounts, boostAccounts } = item;
        const boostAccountNames = boostAccounts.map((account) => account.display_name !== "" ? account.display_name : account.username);
        const favouriteAccountNames = favouriteAccounts.map((account) => account.display_name !== "" ? account.display_name : account.username);
        let emojis = {};
        return (
            <View key={id} style={[styles.container,{backgroundColor: theme.customColors.charBackground}]}>
                { boostAccounts.length > 0 &&
                <View style={styles.favAndBoostContainer}>
                    <View style={{flex:0.18, borderWidth:0, alignItems:"flex-end"}}>
                        <FontAwesome name={"retweet"} size={22} color={theme.customColors.item.boost} style={{marginRight:5}}/>
                    </View>
                    <Text style={{flex:0.82, color: theme.colors.grey0}} ellipsizeMode="tail" numberOfLines={1}>
                        {boostAccounts.map((account, i) => {
                            emojis = Object.assign(emojis, emojisArrayToObject(account.emojis));
                            return (
                                <View key={i} style={styles.photoMargin}>
                                    <Image style={styles.photo} source={{uri: account.avatar}} />
                                </View>
                            );
                        })
                        }
                    </Text>
                </View>
                }
                { favouriteAccounts.length > 0 &&
                <View style={styles.favAndBoostContainer}>
                    <View style={{flex:0.18, borderWidth:0, alignItems:"flex-end"}}>
                        <FontAwesome name={"star"} size={22} color={theme.customColors.item.favourite} style={{marginRight:5}}/>
                    </View>
                    <Text style={{flex:0.82, color: theme.colors.grey0}} ellipsizeMode="tail" numberOfLines={1}>
                        {favouriteAccounts.map((account, i) => {
                            emojis = Object.assign(emojis, emojisArrayToObject(account.emojis));
                            return (
                                <View key={i} style={styles.photoMargin}>
                                    <Image style={styles.photo} source={{uri: account.avatar}} />
                                </View>
                            );
                        })
                        }
                    </Text>
                </View>
                }
                <View style={styles.favAndBoostMessage}>
                    <View style={{flex:0.18, borderWidth:0, alignItems:"flex-end"}}></View>
                    <CustomEmoji style={{flex:0.82}} emojis={emojis}>
                        <Text style={{color: theme.colors.grey0}} ellipsizeMode="tail" numberOfLines={2}>
                            {boostAccountNames.concat(favouriteAccountNames).filter((x, i, self) => (self.indexOf(x) === i)).join(", ")}
                        </Text>
                    </CustomEmoji>
                </View>
                <MastoRow item={status} current={current} actions={actions} />
            </View>
        );
    }else if(type === NEW_NOTIFICATION_TYPE.FOLLOW){
        const { account } = item;
        return (
            <View key={id} style={[styles.container,{backgroundColor: theme.customColors.charBackground}]}>
                <View style={styles.favAndBoostContainer}>
                    <View style={{flex:0.18, borderWidth:0, alignItems:"flex-end"}}>
                        <FontAwesome name={"user"} size={22} color={theme.customColors.item.boost} style={{marginRight:5}}/>
                    </View>
                    <Text style={{flex:0.82, color: theme.colors.grey0}} ellipsizeMode="tail" numberOfLines={1}>
                        <View style={styles.photoMargin}>
                            <Image style={styles.photo} source={{uri: account.avatar}} />
                        </View>
                    </Text>
                </View>
                <View style={styles.followMessage}>
                    <View style={{flex:0.18, borderWidth:0, alignItems:"flex-end"}}></View>
                    <CustomEmoji style={{flex:0.82}} emojis={emojisArrayToObject(account.emojis)}>
                        <Text style={[styles.followMessageName,{color: theme.customColors.char}]} ellipsizeMode="tail" numberOfLines={2}>
                            {(account.display_name !== "" ? account.display_name : account.username)}
                            <Text style={[styles.followMessageNotice,{color: theme.customColors.char}]}>{t("notifications.followed")}</Text>
                        </Text>
                    </CustomEmoji>
                </View>
            </View>
        );
    }else if(type === NEW_NOTIFICATION_TYPE.MENTION){
        const { status, account } = item;
        return (
            <View key={id} style={[styles.container,{backgroundColor: theme.customColors.charBackground}]}>
                <View style={styles.mention}>
                    <View style={{flex:0.18, borderWidth:0, alignItems:"flex-end"}}>
                        <FontAwesome name={"reply"} size={22} color={theme.customColors.item.boost} style={{marginRight:5}}/>
                    </View>
                    <CustomEmoji style={{ flex:0.82 }} emojis={emojisArrayToObject(account.emojis)}>
                        <Text style={[styles.mentionMessageName,{color: theme.customColors.char}]} ellipsizeMode="tail" numberOfLines={2}>
                            {(account.display_name !== "" ? account.display_name : account.username)}
                            <Text style={[styles.mentionMessageNotice,{color: theme.customColors.char}]}>{t("notifications.mentioned")}</Text>
                        </Text>
                    </CustomEmoji>
                </View>
                <MastoRow item={status} current={current} actions={actions} />
            </View>
        );
    }

};

const styles = StyleSheet.create({
    container: {
        paddingTop: 8,
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
        width: 30,
        height: 30,
        borderRadius: 4,
    },
    photoMargin: {
        marginLeft: 2,
        marginRight: 2
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
});

export default NotificationsRow;