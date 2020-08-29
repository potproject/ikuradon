import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { ListItem } from "react-native-elements";
import { getDraftAll } from "../util/draft";
  
export default function DraftModal({ onSelect }){
    let [drafts, useDrafts] = useState([]);
    useEffect(() => {
        getDraftAll().then((drafts) => useDrafts(drafts));
    }, []);
    return (
        <View style={styles.container}>
            <FlatList
                style={styles.wrapList}
                data={drafts}
                renderItem={({ item }) =>(
                    <ListItem
                        key={item.id}
                        title={item.text}
                        bottomDivider
                        chevron
                        onPress={() => onSelect(item.id, item.text)}
                    />
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        width: 320,
        height: 320,
    }
});