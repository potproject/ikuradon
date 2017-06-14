import React, { Component } from 'react';
import { Button, View, Text, StyleSheet, Image, ListView, RefreshControl } from 'react-native';
import MastoRow from './mastorow';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as MainActions from '../actions/actioncreators/main';
import { TabNavigator } from 'react-navigation';

import HomeTabScreen from '../components/maintab/home';
import LocalTabScreen from '../components/maintab/local';
import FederalTabScreen from '../components/maintab/federal';
//import NotificationsTabScreen from '../components/maintab/notifications';

export default Main = TabNavigator(
  {
    Home: {
      screen: HomeTabScreen,
    },
    Local: {
      screen: LocalTabScreen,
    },
    federal: {
      screen: FederalTabScreen,
    },
    /**notifications: {
      screen: NotificationsTabScreen,
    },**/
  },
  {
    tabBarOptions: {},
  }
);

const styles = StyleSheet.create({
  container: {
  },
});