import React from "react";
import { View, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
import * as CONST_API from "../constants/api";
import Networking from "../networking";
import { MessageBarManager } from "react-native-message-bar";
import PropTypes from "prop-types";
import { getDomainAndToken } from "../util/session";

export default class CustomEmojisSelector extends React.Component {
    static propTypes = {
        onSelect: PropTypes.func
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
        return <ScrollView style={styles.container}>
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
        </ScrollView>;
    }
    async load(){
        try{
            let { domain } = await getDomainAndToken();
            let emojis = await Networking.fetch(domain, CONST_API.GET_CUSTOMEMOJIS);
            /**for(let i = 1; i < 100; i++){
                emojis.push(emojis[0]);
            }**/
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