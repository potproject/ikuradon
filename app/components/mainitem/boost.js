import React from 'react';
import { TouchableHighlight } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as MastorowActions from '../../actions/actioncreators/mastorow';

class Boost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      style: props.style,
      reblogged: props.reblogged
    }
  }
  componentWillReceiveProps(nextProps) {
    this.state.reblogged = nextProps.reblogged;
  }
  render() {
    return (
      <TouchableHighlight style={this.state.style} onPress={() => this.props.MastorowActions.boost(this.state.id, !this.state.reblogged)}>
        <FontAwesome name="retweet" size={20} color={this.setColor(this.state.reblogged)} />
      </TouchableHighlight>
    );
  }
  setColor(reblogged) {
    return reblogged === true ? "#2b90d9" : "gray";
  }
}


export default connect(state => state,
  (dispatch) => ({
    MastorowActions: bindActionCreators(MastorowActions, dispatch)
  })
)(Boost);