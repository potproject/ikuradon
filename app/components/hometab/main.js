import React from 'react';
import {Button} from 'react-native';
import Mastolist from '../mastolist';

export default class Main extends React.Component {
  static navigationOptions = {
    title: "Home",
    headerRight: <Button title="Toot" onPress={() => headerRightHandler()} />,
  };
  constructor(props) {
    super(props);
  }
  render() {
    return <Mastolist gettype={"main"}/>
  }
}