import React, {useContext, useState} from "react";
import { View, StyleSheet } from "react-native";
import { ListItem, ThemeContext } from "react-native-elements";

import * as Session from "../util/session";
  
export default function UserList({current, onSelect}){
    const { theme }= useContext(ThemeContext);
    const [ list, useList ] = useState([]);
    const [ index, useIndex ] = useState(-1);
    if(list.length === 0){
        Session.getAll().then(({accounts,login_index}) => {
            useList(accounts);
            useIndex(login_index);
        });
    }
    return(
        <View style={styles.container}>
            {
                list.map((l, i) => (
                    <ListItem
                        key={i}
                        leftAvatar={{ source: { uri: l.avatar } }}
                        title={l.username}
                        subtitle={l.domain}
                        bottomDivider
                        chevron
                        onPress={() => onSelect(i)}
                    />
                ))
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
    }
});