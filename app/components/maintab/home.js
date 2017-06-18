import React from 'react';
import {Button} from 'react-native';
import Mastolist from '../mastolist';
import { FontAwesome } from '@expo/vector-icons';

export default class Home extends React.Component {
  static navigationOptions = {
    title: "Home",
    headerRight: <Button title="Toot" onPress={() => headerRightHandler()} />,
    tabBarIcon: ({ focused, tintColor }) => (
                <FontAwesome name="home" size={32} color={tintColor} />
            )
  };
  constructor(props) {
    super(props);
  }
  render() {
    return <Mastolist type={"home"}/>
  }
}