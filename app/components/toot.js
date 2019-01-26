import React from "react";
import { Text, Image, TextInput, StyleSheet, Picker, ScrollView, View, TouchableOpacity, Button, BackHandler } from "react-native";
import Modal from "react-native-modal";
import Dimensions from "Dimensions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as TootActions from "../actions/actioncreators/toot";
import * as MainActions from "../actions/actioncreators/main";

import { FontAwesome } from "@expo/vector-icons";
import MastoMedia from "./mastomedia";
import I18n from "../i18n";
import VisibilityIcon from "./visibilityicon";
import { bodyFormat } from "../util/parser";
import * as Permission from "../util/permission";
import { ImagePicker } from "expo";
import Networking from "../networking";
import * as Session from "../util/session";
import { MessageBarManager } from "react-native-message-bar";
import KeyboardSpacer from "react-native-keyboard-spacer";
import CustomEmojisSelector from "./customemojisselector";
import DateTimePicker from "react-native-modal-datetime-picker";

const MAX_TOOT_LENGTH = 500;
const MAX_TOOT_WARNING = MAX_TOOT_LENGTH / 20;
const SEND_TOOT_TIMEOUT = 5000;

class Toot extends React.Component {
    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.props.MainActions.back);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.props.MainActions.back);
    }
    constructor(props) {
        super(props);
        this.state = {
            nsfwFlag: false,
            text: "",
            warning: "",
            reply: null,
            mediaId: [],
            mediaList: [],
            visibility: "public",
            scheduled: null,

            visibilityModal: false,
            customEmojisSelectorModal: false,
            scheduledModal: false,

            send: false
        };
        //reply
        if (props.navigation.state !== null && typeof props.navigation.state.params === "object" && Object.keys(props.navigation.state.params).length !== 0) {
            this.state.reply = {
                id: props.navigation.state.params.id,
                tootid: props.navigation.state.params.tootid,
                user: props.navigation.state.params.user,
                acct: props.navigation.state.params.acct,
                body: props.navigation.state.params.body,
                image: props.navigation.state.params.image
            };
            this.state.text = this.state.reply.acct + " ";
        }
    }
    render() {
        return (
            <View style={styles.container}>
                {this.replyText()}
                {this.toggleCwText()}
                <TextInput
                    placeholder={I18n.t("toot_placeholder")}
                    style={styles.toottext}
                    onChangeText={text => this.setState({ text })}
                    value={this.state.text}
                    maxLength={MAX_TOOT_LENGTH}
                    multiline={true}
                />
                <View style={styles.buttonview}>
                    <View style={styles.tootbuttonview}>
                        <TouchableOpacity style={styles.button} onPress={() => this.mediaOpen("library")}>
                            <FontAwesome name="picture-o" size={30} />
                        </TouchableOpacity>
                        {/*<TouchableOpacity style={styles.button} onPress={() => this.mediaOpen("camera")}>
                            <FontAwesome name="camera" size={30} />
                        </TouchableOpacity>*/}
                        <TouchableOpacity style={styles.button} onPress={() => this.setState({ visibilityModal: true })}>
                            <VisibilityIcon visibility={this.state.visibility} color="#1E90FF" size={30} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => this.setState({ nsfwFlag: !this.state.nsfwFlag })}>
                            <Text style={this.toggleCwColor()}>CW</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => this.setState({ customEmojisSelectorModal: true })}>
                            <FontAwesome name="smile-o" size={30} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => this.setState({ scheduledModal: true })}>
                            <FontAwesome name="clock-o" color={this.state.scheduled ? "#1E90FF" : "#000000"} size={30} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.tootbuttonview}>
                        <View style={styles.button}>
                            <Text style={MAX_TOOT_WARNING > MAX_TOOT_LENGTH - this.state.text.length - this.state.warning.length ? styles.textlimitwarning : styles.textlimit}>
                                {MAX_TOOT_LENGTH - this.state.text.length - this.state.warning.length}
                            </Text>
                        </View>
                        <TouchableOpacity style={this.state.send ? styles.tootbuttonsend : styles.tootbutton} onPress={() => this.send()}>
                            <Text style={styles.texttoot}>Toot!</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView style={styles.mediaScroll}>
                    <MastoMedia media_attachments={this.state.mediaList} sensitive={false} width={Dimensions.get("window").width - 20} height={100} />
                </ScrollView>
                <KeyboardSpacer />
                <Modal animationType="slide" transparent={false} visible={this.state.visibilityModal}>
                    <View>
                        <Picker selectedValue={this.state.visibility} onValueChange={visibility => this.setState({ visibility })}>
                            <Picker.Item label={I18n.t("toot_visibility_public")} value="public" />
                            <Picker.Item label={I18n.t("toot_visibility_unlisted")} value="unlisted" />
                            <Picker.Item label={I18n.t("toot_visibility_private")} value="private" />
                            <Picker.Item label={I18n.t("toot_visibility_direct")} value="direct" />
                        </Picker>
                        <Text>{I18n.t("toot_visibility_public") + ":" + I18n.t("toot_visibility_public_detail")}</Text>
                        <Text>{I18n.t("toot_visibility_unlisted") + ":" + I18n.t("toot_visibility_unlisted_detail")}</Text>
                        <Text>{I18n.t("toot_visibility_private") + ":" + I18n.t("toot_visibility_private_detail")}</Text>
                        <Text>{I18n.t("toot_visibility_direct") + ":" + I18n.t("toot_visibility_direct_detail")}</Text>
                        <Button style={styles.button} onPress={() => this.setState({ visibilityModal: false })} title={I18n.t("global_ok")} />
                    </View>
                </Modal>
                <Modal animationType="slide" transparent={false} visible={this.state.customEmojisSelectorModal}>
                    <View style={{ marginTop: 40 }}>
                        <CustomEmojisSelector onSelect={shortcode => this.selectEmoji(shortcode)} onCancel={() => this.setState({ customEmojisSelectorModal: false })} />
                    </View>
                </Modal>
                <DateTimePicker
                    mode={"datetime"}
                    date={this.setDefaultScheduled()}
                    isVisible={this.state.scheduledModal}
                    onConfirm={date => this.selectScheduled(date)}
                    onCancel={() => this.setState({ scheduled: null, scheduledModal: false })}
                />
            </View>
        );
    }

    send() {
        if (this.state.text !== "" && !this.state.send) {
            let self = this;
            self.setState({ send: true });
            setTimeout(function() {
                self.setState({ send: false });
            }, SEND_TOOT_TIMEOUT);
            this.props.TootActions.toot(this.state.text, this.state.visibility, this.state.nsfwFlag, this.state.warning, this.state.mediaId, this.state.reply, this.state.scheduled);
        }
    }

    setDefaultScheduled() {
        if (this.state.scheduled) {
            return new Date(this.state.scheduled);
        }
        const defDate = new Date();
        defDate.setSeconds(0);
        defDate.setMilliseconds(0);
        return defDate;
    }
    selectScheduled(date) {
        this.setState({
            scheduled: date.toISOString(),
            scheduledModal: false
        });
    }
    selectEmoji(shortcode) {
        this.setState({
            text: `${this.state.text} :${shortcode}: `,
            customEmojisSelectorModal: false
        });
    }

    toggleCwColor() {
        if (this.state.nsfwFlag) {
            return [styles.textcw, { color: "#1E90FF" }];
        } else {
            return styles.textcw;
        }
    }

    //warningとtoot、合わせて500文字
    toggleCwText() {
        if (this.state.nsfwFlag) {
            return (
                <TextInput
                    placeholder={I18n.t("toot_cw_placeholder")}
                    style={styles.warningtext}
                    onChangeText={warning => this.setState({ warning })}
                    value={this.state.warning}
                    maxLength={MAX_TOOT_LENGTH}
                    multiline={false}
                />
            );
        }
    }
    replyText() {
        if (!this.state.reply) {
            return;
        }
        return (
            <View style={styles.reply}>
                <View style={styles.replyHeader}>
                    <Image source={{ uri: this.state.reply.image }} style={styles.replyPhoto} />
                    <Text style={styles.replyName} ellipsizeMode="tail" numberOfLines={1}>
                        {this.state.reply.user + " " + this.state.reply.acct}
                    </Text>
                </View>
                <Text style={styles.replyBody} ellipsizeMode="tail" numberOfLines={3}>
                    {bodyFormat(this.state.reply.body)}
                </Text>
            </View>
        );
    }

    //とりあえず画像だけで
    async mediaOpen(openType) {
        //4枚まで
        if (this.state.mediaList.length >= 4) {
            MessageBarManager.showAlert({
                title: I18n.t("messages.toot_mediaupload_maximum_exceed"),
                alertType: "warning"
            });
            return;
        }

        let fileData;
        try {
            if (openType === "library") {
                await Permission.getBeforeAsk(Permission.CAMERA_ROLL);
                fileData = await ImagePicker.launchImageLibraryAsync();
            }
            if (openType === "camera") {
                await Permission.getBeforeAsk(Permission.CAMERA);
                fileData = await ImagePicker.launchCameraAsync();
            }
            if (!fileData || fileData.cancelled) {
                return;
            }
            let { domain, access_token } = await Session.getDomainAndToken();
            //アップロード中とかほしいね
            let res = await Networking.fileUpload(domain, access_token, fileData, "image/jpeg");
            if (!res.id) {
                throw new Error("ID Unknown Error!");
            }
            this.setState(state => ({
                mediaId: [...state.mediaId, res.id],
                mediaList: [...state.mediaList, res]
            }));
        } catch (e) {
            MessageBarManager.showAlert({
                title: I18n.t("messages.toot_mediaopen_failed"),
                message: e.message,
                alertType: "error"
            });
        }
        return;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    toottext: {
        height: 150,
        margin: 8,
        padding: 7,
        borderRadius: 4,
        borderWidth: 1,
        backgroundColor: "#FFFFFF"
    },
    warningtext: {
        height: 30,
        margin: 5,
        padding: 5,
        borderWidth: 1
    },
    buttonview: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    tootbuttonview: {
        width: 120,
        height: 40,
        flexDirection: "row"
    },
    button: {
        width: 40,
        height: 40,
        margin: 5,
        alignItems: "center"
    },
    reply: {
        backgroundColor: "#D2E5FF",
        margin: 5,
        padding: 5,
        borderRadius: 5
    },
    replyHeader: {
        alignItems: "center",
        flexDirection: "row",
        height: 26,
        margin: 2
    },
    replyPhoto: {
        margin: 3,
        height: 24,
        width: 24,
        borderRadius: 4
    },
    replyName: {
        width: 26,
        fontSize: 16,
        flex: 1,
        flexWrap: "wrap"
    },
    replyBody: {
        margin: 2,
        paddingTop: 3,
        paddingBottom: 3,
        fontSize: 12
    },
    textcw: {
        fontSize: 24
    },
    textvisibility: {
        fontSize: 12
    },
    textlimit: {
        color: "#2b90d9",
        fontSize: 20
    },
    textlimitwarning: {
        color: "#ff5050",
        fontSize: 20
    },
    tootbutton: {
        width: 60,
        height: 40,
        alignItems: "center",
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#2b90d9",
        backgroundColor: "#2b90d9"
    },
    tootbuttonsend: {
        width: 60,
        height: 40,
        alignItems: "center",
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#bfddf3",
        backgroundColor: "#bfddf3"
    },
    texttoot: {
        paddingTop: 5,
        fontSize: 20,
        color: "#FFFFFF"
    },
    mediaScroll: {
        width: 400,
        height: 140
    }
});

export default connect(
    state => state,
    dispatch => ({
        TootActions: bindActionCreators(TootActions, dispatch),
        MainActions: bindActionCreators(MainActions, dispatch)
    })
)(Toot);
