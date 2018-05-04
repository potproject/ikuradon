import React from "react";
import {
    Image,
    View,
    StyleSheet,
    Dimensions
} from "react-native";
import { MessageBarManager } from "react-native-message-bar";
import Swiper from "react-native-swiper";
import { Video } from "expo";
import ImageZoom from 'react-native-image-pan-zoom';

export default class MediaViewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            media_attachments: props.navigation.state.params.media_attachments,
            index: props.navigation.state.params.index,
        };
    }
    render() {
        return (
            <Swiper loop={false} index={this.state.index}>
                {this.imageRender()}
            </Swiper>
        );
    }
    imageRender(){
        return this.state.media_attachments.map((data) => {
            if(data.type === "image"){
                return (
                    <View style={styles.imageContainer} key={data.id} >
                        <ImageZoom cropWidth={Dimensions.get('window').width}
                                cropHeight={Dimensions.get('window').height}
                                imageWidth={Dimensions.get('window').width}
                                imageHeight={Dimensions.get('window').height}>
                            <Image style={styles.image} resizeMode={"contain"} source={{ uri: data.url }} onError={(e)=>{this.onError(e)}} />
                        </ImageZoom>
                    </View>
                );
            }else if(data.type === "video" || data.type === "gifv"){
                return (
                    <View style={styles.videoContainer} key={data.id} >
                        <Video
                            source={{ uri: data.url }}
                            rate={1.0}
                            volume={1.0}
                            isMuted={false}
                            shouldPlay
                            useNativeControls={data.type === "video"}
                            isLooping
                            style={styles.video}
                            onError={(e)=>{this.onError(e)}}
                        />
                    </View>
                );
            }
        });
    }
    onError(e){
        MessageBarManager.showAlert({
            title: I18n.t("messages.network_error"),
            message: e.message,
            alertType: "error",
        });
    }
}
const window = Dimensions.get("window");
const styles = StyleSheet.create({
    imageContainer: {
        flex: 1,
        alignItems: "stretch",
        width: window.width,
        height: window.height,
    },
    image: {
        flex: 1
    },
    videoContainer: {
        flex: 1,
        width: window.width,
        height: window.height,
    },
    video: {
        flex: 1
    }
});