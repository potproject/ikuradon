import React from 'react';
import { TouchableHighlight  } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as MastorowActions from '../../actions/actioncreators/mastorow';

class Favourite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id:props.id,
      style:props.style,
      favourited:props.favourited
    }
  }
  componentWillReceiveProps(nextProps){
    if(this.state.favourited !== nextProps.favourited){
      this.state.favourited = nextProps.favourited;
    }
  }
  render() {
    return (
      <TouchableHighlight style={this.state.style} onPress={()=>this.props.MastorowActions.favourite(this.state.id,!this.state.favourited)}>
        <FontAwesome name="star" size={20} color={this.setColor(this.state.favourited)} />
      </TouchableHighlight>
    );
  }
  setColor(favourited){
    return favourited ? "#ca8f04" : "gray";
  }
}

export default connect(state => state,
  (dispatch) => ({
    MastorowActions:bindActionCreators(MastorowActions,dispatch)
  })
)(Favourite);