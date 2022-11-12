import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "react-native-elements";
import { getEmojis, getDefaultReaction } from "../util/emojis";
  
export default function EmojisModal({ reaction, onSelect }){
    let [emojis, useEmojis] = useState([]);
    useEffect(() => {
        getEmojis().then(({ emojis, error }) => {
            if (error === null){
                if (reaction){
                    emojis = [...getDefaultReaction(), ...emojis];
                }
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
                        { item.url !== "" &&
                        <Image source={{ uri: item.url }} style={styles.emoji}/>
                        }
                        { item.url === "" &&
                        <Text style={styles.emojiText}>{item.shortcode}</Text>
                        }
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
    },
    emojiText: {
        fontSize: 28,
        margin:2,
        width:32,
        height:32,
    }
});
