import React, { useContext, useState } from "react";
import { View, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { ThemeContext } from "react-native-elements";
import { getEmojis } from "../util/emojis";
import { Image } from "react-native-elements";
  
export default function EmojisModal({ current, onSelect }){
    const { theme } = useContext(ThemeContext);
    let [emojis, useEmojis] = useState([]);
    const [load, useLoad] = useState(false);
    if (!load && emojis.length === 0){
        useLoad(true);
        getEmojis(current.domain).then(({ emojis, error }) => {
            if (error === null){
                useEmojis(emojis);
            } else {
                useLoad(false);
            }
        }
        );
    }
    return (
        <View style={styles.container}>
            <FlatList
                keyExtractor={data => data.shortcode}
                style={styles.wrapList}
                data={emojis}
                numColumns={8}
                renderItem={({ item }) =>(
                    <TouchableOpacity style={styles.emojiList} onPress={() => onSelect(item.shortcode)}>
                        <Image source={{ uri: item.url }} style={styles.emoji}/>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        width: 320,
        height: 320,
    },
    wrapList: {
        flexDirection: "column",
    },
    emojiList: {
        width: 40,
        height: 40,
    },
    emoji: {
        width:32,
        height:32,
    }
});