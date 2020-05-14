import React, { useContext, useState } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { ThemeContext } from "react-native-elements";
import { getEmojis } from "../util/emojis";
import { Image } from "react-native-elements";
  
export default function EmojisModal({current, onSelect}){
    const { theme }= useContext(ThemeContext);
    let [emojis, useEmojis] = useState([]);
    const [load, useLoad] = useState(false);
    if(!load && emojis.length === 0){
        useLoad(true);
        getEmojis(current.domain).then(({emojis, error}) => {
            useEmojis(emojis);
        }
        );
    }
    return(
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.wrapList}>
                    {
                        emojis.map((emoji, i) => (
                            <TouchableOpacity key={i} style={styles.emojiList} onPress={() => onSelect(emoji.shortcode)}>
                                <Image source={{uri: emoji.url}} style={styles.emoji}/>
                            </TouchableOpacity>
                        ))
                    }
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        width: 300,
        height: 300,
    },
    wrapList: {
        justifyContent: "flex-start",
        flexDirection: "row",
        flexWrap: "wrap",
    },
    emojiList: {
        width: 40,
        height: 40,
        padding: 4
    },
    emoji: {
        width:32,
        height:32,
    }
});