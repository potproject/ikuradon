import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import * as CONST_API from "../constants/api";
import Networking from "../networking";
import { MessageBarManager } from "react-native-message-bar";
import PropTypes from "prop-types";

export default class CustomEmojisSelector extends React.Component {
    static propTypes = {
        domain: PropTypes.string
    }
    constructor(props) {
        super(props);
        //emojis specific
        //{shortcode,url,static_url,visible_in_picker}
        this.state = {
            emojis: []
        };
        this.load(props.domain);
    }
    render() {
        return <View>
            {this.state.emojis.map((emoji) => {
                return <View>
                    { typeof emoji.visible_in_picker === "undefined" || emoji.visible_in_picker &&
                    <TouchableOpacity key={emoji.shortcode} onPress={()=>{this.send(emoji.shortcode)}}>
                        <Image
                            style={{width: 32, height: 32}}
                            source={{uri: emoji.url}}
                        />
                    </TouchableOpacity>
                    }
                </View>;
            })}
        </View>;
    }
    async load(domain){
        try{
            let emojis= await Networking.fetch(domain, CONST_API.GET_CUSTOMEMOJIS);
            this.setState({emojis});
        }catch(e){
            MessageBarManager.showAlert({
                title: "doesn't loading custom_emojis.",
                alertType: "error",
            });
        }
    }
    send(shortcode){
        console.log(shortcode);
    }
}