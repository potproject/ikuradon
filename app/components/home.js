import React, { Component } from 'react';
import { Button, View, Text, StyleSheet, Image, ListView, RefreshControl } from 'react-native';
import MastoRow from './mastorow';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as HomeActions from '../actions/actioncreators/home';
import { TabNavigator } from 'react-navigation';

import MainTabScreen from '../components/hometab/main';
import LocalTabScreen from '../components/hometab/local';

export default Home = TabNavigator(
  {
    Main: {
      screen: MainTabScreen,
    },
    Local: {
      screen: LocalTabScreen,
    },
  },
  {
    tabBarOptions: {},
  }
);

const styles = StyleSheet.create({
  container: {
  },
});