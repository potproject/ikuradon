import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';


export default class MastoRow extends Component {
  constructor(props){
    super(props);
    this.state = {
      user : props.user,
      body : props.body.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,''),
      image: props.image,
    }
  }
  render() {
    return (
     <View style={styles.container}>
        <Image source={{ uri: this.state.image}} style={styles.photo} />
        <View style={styles.textarea}>
          <Text style={styles.name}>
            {this.state.user}
          </Text>
          <Text style={styles.body}>
            {this.state.body}
          </Text>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
  },
  textarea: {
    flex: 1,
  },
  name:{
    flex:1,
    fontSize: 16,
    marginLeft: 12,
  },
  body: {
    flex:2,
    marginLeft: 12,
    fontSize: 12,
  },
  photo: {
    height: 50,
    width: 50,
    borderRadius:8
  },
});