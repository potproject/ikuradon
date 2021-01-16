import React, { useContext } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import MastoList from "../components/MastoList";
import TootButton from "../components/TootButton";
import TimelineLeftHeader from "../components/TimelineLeftHeader";
import TimelineCenterHeader from "../components/TimelineCenterHeader";
import TimelineStreamingButton from "../components/TimelineStreamingButton";
import t from "../services/I18n";

import { Header, ThemeContext } from "react-native-elements";
import NotificationsList from "../components/NotificationsList";

import * as RouterName from "../constants/RouterName";
import DeckHeader from "../components/tablet/DeckHeader";

const reducerSelector = state => ({
    current: state.currentUserReducer,
    streaming: state.streamingReducer,
    config: state.configReducer
});

export default function TimelineDeckNavigator({ route, navigation }) {
    const { current, streaming, config } = useSelector(reducerSelector);
    const { invisible } = config;
    return (
        <View style={styles.container}>
            <Header
                leftComponent={<TimelineLeftHeader isBack={false} onPress={navigation.openDrawer} />}
                centerComponent={<TimelineCenterHeader fixedTitle={""} onPress={navigation.openDrawer} current={current} />}
            />
            <ScrollView horizontal={true}>
                { !invisible.home &&
                    <View style={styles.screen}>
                        <Header
                            centerComponent={<TimelineCenterHeader fixedTitle={t("navigation_home")} current={current} />}
                            rightComponent={<TimelineStreamingButton type={"home"}/>}
                        />
                        <MastoList type={"home"} />
                    </View>
                }
                { !invisible.local &&
                <View style={styles.screen}>
                    <Header
                        centerComponent={<TimelineCenterHeader fixedTitle={t("navigation_local")} current={current} />}
                        rightComponent={<TimelineStreamingButton type={"local"}/>}
                    />
                    <MastoList type={"local"} />
                </View>
                }
                { !invisible.federal &&
                <View style={styles.screen}>
                    <Header
                        centerComponent={<TimelineCenterHeader fixedTitle={t("navigation_federal")} current={current} />}
                        rightComponent={<TimelineStreamingButton type={"federal"}/>}
                    />
                    <MastoList type={"federal"} />
                </View>
                }
                { !invisible.notifications &&
                <View style={styles.screen}>
                    <Header
                        centerComponent={<TimelineCenterHeader fixedTitle={t("navigation_notifications")} current={current} />}
                        rightComponent={null}
                    />
                    <NotificationsList type={"notifications"} />
                </View>
                }
            </ScrollView>
            <View style={styles.tootButton}>
                <TootButton onPress={() => navigation.navigate(RouterName.Toot)} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tootButton: {
        position: "absolute",
        bottom: 5,
        right: 5,
    },
    screen: {
        width: 380,
    }
});
