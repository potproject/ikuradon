
import React, { useState, useContext } from "react";
import { Text, StyleSheet, View, Button, TextInput } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import TimelineLeftHeader from "../components/TimelineLeftHeader";
import TimelineCenterHeader from "../components/TimelineCenterHeader";
import TimelineTootButton from "../components/TimelineTootButton";
import KeyboardSpacer from "react-native-keyboard-spacer";
import t from "../services/I18n";

import { toot as TootAction } from "../actions/actioncreators/toot";
import { Header, ThemeContext } from "react-native-elements";

const reducerSelector = state => ({
    current: state.currentUserReducer,
    toot: state.tootReducer
});

import * as RouterName from "../constants/RouterName";

const MAX_TOOT_LENGTH = 500;
const MAX_TOOT_WARNING = MAX_TOOT_LENGTH / 20;

function TootScreen({ navigation }) {
    const dispatch = useDispatch();
    const type = RouterName.Toot;
    const { current, toot } = useSelector(reducerSelector);
    const { theme }= useContext(ThemeContext);
    const [cwTootText, onChangeCwTootText] = useState("");
    const [cw, useCw] = useState(false);
    const [tootText, onChangeTootText] = useState("");
    return (
        <View style={styles.container}>
            <Header
                leftComponent={<TimelineLeftHeader isBack={true} goBack={navigation.goBack} openDrawer={navigation.openDrawer} />}
                centerComponent={<TimelineCenterHeader fixedTitle={false} onPress={navigation.openDrawer} current={current}/>}
                rightComponent={(
                    <TimelineTootButton
                        onPress={() => dispatch(TootAction(tootText, "public", cw, cwTootText,[], null, null))}
                        enabled={MAX_TOOT_LENGTH - tootText.length - cwTootText.length >= 0}
                        loading={toot.tootWaiting}
                    />
                )}
            />
            <View style={[{backgroundColor: theme.customColors.charBackground},styles.container]}>
                <View style={[{backgroundColor: theme.customColors.charBackground},styles.inputContainer]}>
                    {cw &&
                    <TextInput
                        placeholder={t("toot_cw_placeholder")}
                        style={styles.cwInput}
                        onChangeText={text => onChangeCwTootText(text)}
                        value={cwTootText}
                        maxLength={MAX_TOOT_LENGTH}
                        multiline={false}
                    />
                    }
                    <TextInput
                        style={styles.input}
                        onChangeText={text => onChangeTootText(text)}
                        value={tootText}
                        autoFocus={true}
                        maxLength={MAX_TOOT_LENGTH}
                        multiline={true}
                        placeholder={t("toot_placeholder")}
                    />
                </View>
                <View style={[{backgroundColor: theme.colors.charBackground},styles.itemForm]}>
                    <Button
                        color={cw ? theme.colors.primary : theme.colors.grey0}
                        onPress={() => onChangeCwTootText("") || useCw(!cw)}
                        title="CW"
                    />
                    <Text style={[{color: theme.colors.primary}, styles.countText]}>
                        {MAX_TOOT_LENGTH - tootText.length - cwTootText.length}
                    </Text>
                </View>
            </View>
            <KeyboardSpacer/>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    inputContainer:{
        flex: 6,
        margin: 10,
        fontSize: 20
    },
    cwInput: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        fontSize: 16
    },
    input: {
        flex: 9,
        marginLeft: 10,
        marginRight: 10,
        fontSize: 20
    },
    imageForm: {
        flex: 3
    },
    itemForm: {
        flex: 1,
        flexDirection: "row",
    },
    item: {
        flex: 1
    },
    countText: {
        fontSize: 20,
        marginLeft: "auto",
        alignSelf: "flex-end",
        paddingRight: 10,
        paddingBottom: 20,      
    }
});


export default TootScreen;