import React, { PropTypes } from 'react';
import {
  Text,
  Button,
  TextInput,
  StyleSheet,
  Modal,
  Picker,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as TootActions from '../actions/actioncreators/toot';
import { FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

const MAX_TOOT_LENGTH = 500;

class Toot extends React.Component {
  static navigationOptions = {
    title: "Toot",
  };
  constructor(props) {
    super(props);
    this.state = {
      nsfwFlag: false,
      text: "",
      warning: "",
      visibilityModal: false,
      visibility: "public",
    };
  }
  render() {
    return (
      <View style={styles.container}>
        {this.toggleCw()}
        <TextInput
          placeholder={"What is on yor mind?"}
          style={styles.toottext}
          onChangeText={(text) => this.setState({ text })}
          value={this.state.text}
          maxLength={MAX_TOOT_LENGTH}
          multiline={true}
        />
        <Button
          onPress={() => this.props.TootActions.toot(this.state.text,this.state.visibility,this.state.nsfwFlag,this.state.warning)}
          title="Toot!"
          color="#00008B"
        />
        <Text>{MAX_TOOT_LENGTH - this.state.text.length - this.state.warning.length}</Text>
        <TouchableOpacity onPress={() => this.props.TootActions.mediaOpen("library")}>
          <FontAwesome name="picture-o" size={30} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.TootActions.mediaOpen("camera")}>
          <FontAwesome name="camera" size={30} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.setState({ nsfwFlag: !this.state.nsfwFlag })}>
          <Text>CW</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.setState({ visibilityModal: true })}>
          <Text>{this.state.visibility}</Text>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.visibilityModal}
        >
          <View>
            <Picker
              selectedValue={this.state.visibility}
              onValueChange={(visibility) => this.setState({ visibility })}>
              <Picker.Item label="public" value="public" />
              <Picker.Item label="unlisted" value="unlisted" />
              <Picker.Item label="private" value="private" />
              <Picker.Item label="direct" value="direct" />
            </Picker>
            <TouchableOpacity onPress={() => this.setState({  visibilityModal: false })}>
              <Text>OK!</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }
  //warningとtoot、合わせて500文字
  toggleCw() {
    if (this.state.nsfwFlag) {
      return <TextInput
        placeholder={"Write your warning here"}
        style={styles.warningtext}
        onChangeText={(warning) => this.setState({ warning })}
        value={this.state.warning}
        maxLength={MAX_TOOT_LENGTH}
        multiline={false}
      />;
    } else {
      return;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toottext: {
    height: 200,
    margin: 5,
    padding: 5,
    borderWidth: 1
  },
  warningtext: {
    height: 30,
    margin: 5,
    padding: 5,
    borderWidth: 1
  }
});

export default connect(state => state,
  (dispatch) => ({
    TootActions: bindActionCreators(TootActions, dispatch)
  })
)(Toot);