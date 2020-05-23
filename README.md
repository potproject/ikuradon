# <img width="30" heigth="30" src="https://github.com/potproject/ikuradon/blob/master/assets/image/icon250.png?raw=true"> ikuradon 2

![Expo Publish](https://github.com/potproject/ikuradon/workflows/Expo%20Publish/badge.svg?branch=master)
[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)
[![Greenkeeper badge](https://badges.greenkeeper.io/potproject/ikuradon.svg)](https://greenkeeper.io/)

Mastodon client App for React Native (Expo)

マストドン用クライアントの React Native アプリです。

## インストール方法

App Store、Google Play を通さない Expo アプリとして配布されています。

### Android

1. Expo アプリをインストールします。
   [iOS](https://apps.apple.com/app/apple-store/id982107779) / [Android](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. [ここ](https://expo.io/@potpro/potproject-ikuradon)より QR コードを読み取るか、`Open project using Expo` を押すことにより起動します。

### iOS

__昔はAndroidと同じ方法でも動いていたようですが、Apple 様の制約により動かなくされました__

現在、iOSは自分のアカウント上にあるExpoアプリしか動作させることができません。詳しくは[こちら(英語)](https://blog.expo.io/upcoming-limitations-to-ios-expo-client-8076d01aee1a)

Expo のアカウントを取得し、アプリでログイン後、ソースコードをダウンロードし、

```
yarn global add expo-cli # or npm install -g expo-cli
yarn # or npm install
expo login
expo publish
```

等のコマンドで自アカウント上にリリースすることで、制限なく iOS でも動作させることが可能です

## Feature

-   iOS / Android Device Support
-   Modern UI
-   Multi Account Support
-   Streaming API Support
-   i18n (EN/JP)
-   Custom Emoji Support

## Future

未実装

-   React Native Web Support
-   Misskey Support
-   Movie Support
-   Media upload Support
-   Multi Theme (Dark Mode And more...)

## ScreenShots

|                                                                                               |                                                                                                    |
| --------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| ![](https://github.com/potproject/ikuradon/blob/master/screenshots/ios_timeline.jpg?raw=true) | ![](https://github.com/potproject/ikuradon/blob/master/screenshots/ios_notifications.jpg?raw=true) |
| ![](https://github.com/potproject/ikuradon/blob/master/screenshots/ios_toot.jpg?raw=true)     | ![](https://github.com/potproject/ikuradon/blob/master/screenshots/ios_drawer.jpg?raw=true)        |

## Getting Starter

`Expo CDN`:

[https://expo.io/@potpro/potproject-ikuradon](https://expo.io/@potpro/potproject-ikuradon)

Open it in the [Expo app](https://expo.io) on your phone to view it.

## Development

```
yarn global add expo-cli # or npm install -g expo-cli
yarn # or npm install
yarn start # or npm run start
```

## LICENSE

AGPL v3

Copyright (C) 2020 potproject
