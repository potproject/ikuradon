import React, { useContext } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, } from "react-native";
import MastoRow from "../components/MastoRow";
import { emojisArrayToObject } from "../util/parser";

import t from "../services/I18n";
import CustomEmoji from "react-native-customemoji";

import { NEW_NOTIFICATION_TYPE } from "../util/notification";

import { FontAwesome } from "@expo/vector-icons";
import { ThemeContext } from "react-native-elements";

const NotificationsRow = ({ navigation, item, current, actions }) => {
    const {id, type, status, favouriteAccounts, boostAccounts } = item;
    const { theme } = useContext(ThemeContext);
    if(type === NEW_NOTIFICATION_TYPE.FAVOURITEANDBOOST){
        const boostAccountNames = boostAccounts.map((account) => account.display_name !== "" ? account.display_name : account.username);
        const favouriteAccountNames = favouriteAccounts.map((account) => account.display_name !== "" ? account.display_name : account.username);
        let emojis = {};
        return (
            <View key={id} style={[styles.container,{backgroundColor: theme.customColors.charBackground}]}>
                <View style={{marginTop: 8}}></View>
                { boostAccounts.length > 0 &&
                <View style={styles.favAndBoostContainer}>
                    <View style={{flex:0.18, borderWidth:0, alignItems:"flex-end"}}>
                        <FontAwesome name={"retweet"} size={22} color={theme.customColors.item.boost} style={{marginRight:5}}/>
                    </View>
                    <Text style={{flex:0.82, color: theme.colors.grey0}} ellipsizeMode="tail" numberOfLines={1}>
                        {boostAccounts.map((account, i) => {
                            emojis = Object.assign(emojis, emojisArrayToObject(account.emojis));
                            return (
                                <View style={styles.photoMargin}>
                                    <Image key={i} style={styles.photo} source={{uri: account.avatar}} />
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
                                <View style={styles.photoMargin}>
                                    <Image key={i} style={styles.photo} source={{uri: account.avatar}} />
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
    }else{
        return (
            <View key={id} style={[styles.container,{backgroundColor: theme.customColors.charBackground}]}>
            </View>
        );
    }

};

const styles = StyleSheet.create({
    container: {
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
        marginLeft:2,
        marginRight: 2
    }
});

export default NotificationsRow;