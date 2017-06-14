import React, { Component } from 'react';
import { Button,View, Text, StyleSheet, Image, ListView,RefreshControl } from 'react-native';
import MastoRow from './mastorow';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as MainActions from '../actions/actioncreators/main';

class Mastolist extends React.Component {

  constructor(props) {
    super(props);
    this.type = this.props.type;
    this.access_token = this.props.navReducer.access_token;
    this.domain = this.props.navReducer.domain;
    this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.props.MainActions.getTimeline(this.type);
    headerRightHandler = this.props.MainActions.toot;
  }
  render() {
    let dataprops = this.reducerType();
    return (
      <View style={styles.container}>
        <ListView
        style={styles.container}
        dataSource={this.dataSource.cloneWithRows(dataprops.data)}
        enableEmptySections={true}
        removeClippedSubviews={false}
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
            refreshing={dataprops.refreshing}
            onRefresh={()=>this.props.MainActions.refreshTimeline(this.type,dataprops.maxId)}
          />
        }
      />
      </View>
    );
  }
  reducerType(){
    switch(this.props.type){
      case "home":
        return this.props.mainReducer.home;
      case "local":
        return this.props.mainReducer.local;
      case "federal":
        return this.props.mainReducer.federal;
    }
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
    MainActions: bindActionCreators(MainActions, dispatch)
  })
)(Mastolist);