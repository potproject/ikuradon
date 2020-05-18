import React, { useContext } from "react";
import { View, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { ThemeContext } from "react-native-elements";
import { ListItem } from "react-native-elements";
import * as searchConst from "../constants/search";

export default function SearchList({type, data}){
    const { theme }= useContext(ThemeContext);
    return(
        <View style={styles.container}>
            <FlatList
                keyExtractor={data => type === searchConst.TYPE_HASHTAGS ? data.name : data.id}
                data={data}
                renderItem={({ item }) =>{
                    switch(type){
                        case searchConst.TYPE_ACCOUNTS:
                            return <ListItem
                                leftAvatar={{ source: { uri: item.avatar } }}
                                title={item.display_name}
                                subtitle={item.acct}
                                bottomDivider
                                onPress={() => null}
                            />;
                        case searchConst.TYPE_STATUSES:
                            return null;
                        case searchConst.TYPE_HASHTAGS:
                            return null;
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