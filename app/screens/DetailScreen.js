import React, { useState, useContext } from "react";
import { Platform, Text, StyleSheet, View, ActivityIndicator, ScrollView } from "react-native";
import { ThemeContext, Header } from "react-native-elements";
import MastoDetailRow from "../components/MastoDetailRow";
import { hide as HideAction, deleting as DeleteAction, follow as FollowAction } from "../actions/actioncreators/main";
import { boost as BoostAction, favourite as FavouriteAction, bookmark as BookmarkAction } from "../actions/actioncreators/mastorow";
import { open as OpenImageViewerAction, close as CloseImageViewerAction } from "../actions/actioncreators/imageviewer";

import { closeDetail } from "../actions/actioncreators/detail";
import TimelineLeftHeader from "../components/TimelineLeftHeader";
import TimelineCenterHeader from "../components/TimelineCenterHeader";
import * as RouterName from "../constants/RouterName";

import NavigationService from "../services/NavigationService";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import t from "../services/I18n";

const reducerSelector =  state => ({
    current: state.currentUserReducer,
    detail: state.detailReducer,
    openSticker: state.openStickerReducer
});

function DetailScreen({ route, navigation }) {
    const dispatch = useDispatch();
    const { current, detail, openSticker } = useSelector(reducerSelector);
    const { data, loaded } = detail;
    const { data: openStickerData } = openSticker;
    const actions = {
        ReplyAction: (id, tootid, user, acct, image, body) => NavigationService.navigate({ name: RouterName.Toot, params: { id, tootid, user, acct, image, body } }),

        BoostAction: (id, tootid, boosted) => {dispatch(BoostAction(id, tootid, boosted))},
        FavouriteAction: (id, tootid, favourited) => {dispatch(FavouriteAction(id, tootid, favourited))},
        BookmarkAction: (id, tootid, bookmarked) => {dispatch(BookmarkAction(id, tootid, bookmarked))},
        HideAction: (id) => {
            dispatch(closeDetail());
            navigation.goBack();
            dispatch(HideAction(id));
        },
        DeleteAction: (id) => {
            dispatch(closeDetail());
            navigation.goBack();
            dispatch(DeleteAction(id));
        },

        FollowAction: (id, followed) => {dispatch(FollowAction(id, followed))},

        OpenImageViewerAction: (media, index) => {dispatch(OpenImageViewerAction(media, index))},
        CloseImageViewerAction: () => {dispatch(CloseImageViewerAction())},
    };
    const { theme } = useContext(ThemeContext);
    return (
        <View style={[{ backgroundColor: theme.customColors.charBackground }, styles.container]}>
            <Header
                leftComponent={<TimelineLeftHeader isBack={true} onPress={() => {
                    dispatch(closeDetail());
                    navigation.goBack();
                }} />}
                centerComponent={<TimelineCenterHeader fixedTitle={t("detail_toot")} onPress={navigation.openDrawer} current={current}/>}   
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
                <MastoDetailRow item={data} current={current} actions={actions} background={false} openStickerData={openStickerData} />
            </ScrollView>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
