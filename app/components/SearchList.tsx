import React, { useContext } from "react";
import { View, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { ThemeContext } from "react-native-elements";
import { ListItem, Avatar } from "react-native-elements";
import * as searchConst from "../constants/search";

export default function SearchList({ type, data }){
    const { theme }= useContext(ThemeContext);
    return (
        <View style={styles.container}>
            <FlatList
                keyExtractor={data => type === searchConst.TYPE_HASHTAGS ? data.name : data.id}
                data={data}
                renderItem={({ item }) =>{
                    switch (type){
                        case searchConst.TYPE_ACCOUNTS:
                            return (
                                <ListItem bottomDivider onPress={() => null}>
                                    <Avatar source={{ uri: item.avatar }} />
                                    <ListItem.Content>
                                        <ListItem.Title>{item.display_name}</ListItem.Title>
                                        <ListItem.Subtitle>{item.acct}</ListItem.Subtitle>
                                    </ListItem.Content>
                                </ListItem>
                            );
                        case searchConst.TYPE_STATUSES:
                            return null;
                        case searchConst.TYPE_HASHTAGS:
                            return (
                                <ListItem bottomDivider onPress={() => null}>
                                    <ListItem.Content>
                                        <ListItem.Title>{"#" + item.name}</ListItem.Title>
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
});