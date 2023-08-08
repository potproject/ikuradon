
import React, { useState, useContext } from "react";
import { Platform, Text, StyleSheet, View, KeyboardAvoidingView, TextInput, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import TimelineLeftHeader from "../components/TimelineLeftHeader";
import TimelineCenterHeader from "../components/TimelineCenterHeader";
import TimelineTootButton from "../components/TimelineTootButton";
import { FontAwesome } from "@expo/vector-icons";
import { useActionSheet } from "@expo/react-native-action-sheet";
import t from "../services/I18n";

import { toot as TootAction } from "../actions/actioncreators/toot";
import { Header, Overlay, ThemeContext } from "react-native-elements";

const reducerSelector = (state: RootState) => ({
    current: state.currentUserReducer,
    toot: state.tootReducer
});

import VisibilityModal from "../components/VisibilityModal";
import EmojisModal from "../components/EmojisModal";
import DraftModal from "../components/DraftModal";
import ScheduledModal from "../components/ScheduledModal";
import { addDraft, deleteDraft } from "../util/draft";
import TootImageClip from "../components/TootImageClip";
import { RootState } from "../reducers";
import { bodyFormat } from "../util/parser";

const MAX_TOOT_LENGTH = 500;
const MAX_TOOT_WARNING = MAX_TOOT_LENGTH / 20;

const VISIBILITY_DEFAULT = "public";

const VISIBILITY_CONST = {
    public: "globe",
    unlisted: "unlock",
    private: "lock",
    direct: "envelope"
};
type Reply = {
    id: string;
    tootid: string;
    user: string;
    acct: string;
    image: string;
    body: string;
    quote: boolean;
}

function TootScreen({ navigation, route }) {
    const dispatch = useDispatch();
    const { showActionSheetWithOptions } = useActionSheet();
    const reply: Reply|null = typeof route.params !== "undefined" ? route.params : null;
    const { current, toot } = useSelector(reducerSelector);
    const { theme } = useContext(ThemeContext);
    const [tootText, onChangeTootText] = useState(current.sns !== "bluesky" && reply && !reply.quote ? "@" + reply.acct + " " : "");
    const [tootCursor, useTootCursor] = useState(0);
    const [cwTootText, onChangeCwTootText] = useState("");
    const [cw, useCw] = useState(false);
    const [visibilityModal, useVisibilityModal] = useState(false);
    const [visibilityClip, useVisibilityClip] = useState(false);
    const [visibility, useVisibility] = useState(VISIBILITY_DEFAULT);
    const [emojisModal, useEmojisModal] = useState(false);
    const [draftModal, useDraftModal] = useState(false);
    const [scheduledModal, useScheduledModal] = useState(false);
    const [scheduled, useScheduled] = useState<string|null>(null);
    const [mediaIds, useMediaIds] = useState([]);
    const callbackMediaAttachments = (MediaAttachments) => useMediaIds(MediaAttachments.map((media) => media.id));
    const onOpenActionSheet = () => {
        showActionSheetWithOptions(
            {
                options: [t("toot_draft_delete"), t("toot_draft_save"), t("global_cancel")],
                cancelButtonIndex: 2,
                destructiveButtonIndex: 0,
            },
            buttonIndex => {
                switch (buttonIndex) {
                    case 0:
                        navigation.goBack();
                        return;
                    case 1:
                        addDraft(tootText).finally(() => navigation.goBack());
                        return;
                    case 2:
                        return;
                }
            },
        );
    };
    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
            <Header
                leftComponent={<TimelineLeftHeader
                    isBack={true}
                    onPress={tootText !== "" ? onOpenActionSheet : navigation.goBack}
                />}
                centerComponent={<TimelineCenterHeader fixedTitle={false} onPress={navigation.openDrawer} current={current}/>}
                rightComponent={(
                    <TimelineTootButton
                        onPress={() => dispatch(TootAction(tootText, visibility, cw, cwTootText, mediaIds, reply, scheduled))}
                        enabled={MAX_TOOT_LENGTH - tootText.length - cwTootText.length >= 0}
                        loading={toot.tootWaiting}
                    />
                )}
            />
            <View style={[{ backgroundColor: theme.customColors.charBackground }, styles.container]}>
                { reply &&
                <View style={[{ backgroundColor: theme.customColors.charBackground }, styles.replyBox]}>
                    <Text style={[{ color: theme.colors.primary }, styles.replyUser]} ellipsizeMode="tail" numberOfLines={1}>
                        { !reply.quote && <FontAwesome name={"reply"} size={16} color={theme.colors.grey0} /> }
                        { reply.quote && <FontAwesome name={"quote-left"} size={16} color={theme.colors.grey0} /> }
                        {reply.user}
                    </Text>
                    <Text style={[{ color: theme.colors.grey0, fontSize: 16 }, styles.replyBody]} ellipsizeMode="tail" numberOfLines={1}>
                        {bodyFormat(reply.body)}
                    </Text>
                </View>
                }
                <View style={[{ backgroundColor: theme.customColors.charBackground }, styles.inputContainer]}>
                    {cw &&
                    <TextInput
                        placeholder={t("toot_cw_placeholder")}
                        placeholderTextColor={theme.colors.grey2}
                        style={[styles.cwInput, { color:theme.customColors.char }]}
                        onChangeText={text => onChangeCwTootText(text)}
                        value={cwTootText}
                        maxLength={MAX_TOOT_LENGTH}
                        multiline={false}
                    />
                    }
                    <TextInput
                        style={[styles.input, { color:theme.customColors.char }]}
                        onChangeText={text => onChangeTootText(text)}
                        value={tootText}
                        autoFocus={true}
                        maxLength={MAX_TOOT_LENGTH}
                        multiline={true}
                        onSelectionChange={(event) => event.nativeEvent.selection && useTootCursor(event.nativeEvent.selection.start)}
                        placeholder={t("toot_placeholder")}
                        placeholderTextColor={theme.colors.grey2}
                    />
                </View>
                { visibilityClip &&
                <TootImageClip callbackMediaAttachments={callbackMediaAttachments} />
                }
                <View style={[{ backgroundColor: theme.colors.charBackground }, styles.itemForm]}>
                    <TouchableOpacity
                        style={styles.icon}
                        onPress={() => mediaIds && mediaIds.length < 1 && useVisibilityClip(!visibilityClip)}>
                        <FontAwesome name={"paperclip"} size={26} color={theme.colors.grey1} />
                    </TouchableOpacity>
                    { current.sns !== "bluesky" &&
                    <TouchableOpacity
                        style={styles.icon}
                        onPress={() => useVisibilityModal(true)}>
                        <FontAwesome name={VISIBILITY_CONST[visibility]} size={26} color={theme.colors.grey1} />
                    </TouchableOpacity>
                    }
                    { current.sns !== "bluesky" &&
                    <TouchableOpacity
                        style={styles.icon}
                        onPress={() => useEmojisModal(true)}>
                        <FontAwesome name={"smile-o"} size={26} color={theme.colors.grey1} />
                    </TouchableOpacity>
                    }
                    { Platform.OS === "ios" && current.sns !== "misskey" && current.sns !== "bluesky" &&
                    <TouchableOpacity
                        style={styles.icon}
                        onPress={() => useScheduledModal(true)}>
                        <FontAwesome name={"calendar"} size={26} color={scheduled === null ? theme.colors.grey1 : theme.colors.primary} />
                    </TouchableOpacity>
                    }
                    <TouchableOpacity
                        style={styles.icon}
                        onPress={() => useDraftModal(true)}>
                        <FontAwesome name={"sticky-note"} size={26} color={theme.colors.grey1} />
                    </TouchableOpacity>
                    { current.sns !== "bluesky" &&
                    <TouchableOpacity
                        style={styles.icon}
                        onPress={() => onChangeCwTootText("") || useCw(!cw)}>
                        <Text style={[styles.cwText, { color:cw ? theme.colors.primary : theme.colors.grey0 }]}>CW</Text>
                    </TouchableOpacity>
                    }
                    <Text style={[{ color: theme.colors.primary }, styles.countText]}>
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
                    <EmojisModal reaction={false} onSelect={(selected)=>{
                        const emojisSuffix = " :" + selected + ": ";
                        useEmojisModal(false);
                        onChangeTootText(tootText.slice(0, tootCursor) + emojisSuffix + tootText.slice(tootCursor));
                    }} />
                </Overlay>
                <Overlay isVisible={draftModal} onBackdropPress={() => useDraftModal(false)}>
                    <DraftModal onSelect={(index, text)=>{
                        useDraftModal(false);
                        deleteDraft(index).finally(() => onChangeTootText(text));
                    }} />
                </Overlay>
                { Platform.OS === "ios" && current.sns !== "misskey" &&
                <Overlay isVisible={scheduledModal} onBackdropPress={() => useScheduledModal(false)}>
                    <ScheduledModal onSelect={(date: string|null)=>{
                        useScheduledModal(false);
                        useScheduled(date);
                    }} />
                </Overlay>
                }
            </View>
        </KeyboardAvoidingView>
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
    replyBox: {
        flex: 1,
        marginLeft: 20,
        marginTop: 5,
        marginRight: 5,
        marginBottom: 5,
    },
    replyUser: {
        fontWeight: "bold",
        fontSize: 18,
    },
    replyBody: {
        fontSize: 16,
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