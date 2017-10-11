import React from 'react';
import { TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import ActionSheet from 'react-native-actionsheet';

export default class Action extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      style: props.style
    }
  }
  render() {
    return (
      <TouchableOpacity style={this.state.style} onPress={this.onPress.bind(this)}>
        <FontAwesome name="ellipsis-h" size={20} color="gray" />
        <ActionSheet
          ref={component => this.ActionSheet = component}
          options={[ 'Open in Browser', 'Share', 'Copy', 'Mention', 'Hide','Cancel']}
          cancelButtonIndex={5}
          destructiveButtonIndex={4}
        />
      </TouchableOpacity>
    );
  }
  onPress() {
    this.ActionSheet.show();
  }
}