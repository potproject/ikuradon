import React, { PropTypes } from "react";
import {
    Alert,
    Image,
    View,
    StyleSheet,
    Dimensions
} from "react-native";
import Swiper from "react-native-swiper";
import { Video } from "expo";

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
                        <Image style={styles.image} resizeMode={"contain"} source={{ uri: data.url }} onError={(e)=>{this.onError(e)}} />
                    </View>
                );
            }else if(data.type === "video"){
                return (
                    <View style={styles.videoContainer} key={data.id} >
                        <Video
                            source={{ uri: data.url }}
                            rate={1.0}
                            volume={1.0}
                            isMuted={false}
                            shouldPlay
                            useNativeControls={true}
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
        Alert.alert(e);
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