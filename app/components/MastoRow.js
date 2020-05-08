import * as React from "react";
import { ListItem } from "react-native-elements";

export default function mastoRow(item){
    return (
        <ListItem
            title={item.account.display_name}
            subtitle={item.content}
        />
    );
}