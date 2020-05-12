import React, { useState } from "react";
import { Text, StyleSheet, View, FlatList, RefreshControl } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Divider } from "react-native-elements";

import { reply as ReplyAction, hide as HideAction, deleting as DeleteAction, detail as DetailAction } from "../actions/actioncreators/main";
import { boost as BoostAction, favourite as FavouriteAction } from "../actions/actioncreators/mastorow";

import NotificationsRow from "./NotificationsRow";
import { oldLoadingTimeline, newLoadingTimeline } from "../actions/actioncreators/main";
import { notificationParse } from "../util/notification";

const CurrentUserReducerSelector = state => ({
    current: state.currentUserReducer,
    main: state.mainReducer
});

function NotificationsList({ type }) {
    const dispatch = useDispatch();
    const [init, setInit] = useState(false);
    const { current, main } = useSelector(CurrentUserReducerSelector);
    const listdata = main[type];
    const actions = {
        ReplyAction: (id, tootid, user, acct, image, body) => {dispatch(ReplyAction(id, tootid, user, acct, image, body))},
        BoostAction: (id, tootid, boosted) => {dispatch(BoostAction(id, tootid, boosted))},
        FavouriteAction: (id, tootid, favourited) => {dispatch(FavouriteAction(id, tootid, favourited))},
        HideAction: (id) => {dispatch(HideAction(id))},
        DeleteAction: (id) => {dispatch(DeleteAction(id))},
        DetailAction: (id) => {dispatch(DetailAction(id))}
    };
    if (!init && listdata && listdata.data instanceof Array && listdata.data.length < 1) {
        setInit(true);
        dispatch(newLoadingTimeline(type, listdata.maxId));
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
                onEndReached={() => {
                    if(!init && listdata && listdata.data instanceof Array && listdata.data.length >= 10 && !listdata.loading){
                        dispatch(oldLoadingTimeline(type, listdata.minId));
                    }
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});


export default NotificationsList;