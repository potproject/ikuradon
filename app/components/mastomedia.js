import React, { PropTypes } from "react";
import {
    Image,
    View,
    StyleSheet,
    TouchableHighlight
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as MastorowActions from "../actions/actioncreators/mastorow";
import { FontAwesome } from "@expo/vector-icons";

class MastoMedia extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            media_attachments: props.media_attachments
        }
    }
    render() {
        return (
            <View style={styles.container}>
                {this.mapView()}
            </View>
        );
    }
    mapView() {
        if (this.state.media_attachments) {
            let onPress = this.props.MastorowActions.mediaOpen;
            return this.state.media_attachments.map((media, index) => {
                if (media.type === "image" || media.type === "video") {
                    return <TouchableHighlight key={media.id} onPress={() =>
                        onPress(this.state.media_attachments, index)}>
                        <View style={styles.mediaview}>
                            <Image
                                source={{ uri: media.preview_url }}
                                style={styles.media}
                            />
                            <FontAwesome name={media.type === "image"?"file-image-o":"file-video-o"} size={30} color="gray" style={styles.mediaicon}/>
                        </View>
                    </TouchableHighlight>;
                }
            });
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mediaview:{
        margin: 5,
        padding: 5,
        width: 300,
        height: 100,
    },
    media: {
        width: 300,
        height: 100,
        position: "absolute",
    },
    mediaicon:{
        margin:5,
        position: "absolute",
    }
});

export default connect(state => state,
    (dispatch) => ({
        MastorowActions: bindActionCreators(MastorowActions, dispatch)
    })
)(MastoMedia);