import React, { useState } from "react";
import { StyleSheet, View, FlatList, RefreshControl, Modal } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Divider } from "react-native-elements";
import ImageViewer from "react-native-image-zoom-viewer";
import MastoRow from "../components/MastoRow";
import { reply as ReplyAction, hide as HideAction, deleting as DeleteAction, detail as DetailAction } from "../actions/actioncreators/main";
import { boost as BoostAction, favourite as FavouriteAction } from "../actions/actioncreators/mastorow";

import { newLoadingTimeline } from "../actions/actioncreators/main";
const reducerSelector = state => ({
    current: state.currentUserReducer,
    main: state.mainReducer,
    streaming: state.streamingReducer,
});

function MastoList({ type }) {
    const dispatch = useDispatch();
    const [init, setInit] = useState(false);
    const { current, main, streaming } = useSelector(reducerSelector);
    const listdata = main[type];
    const streamingType = streaming[type];
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
                data={listdata.data}
                refreshControl={<RefreshControl enabled={!streamingType} refreshing={listdata.refreshing} onRefresh={() => !streamingType && dispatch(newLoadingTimeline(type, listdata.maxId))} />}
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