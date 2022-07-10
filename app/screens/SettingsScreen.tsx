import React, { useState, useContext } from "react";
import { Text, StyleSheet, View, ScrollView, Alert, Switch } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { ListItem, Icon, ThemeContext } from "react-native-elements";
import Constants from "expo-constants";
import t from "../services/I18n";

import { setInvisibleTimeline, allClear, setBackground, setBackgroundClear } from "../actions/actioncreators/config";
import { logout } from "../actions/actioncreators/login";
import { subscribe as SubscribeAction, unsubscribe as UnsubscribeAction } from "../actions/actioncreators/pushnotification";
import { on as OpenStickerOnAction, off as OpenStickerOffAction } from "../actions/actioncreators/opensticker";

import NavigationService from "../services/NavigationService";

import * as RouterName from "../constants/RouterName";
import { RootState } from "../reducers";

const reducerSelector =  (state: RootState) => ({
    current: state.currentUserReducer,
    config: state.configReducer,
    pushNotification: state.pushNotificationReducer,
    openSticker: state.openStickerReducer
});

function SettingsScreen() {
    const dispatch = useDispatch();
    const { current, config, pushNotification, openSticker } = useSelector(reducerSelector);
    const { invisible } = config;
    const { use: useOpenSticker, server: serverOpenSticker } = openSticker;
    const { user_credentials, domain, access_token, sns } = current;
    const { theme } = useContext(ThemeContext);

    const [pushServer, onChangePushServer] = useState("salmon.potproject.net");
    const [serverOpenStickerState, onChangeServerOpenSticker] = useState(serverOpenSticker);

    const invisibleCheck = (value) => {
        let count = 0;
        invisible.home && count++;
        invisible.local && count++;
        invisible.federal && count++;
        invisible.notifications && count++;
        // 全部非表示は無理やで
        if (count >= 3 && value === true){
            console.log("invisible validate fail");
            return false;
        }
        return true;
    };
    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={[{ color: theme.colors.grey0 }, styles.label]}>{user_credentials ? user_credentials.username + "@" + domain : ""}</Text>
                <ListItem bottomDivider onPress={()=>dispatch(logout())}>
                    <ListItem.Content>
                        <ListItem.Title>{t("logout")}</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>
                <Text style={[{ color: theme.colors.grey0 }, styles.label]}>{t("setting_header_visible")}</Text>
                <ListItem bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title>{t("setting_visible_home")}</ListItem.Title>
                    </ListItem.Content>
                    <Switch
                        onValueChange={value => invisibleCheck(value) && dispatch(setInvisibleTimeline("home", value))}
                        value={invisible.home}
                    />
                </ListItem>
                <ListItem bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title>{t("setting_visible_local")}</ListItem.Title>
                    </ListItem.Content>
                    <Switch
                        onValueChange={value => invisibleCheck(value) && dispatch(setInvisibleTimeline("local", value))}
                        value={invisible.local}
                    />
                </ListItem>
                <ListItem bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title>{t("setting_visible_federal")}</ListItem.Title>
                    </ListItem.Content>
                    <Switch
                        onValueChange={value => invisibleCheck(value) && dispatch(setInvisibleTimeline("federal", value))}
                        value={invisible.federal}
                    />
                </ListItem>
                <ListItem bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title>{t("setting_visible_notifications")}</ListItem.Title>
                    </ListItem.Content>
                    <Switch
                        onValueChange={value => invisibleCheck(value) && dispatch(setInvisibleTimeline("notifications", value))}
                        value={invisible.notifications}
                    />
                </ListItem>
                <Text style={[{ color: theme.colors.grey0 }, styles.label]}>{t("setting_push_notifications")}</Text>
                { typeof pushNotification[domain+":"+access_token] !== "object" &&
                <ListItem bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title>{t("setting_push_notifications_server")}</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Input value={pushServer} onChangeText={onChangePushServer}></ListItem.Input>
                </ListItem>
                }
                { typeof pushNotification[domain+":"+access_token] !== "object" &&
                <ListItem
                    bottomDivider
                    onPress={() => {
                        Alert.alert(
                            t("global_warning"),
                            t("setting_push_notifications_alert_text"),
                            [
                                {
                                    text: t("global_cancel"),
                                    style: "cancel"
                                },
                                { text: t("global_ok"), onPress: () => dispatch(SubscribeAction(sns, domain, access_token, pushServer)) }
                            ],
                            { cancelable: false }
                        );
                    }}
                >
                    <ListItem.Content>
                        <ListItem.Title>{t("setting_push_notifications_start")}</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>
                }
                { typeof pushNotification[domain+":"+access_token] === "object" &&
                <ListItem
                    bottomDivider
                    onPress={() => dispatch(UnsubscribeAction(sns, domain, access_token, pushServer))}
                >
                    <ListItem.Content>
                        <ListItem.Title>{t("setting_push_notifications_stop")}</ListItem.Title>
                        <ListItem.Subtitle>{ t("setting_push_notifications_server") + ": " + pushNotification[domain+":"+access_token].server }</ListItem.Subtitle>
                    </ListItem.Content>
                    <Icon name={"check"} color={theme.colors.primary} />
                    <ListItem.Chevron />
                </ListItem>
                }

                <Text style={[{ color: theme.colors.grey0 }, styles.label]}>{t("setting_opensticker")}</Text>
                <ListItem bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title>{t("setting_opensticker_server")}</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Input value={serverOpenStickerState} onChangeText={onChangeServerOpenSticker}></ListItem.Input>
                </ListItem>
                <ListItem bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title>{t("setting_opensticker_use")}</ListItem.Title>
                    </ListItem.Content>
                    <Switch
                        onValueChange={value => { value ? dispatch(OpenStickerOnAction(serverOpenStickerState)) : dispatch(OpenStickerOffAction())}}
                        value={useOpenSticker}
                    />
                </ListItem>

                <Text style={[{ color: theme.colors.grey0 }, styles.label]}>{t("setting_themes")}</Text>
                <ListItem bottomDivider onPress={()=>dispatch(setBackground())}>
                    <ListItem.Content>
                        <ListItem.Title>{t("setting_background")}</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>
                <ListItem bottomDivider onPress={()=>dispatch(setBackgroundClear())}>
                    <ListItem.Content>
                        <ListItem.Title>{t("setting_background_clear")}</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>
                <ListItem bottomDivider onPress={()=>NavigationService.navigate({ name: RouterName.Settings_Themes })}>
                    <ListItem.Content>
                        <ListItem.Title>{t("setting_themes")}</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>
                <Text style={[{ color: theme.colors.grey0 }, styles.label]}>{}</Text>
                <ListItem bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title>{t("setting_appversion")}</ListItem.Title>
                        <ListItem.Subtitle>{Constants.manifest.version}</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
                <ListItem bottomDivider onPress={()=>dispatch(allClear())}>
                    <ListItem.Content>
                        <ListItem.Title>{t("setting_allclear")}</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 80

    },
    label: {
        fontWeight: "bold",
        fontSize: 16,
        paddingTop: 15,
        paddingLeft: 15,
        paddingRight: 10,
        paddingBottom: 10,
    }
});

export default SettingsScreen;
