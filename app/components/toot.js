import React, { PropTypes } from 'react';
import {
  Button,
  TextInput,
  StyleSheet,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as TootActions from '../actions/actioncreators/toot';

class Toot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.toottext}
          onChangeText={(text) => this.setState({ text })}
          value={this.state.text}
          maxLength={500}
          multiline={true}
        />
        <Button
          onPress={()=>this.props.TootActions.toot(this.state.text)}
          title="toot!"
          color="#841584"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toottext: {
    height: 200,
    margin: 10,
    borderWidth: 1
  }
});

export default connect(state => state,
  (dispatch) => ({
    TootActions: bindActionCreators(TootActions, dispatch)
  })
)(Toot);