import { AsyncStorage } from 'react-native';
import * as Streaming from '../actiontypes/streaming';
import * as Main from '../actiontypes/main';
import * as CONST_API from '../../constants/api';
import Stream from '../../stream';

export function start() {
  return async dispatch => {
    
    let stream;
    try {
      let access_token = await AsyncStorage.getItem("access_token");
      let domain = await AsyncStorage.getItem("domain");
      stream = new Stream(domain, CONST_API.STREAMING, access_token);
      await stream.open();
      dispatch({ type: Streaming.STREAM_START});
      stream.receive((message) => {
        if(message.event === "update" && message.payload){
          dispatch({ type: Main.UPDATE_MASTOLIST, data: [JSON.parse(message.payload)], reducerType:"home" });
        }
      });
    } catch (e) {
      console.error(e);
      return;
    }
  }
}

export function stop(reducerType,stream) {
  return async dispatch => {
    try {
      await stream.stop();
    } catch (e) {
      console.error(e);
      return;
    }
    dispatch({ type: Streaming.STREAM_STOP,reducerType });
  }
}