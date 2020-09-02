import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "react-native-elements";
import { getEmojis } from "../util/emojis";
  
export default function EmojisModal({ current, onSelect }){
    let [emojis, useEmojis] = useState([]);
    useEffect(() => {
        getEmojis(current.domain).then(({ emojis, error }) => {
            if (error === null){
                useEmojis(emojis);
            }
        });
    }, []);
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