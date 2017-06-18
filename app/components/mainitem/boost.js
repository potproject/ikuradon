import React from 'react';
import { TouchableHighlight  } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default class Boost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id:props.id,
      style:props.style,
      reblogged:props.reblogged
    }
  }
  render() {
    return (
      <TouchableHighlight style={this.state.style} onPress={this.onPress.bind(this.state.id)}>
        <FontAwesome name="retweet" size={20} color={this.setColor(this.state.reblogged)} />
      </TouchableHighlight>
    );
  }
  setColor(reblogged){
    return reblogged ? "#2b90d9" : "gray";
  }
  onPress(id){

  }
}