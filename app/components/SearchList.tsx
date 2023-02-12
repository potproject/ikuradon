import React, { useContext } from "react";
import { View, FlatList, Clipboard, StyleSheet, TouchableOpacity } from "react-native";
import { ThemeContext } from "react-native-elements";
import { useDispatch } from "react-redux";
import { ListItem, Avatar } from "react-native-elements";
import * as searchConst from "../constants/search";

import { open as openUrl } from "../util/url";

import { follow as FollowAction  } from "../actions/actioncreators/mastorow";

import { FontAwesome } from "@expo/vector-icons";
import Follow from "./item/Follow";

export default function SearchList({ type, data }){
    const dispatch = useDispatch();
    const { theme }= useContext(ThemeContext);
    const actions = {
        FollowAction: (id, followed) => {dispatch(FollowAction(id, followed))},
    };
    return (
        <View style={styles.container}>
            <FlatList
                keyExtractor={data => type === searchConst.TYPE_HASHTAGS ? data.name : data.id}
                data={data}
                renderItem={({ item }) =>{
                    switch (type){
                        case searchConst.TYPE_ACCOUNTS:
                            return (
                                <ListItem bottomDivider onPress={() => {openUrl(item.url)}}>
                                    <Avatar source={{ uri: item.avatar }} />
                                    <ListItem.Content>
                                        <Follow id={item.id} style={styles.followIcon} onFollow={actions.FollowAction}/>
                                        <ListItem.Title>{item.display_name}</ListItem.Title>
                                        <ListItem.Subtitle>{item.acct}</ListItem.Subtitle>
                                    </ListItem.Content>
                                </ListItem>
                            );
                        case searchConst.TYPE_STATUSES:
                            return null;
                        case searchConst.TYPE_HASHTAGS:
                            return (
                                <ListItem bottomDivider onPress={() => Clipboard.setString("#" + item.name)}>
                                    <ListItem.Content>
                                        <ListItem.Title>{"#" + item.name} <FontAwesome name={"copy"} size={16} color={theme.colors.grey0} style={{ marginRight: 5 }} /></ListItem.Title>
                                        <ListItem.Subtitle>{item && item.history && item.history[0] && item.history[0].accounts}</ListItem.Subtitle>
                                    </ListItem.Content>
                                </ListItem>
                            );
                    }
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    followIcon: {
        flex: 1,
    }
});