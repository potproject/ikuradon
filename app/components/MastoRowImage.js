import React, { memo } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { Image } from "react-native-elements";

function MastoRowImage({style, mediaAttachments}){
    return (
        <View style={[styles.container,style]}>
            { mediaAttachments.map((media, i) => {
                return <Image key={i} source={{uri: media.preview_url}} style={styles.photo}/>;
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
        width: null,
        height: 140,
        borderWidth: 1,
        borderColor: "#8899a6",
        borderRadius: 5,
        marginTop: 2,
        marginBottom: 2,
    },
});
export default MastoRowImage;