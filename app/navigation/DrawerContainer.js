import React, { useContext } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView
} from "react-native";
import { useSelector } from "react-redux";
import CustomEmoji from "react-native-customemoji";
import { emojisArrayToObject } from "../util/parser";

import { ThemeContext } from "react-native-elements";
import { Divider } from "react-native-elements";

import { FontAwesome } from "@expo/vector-icons";

const CurrentUserReducerSelector = state => state.currentUserReducer;

export default function DrawerContainer({navigation}){
    const { theme } = useContext(ThemeContext);
    const { user_credentials, domain } = useSelector(CurrentUserReducerSelector);
    return (
        <View style={[styles.container, {backgroundColor:theme.customColors.charBackground}]}>
            <View style={styles.profile}>
                <Image
                    onPress={() => navigation.navigate("Profile")}
                    source={{uri: user_credentials && user_credentials.avatar}}
                    style={styles.photo}/>
                <CustomEmoji emojis={emojisArrayToObject(user_credentials.emojis)}>
                    <Text style={[styles.userName, { color: theme.customColors.char }]}>{user_credentials && user_credentials.display_name}</Text>
                </CustomEmoji>
                <Text style={[styles.userHandle, { color: theme.colors.grey0 }]}>{user_credentials && "@"+user_credentials.username}</Text>
                <Text style={[styles.domain, { color: theme.colors.grey0 }]}>{domain}</Text>
                <View>
                    <Text style={[styles.followingCount, { color: theme.customColors.char }]}>{user_credentials.following_count}
                        <Text style={[styles.followingText, { color: theme.colors.grey0 }]}> Following</Text>
                    </Text>
                    <Text style={[styles.followersCount, { color: theme.customColors.char }]}>{user_credentials.followers_count}
                        <Text style={[styles.followersText, { color: theme.colors.grey0 }]}> Followers</Text>
                    </Text>
                </View>
            </View>
            <Divider />
            <View style={styles.fixedListContainer}>
                <TouchableOpacity style={styles.fixedList}>
                    <View>
                        <FontAwesome style={styles.icon} name='envelope' size={18} color={theme.colors.grey0}/>
                        <Text style={styles.text}> Direct Message </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.fixedList}>
                    <View>
                        <FontAwesome style={styles.icon} name='bookmark' size={20} color={theme.colors.grey0}/>
                        <Text style={styles.text}> Bookmarks </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.fixedList}>
                    <View>
                        <FontAwesome style={styles.icon} name='star' size={20} color={theme.colors.grey0}/>
                        <Text style={styles.text}> Favourited </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.fixedList}>
                    <View>
                        <FontAwesome style={styles.icon} name='cog' size={20} color={theme.colors.grey0}/>
                        <Text style={styles.text}> Setting </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.fixedList}>
                    <View>
                        <FontAwesome style={styles.icon} name='file' size={18} color={theme.colors.grey0}/>
                        <Text style={styles.text}> License </Text>
                    </View>
                </TouchableOpacity>
            </View>
            <Divider />
            <ScrollView>
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
        color: "black",
        fontSize: 16
    },
    profile:{
        paddingBottom: 30,
        paddingLeft: 30,
        marginBottom: 20
    },
    photo: {
        width: 50,
        height: 50,
        borderRadius: 0,
        marginTop: 20,
        borderWidth: 2,
        borderColor: "#FF3300",
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
    followingCount:{
        position: "absolute",
        left: 0,
        top: 10,
        fontWeight: "bold"
    },
    followingText:{
        fontWeight: "300"
    },
    followersCount:{
        position: "absolute",
        right: 40,
        top: 10,
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