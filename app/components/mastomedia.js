import React from "react";
import { Text, Image, View, TouchableOpacity, BackHandler, Linking } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as MastorowActions from "../actions/actioncreators/mastorow";
import { FontAwesome } from "@expo/vector-icons";
import PropTypes from "prop-types";
import * as MainActions from "../actions/actioncreators/main";
import styles from "../stylesheets/default/mastomedia";
import { open as openUrl } from "../util/url";

class MastoMedia extends React.Component {
    static propTypes = {
        width: PropTypes.number,
        height: PropTypes.number,
        media_attachments: PropTypes.array,
        sensitive: PropTypes.bool
    };
    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.props.MainActions.back);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.props.MainActions.back);
    }

    render() {
        return <View style={styles.container}>{this.mapView()}</View>;
    }
    componentWillReceiveProps(nextProps) {
        this.props.media_attachments = nextProps.media_attachments;
        this.props.sensitive = nextProps.sensitive;
    }

    mapView() {
        if (this.props.media_attachments) {
            return this.props.media_attachments.map((media, index) => {
                if (media.type === "image" || media.type === "video" || media.type === "gifv" || media.type === "audio" || media.type === "unknown") {
                    return (
                        <TouchableOpacity key={media.id} onPress={() => this.onPress(this.props.media_attachments, index)}>
                            <View style={[styles.mediaview, { width: this.props.width, height: this.props.height }]}>
                                <Image source={{ uri: media.preview_url }} style={[styles.media, { width: this.props.width, height: this.props.height }]} blurRadius={this.props.sensitive ? 100 : 0} />
                                <FontAwesome name={this.typeIcon(media.type)} size={30} color="gray" style={styles.mediaicon} />
                                {this.props.sensitive && <FontAwesome name={"exclamation-circle"} size={16} style={styles.mediaiconSensitive} />}
                                <Text style={styles.description} ellipsizeMode="tail" numberOfLines={3}>
                                    {this.descriptionSetting(media.description)}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    );
                }
            });
        }
    }
    descriptionSetting(description) {
        if (typeof description === "undefined" || description === null) {
            description = "";
        }
        return description;
    }
    onPress(media_attachments, index) {
        if (media_attachments[index].type === "unknown" || media_attachments[index].type === "audio") {
            openUrl(media_attachments[index].url);
            return;
        }
        this.props.MastorowActions.mediaOpen(media_attachments, index);
    }
    typeIcon(type) {
        switch (type) {
            case "image":
                return "file-image-o";
            case "video":
            case "gifv":
                return "file-video-o";
            case "audio":
                return "file-audio-o";
            case "unknown":
                return "link";
            default:
                return "question";
        }
    }
}

export default connect(
    state => state,
    dispatch => ({
        MastorowActions: bindActionCreators(MastorowActions, dispatch),
        MainActions: bindActionCreators(MainActions, dispatch)
    })
)(MastoMedia);
