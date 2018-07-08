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
import PropTypes from "prop-types";

class MastoMedia extends React.Component {
    static propTypes = {
        width: PropTypes.number,
        height: PropTypes.number,
        media_attachments: PropTypes.array,
        sensitive: PropTypes.bool
    }
    render() {
        return (
            <View style={styles.container}>
                {this.mapView()}
            </View>
        );
    }
    componentWillReceiveProps(nextProps) {
        this.props.media_attachments = nextProps.media_attachments;
        this.props.sensitive = nextProps.sensitive;
    }

    mapView() {
        if (this.props.media_attachments) {
            let onPress = this.props.MastorowActions.mediaOpen;
            return this.props.media_attachments.map((media, index) => {
                if (media.type === "image" || media.type === "video" || media.type === "gifv") {
                    return <TouchableHighlight key={media.id} onPress={() =>
                        onPress(this.props.media_attachments, index)}>
                        <View style={[styles.mediaview,{width:this.props.width,height:this.props.height}]}>
                            <Image
                                source={{ uri: media.preview_url }}
                                style={[styles.media,{width:this.props.width,height:this.props.height}]}
                                blurRadius={this.props.sensitive ? 100 : 0}
                            />
                            <FontAwesome name={media.type === "image"?"file-image-o":"file-video-o"} size={30} color="gray" style={styles.mediaicon}/>
                            <Text style={styles.description} ellipsizeMode='tail' numberOfLines={3}>{this.descriptionSetting(media.description)}</Text>
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
        if(this.props.sensitive){
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
    },
    media: {
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
        fontSize:18,
        position: "absolute",
    }
});

export default connect(state => state,
    (dispatch) => ({
        MastorowActions: bindActionCreators(MastorowActions, dispatch)
    })
)(MastoMedia);