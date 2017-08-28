import React, { PropTypes } from 'react';
import {
  Image,
  View,
  StyleSheet,
  TouchableHighlight
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as MastorowActions from '../actions/actioncreators/mastorow';

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
      let onPress = this.props.MastorowActions.imageOpen;
      return this.state.media_attachments.map((media, index) => {
        if (media.type === "image") {
          return <TouchableHighlight key={media.id} onPress={() =>
            onPress(this.state.media_attachments, index)}>
            <View>
              <Image
                source={{ uri: media.preview_url }}
                style={styles.media}
              />
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
  media: {
    margin: 5,
    padding: 5,
    width: 300,
    height: 100
  }
});

export default connect(state => state,
  (dispatch) => ({
    MastorowActions: bindActionCreators(MastorowActions, dispatch)
  })
)(MastoMedia);