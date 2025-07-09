/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

import { getMessaging, setBackgroundMessageHandler } from '@react-native-firebase/messaging';
import { getApp } from '@react-native-firebase/app';

const messaging = getMessaging(getApp());

getMessaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('📥 Message in background:', remoteMessage);
});

AppRegistry.registerComponent(appName, () => App);

