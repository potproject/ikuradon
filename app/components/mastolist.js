import React, { Component } from 'react';
import { Button,View, Text, StyleSheet, Image, ListView,RefreshControl } from 'react-native';
import MastoRow from './mastorow';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as HomeActions from '../actions/actioncreators/home';

class Mastolist extends React.Component {

  constructor(props) {
    super(props);
    this.access_token = this.props.navReducer.access_token;
    this.domain = this.props.navReducer.domain;
    this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      data:[],
      refreshing:false,
      minId:null,
      maxId:null,
    };
    this.props.HomeActions.getTimeline();
    headerRightHandler = this.props.HomeActions.toot;
    title = "Home";
  }
  render() {
    this.state.data = this.props.homeReducer.data;
    this.state.refreshing = this.props.homeReducer.refreshing;
    this.state.minId = this.props.homeReducer.minId;
    this.state.maxId = this.props.homeReducer.maxId;
    return (
      <View style={styles.container}>
        <ListView
        style={styles.container}
        dataSource={this.dataSource.cloneWithRows(this.state.data)}
        enableEmptySections={true}
        renderRow={(data) =>
            <MastoRow 
              key={data.id} 
              user={data.account.display_name} 
              body={data.content} 
              image={data.account.avatar}
            />
        }
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={()=>this.props.HomeActions.refreshTimeline(this.state.maxId)}
          />
        }
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});


export default connect((state) => 
{
return (state)},
  (dispatch) => ({
    HomeActions: bindActionCreators(HomeActions, dispatch)
  })
)(Mastolist);