import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DrawerStack from './DrawerStack';
import {routes} from '../utils/constants';
import Profile from '../screens/mainScreens/ProfileScreens/Profile';
import WaitList from '../screens/mainScreens/OrdersScreens/WaitList';
import MyReviews from '../screens/mainScreens/MyReviewsScreen.js/MyReviews';
import PerformanceScreen from '../screens/mainScreens/MyPerformanceScreens/PerformanceScreen';
import Followers from '../screens/mainScreens/Followers';
import CallHistory from '../screens/mainScreens/CallScreens/CallHistory';
import ChatHistory from '../screens/mainScreens/ChatScreens/ChatHistory';
import LiveEvent from '../screens/mainScreens/LiveEventsScreens/LiveEvent';
import {useDispatch, useSelector} from 'react-redux';
import {
  setAgoraToken,
  setAppId,
  setChatRoom,
  setUserData,
  setWhoosh,
} from '../redux/auth.reducer';
import useAuthApiServices from '../base/customHooks/useAuthApiServices';
import ViewAllTrainingReels from '../screens/mainScreens/TrainigReels/ViewAllTrainingReels';
import AddPooja from '../screens/mainScreens/Pooja/AddPooja';
import Settings from '../screens/mainScreens/SetttingScreens/Settings';
import PoojaScreen from '../screens/mainScreens/Pooja/PoojaScreen';
import BlogScreen from '../screens/mainScreens/Blog/BlogScreen';
import AddBlogScreen from '../screens/mainScreens/Blog/AddBlogScreen';
import UpdatePhoneNumber from '../screens/mainScreens/UpdatePhoneNumber/UpdatePhoneNumber';
import BankDetails from '../screens/mainScreens/BankDetails/BankDetails';
import PaySlip from '../screens/mainScreens/PaySlip/PaySlip';
import TermsAndConditions from '../screens/mainScreens/Terms&Condition/TermsAndConditions';
import CreateOffer from '../screens/mainScreens/Offers/CreateOffer';
import UserChatScreen from '../screens/mainScreens/ChatScreens/UserChatScreen';
import CallWithUser from '../screens/mainScreens/CallScreens/CallWithUser';
import AddEditBankDetails from '../screens/mainScreens/BankDetails/AddEditBankDetails';
import ViewImageScreen from '../screens/mainScreens/ViewImageScreen';
import KundaliTopTabStack from '../components/navigationComponents/KundaliTopTabStack';
import {
  getAgoraToken,
  getAllToken,
  getChatroom,
  updateFcmToken,
} from '../base/features/MainApiServices/MainApiServices';
import particularChatHistory from '../screens/mainScreens/ChatScreens/ParticularChatHistory';
import {Linking, ToastAndroid} from 'react-native';
import ChatTabStack from '../components/navigationComponents/ChatTabStack';
import CallTabStack from '../components/navigationComponents/CallTabStack';
import PlayReel from '../screens/mainScreens/TrainigReels/PlayReel';
import messaging from '@react-native-firebase/messaging';
import {Platform, PermissionsAndroid} from 'react-native';
import {notificationListeners} from '../base/features/notificationOnDisplay';
import Sound from 'react-native-sound';
import VideoCallScreen from '../screens/mainScreens/CallScreens/VideoCallScreen';
import VideoCallTabStack from '../components/navigationComponents/VideoCallTabStack';
import GoLive from '../screens/mainScreens/LiveEventsScreens/GoLive';
import notifee, {EventType} from '@notifee/react-native';
import {useNavigation} from '@react-navigation/native';
import PrivacyPolicy from '../screens/mainScreens/PrivacyPolicy/PrivacyPolicy';
import QuickChat from '../screens/mainScreens/ChatScreens/QuickChat';
import AddQuickChat from '../screens/mainScreens/ChatScreens/AddQuickChat';
import HelpAndSupport from '../screens/mainScreens/HelpAndSupport/HelpAndSupport';
import AgoraLiveEvent from '../screens/mainScreens/LiveEventsScreens/AgoraLiveEvent';
import AppPermissionModal from '../libComponents/AppPermissionModal';
import TopAstrologers from '../screens/mainScreens/TopAstrologers/TopAstrologers';

