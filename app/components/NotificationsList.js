import React, { useState } from "react";
import { StyleSheet, View, FlatList, RefreshControl, Modal, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Divider } from "react-native-elements";
import ImageViewer from "react-native-image-zoom-viewer";

import { hide as HideAction, deleting as DeleteAction } from "../actions/actioncreators/main";
import { boost as BoostAction, favourite as FavouriteAction, bookmark as BookmarkAction, follow as FollowAction } from "../actions/actioncreators/mastorow";

import NavigationService from "../services/NavigationService";
import * as RouterName from "../constants/RouterName";

import NotificationsRow from "./NotificationsRow";
import { oldLoadingTimeline, newLoadingTimeline } from "../actions/actioncreators/main";
import { notificationParse } from "../util/notification";
import { open as openImageViewerAction, close as closeImageViewerAction } from "../actions/actioncreators/imageviewer";

const CurrentUserReducerSelector = state => ({
    current: state.currentUserReducer,
    main: state.mainReducer,
    imageviewer: state.imageViewerReducer,
});

function NotificationsList({ type }) {
    const dispatch = useDispatch();
    const [init, setInit] = useState(false);
    const { current, main, imageviewer } = useSelector(CurrentUserReducerSelector);
    const listdata = main[type];
    const actions = {
        ReplyAction: (id, tootid, user, acct, image, body) => NavigationService.navigate({ name: RouterName.Toot, params: { id, tootid, user, acct, image, body }}),

        BoostAction: (id, tootid, boosted) => {dispatch(BoostAction(id, tootid, boosted))},
        FavouriteAction: (id, tootid, favourited) => {dispatch(FavouriteAction(id, tootid, favourited))},
        BookmarkAction: (id, tootid, bookmarked) => {dispatch(BookmarkAction(id, tootid, bookmarked))},
        HideAction: (id) => {dispatch(HideAction(id))},
        DeleteAction: (id) => {dispatch(DeleteAction(id))},

        FollowAction: (id, followed) => {dispatch(FollowAction(id,followed))},

        openImageViewerAction: (media, index) => {dispatch(openImageViewerAction(media, index))},
        closeImageViewerAction: () => {dispatch(closeImageViewerAction())},
    };
    if (!init && listdata && listdata.data instanceof Array && listdata.data.length < 1) {
        setInit(true);
        dispatch(newLoadingTimeline(type, listdata.maxId, true));
    }
    const newNotifications = notificationParse(listdata.data);
    return (
        <View style={styles.container}>
            <FlatList
                keyExtractor={data => data.type + data.id}
                data={newNotifications}
                refreshControl={<RefreshControl refreshing={listdata.refreshing} onRefresh={() => dispatch(newLoadingTimeline(type, listdata.maxId))} />}
                renderItem={({ item }) => <NotificationsRow item={item} current={current} actions={actions} />}
                ItemSeparatorComponent={() => <Divider />}
                onEndReachedThreshold={1.5}
                ListFooterComponent={() => 
                    !listdata.refreshing && listdata.loading && 
                    <View style={styles.loading}>
                        <ActivityIndicator size="large" />
                    </View>
                }
                onEndReached={() => {
                    if(init && listdata && listdata.data instanceof Array && listdata.data.length >= 10 && !listdata.loading){
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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loading: {
        paddingTop: 10,
        paddingBottom: 10
    }
});


export default NotificationsList;