import React from 'react';
import {Button} from 'react-native';

export default class Notifications extends React.Component {
  static navigationOptions = {
    title: "Notifications",
    headerRight: <Button title="Toot" onPress={() => headerRightHandler()} />,
  };
  constructor(props) {
    super(props);
  }
  render() {
    return <View type={"notifications"}/>
  }
}