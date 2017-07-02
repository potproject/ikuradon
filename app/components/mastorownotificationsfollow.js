import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Linking } from 'react-native';
import Hyperlink from 'react-native-hyperlink';

export default class MastoRowNotificationfollow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id:props.id,
      type:props.type,
      user: props.user,
      image: props.image,
    }
  }
  render() {
    return (
      <View>
        <View style={styles.container}>
          <Image source={{ uri: this.state.image }} style={styles.photo} />
          <View style={styles.textarea}>
            <Text style={styles.name}>
              {this.state.user}
            </Text>
          </View>
        </View>
      </View>
    );
  }
  async openUrl(url) {
    try {
      let supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        console.log("not supported url");
      }
    } catch (e) {
      console.error('Linking error', e);
    }
  }
}


const styles = StyleSheet.create({
  textarea: {
    flex: 1,
  },
  name: {
    flex: 1,
    fontSize: 16,
    marginLeft: 12,
  },
  body: {
    flex: 2,
    marginLeft: 12,
    fontSize: 12,
  },
  photo: {
    height: 50,
    width: 50,
    borderRadius: 8
  },
  item:{
    flex: 1,
    marginLeft:50,
    paddingLeft: 12,
    paddingTop:0,
    paddingBottom:0,
    flexDirection: 'row',
  },
  itemFlex:{
    flex:1
  }
});