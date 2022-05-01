import React, { useContext } from "react";
import { Text, Image, StyleSheet, View } from "react-native";
import { Header, ThemeContext } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import t from "../services/I18n";

import TimelineLeftHeader from "../components/TimelineLeftHeader";
import TimelineCenterHeader from "../components/TimelineCenterHeader";
import Search from "../components/Search";

const CurrentUserReducerSelector = state => state.currentUserReducer;

function SearchScreen({ navigation }) {
    const current = useSelector(CurrentUserReducerSelector);
    const { theme } = useContext(ThemeContext);
    return (
        <View style={styles.container}>
            <Header
                leftComponent={<TimelineLeftHeader isBack={true} onPress={navigation.goBack} />}
                centerComponent={<TimelineCenterHeader fixedTitle={t("search_title")} onPress={navigation.openDrawer} current={current}/>}
            />
            <Search />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default SearchScreen;