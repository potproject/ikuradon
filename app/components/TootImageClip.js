import React, { useState, useContext } from "react";
import { ImageBackground, StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { ThemeContext } from "react-native-elements";
import { upload } from "../services/Media";

const MAX_UPLOAD = 4;

export default function TootImageClip({ callbackMediaAttachments }) {
    const { theme } = useContext(ThemeContext);
    const [mediaAttachments, useMediaAttachments] = useState([]);
    const [isUploading, useUploading] = useState(false);
    return (
        <ScrollView horizontal={true}>
            <View style={[{ backgroundColor: theme.colors.charBackground }, styles.imageForm]}>
                {
                    mediaAttachments.map((media, index) => (
                        <ImageBackground
                            key={index}
                            source={{ uri: media.preview_url }}
                            style={[{ borderColor: theme.colors.grey0 }, styles.backgroundRow]}
                            imageStyle={[{ borderColor: theme.colors.grey0 }, styles.imageRow]}
                        >
                            <TouchableOpacity onPress={() => mediaRemove(isUploading, callbackMediaAttachments, mediaAttachments, useMediaAttachments, media)}>
                                <FontAwesome name={"times-circle"} size={26} color={theme.colors.grey1} />
                            </TouchableOpacity>
                        </ImageBackground>
                    )
                    )
                }
                {
                    mediaAttachments.length < MAX_UPLOAD &&
                    <TouchableOpacity 
                        key={-1} 
                        onPress={() => mediaUpload(isUploading, callbackMediaAttachments, useUploading, mediaAttachments, useMediaAttachments)} 
                        style={[{ borderColor: theme.colors.grey0 }, styles.backgroundRow, styles.imageRow]}
                    >
                        <FontAwesome name={isUploading ? "spinner" : "plus-circle"} size={26} color={theme.colors.grey1} />
                    </TouchableOpacity>
                    
                }
            </View>
        </ScrollView>
    );
}

async function mediaUpload(isUploading, callbackMediaAttachments, useUploading, mediaAttachments, useMediaAttachments){
    if (isUploading){
        return;
    }
    useUploading(true);
    let res = await upload();
    if (res !== null){
        const newMedia = mediaAttachments.concat(res);
        useMediaAttachments(newMedia);
        callbackMediaAttachments(newMedia);
    }
    useUploading(false);
}

function mediaRemove(isUploading, callbackMediaAttachments, mediaAttachments, useMediaAttachments, media){
    if (isUploading){
        return;
    }
    let removedMediaAttachments = mediaAttachments.filter(item => item !== media);
    useMediaAttachments(removedMediaAttachments);
    callbackMediaAttachments(removedMediaAttachments);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        backgroundColor: "#ffffff",
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 10,
        borderWidth: 1,
        width: 70,
        height: 70
    },
    imageForm: {
        flex: 1,
        flexDirection: "row",
    },
    backgroundRow:{
        width: 70,
        marginLeft: 5,
        marginRight: 5,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    imageRow:{
        width: 70,
        borderRadius: 10,
        borderWidth: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    }
});