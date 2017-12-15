/**
 * @providesModule CustomEmoji
 **/

import React from "react";
import PropTypes from "prop-types";
import { View, Text, Image } from "react-native";
import { parse } from "path-to-regexp";


const defaultEmojis = {};
const defaultEmojiWidth = 50;
const defaultEmojiHeight = 50;
/**
 *  Emojis Setting 
 *  key:value = [DisplayName] : [Image Source]
 * 
 *  Example:
 *  {
 *      ":icon:" : require('/react-native/img/favicon.png'),
 *      ":react-native:" : {uri: "https://facebook.github.io/react-native/docs/assets/favicon.png"},
 *      ":blank:" : {uri: "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs="},
 *  }
 */

class CustomEmoji extends React.Component {
    constructor(props){
        super(props);
        this.parse = this.parse.bind(this);
        this.emojiCheck = this.emojiCheck.bind(this);
        this.width = props.width || defaultEmojiWidth;
        this.height = props.height || defaultEmojiHeight;
        this.emojis = props.emojis || defaultEmojis;
        console.log(this.width,this.height,this.emojis);
    }

    render(){
        return <View
            style={ this.props.style }
        >
            {
                this.parse(this).props.children
            }
        </View>;
    }
    parse (component) {
        let { props: { children } = {}} = component;
        if (!children){
            return component;
        }
	    const componentProps = {
	    	...component.props,
	    	ref: undefined,
	    	key: undefined,
	    };

	    return React.cloneElement(component, componentProps, React.Children.map(children, child => {
	    	let { type : { displayName } = {} } = child;
	    	if (typeof child === "string"){
                return this.emojiCheck(<Text { ...componentProps } style={ component.props.style }>{ child }</Text>);
            }
	    	if (displayName === "Text" && !this.isTextNested(child)){
                return this.emojiCheck(child);
            }
	    	return this.parse(child);
	    }));
    }
    emojiCheck(body){
        return body;
    }

    isTextNested(component){
	    if (!React.isValidElement(component)){
            throw "Invalid component";
        }
	    return typeof component.props.children !== "string";
    }
}


export default class extends React.Component {
    constructor (props) {
        super(props);
    }
    render(){
        return <CustomEmoji { ...this.props }></CustomEmoji>;
    }
}