import React from 'react';
import {Button} from 'react-native';
import Mastolist from '../mastolist';
import { FontAwesome } from '@expo/vector-icons';

export default class Notifications extends React.Component {
  static navigationOptions = {
    title: "Notifications",
    headerRight: <Button title="Toot" onPress={() => headerRightHandler()} />,
    tabBarIcon: ({ focused, tintColor }) => (
                <FontAwesome name="bell" size={26} color={tintColor} />
            )
  };
  constructor(props) {
    super(props);
  }
  render() {
    return <Mastolist type={"notifications"}/>
  }
}