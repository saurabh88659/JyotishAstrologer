import notifee, {
  AndroidImportance,
  EventType,
  AndroidStyle,
} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import {CommonActions} from '@react-navigation/native';
import {routes} from '../../utils/constants';
import NavigationService from './NavigationService';
let navigationRef;

const NotificationOnScreenWithButton = async remoteMessage => {
  const channelId = await notifee.createChannel({
    id: 'default 4',
    name: 'Default Channel 4',
    vibration: true,
    vibrationPattern: [300, 500],
    importance: AndroidImportance.HIGH,
  });
  await notifee.displayNotification({
    title: remoteMessage?.notification?.title,
    body: remoteMessage?.notification?.body,
    data: remoteMessage.data,
    android: {
      channelId,
      ongoing: true,
      style: {
        type: AndroidStyle.BIGTEXT,
        text: remoteMessage?.notification?.body,
      },
      actions: [
        {
          title: '<font color="white">Accept</font>',
          pressAction: {id: 'accept'},
        },
        {
          title: '<font color="white">Reject</font>',
          pressAction: {id: 'reject'},
        },
      ],
    },
    timeoutAfter: 4000,
  });
};

const NotificationOnScreenWithOutButton = async remoteMessage => {
  const channelId = await notifee.createChannel({
    id: 'default 4',
    name: 'Jyotish',
    vibration: true,
    vibrationPattern: [300, 500],
    importance: AndroidImportance.HIGH,
  });
  await notifee.displayNotification({
    title: remoteMessage?.notification?.title,
    body: remoteMessage?.notification?.body,
    // data: remoteMessage.data,
    android: {
      channelId,
    },
    timeoutAfter: 4000,
  });
};

export async function notificationListeners(navigation) {
  navigationRef = navigation;
  //On forground====
  const unsubscribe = messaging().onMessage(async remoteMessage => {
    console.log('remoteMessage onMessage=====', remoteMessage);
    if (remoteMessage && remoteMessage.data) {
      if (remoteMessage.data.service == 'True') {
        NotificationOnScreenWithButton(remoteMessage);
      } else {
        NotificationOnScreenWithOutButton(remoteMessage);
      }
    }
  });

  //On backGraound=========
  const unsubscribeOnBackgroundMessage =
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      if (remoteMessage) {
        NotificationOnScreenWithOutButton(remoteMessage);
      }
    });

  notifee.onForegroundEvent(async ({type, detail}) => {
    // console.log('detail,,,,,,,,,,,,,,,,,,,,,', JSON.stringify(detail));
    // return
    if (type === EventType.ACTION_PRESS && detail.pressAction.id === 'accept') {
      NavigationService.navigate(routes.WaitList, {
        user: detail.notification.data,
      });
    } else if (
      type === EventType.ACTION_PRESS &&
      detail.pressAction.id === 'reject'
    ) {
      NavigationService.navigate(routes.WaitList, {
        user: detail.notification.data,
      });
    }
  });
  return unsubscribe;
}

export default notificationOnDisplay = {
  NotificationOnScreenWithButton,
  NotificationOnScreenWithOutButton,
};
