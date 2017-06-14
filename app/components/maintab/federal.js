import React from 'react';
import {Button} from 'react-native';
import Mastolist from '../mastolist';

export default class Federal extends React.Component {
  static navigationOptions = {
    title: "Federal",
    headerRight: <Button title="Toot" onPress={() => headerRightHandler()} />,
  };
  constructor(props) {
    super(props);
  }
  render() {
    return <Mastolist type={"federal"}/>
  }
}