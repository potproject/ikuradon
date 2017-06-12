import React, { PropTypes } from 'react';
import {
  StyleSheet,
  TextInput,
  Button,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as LoginActions from '../actions/actioncreators/login';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      domain: "mastodon.potproject.net",
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={(text) => this.setState({ domain: text })}
          value={this.state.domain} />
        <Button
          onPress={(dispatch) => this.props.LoginActions.login(this.state.domain)}
          title="ログイン"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});

export default connect(state => state,
  (dispatch) => ({
    LoginActions:bindActionCreators(LoginActions,dispatch)
  })
)(Login);