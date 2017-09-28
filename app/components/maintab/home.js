import React from 'react';
import {Button} from 'react-native';
import Mastolist from '../mastolist';
import { FontAwesome } from '@expo/vector-icons';
import I18n from '../../i18n';

export default class Home extends React.Component {
  static navigationOptions = {
    title: "Home",
    headerRight: <Button title="" onPress={() => headerRightHandler()} />,
    tabBarIcon: ({ focused, tintColor }) => (
                <FontAwesome name="home" size={32} color={tintColor} />
            )
  };
  constructor(props) {
    super(props);
    Home.navigationOptions.title = I18n.t("navigation_home");
  }
  render() {
    return <Mastolist type={"home"}/>
  }
}