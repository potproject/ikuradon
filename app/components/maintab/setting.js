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
        <Button onPress={()=>this.streamStart()} title="Stream API Test Start" />
        <Button onPress={()=>this.streamStop()} title="Stream API Test Stop" />
    </View>;
  }
  streamStart(){
    this.props.StreamingActions.start();
  }
  streamStop(){
    this.props.StreamingActions.stop();
  }
}

export default connect((state) => {
  return (state)
},
  (dispatch) => ({
    StreamingActions: bindActionCreators(StreamingActions, dispatch)
  })
)(Setting);