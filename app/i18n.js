import reactNativeI18n from 'ex-react-native-i18n';

const supported = ["en-US","ja-JP"];

export default class I18n{
  static async init() {
    await reactNativeI18n.initAsync();
    if(!supported.includes(reactNativeI18n.locale)){
        reactNativeI18n.locale = "en-US";
    }
  }

  static t(text) {
    return reactNativeI18n.t(text);
  }
}

reactNativeI18n.translations = {
  "en-US": {
    setting_streamingapi: 'Streaming API',

    //navigation
    navigation_home:"home",
    navigation_local:"local",
    navigation_federal: "Federal",
    navigation_notifications: "Notifications",
    navigation_setting: "Setting",
  },
  "ja-JP": {
    setting_streamingapi: 'ストリーミング API',

    //navigation
    navigation_home:"ホーム",
    navigation_local:"ローカル",
    navigation_federal: "連合",
    navigation_notifications: "通知",
    navigation_setting: "設定",
  }
}