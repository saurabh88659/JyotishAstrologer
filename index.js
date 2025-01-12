/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import notificationOnDisplay from './src/base/features/notificationOnDisplay';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  if (remoteMessage) {
    notificationOnDisplay.NotificationOnScreenWithOutButton(remoteMessage);
  }
});
AppRegistry.registerComponent(appName, () => App);
