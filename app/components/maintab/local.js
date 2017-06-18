import React from 'react';
import {Button} from 'react-native';
import Mastolist from '../mastolist';
import { FontAwesome } from '@expo/vector-icons';

export default class Local extends React.Component {
  static navigationOptions = {
    title: "Local",
    headerRight: <Button title="Toot" onPress={() => headerRightHandler()} />,
    tabBarIcon: ({ focused, tintColor }) => (
                <FontAwesome name="users" size={26} color={tintColor} />
            )
  };
  constructor(props) {
    super(props);
  }
  render() {
    return <Mastolist type={"local"}/>
  }
}