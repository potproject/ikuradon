import React, { PropTypes } from 'react';
import {
  Image,
  View,
  StyleSheet
} from 'react-native';

export default class MastoMedia extends React.Component {
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
  mapView(){
    if(this.state.media_attachments){
      return this.state.media_attachments.map(this.mediaView);
    }
  }
  mediaView(media, index) {
    if (media.type === "image") {
      return <Image
        key={media.id}
        source={{uri: media.preview_url}}
        style={styles.media}
      />;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  media: {
    margin: 5,
    padding:5,
    width:300,
    height:100
  }
});