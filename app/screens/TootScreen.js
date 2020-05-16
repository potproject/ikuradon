
import React, { useState, useContext } from "react";
import { Platform, Text, StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import TimelineLeftHeader from "../components/TimelineLeftHeader";
import TimelineCenterHeader from "../components/TimelineCenterHeader";
import TimelineTootButton from "../components/TimelineTootButton";
import { FontAwesome } from "@expo/vector-icons";
import KeyboardSpacer from "react-native-keyboard-spacer";
import t from "../services/I18n";

import { toot as TootAction } from "../actions/actioncreators/toot";
import { Header, Overlay, ThemeContext } from "react-native-elements";

const reducerSelector = state => ({
    current: state.currentUserReducer,
    toot: state.tootReducer
});

import * as RouterName from "../constants/RouterName";
import VisibilityModal from "../components/VisibilityModal";
import EmojisModal from "../components/EmojisModal";

const MAX_TOOT_LENGTH = 500;
const MAX_TOOT_WARNING = MAX_TOOT_LENGTH / 20;

const VISIBILITY_DEFAULT = "public";

const VISIBILITY_CONST = {
    public: "globe",
    unlisted: "unlock",
    private: "lock",
    direct: "envelope"
};

function TootScreen({ navigation }) {
    const dispatch = useDispatch();
    const type = RouterName.Toot;
    const { current, toot } = useSelector(reducerSelector);
    const { theme } = useContext(ThemeContext);
    const [tootText, onChangeTootText] = useState("");
    const [tootCursor, useTootCursor] = useState(0);
    const [cwTootText, onChangeCwTootText] = useState("");
    const [cw, useCw] = useState(false);
    const [visibilityModal, useVisibilityModal] = useState(false);
    const [visibility, useVisibility] = useState(VISIBILITY_DEFAULT);
    const [emojisModal, useEmojisModal] = useState(false);
    return (
        <View style={styles.container}>
            <Header
                leftComponent={<TimelineLeftHeader isBack={true} goBack={navigation.goBack} openDrawer={navigation.openDrawer} />}
                centerComponent={<TimelineCenterHeader fixedTitle={false} onPress={navigation.openDrawer} current={current}/>}
                rightComponent={(
                    <TimelineTootButton
                        onPress={() => dispatch(TootAction(tootText, visibility, cw, cwTootText,[], null, null))}
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
                        onSelectionChange={(event) => event.nativeEvent.selection && useTootCursor(event.nativeEvent.selection.start)}
                        placeholder={t("toot_placeholder")}
                    />
                </View>
                <View style={[{backgroundColor: theme.colors.charBackground},styles.itemForm]}>
                    <TouchableOpacity
                        style={styles.icon}
                        onPress={() => useVisibilityModal(true)}>
                        <FontAwesome name={VISIBILITY_CONST[visibility]} size={26} color={theme.colors.grey1} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.icon}
                        onPress={() => useEmojisModal(true)}>
                        <FontAwesome name={"smile-o"} size={26} color={theme.colors.grey1} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.icon}
                        onPress={() => onChangeCwTootText("") || useCw(!cw)}>
                        <Text style={[styles.cwText,{color:cw ? theme.colors.primary : theme.colors.grey0}]}>CW</Text>
                    </TouchableOpacity>
                    <Text style={[{color: theme.colors.primary}, styles.countText]}>
                        {MAX_TOOT_LENGTH - tootText.length - cwTootText.length}
                    </Text>
                </View>
                <Overlay isVisible={visibilityModal} onBackdropPress={() => useVisibilityModal(false)}>
                    <VisibilityModal onSelect={(selected)=>{
                        useVisibilityModal(false);
                        useVisibility(selected);
                    }} />
                </Overlay>
                <Overlay isVisible={emojisModal} onBackdropPress={() => useEmojisModal(false)}>
                    <EmojisModal current={current} onSelect={(selected)=>{
                        const emojisSuffix = " :" + selected + ": ";
                        useEmojisModal(false);
                        onChangeTootText(tootText.slice(0, tootCursor) + emojisSuffix + tootText.slice(tootCursor));
                    }} />
                </Overlay>
            </View>
            { Platform.OS === "ios" && <KeyboardSpacer /> }
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
        textAlignVertical: "top",
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
        flex: 1,
    },
    icon: {
        paddingTop: 5,
        paddingLeft: 10,
        paddingRight: 15,
        paddingBottom: 5, 
    },
    cwText: {
        fontWeight: "bold",
        fontSize: 20,
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