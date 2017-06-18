import React from 'react';
import { Button } from 'react-native';
import Mastolist from '../mastolist';
import { FontAwesome } from '@expo/vector-icons';

export default class Federal extends React.Component {
  static navigationOptions = {
    title: "Federal",
    headerRight: <Button title="Toot" onPress={() => headerRightHandler()} />,
    tabBarIcon: ({ focused, tintColor }) => (
                <FontAwesome name="globe" size={32} color={tintColor} />
            )
  };
  constructor(props) {
    super(props);
  }
  render() {
    return <Mastolist type={"federal"} />
  }
}