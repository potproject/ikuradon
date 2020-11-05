import React, { useState } from "react";
import { StyleSheet, View, FlatList, RefreshControl, Modal, ActivityIndicator, ImageBackground } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Divider } from "react-native-elements";
import ImageViewer from "react-native-image-zoom-viewer";
import MastoRow from "../components/MastoRow";
import { hide as HideAction, deleting as DeleteAction } from "../actions/actioncreators/main";
import { boost as BoostAction, favourite as FavouriteAction, bookmark as BookmarkAction, follow as FollowAction } from "../actions/actioncreators/mastorow";
import { open as openImageViewerAction, close as closeImageViewerAction } from "../actions/actioncreators/imageviewer";
import { openDetail as openDetailAction } from "../actions/actioncreators/detail";
import * as RouterName from "../constants/RouterName";

import NavigationService from "../services/NavigationService";
import { oldLoadingTimeline, newLoadingTimeline } from "../actions/actioncreators/main";
const reducerSelector = state => ({
    current: state.currentUserReducer,
    main: state.mainReducer,
    streaming: state.streamingReducer,
    imageviewer: state.imageViewerReducer,
    config: state.configReducer,
});

const REFRESH_TIME = 300;

function MastoList({ navigation, type }) {
    const dispatch = useDispatch();
    const [init, setInit] = useState(false);
    const { current, main, streaming, imageviewer, config } = useSelector(reducerSelector);
    const listdata = main[type];
    const streamingType = streaming[type];
    if (!init && listdata && listdata.data instanceof Array && listdata.data.length < 1) {
        setInit(true);
        dispatch(newLoadingTimeline(type, listdata.maxId, true));
    }
    const actions = {
        ReplyAction: (id, tootid, user, acct, image, body) => NavigationService.navigate({ name: RouterName.Toot, params: { id, tootid, user, acct, image, body } }),

        BoostAction: (id, tootid, boosted) => {dispatch(BoostAction(id, tootid, boosted))},
        FavouriteAction: (id, tootid, favourited) => {dispatch(FavouriteAction(id, tootid, favourited))},
        BookmarkAction: (id, tootid, bookmarked) => {dispatch(BookmarkAction(id, tootid, bookmarked))},
        HideAction: (id) => {dispatch(HideAction(id))},
        DeleteAction: (id) => {dispatch(DeleteAction(id))},

        followAction: (id, followed) => {dispatch(FollowAction(id, followed))},

        openImageViewerAction: (media, index) => {dispatch(openImageViewerAction(media, index))},
        closeImageViewerAction: () => {dispatch(closeImageViewerAction())},

        // TODO
        openDetailAction: (id) => {/*dispatch(openDetailAction(id))*/},
    };
    return (
        <View style={styles.container}>
            <ImageBackground imageStyle={{ opacity:0.3 }} source={config.backgroundImage ? { uri: config.backgroundImage } : null} style={styles.background}>
                <FlatList
                    keyExtractor={data => data.id}
                    data={listdata.data}
                    extraData={listdata.data}
                    refreshControl={
                        <RefreshControl 
                            enabled={!streamingType} 
                            refreshing={listdata.refreshing} 
                            onRefresh={() => {
                                if (streamingType){
                                    return;
                                }
                                const time = Math.floor(new Date().getTime() / 1000);
                                if (time - listdata.lastUpdate >= REFRESH_TIME){
                                    dispatch(newLoadingTimeline(type, null, true));
                                } else {
                                    dispatch(newLoadingTimeline(type, listdata.maxId));
                                }
                            }}
                        />}
                    renderItem={({ item }) => <MastoRow item={item} current={current} actions={actions} background={config.backgroundImage !== null} />}
                    ItemSeparatorComponent={() => <Divider />}
                    onEndReachedThreshold={1.5}
                    ListFooterComponent={() => 
                        !listdata.refreshing && listdata.loading && 
                    <View style={styles.loading}>
                        <ActivityIndicator size="large" />
                    </View>
                    }
                    onEndReached={() => {
                        if (init && listdata && listdata.data instanceof Array && listdata.data.length >= 10 && !listdata.loading){
                            dispatch(oldLoadingTimeline(type, listdata.minId));
                        }
                    }}
                />
                <Modal visible={imageviewer.visible} transparent={true} onRequestClose={() => actions.closeImageViewerAction()}>
                    <ImageViewer imageUrls={imageviewer.data} index={imageviewer.index} 
                        enableSwipeDown={true}
                        loadingRender={() => <ActivityIndicator size="large" color={"#FFFFFF"} />}
                        onSwipeDown={() => { actions.closeImageViewerAction()}} />
                </Modal>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        backgroundColor: "#ffffff",
        width: "100%",
        height: "100%"
    },
    loading: {
        paddingTop: 10,
        paddingBottom: 10
    }
});


export default MastoList;