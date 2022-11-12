import React, { useState, useContext } from "react";
import { TouchableOpacity, StyleSheet, View, FlatList, ActivityIndicator, ScrollView } from "react-native";
import { ThemeContext, Header } from "react-native-elements";
import MastoDetailRow from "../components/MastoDetailRow";
import MastoRow from "../components/MastoRow";
import { Divider } from "react-native-elements";

import { hide as HideAction, deleting as DeleteAction } from "../actions/actioncreators/main";
import { boost as BoostAction, favourite as FavouriteAction, bookmark as BookmarkAction, follow as FollowAction, reaction as ReactionAction } from "../actions/actioncreators/mastorow";
import { open as OpenImageViewerAction, close as CloseImageViewerAction } from "../actions/actioncreators/imageviewer";

import { getDetail as GetDetailAction, resetDetail } from "../actions/actioncreators/detail";
import TimelineLeftHeader from "../components/TimelineLeftHeader";
import TimelineCenterHeader from "../components/TimelineCenterHeader";
import * as RouterName from "../constants/RouterName";

import NavigationService from "../services/NavigationService";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import t from "../services/I18n";
import { RootState } from "../reducers";

const reducerSelector =  (state: RootState) => ({
    current: state.currentUserReducer,
    detail: state.detailReducer,
    openSticker: state.openStickerReducer
});

function DetailScreen({ route, navigation }) {
    const dispatch = useDispatch();
    const { current, detail, openSticker } = useSelector(reducerSelector);
    const { data, ancestors, descendants, loaded } = detail;
    const { data: openStickerData } = openSticker;
    const detailRowActions = {
        ReplyAction: (id, tootid, user, acct, image, body) => NavigationService.navigate({ name: RouterName.Toot, params: { id, tootid, user, acct, image, body } }),

        BoostAction: (id, tootid, boosted) => {dispatch(BoostAction(id, tootid, boosted))},
        FavouriteAction: (id, tootid, favourited) => {dispatch(FavouriteAction(id, tootid, favourited))},
        BookmarkAction: (id, tootid, bookmarked) => {dispatch(BookmarkAction(id, tootid, bookmarked))},
        ReactionAction: (id, tootid, reactioned, emoji) => {dispatch(ReactionAction(id, tootid, reactioned, emoji))},
        HideAction: (id) => {
            dispatch(resetDetail());
            navigation.goBack();
            dispatch(HideAction(id));
        },
        DeleteAction: (id) => {
            dispatch(resetDetail());
            navigation.goBack();
            dispatch(DeleteAction(id));
        },

        FollowAction: (id, followed) => {dispatch(FollowAction(id, followed))},

        OpenImageViewerAction: (media, index) => {dispatch(OpenImageViewerAction(media, index))},
        CloseImageViewerAction: () => {dispatch(CloseImageViewerAction())},
        TouchAction: () => {}, //ignore
    };
    const rowActions = {
        ReplyAction: (id, tootid, user, acct, image, body) => NavigationService.navigate({ name: RouterName.Toot, params: { id, tootid, user, acct, image, body } }),

        BoostAction: (id, tootid, boosted) => {dispatch(BoostAction(id, tootid, boosted))},
        FavouriteAction: (id, tootid, favourited) => {dispatch(FavouriteAction(id, tootid, favourited))},
        BookmarkAction: (id, tootid, bookmarked) => {dispatch(BookmarkAction(id, tootid, bookmarked))},
        HideAction: (id) => {
            dispatch(resetDetail());
            navigation.goBack();
            dispatch(HideAction(id));
        },
        DeleteAction: (id) => {
            dispatch(resetDetail());
            navigation.goBack();
            dispatch(DeleteAction(id));
        },

        FollowAction: (id, followed) => {dispatch(FollowAction(id, followed))},

        OpenImageViewerAction: (media, index) => {dispatch(OpenImageViewerAction(media, index))},
        CloseImageViewerAction: () => {dispatch(CloseImageViewerAction())},
        TouchAction: (id) => {dispatch(GetDetailAction(id))},
    };
    const { theme } = useContext(ThemeContext);
    return (
        <View style={[{ backgroundColor: theme.customColors.charBackground }, styles.container]}>
            <Header
                leftComponent={<TimelineLeftHeader isBack={true} onPress={() => {
                    dispatch(resetDetail());
                    navigation.goBack();
                }} />}
                centerComponent={<TimelineCenterHeader fixedTitle={t("detail_toot")} onPress={navigation.openDrawer} current={current}/>}   
                rightComponent={
                    <TouchableOpacity style={styles.load} onPress={() => data && typeof data.id === "string" && dispatch(resetDetail) && dispatch(GetDetailAction(data.id))}>
                        <FontAwesome name={"refresh"} size={24} color={theme.customColors.primaryBackground} />
                    </TouchableOpacity>
                }
            />
            { loaded === null &&
            <View style={styles.loading}>
                <ActivityIndicator size="large" />
            </View>
            }
            { loaded === false &&
            <View style={styles.loadingFail}>
                <FontAwesome name={"times"} size={46} color={theme.colors.grey0} />
            </View>
            }
            { loaded === true &&
            <ScrollView>
                <FlatList
                    keyExtractor={data => data.id}
                    data={ancestors}
                    extraData={ancestors}
                    renderItem={({ item }) => <MastoRow item={item} current={current} actions={rowActions} background={false} delayPressIn={0} openStickerData={openStickerData} />}
                    ItemSeparatorComponent={() => <Divider />}
                    onEndReachedThreshold={1.5}
                />
                {ancestors.length !== 0 && <Divider /> }
                <MastoDetailRow item={data} current={current} actions={detailRowActions} background={false} openStickerData={openStickerData} />
                <FlatList
                    keyExtractor={data => data.id}
                    data={descendants}
                    extraData={descendants}
                    renderItem={({ item }) => <MastoRow item={item} current={current} actions={rowActions} background={false} delayPressIn={0} openStickerData={openStickerData} />}
                    ItemSeparatorComponent={() => <Divider />}
                    onEndReachedThreshold={1.5}
                />
            </ScrollView>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    load:{
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 12,
        paddingRight: 8
    },
    loading: {
        marginTop: 20,
        marginBottom: 20
    },
    loadingFail:{
        flexDirection: "row",
        justifyContent: "center",
    }
});

export default DetailScreen;