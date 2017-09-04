import React, { PropTypes } from 'react';
import {
  Image,
  View,
  StyleSheet,
  Dimensions
} from 'react-native';
import Swiper from 'react-native-swiper';

export default class ImageViewer extends React.Component {
  static navigationOptions = {
    title: "Image",
  };
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
      console.log(data);
      return (
        <View style={styles.imageContainer} key={data.id} >
          <Image style={styles.image} resizeMode={'contain'} source={{ uri: data.url }} />
        </View>
      );
    });
  }
}
const window = Dimensions.get('window');
const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    alignItems: 'stretch',
    width: window.width,
    height: window.height,
  },
  image: {
    flex: 1
  }
});