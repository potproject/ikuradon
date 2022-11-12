import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, FlatList, RefreshControl, Modal, ActivityIndicator, ImageBackground } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Divider } from "react-native-elements";

import { hide as HideAction, deleting as DeleteAction } from "../actions/actioncreators/main";
import { boost as BoostAction, favourite as FavouriteAction, bookmark as BookmarkAction, follow as FollowAction, reaction as ReactionAction  } from "../actions/actioncreators/mastorow";
import { getDetail as GetDetailAction } from "../actions/actioncreators/detail";

import NavigationService from "../services/NavigationService";
import * as RouterName from "../constants/RouterName";

import { ThemeContext } from "react-native-elements";
import NotificationsRow from "./NotificationsRow";
import { oldLoadingTimeline, newLoadingTimeline } from "../actions/actioncreators/main";
import { notificationParse } from "../util/notification";
import { open as OpenImageViewerAction, close as CloseImageViewerAction } from "../actions/actioncreators/imageviewer";
import { RootState } from "../reducers";

const CurrentUserReducerSelector = (state: RootState) => ({
    current: state.currentUserReducer,
    main: state.mainReducer,
    config: state.configReducer,
});

function NotificationsList({ type }) {
    const dispatch = useDispatch();
    const { theme } = useContext(ThemeContext);
    const [init, setInit] = useState(false);
    const { current, main, config } = useSelector(CurrentUserReducerSelector);
    const listdata = main[type];
    const actions = {
        ReplyAction: (id, tootid, user, acct, image, body) => NavigationService.navigate({ name: RouterName.Toot, params: { id, tootid, user, acct, image, body } }),

        BoostAction: (id, tootid, boosted) => {dispatch(BoostAction(id, tootid, boosted))},
        FavouriteAction: (id, tootid, favourited) => {dispatch(FavouriteAction(id, tootid, favourited))},
        BookmarkAction: (id, tootid, bookmarked) => {dispatch(BookmarkAction(id, tootid, bookmarked))},
        ReactionAction: (id, tootid, reactioned, emoji) => {dispatch(ReactionAction(id, tootid, reactioned, emoji))},
        HideAction: (id) => {dispatch(HideAction(id))},
        DeleteAction: (id) => {dispatch(DeleteAction(id))},

        FollowAction: (id, followed) => {dispatch(FollowAction(id, followed))},

        OpenImageViewerAction: (media, index) => {dispatch(OpenImageViewerAction(media, index))},
        CloseImageViewerAction: () => {dispatch(CloseImageViewerAction())},

        TouchAction: (id) => {dispatch(GetDetailAction(id))},
    };
    useEffect(() => {
        if (!init && listdata && listdata.data instanceof Array && listdata.data.length < 1) {
            setInit(true);
            dispatch(newLoadingTimeline(type, listdata.maxId, true));
        }
    }, []);
    const newNotifications = notificationParse(listdata.data);
    return (
        <View style={styles.container}>
            <ImageBackground imageStyle={{ opacity:0.3 }} source={config.backgroundImage ? { uri: config.backgroundImage } : null} style={[styles.background, { backgroundColor: theme.customColors.charBackground }]}>
                <FlatList
                    keyExtractor={data => data.type + data.id}
                    data={newNotifications}
                    refreshControl={
                        <RefreshControl
                            colors={[theme.customColors.char]}
                            tintColor={theme.customColors.char}    
                            refreshing={listdata.refreshing}
                            onRefresh={() => dispatch(newLoadingTimeline(type, listdata.maxId))}
                        />
                    }
                    renderItem={({ item }) => <NotificationsRow item={item} current={current} actions={actions} background={config.backgroundImage !== null} />}
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


export default NotificationsList;