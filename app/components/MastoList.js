import React, { useState } from "react";
import { StyleSheet, View, FlatList, RefreshControl } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Divider } from "react-native-elements";
import MastoRow from "../components/MastoRow";

import { reply as ReplyAction, hide as HideAction, deleting as DeleteAction, detail as DetailAction } from "../actions/actioncreators/main";
import { boost as BoostAction, favourite as FavouriteAction } from "../actions/actioncreators/mastorow";

import { newLoadingTimeline } from "../actions/actioncreators/main";
const MainReducerSelector = state => state.mainReducer;
const CurrentUserReducerSelector = state => state.currentUserReducer;
const StreamingReducerSelector = state => state.streamingReducer;

function MastoList({ type }) {
    const dispatch = useDispatch();
    const [init, setInit] = useState(false);
    const listdata = useSelector(MainReducerSelector)[type];
    const streaming = useSelector(StreamingReducerSelector)[type];
    const current = useSelector(CurrentUserReducerSelector);
    if (!init && listdata && listdata.data instanceof Array && listdata.data.length < 1) {
        setInit(true);
        dispatch(newLoadingTimeline(type, listdata.maxId));
    }
    const actions = {
        ReplyAction: (id, tootid, user, acct, image, body) => {dispatch(ReplyAction(id, tootid, user, acct, image, body))},
        BoostAction: (id, tootid, boosted) => {dispatch(BoostAction(id, tootid, boosted))},
        FavouriteAction: (id, tootid, favourited) => {dispatch(FavouriteAction(id, tootid, favourited))},
        HideAction: (id) => {dispatch(HideAction(id))},
        DeleteAction: (id) => {dispatch(DeleteAction(id))},
        DetailAction: (id) => {dispatch(DetailAction(id))}
    };
    return (
        <View style={styles.container}>
            <FlatList
                keyExtractor={data => data.id}
                removeClippedSubviews={true}
                data={listdata.data}
                refreshControl={<RefreshControl enabled={!streaming} refreshing={listdata.refreshing} onRefresh={() => !streaming && dispatch(newLoadingTimeline(type, listdata.maxId))} />}
                renderItem={({ item }) => <MastoRow item={item} current={current} actions={actions} />}
                ItemSeparatorComponent={() => <Divider />}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});


export default MastoList;