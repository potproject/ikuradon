import React from 'react';
import {View ,Button} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as StreamingActions from '../../actions/actioncreators/streaming';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Setting extends React.Component {
  static navigationOptions = {
    title: "Setting",
    tabBarIcon: ({ focused, tintColor }) => (
                <FontAwesome name="cogs" size={26} color={tintColor} />
            )
  };
  constructor(props) {
    super(props);
    this.props = props;
  }
  render() {
    return <View>
        <Button onPress={()=>this.streamTest()} title="Stream API Test button" />
    </View>;
  }
  streamTest(){
    this.props.StreamingActions.start();
  }
}

export default connect((state) => {
  return (state)
},
  (dispatch) => ({
    StreamingActions: bindActionCreators(StreamingActions, dispatch)
  })
)(Setting);