/**
 * @providesModule CustomEmoji
 **/

import React from "react";
import { View, Text } from "react-native";

import InlineImage from "./inlineimage";

const defaultEmojis = {};
const defaultEmojiStyle = {};
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
        this.emojiStyle = props.emojiStyle || defaultEmojiStyle;
        this.emojis = props.emojis || defaultEmojis;
    }

    render(){
        return <View
            style={ this.props.style }
        >
            {
                this.emojis ? this.parse(this).props.children : this.props.children
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
    emojiCheck(component){
        let text = component.props.children;
        if(typeof text !== "string"){
            return component;
        }
        const componentProps = {
		    ...component.props,
		    ref: undefined,
		    key: undefined,
        };
        let lastIndex = 0;
        let elements = [];
        //正規表現は必要ないし、文字列を1文字ずつ処理する独自パーサを作るしかないかな、って感じ
        for(var nextIndex = 0;nextIndex<text.length;){
            for(let emoji in this.emojis){
                if(text.slice(nextIndex,nextIndex+emoji.length) === emoji){
                    if(lastIndex<nextIndex){
                        //Text
                        elements.push(<Text key={+elements.length}>{text.slice(lastIndex,nextIndex)}</Text>);
                    }
                    //Image
                    elements.push(<InlineImage key={elements.length} style={this.emojiStyle} source={this.emojis[emoji]} />);
                    lastIndex = nextIndex + emoji.length;
                    nextIndex = nextIndex + emoji.length;
                }else{
                    nextIndex++;
                }
            }
        }
        //Text
        elements.push(<Text key={elements.length}>{text.slice(lastIndex)}</Text>);
        return React.cloneElement(component, componentProps, elements);
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