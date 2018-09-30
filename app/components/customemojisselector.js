import React from "react";
import { View, StyleSheet, ScrollView, Image, TouchableOpacity, Button } from "react-native";
import * as CONST_API from "../constants/api";
import Networking from "../networking";
import { MessageBarManager } from "react-native-message-bar";
import PropTypes from "prop-types";
import { getDomainAndToken } from "../util/session";
import I18n from "../i18n";

export default class CustomEmojisSelector extends React.Component {
    static propTypes = {
        onSelect: PropTypes.func,
        onCancel: PropTypes.func
    }
    constructor(props) {
        super(props);
        //emojis specific
        //{shortcode,url,static_url,visible_in_picker}
        this.state = {
            emojis: []
        };
        this.load();
    }
    render() {
        return <ScrollView>
            <View style={styles.container}>
                <Button
                    style={styles.button}
                    onPress={() =>  this.props.onCancel()}
                    title={I18n.t("global_back")}
                />
                {this.state.emojis.map((emoji) => {
                    if(typeof emoji.visible_in_picker !== "undefined" && !emoji.visible_in_picker){
                        return null;
                    }
                    return <View key={emoji.shortcode} style={styles.emojiList}>
                        <TouchableOpacity onPress={()=>{this.send(emoji.shortcode)}}>
                            <Image
                                style={styles.emoji}
                                source={{uri: emoji.url}}
                            />
                        </TouchableOpacity>
                    </View>;
                })}
            </View>
        </ScrollView>;
    }
    async load(){
        try{
            let { domain } = await getDomainAndToken();
            let emojis = await Networking.fetch(domain, CONST_API.GET_CUSTOMEMOJIS);
            this.setState({emojis});
        }catch(e){
            MessageBarManager.showAlert({
                title: "doesn't loading custom_emojis.",
                alertType: "error",
            });
        }
    }
    send(shortcode){
        if(typeof this.props.onSelect === "function"){
            this.props.onSelect(shortcode);
        }
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "flex-start",
        flexDirection: "row",
        flexWrap: "wrap"
    },
    emojiList: {
        width: 40,
        height: 40,
        padding:4,
    },
    emoji: {
        width: 32,
        height: 32
    },
});