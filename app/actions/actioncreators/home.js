import { AsyncStorage } from 'react-native';
import * as Home from '../actiontypes/home';
import * as Nav from '../actiontypes/nav';
import * as CONST_API from '../../constants/api';
import Networking from '../../networking';

export function toot() {
  return { type: Nav.NAV_TOOT };
}

export function getTimeline(limit = 40) {
  return async dispatch => {
    let data;
    let minId;
    let maxId;
    try {
      let access_token = await AsyncStorage.getItem("access_token");
      let domain = await AsyncStorage.getItem("domain");
      data = await Networking.fetch(domain, CONST_API.GET_TIMELINES_HOME, { limit }, access_token);
    } catch (e) {
      return;
    }
    dispatch({ type: Home.UPDATE_MASTOLIST, data: data, minId, maxId });
  }
}

export function refreshTimeline(since_id, limit = 40) {
  return async dispatch => {
    dispatch({ type: Home.REFRESHING_MASTOLIST })
    let data;
    try {
      let access_token = await AsyncStorage.getItem("access_token");
      let domain = await AsyncStorage.getItem("domain");
      data = await Networking.fetch(domain, CONST_API.GET_TIMELINES_HOME, { limit, since_id }, access_token);
    } catch (e) {
      return;
    }
    dispatch({ type: Home.UPDATE_MASTOLIST, data: data });
  }
}