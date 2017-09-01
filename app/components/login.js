import React, { PropTypes } from 'react';
import {
  StyleSheet,
  TextInput,
  Button,
  Image,
  Text,
  View
} from 'react-native';
import Dimensions from 'Dimensions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as LoginActions from '../actions/actioncreators/login';

class Login extends React.Component {
  static navigationOptions = {
    title: "Login",
  };
  constructor(props) {
    super(props);
    this.state = {
      domain: "mastodon.social",
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require('../../assets/image/icon250.png')}
        />
        <Text style={styles.text}>
          Please enter Mastodon instance domain.
        </Text>
        <TextInput
          style={styles.textinput}
          onChangeText={(text) => this.setState({ domain: text })}
          value={this.state.domain} />
        <Button
          style={styles.button}
          onPress={() => this.props.LoginActions.login(this.state.domain)}
          title="Login"
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
  },
  textinput: {
    height: 40,
    width: Dimensions.get('window').width - 20,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    padding: 2
  },
  text:{
    fontSize: 14,
    textAlign: 'center',
    margin: 10,
  },
  image: {
    width: 75,
    height: 75,
    marginBottom: 75
  },
});

export default connect(state => state,
  (dispatch) => ({
    LoginActions: bindActionCreators(LoginActions, dispatch)
  })
)(Login);