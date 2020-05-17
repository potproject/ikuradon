import React, { useState } from "react";
import { StyleSheet, View, FlatList, RefreshControl, Modal } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Divider } from "react-native-elements";
import ImageViewer from "react-native-image-zoom-viewer";
import MastoRow from "../components/MastoRow";
import { hide as HideAction, deleting as DeleteAction } from "../actions/actioncreators/main";
import { boost as BoostAction, favourite as FavouriteAction, bookmark as BookmarkAction } from "../actions/actioncreators/mastorow";
import { open as openImageViewerAction, close as closeImageViewerAction } from "../actions/actioncreators/imageviewer";
import * as RouterName from "../constants/RouterName";

import NavigationService from "../services/NavigationService";
import { oldLoadingTimeline, newLoadingTimeline } from "../actions/actioncreators/main";
const reducerSelector = state => ({
    current: state.currentUserReducer,
    main: state.mainReducer,
    streaming: state.streamingReducer,
    imageviewer: state.imageViewerReducer,
});

function MastoList({ navigation, type }) {
    const dispatch = useDispatch();
    const [init, setInit] = useState(false);
    const { current, main, streaming, imageviewer } = useSelector(reducerSelector);
    const listdata = main[type];
    const streamingType = streaming[type];
    if (!init && listdata && listdata.data instanceof Array && listdata.data.length < 1) {
        setInit(true);
        dispatch(newLoadingTimeline(type, listdata.maxId, true));
    }
    const actions = {
        ReplyAction: (id, tootid, user, acct, image, body) => NavigationService.navigate({ name: RouterName.Toot, params: { id, tootid, user, acct, image, body }}),


        BoostAction: (id, tootid, boosted) => {dispatch(BoostAction(id, tootid, boosted))},
        FavouriteAction: (id, tootid, favourited) => {dispatch(FavouriteAction(id, tootid, favourited))},
        BookmarkAction: (id, tootid, bookmarked) => {dispatch(BookmarkAction(id, tootid, bookmarked))},
        HideAction: (id) => {dispatch(HideAction(id))},
        DeleteAction: (id) => {dispatch(DeleteAction(id))},
        openImageViewerAction: (media, index) => {dispatch(openImageViewerAction(media, index))},
        closeImageViewerAction: () => {dispatch(closeImageViewerAction())},
    };
    return (
        <View style={styles.container}>
            <FlatList
                keyExtractor={data => data.id}
                data={listdata.data}
                refreshControl={<RefreshControl enabled={!streamingType} refreshing={listdata.refreshing} onRefresh={() => !streamingType && dispatch(newLoadingTimeline(type, listdata.maxId))} />}
                renderItem={({ item }) => <MastoRow item={item} current={current} actions={actions} />}
                ItemSeparatorComponent={() => <Divider />}
                onEndReachedThreshold={1.5}
                onEndReached={() => {
                    if(init && listdata && listdata.data instanceof Array && listdata.data.length >= 10 && !listdata.loading){
                        dispatch(oldLoadingTimeline(type, listdata.minId));
                    }
                }}
            />
            <Modal visible={imageviewer.visible} transparent={true} onRequestClose={() => actions.closeImageViewerAction()}>
                <ImageViewer imageUrls={imageviewer.data} index={imageviewer.index} 
                    enableSwipeDown={true}
                    onSwipeDown={() => { actions.closeImageViewerAction()}} />
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});


export default MastoList;