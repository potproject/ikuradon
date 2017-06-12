import React from 'react';
import {Button} from 'react-native';
import Mastolist from '../mastolist';

export default class Local extends React.Component {
  static navigationOptions = {
    title: "Local",
    headerRight: <Button title="Toot" onPress={() => headerRightHandler()} />,
  };
  constructor(props) {
    super(props);
  }
  render() {
    return <Mastolist gettype={"local"}/>
  }
}