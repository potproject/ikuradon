import React, { memo } from "react";
import { Image, View, StyleSheet, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { open as openUrl } from "../util/url";

function MastoRowImage({ style, mediaAttachments, sensitive, openImageViewer }){
    return (
        <View style={[styles.container, style]}>
            { mediaAttachments.map((media, i) => {
                return (
                    <TouchableOpacity key={i} onPress={() => {
                        if (media.type !== "image"){
                            openUrl(media.url);
                            return;
                        }
                        openImageViewer(mediaAttachments, i);
                    }}>
                        { mediaAttachments.length <= 2 &&
                        <Image source={{ uri: media.preview_url }} style={styles.photo} blurRadius={sensitive ? 20 : 0}/>
                        }
                        { mediaAttachments.length > 2 &&
                        <Image source={{ uri: media.preview_url }} style={styles.photo2Line} blurRadius={sensitive ? 20 : 0}/>
                        }
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

MastoRowImage.propTypes = {
    style: PropTypes.any,
    mediaAttachments: PropTypes.arrayOf(
        PropTypes.shape(
            {
                id: PropTypes.string,
                blurhash: PropTypes.string,
                description: PropTypes.any,
                meta: PropTypes.object,
                preview_url: PropTypes.string,
                remote_url: PropTypes.string,
                text_url: PropTypes.string,
                type: PropTypes.string,
                url: PropTypes.string
            }
        )
    )
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 5,
        paddingRight: 5,
    },
    photo: {
        flex: 0.5,
        height: 140,
        borderWidth: 1,
        borderColor: "#8899a6",
        borderRadius: 5,
        marginTop: 2,
        marginBottom: 2,
    },
    photo2Line: {
        flex: 0.5,
        height: 100,
        borderWidth: 1,
        borderColor: "#8899a6",
        borderRadius: 5,
        marginTop: 2,
        marginBottom: 2,
    },
});
export default MastoRowImage;