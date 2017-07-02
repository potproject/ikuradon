import React, { Component } from 'react';
import { Button, View, Text, StyleSheet, Image, ListView, RefreshControl } from 'react-native';
import MastoRow from './mastorow';
import MastoRowNotificationsFollow from './mastorownotificationsfollow';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as MainActions from '../actions/actioncreators/main';

class Mastolist extends React.Component {

  constructor(props) {
    super(props);
    this.type = this.props.type;
    this.access_token = this.props.navReducer.access_token;
    this.domain = this.props.navReducer.domain;
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => { r1 !== r2 } });
    this.listdata = this.reducerType(props);
    this.props.MainActions.getTimeline(this.type);
    headerRightHandler = this.props.MainActions.toot;
  }

  componentWillReceiveProps(nextProps) {
    this.listdata = this.reducerType(nextProps);
  }
  render() {
    return (
      <View style={styles.container}>
        <ListView
          style={styles.container}
          dataSource={this.dataSource.cloneWithRows(this.listdata.data)}
          enableEmptySections={true}
          removeClippedSubviews={false}
          renderRow={(data) => this.mastoRowIdentification(data)}
          refreshControl={
            <RefreshControl
              refreshing={this.listdata.refreshing}
              onRefresh={() => this.props.MainActions.refreshTimeline(this.type, this.listdata.maxId)}
            />
          }
        />
      </View>
    );
  }
  reducerType(nextProps) {
    switch (this.type) {
      case "home":
        return nextProps.mainReducer.home;
      case "local":
        return nextProps.mainReducer.local;
      case "federal":
        return nextProps.mainReducer.federal;
      case "notifications":
        return nextProps.mainReducer.notifications;
    }
  }
  mastoRowIdentification(data) {
    if (this.type === "notifications" && data.type === "follow") {
      return <MastoRowNotificationsFollow
        key={data.id}
        id={data.id}
        type={data.type}
        user={data.account.display_name}
        image={data.account.avatar}
      />;
    }
    if (this.type === "notifications") {
      return <MastoRow
        key={data.id}
        id={data.id}
        tootid={data.status.id}
        user={data.account.display_name}
        body={data.status.content}
        image={data.account.avatar}
        reblogged={data.reblogged}
        favourited={data.favourited}
      />
    }
    return <MastoRow
      key={data.id}
      id={data.id}
      tootid={data.id}
      user={data.account.display_name}
      body={data.content}
      image={data.account.avatar}
      reblogged={data.reblogged}
      favourited={data.favourited}
    />
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});


export default connect((state) => {
  return (state)
},
  (dispatch) => ({
    MainActions: bindActionCreators(MainActions, dispatch)
  })
)(Mastolist);