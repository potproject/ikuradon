import React, { memo } from "react";
import { bodyFormat, bodySearchUrl, emojisArrayToObject } from "../util/parser";
import {open as openUrl} from "../util/url";
import { Text } from "react-native";
import Hyperlink from "react-native-hyperlink";
import CustomEmoji from "react-native-customemoji";

function MastoRowBody({content, style, linkStyle, emojis, sensitive}){
    let newContent = bodyFormat(content);
    let existsURL = bodySearchUrl(newContent);
    let emojiObject = emojisArrayToObject(emojis);
    if (Object.keys(emojiObject).length > 0 && existsURL) {
        return (
            <Hyperlink linkStyle={linkStyle} onPress={url => openUrl(url)}>
                <CustomEmoji emojis={emojiObject}>
                    <Text style={style}>{newContent}</Text>
                </CustomEmoji>
            </Hyperlink>
        );
    }
    if (Object.keys(emojiObject).length > 0) {
        return (
            <CustomEmoji emojis={emojiObject}>
                <Text style={style}>{newContent}</Text>
            </CustomEmoji>
        );
    }
    if (existsURL) {
        return (
            <Hyperlink linkStyle={linkStyle} onPress={url => openUrl(url)}>
                <Text style={style}>{newContent}</Text>
            </Hyperlink>
        );
    }
    return (
        <Text style={style}>{newContent}</Text>
    );
}

export default memo(MastoRowBody, (p, n) => p.content === n.content);