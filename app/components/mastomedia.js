import React from "react";
import {
    Text,
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
            media_attachments: props.media_attachments,
            sensitive: props.sensitive
        };
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
                if (media.type === "image" || media.type === "video" || media.type === "gifv") {
                    return <TouchableHighlight key={media.id} onPress={() =>
                        onPress(this.state.media_attachments, index)}>
                        <View style={styles.mediaview}>
                            <Image
                                source={{ uri: media.preview_url }}
                                style={styles.media}
                                blurRadius={this.state.sensitive ? 100 : 0}
                            />
                            <FontAwesome name={media.type === "image"?"file-image-o":"file-video-o"} size={30} color="gray" style={styles.mediaicon}/>
                            <Text style={styles.description}>{this.descriptionSetting(media.description)}</Text>
                        </View>
                    </TouchableHighlight>;
                }
            });
        }
    }
    descriptionSetting(description){
        if(typeof description === "undefined" || description === null){
            description = "";
        }
        if(this.state.sensitive){
            return "[!] "+description;
        }
        return description;

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mediaview:{
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 12,
        paddingTop: 3,
        paddingBottom: 3,
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
    },
    description:{
        margin:5,
        paddingLeft:30,
        color:"gray",
        fontSize:22,
        position: "absolute",
    }
});

export default connect(state => state,
    (dispatch) => ({
        MastorowActions: bindActionCreators(MastorowActions, dispatch)
    })
)(MastoMedia);