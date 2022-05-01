import React, { useContext } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import CustomEmoji from "react-native-customemoji";
import { emojisArrayToObject } from "../util/parser";

import { ThemeContext } from "react-native-elements";
import { Divider } from "react-native-elements";

import { FontAwesome } from "@expo/vector-icons";
import t from "../services/I18n";

import * as RouterName from "../constants/RouterName";
import UserList from "../components/UserList";

import { loginSelectAccounts, accountChangeWithDelete } from "../actions/actioncreators/login";
const CurrentUserReducerSelector = state => state.currentUserReducer;

export default function DrawerContainer({ navigation }){
    const dispatch = useDispatch();
    const { theme } = useContext(ThemeContext);
    const current = useSelector(CurrentUserReducerSelector);
    const { user_credentials, domain } = current;
    return (
        <View style={[styles.container, { backgroundColor:theme.customColors.charBackground }]}>
            <View style={styles.profile}>
                { user_credentials &&
                <Image
                    onPress={() => navigation.navigate("Profile")}
                    source={{ uri: user_credentials.avatar }}
                    style={[{ borderColor: theme.colors.primary }, styles.photo]}/>
                }
                <CustomEmoji emojis={user_credentials && user_credentials.emojis ? emojisArrayToObject(user_credentials.emojis) : []}>
                    <Text style={[styles.userName, { color: theme.customColors.char }]}>{user_credentials && user_credentials.display_name}</Text>
                </CustomEmoji>
                <Text style={[styles.userHandle, { color: theme.colors.grey0 }]}>{user_credentials && "@"+user_credentials.username}</Text>
                <Text style={[styles.domain, { color: theme.colors.grey0 }]}>{domain}</Text>
                <View>
                    <Text style={[styles.postsCount, { color: theme.customColors.char }]}>{user_credentials && user_credentials.statuses_count.toLocaleString()}
                        <Text style={[styles.postsText, { color: theme.colors.grey0 }]}> {t("drawer_posts")}</Text>
                    </Text>
                    <Text style={[styles.followingCount, { color: theme.customColors.char }]}>{user_credentials && user_credentials.following_count.toLocaleString()}
                        <Text style={[styles.followingText, { color: theme.colors.grey0 }]}> {t("drawer_following")}</Text>
                    </Text>
                    <Text style={[styles.followersCount, { color: theme.customColors.char }]}>{user_credentials && user_credentials.followers_count.toLocaleString()}
                        <Text style={[styles.followersText, { color: theme.colors.grey0 }]}> {t("drawer_follower")}</Text>
                    </Text>
                </View>
            </View>
            <Divider />
            <View style={styles.fixedListContainer}>
                { /*
                <TouchableOpacity style={styles.fixedList} onPress={()=>{
                    navigation.closeDrawer();
                }} >
                    <View>
                        <FontAwesome style={styles.icon} name='envelope' size={18} color={theme.colors.grey0}/>
                        <Text style={styles.text}> {t("directmessage_title")} </Text>
                    </View>
                </TouchableOpacity>
                */ }
                <TouchableOpacity style={styles.fixedList} onPress={()=>{
                    navigation.closeDrawer();
                    navigation.navigate(RouterName.Search);
                }} >
                    <View>
                        <FontAwesome style={styles.icon} name='search' size={20} color={theme.colors.grey0}/>
                        <Text style={[{ color: theme.customColors.char }, styles.text]}> {t("search_title")} </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.fixedList} onPress={()=>{
                    navigation.closeDrawer();
                    navigation.navigate(RouterName.Bookmarks);
                }} >
                    <View>
                        <FontAwesome style={styles.icon} name='bookmark' size={20} color={theme.colors.grey0}/>
                        <Text style={[{ color: theme.customColors.char }, styles.text]}> {t("bookmarks_title")} </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.fixedList} onPress={()=>{
                    navigation.closeDrawer();
                    navigation.navigate(RouterName.Favourites);
                }} >
                    <View>
                        <FontAwesome style={styles.icon} name='star' size={20} color={theme.colors.grey0}/>
                        <Text style={[{ color: theme.customColors.char }, styles.text]}> {t("favourited_title")} </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.fixedList} onPress={()=>{
                    navigation.closeDrawer();
                    navigation.navigate(RouterName.Settings);
                }} >
                    <View>
                        <FontAwesome style={styles.icon} name='cog' size={20} color={theme.colors.grey0}/>
                        <Text style={[{ color: theme.customColors.char }, styles.text]}> {t("settings_title")} </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.fixedList} onPress={()=>{
                    navigation.closeDrawer();
                    navigation.navigate(RouterName.Login);
                }} >
                    <View>
                        <FontAwesome style={styles.icon} name='user' size={18} color={theme.colors.grey1}/>
                        <Text style={[{ color: theme.colors.grey1 }, styles.text]}> {t("drawer_addaccount")} </Text>
                    </View>
                </TouchableOpacity>
            </View>
            <Divider />
            <ScrollView>
                <UserList 
                    current={current}
                    onSelect={(index) => dispatch(loginSelectAccounts(index))}
                    onCancel={(index) => dispatch(accountChangeWithDelete(index))}
                />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50
    },
    fixedListContainer:{
        paddingBottom: 10
    },
    fixedList: {
        padding: 10,
        height: 60,
        borderWidth: 0
    },
    text: {
        position: "absolute",
        left: "20%",
        top: 10,
        fontSize: 16
    },
    profile:{
        paddingBottom: 30,
        paddingLeft: 30,
        marginBottom: 40
    },
    photo: {
        width: 50,
        height: 50,
        borderRadius: 0,
        marginTop: 20,
        borderWidth: 2,
    },
    userName:{
        marginTop: 10,
        fontSize: 16,
        fontWeight: "bold"
    },
    userHandle:{
        marginTop: 5,
        fontWeight: "300"
    },
    domain:{
        marginTop: 2,
        fontWeight: "300"
    },
    postsCount:{
        position: "absolute",
        left: 0,
        top: 10,
        fontWeight: "bold"
    },
    postsText:{
        fontWeight: "300"
    },
    followingCount:{
        position: "absolute",
        left: 0,
        top: 40,
        fontWeight: "bold"
    },
    followingText:{
        fontWeight: "300"
    },
    followersCount:{
        position: "absolute",
        right: 40,
        top: 40,
        fontWeight: "bold"
    },
    followersText:{
        fontWeight: "300"
    },
    icon:{
        position: "absolute",
        left: 20,
        top: 10
    }
});