import React, { useContext, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { ListItem, ThemeContext } from "react-native-elements";
import { getDraftAll } from "../util/draft";
  
export default function DraftModal({onSelect}){
    const { theme } = useContext(ThemeContext);
    let [drafts, useDrafts] = useState([]);
    const [load, useLoad] = useState(false);
    if(!load && drafts.length === 0){
        useLoad(true);
        getDraftAll().then((drafts) => useDrafts(drafts));
    }
    return(
        <View style={styles.container}>
            <FlatList
                style={styles.wrapList}
                data={drafts}
                renderItem={({item}) =>(
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