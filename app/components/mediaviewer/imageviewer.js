import React, { PropTypes } from 'react';
import {
  Image,
  View,
  StyleSheet
} from 'react-native';

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
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: this.state.media_attachments[this.state.index].url }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    alignItems: 'stretch'
  },
  image: {
    flex: 1
  }
});