Sound.setCategory('Playback');
var whoosh = new Sound('order.mp3', Sound.MAIN_BUNDLE, error => {
  if (error) {
    return;
  }
});
whoosh.setSpeakerphoneOn(true);
// import usePushNotification from '../base/customHooks/usePushNotification';
const MainStack = () => {
  const navigation = useNavigation();
  const [FCMToekn, setFCMToekn] = useState('');
  const [getPermissionModal, setGetPermissionModal] = useState(false);
  const Stack = createNativeStackNavigator();
  const dispatch = useDispatch('');
  const chatRoom = useSelector(state => state.auth.chatRoom);
  const {getProfile} = useAuthApiServices();

  useEffect(() => {
    dispatch(setWhoosh(whoosh));
  }, []);

  useEffect(() => {
    handeGetProfile();
    requestUserPermission();
    notificationListeners();
    getDeviceToken();
  }, []);

  const getDeviceToken = async () => {
    const token = await messaging().getToken();
    // console.log(
    //   'getDeviceToken%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%$$$$$$$$$$$$$',
    //   token,
    // );
    setFCMToekn(token);
  };

  messaging().onMessage(async () => {
    whoosh.play();
    setTimeout(() => {
      whoosh.pause();
    }, 6000);
  });

  useEffect(() => {
    const unsubscribeOnBackgroundMessage =
      messaging().setBackgroundMessageHandler(async () => {
        whoosh.play();
        setTimeout(() => {
          whoosh.pause();
        }, 6000);
      });
    return () => {
      unsubscribeOnBackgroundMessage;
    };
  }, []);

  const handeGetProfile = async () => {
    const res = await getProfile();
    if (res.success) {
      dispatch(setUserData(res.data.data));
    } else {
      console.log('error on getProfile (main stack)');
    }
  };

  useEffect(() => {
    if (!chatRoom) {
      handleGetChatroom();
    }
  }, [chatRoom]);

  const handleGetChatroom = async () => {
    const res = await getChatroom();
    // console.log('res of getChatroom==', res.data);
    if (res.success) {
      dispatch(setChatRoom(res?.data?.chatroom[0]));
    } else {
      ToastAndroid.show(
        'Oops! Something went wrong',
        ToastAndroid.BOTTOM,
        ToastAndroid.SHORT,
      );
    }
  };

  useEffect(() => {
    if (FCMToekn) {
      handleGetAllToken();
    }
  }, [FCMToekn]);

  const handleGetAllToken = async () => {
    const res = await getAllToken();
    console.log('res of getAllToken', res?.data);
    if (res.success) {
      const isTokenPresent = res.data.some(
        item => item.device_token === FCMToekn,
      );
      if (!isTokenPresent) {
        handleUpdateFcmToken();
      }
    } else {
      console.log('erroro ofgetAllTokenk--', res.data);
    }
  };

  const handleUpdateFcmToken = async () => {
    const data = {
      device_token: FCMToekn,
    };
    const res = await updateFcmToken(data);
    if (res.success) {
      // console.log(
      //   'token updated++++++++++++++++++++++++++++++++++++++++++++++',
      // );
    } else {
      // console.log(
      //   'error on token updated+++++++++++++++++++++++++++++++++++++++++++',
      // );
    }
  };

  const requestUserPermission = async () => {
    if (Platform.OS === 'ios') {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      if (enabled) {
        console.log('Authorization status:', authStatus);
      }
    } else if (Platform.OS === 'android') {
      const res = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      if ('granted' === PermissionsAndroid.RESULTS.GRANTED) {
        setGetPermissionModal(false);
      } else {
        setGetPermissionModal(true);
      }
    }
  };

  const MainScreensArr = [
    {name: routes.Drawer_Stack, component: DrawerStack},
    {name: routes.Profile, component: Profile},
    {name: routes.Call_History, component: CallHistory},
    {name: routes.ChatHistory, component: ChatHistory},
    {name: routes.WaitList, component: WaitList},
    {name: routes.MyReviews, component: MyReviews},
    {name: routes.Followers, component: Followers},
    {name: routes.Live_Event, component: LiveEvent},
    {name: routes.Pooja_Screen, component: PoojaScreen},
    {name: routes.Add_Pooja, component: AddPooja},
    {name: routes.Blog_Screen, component: BlogScreen},
    {name: routes.Add_Blog_Screen, component: AddBlogScreen},
    {name: routes.Settings, component: Settings},
    {name: routes.Update_Phone_Number, component: UpdatePhoneNumber},
    {name: routes.Bank_Details, component: BankDetails},
    {name: routes.PaySlip, component: PaySlip},
    {name: routes.Terms_And_Conditions, component: TermsAndConditions},
    {name: routes.Performance_Screens, component: PerformanceScreen},
    {name: routes.View_All_Training_Reels, component: ViewAllTrainingReels},
    {name: routes.Create_Offer, component: CreateOffer},
    {name: routes.User_Chat_Screen, component: UserChatScreen},
    {name: routes.Call_With_User, component: CallWithUser},
    {name: routes.Add_Edit_Bank_Details, component: AddEditBankDetails},
    {name: routes.View_Image_Screen, component: ViewImageScreen},
    {name: routes.Quick_Chat, component: QuickChat},
    {name: routes.Add_Quick_Chat, component: AddQuickChat},
    {name: routes.particular_Chat_History, component: particularChatHistory},
    {name: routes.Play_Reel, component: PlayReel},
    {name: routes.VideoCall_Screen, component: VideoCallScreen},
    {name: routes.GoLive, component: GoLive},
    {name: routes.PrivacyPolicy, component: PrivacyPolicy},
    {name: routes.HelpAndSupport, component: HelpAndSupport},
    {name: routes.AgoraLiveEvent, component: AgoraLiveEvent},
    // {name: routes.Privacy_Policy, component: PrivacyPolicy},
    //top tab--
    {name: routes.Kundali_Top_Tab_Stack, component: KundaliTopTabStack},
    {name: routes.Chat_Tab_Stack, component: ChatTabStack},
    {name: routes.Call_Tab_Stack, component: CallTabStack},
    {name: routes.VideoCall_TabStack, component: VideoCallTabStack},
    {name: routes.Top_Astrologers, component: TopAstrologers},
  ];

  if (getPermissionModal)
    return (
      <AppPermissionModal
        onPress={() => {
          Linking.openSettings();
          setGetPermissionModal(false);
        }}
        isModalVisible={getPermissionModal}
        heading={'Open settings, then tap permission and turn on notification'}
      />
    );

  return (
    <>
      <Stack.Navigator
        initialRouteName={routes.Drawer_Stack}
        screenOptions={{headerShown: false}}>
        {MainScreensArr.map(({name, component}) => {
          return <Stack.Screen name={name} component={component} />;
        })}
      </Stack.Navigator>
    </>
  );
};
export default MainStack;
