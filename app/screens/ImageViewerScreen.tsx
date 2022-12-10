import React from "react";
import { Text, View, StyleSheet } from "react-native";
import ImageView from "react-native-image-viewing";
import { useDispatch, useSelector } from "react-redux";
import { close as CloseImageViewerAction } from "../actions/actioncreators/imageviewer";
import { RootState } from "../reducers";

const reducerSelector = (state: RootState) => ({
    imageviewer: state.imageViewerReducer,
});

function ImageViewerScreen() {
    const dispatch = useDispatch();
    const { imageviewer } = useSelector(reducerSelector);
    return (
        imageviewer.visible && <ImageView
            images={imageviewer.data}
            imageIndex={imageviewer.index}
            visible={imageviewer.visible}
            swipeToCloseEnabled={true}
            onRequestClose={() => {
                dispatch(CloseImageViewerAction());
            }}
            FooterComponent={({ imageIndex }) => (
                <View style={styles.imageFooter}>
                    <Text style={styles.imageFooterText}>{`${imageIndex + 1} / ${imageviewer.data.length}`}</Text>
                </View>
            )}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        width: "100%",
        height: "100%",
    },
    loading: {
        paddingTop: 10,
        paddingBottom: 10,
    },
    imageFooter: {
        height: 120,
        backgroundColor: "#00000077",
        alignItems: "center",
        paddingTop: 20,
    },
    imageFooterText: {
        fontSize: 17,
        color: "#FFF",
    },
});

export default ImageViewerScreen;
