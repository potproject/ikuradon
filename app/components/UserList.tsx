import React, { useEffect, useContext, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { ListItem, Avatar, Icon, ThemeContext } from "react-native-elements";
import t from "../services/I18n";

import * as Session from "../util/session";
  
export default function UserList({ current, onSelect, onCancel }){
    const { theme } = useContext(ThemeContext);
    const [ list, useList ] = useState([]);
    const { domain, access_token } = current;
    useEffect(() => {
        Session.getAll().then(({ accounts }) => {
            useList(accounts);
        });
    }, []);
    return (
        <View style={styles.container}>
            {
                list.map((l, i) => (
                    <ListItem
                        key={i}
                        containerStyle={{ backgroundColor: theme.customColors.charBackground }}
                        bottomDivider
                        onPress={() => onSelect(i)}
                    >
                        <Avatar source={{ uri: l.avatar }} />
                        <ListItem.Content>
                            <ListItem.Title style={l.domain === domain && l.access_token === access_token ? { color:theme.colors.grey1 } : { color:theme.customColors.char }}>{l.username}</ListItem.Title>
                            <ListItem.Subtitle style={l.domain === domain && l.access_token === access_token ? { color:theme.colors.grey1 } : { color:theme.customColors.char }}>{l.domain}</ListItem.Subtitle>
                        </ListItem.Content>
                        { (l.domain !== domain || l.access_token !== access_token) &&
                            <Icon name={"cancel"} color={theme.colors.grey1} onPress={() => {
                                Alert.alert(
                                    `${l.username}@${l.domain}`,
                                    t("logout_alert_text"),
                                    [
                                        {
                                            text: t("global_cancel"),
                                            style: "cancel"
                                        },
                                        { text: t("global_ok"), onPress: () => onCancel(i) }
                                    ],
                                    { cancelable: false }
                                );
                            }
                            } />
                        }
                    </ListItem>
                ))
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
    }
});