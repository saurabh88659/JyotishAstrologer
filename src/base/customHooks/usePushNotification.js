// import notifee, {
//   AndroidStyle,
//   AuthorizationStatus,
// } from '@notifee/react-native';

// const usePushNotification = () => {
//   const requestUserPermission = async () => {
//     const settings = await notifee.getNotificationSettings();
//     if (Platform.OS === 'ios') {
//       const authStatus = await messaging().requestPermission();
//       const enabled =
//         authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//         authStatus === messaging.AuthorizationStatus.PROVISIONAL;
//       if (enabled) {
//         console.log('Authorization status:', authStatus);
//       }
//     } else if (Platform.OS === 'android') {
//       const res = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
//       );
//       if (settings.authorizationStatus == AuthorizationStatus.AUTHORIZED) {
//         console.log('Notification permissions has been authorized');
//       } else if (settings.authorizationStatus == AuthorizationStatus.DENIED) {
//         console.log('Notification permissions has been denied');
//       }
//     }
//   };

//   const NotificationOnScreen = async remoteMessage => {
//     const channelId = await notifee.createChannel({
//       id: 'default 4',
//       name: 'Default Channel 4',
//       vibration: true,
//       vibrationPattern: [300, 500],
//       importance: AndroidImportance.HIGH,
//     });
//     await notifee.displayNotification({
//       title: remoteMessage.notification.title,
//       body: remoteMessage.notification.body,
//       android: {
//         channelId,
//       },
//     });
//   };

//   const listenToForegroundNotifications = () => {
//     const unsubscribe = messaging().onMessage(async remoteMessage => {
//       console.log(
//         'Foreground Notifications on UsePushNotification!',
//         remoteMessage,
//       );
//       NotificationOnScreen(remoteMessage);
//     });
//     return unsubscribe;
//   };

//   const listenToBackgroundNotifications = () => {
//     const unsubscribe = messaging().setBackgroundMessageHandler(
//       async remoteMessage => {
//         console.log('Background on UsePushNotification!', remoteMessage);
//         NotificationOnScreen(remoteMessage);
//       },
//     );
//     return unsubscribe;
//   };

//   return {
//     requestUserPermission,
//     NotificationOnScreen,
//     listenToForegroundNotifications,
//     listenToBackgroundNotifications,
//   };
// };

// export default usePushNotification;
