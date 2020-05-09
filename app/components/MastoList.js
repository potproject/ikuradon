import React, { useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Divider } from "react-native-elements";
import MastoRow from "../components/MastoRow";

import { newLoadingTimeline } from "../actions/actioncreators/main";
const MainReducerSelector = state => state.mainReducer;

function MastoList({ type }) {
    const dispatch = useDispatch();
    const [init, setInit] = useState(false);
    const listdata = useSelector(MainReducerSelector)[type];
    if (!init && listdata && listdata.data instanceof Array && listdata.data.length < 1) {
        setInit(true);
        dispatch(newLoadingTimeline(type, listdata.maxId));
    }
    return (
        <View style={styles.container}>
            <FlatList
                keyExtractor={data => data.id}
                data={listdata.data}
                renderItem={data => MastoRow(data.item)}
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