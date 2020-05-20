import React, { useState, memo } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { bodyFormat, bodySearchUrl, emojisArrayToObject } from "../util/parser";
import {open as openUrl} from "../util/url";
import Hyperlink from "react-native-hyperlink";
import CustomEmoji from "react-native-customemoji";
import t from "../services/I18n";

function MastoRowBody({content, style, linkStyle, sensitiveButtonColor, emojis, sensitive, spoilerText}){
    let newContent = bodyFormat(content);
    let existsURL = bodySearchUrl(newContent);
    let emojiObject = emojisArrayToObject(emojis);
    const [sensitiveDisplay, useSensitiveDisplay] = useState(false);
    if(sensitive && spoilerText !== ""){
        return (
            <Hyperlink linkStyle={linkStyle} onPress={url => openUrl(url)}>
                <Text style={style}>{spoilerText}</Text>
                { !sensitiveDisplay &&
                <TouchableOpacity onPress={() => useSensitiveDisplay(true)}>
                    <Text style={[styles.cwButton, {color: sensitiveButtonColor}]}>{t("timeline_cwtext")}</Text>
                </TouchableOpacity>
                }
                { sensitiveDisplay &&
                <CustomEmoji emojis={emojiObject}>
                    <Text style={style}>{newContent}</Text>
                </CustomEmoji>
                }
            </Hyperlink>
        );
    }
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

const styles = StyleSheet.create({
    cwButton: {
        paddingTop: 4,
        paddingBottom: 4,
        fontSize: 16,
    },
});
export default memo(MastoRowBody, (p, n) => p.content === n.content);