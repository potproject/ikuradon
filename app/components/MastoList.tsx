import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, FlatList, RefreshControl, ActivityIndicator, ImageBackground } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Divider } from "react-native-elements";

import MastoRow from "../components/MastoRow";
import { hide as HideAction, deleting as DeleteAction } from "../actions/actioncreators/main";
import { boost as BoostAction, favourite as FavouriteAction, bookmark as BookmarkAction, follow as FollowAction } from "../actions/actioncreators/mastorow";
import { open as OpenImageViewerAction, close as CloseImageViewerAction } from "../actions/actioncreators/imageviewer";
import { getDetail as GetDetailAction } from "../actions/actioncreators/detail";
import * as RouterName from "../constants/RouterName";

import { ThemeContext } from "react-native-elements";
import NavigationService from "../services/NavigationService";
import { oldLoadingTimeline, newLoadingTimeline } from "../actions/actioncreators/main";
const reducerSelector = (state) => ({
    current: state.currentUserReducer,
    main: state.mainReducer,
    streaming: state.streamingReducer,
    config: state.configReducer,
    openSticker: state.openStickerReducer,
});

const REFRESH_TIME = 300;

function MastoList({ navigation, type }) {
    const dispatch = useDispatch();
    const { theme } = useContext(ThemeContext);
    const [init, setInit] = useState(false);
    const { current, main, streaming, config, openSticker } = useSelector(reducerSelector);
    const { data: openStickerData } = openSticker;
    const listdata = main[type];
    const streamingType = streaming[type];
    useEffect(() => {
        if (!init && listdata && listdata.data instanceof Array && listdata.data.length < 1) {
            setInit(true);
            dispatch(newLoadingTimeline(type, listdata.maxId, true));
        }
    }, []);
    const actions = {
        ReplyAction: (id, tootid, user, acct, image, body) =>
            NavigationService.navigate({ name: RouterName.Toot, params: { id, tootid, user, acct, image, body } }),

        BoostAction: (id, tootid, boosted) => {
            dispatch(BoostAction(id, tootid, boosted));
        },
        FavouriteAction: (id, tootid, favourited) => {
            dispatch(FavouriteAction(id, tootid, favourited));
        },
        BookmarkAction: (id, tootid, bookmarked) => {
            dispatch(BookmarkAction(id, tootid, bookmarked));
        },
        HideAction: (id) => {
            dispatch(HideAction(id));
        },
        DeleteAction: (id) => {
            dispatch(DeleteAction(id));
        },

        FollowAction: (id, followed) => {
            dispatch(FollowAction(id, followed));
        },

        OpenImageViewerAction: (media, index) => {
            dispatch(OpenImageViewerAction(media, index));
        },
        CloseImageViewerAction: () => {
            dispatch(CloseImageViewerAction());
        },

        TouchAction: (id) => {
            dispatch(GetDetailAction(id));
        },
    };
    return (
        <View style={styles.container}>
            <ImageBackground
                imageStyle={{ opacity: 0.3 }}
                source={config.backgroundImage ? { uri: config.backgroundImage } : null}
                style={[styles.background, { backgroundColor: theme.customColors.charBackground }]}
            >
                <FlatList
                    keyExtractor={(data) => data.id}
                    data={listdata.data}
                    extraData={listdata.data}
                    refreshControl={
                        <RefreshControl
                            colors={[theme.customColors.char]}
                            tintColor={theme.customColors.char}
                            enabled={!streamingType}
                            refreshing={listdata.refreshing}
                            onRefresh={() => {
                                if (streamingType) {
                                    return;
                                }
                                const time = Math.floor(new Date().getTime() / 1000);
                                if (time - listdata.lastUpdate >= REFRESH_TIME) {
                                    dispatch(newLoadingTimeline(type, null, true));
                                } else {
                                    dispatch(newLoadingTimeline(type, listdata.maxId));
                                }
                            }}
                        />
                    }
                    renderItem={({ item }) => (
                        <MastoRow
                            item={item}
                            current={current}
                            actions={actions}
                            background={config.backgroundImage !== null}
                            openStickerData={openStickerData}
                        />
                    )}
                    ItemSeparatorComponent={() => <Divider />}
                    onEndReachedThreshold={1.5}
                    ListFooterComponent={() =>
                        !listdata.refreshing &&
                        listdata.loading && (
                            <View style={styles.loading}>
                                <ActivityIndicator size="large" />
                            </View>
                        )
                    }
                    onEndReached={() => {
                        if (init && listdata && listdata.data instanceof Array && listdata.data.length >= 10 && !listdata.loading) {
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
        width: "100%",
        height: "100%",
    },
    loading: {
        paddingTop: 10,
        paddingBottom: 10,
    },
    imageFooter: {
        height: 64,
        backgroundColor: "#00000077",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 60,
    },
    imageFooterText: {
        fontSize: 17,
        color: "#FFF",
    },
});

export default MastoList;
