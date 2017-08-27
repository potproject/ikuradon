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
    if (this.type === "notifications") {
      switch (data.type) {
        case "follow":
          return <MastoRowNotificationsFollow
            key={data.id}
            id={data.id}
            type={data.type}
            user={data.account.display_name}
            image={data.account.avatar}
          />;
        case "favourite":
        case "reblog":
        case "mention":
          return <MastoRow
            key={data.id}
            id={data.id}
            tootid={data.status.id}
            user={data.status.account.display_name}
            body={data.status.content}
            image={data.status.account.avatar}
            reblogged={data.status.reblogged}
            favourited={data.status.favourited}
            date={data.status.created_at}
            username={data.status.account.username}
            acct={data.status.account.acct}
            notification_type={data.type}
            notification_name={data.account.display_name}
            media_attachments={[]}
          />;
      }
    }
    if (data.reblog === null) {
      return <MastoRow
        key={data.id}
        id={data.id}
        tootid={data.id}
        user={data.account.display_name}
        body={data.content}
        image={data.account.avatar}
        reblogged={data.reblogged}
        favourited={data.favourited}
        date={data.created_at}
        username={data.account.username}
        acct={data.account.acct}
        notification_type={null}
        notification_name={null}
        media_attachments={data.media_attachments}
      />
    } else {
      return <MastoRow
        key={data.id}
        id={data.id}
        tootid={data.id}
        user={data.reblog.account.display_name}
        body={data.reblog.content}
        image={data.reblog.account.avatar}
        reblogged={data.reblog.reblogged}
        favourited={data.reblog.favourited}
        date={data.reblog.created_at}
        username={data.reblog.account.username}
        acct={data.reblog.account.acct}
        notification_type={"reblog"}
        notification_name={data.account.display_name}
        media_attachments={data.reblog.media_attachments}
      />
    }
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