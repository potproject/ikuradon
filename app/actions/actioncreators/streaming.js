import { AsyncStorage } from 'react-native';
import * as Streaming from '../actiontypes/streaming';
import * as Main from '../actiontypes/main';
import * as CONST_API from '../../constants/api';
import Stream from '../../stream';

export function start() {
  return async dispatch => {
    try {
      let access_token = await AsyncStorage.getItem("access_token");
      let domain = await AsyncStorage.getItem("domain");
      Stream.init(domain, CONST_API.STREAMING, access_token);
      await Stream.open();
      dispatch({ type: Streaming.STREAM_START });
      Stream.receive((message) => {
        if (message.event === "update" && message.payload) {
          dispatch({ type: Main.UPDATE_MASTOLIST, data: [JSON.parse(message.payload)], reducerType: "home" });
        }else if (message.event === "notification" && message.payload) {
          dispatch({ type: Main.UPDATE_MASTOLIST, data: [JSON.parse(message.payload)], reducerType: "notifications" });
        }else if (message.event === "delete" && message.payload) {
          //いつか実装します
        }
      });
    } catch (e) {
      console.error(e);
      return;
    }
  }
}

export function stop() {
  return async dispatch => {
    try {
      let closeCode = await Stream.close();
      if (closeCode < 1000 && closeCode > 1015) {
        //不明な切断
        return;
      }
    } catch (e) {
      console.error(e);
      return;
    }
    dispatch({ type: Streaming.STREAM_STOP });
  }
}