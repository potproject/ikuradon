import React from 'react';
import { TouchableHighlight  } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default class Favorite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id:props.id,
      style:props.style,
      favorited:props.favorited
    }
  }
  render() {
    return (
      <TouchableHighlight style={this.state.style} onPress={this.onPress.bind(this.state.id)}>
        <FontAwesome name="star" size={20} color={this.setColor(this.state.favorited)} />
      </TouchableHighlight>
    );
  }
  setColor(favorited){
    return favorited ? "#ca8f04" : "gray";
  }
  onPress(id){

  }
}