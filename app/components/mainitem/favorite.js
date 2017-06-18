import React from 'react';
import { TouchableHighlight  } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default class Favorite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id:props.id,
      style:props.style
    }
  }
  render() {
    return (
      <TouchableHighlight style={this.state.style} onPress={this.onPress.bind(this.state.id)}>
        <FontAwesome name="star" size={20} color="gray" />
      </TouchableHighlight>
    );
  }
  onPress(id){

  }
}