import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
  PermissionsAndroid,
  RefreshControl,
  AppState,
  Linking,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import AppContainer from '../../../libComponents/AppContainer';
// import WaitingCard from '../../../components/WaitingCard';
import AppHeader from '../../../libComponents/AppHeader';
import AppStatusBar from '../../../libComponents/AppStatusBar';
import {
  acceptWaitListRequest,
  cancelWaitListRequest,
  getAgoraToken,
  getWaitList,
  voiceCallStart,
} from '../../../base/features/MainApiServices/MainApiServices';
import {AppColors, routes} from '../../../utils/constants';
import AppPrimaryButton from '../../../libComponents/AppPrimaryButton';
import AppText from '../../../libComponents/AppText';
import {useIsFocused} from '@react-navigation/native';
import AppLoder from '../../../libComponents/AppLoader';
import {
  setAgoraEng,
  setAgoraToken,
  setAppId,
  setConnectionData,
  setUserRouteData,
} from '../../../redux/auth.reducer';
import {Platform} from 'react-native';
import notifee, {EventType} from '@notifee/react-native';
import {
  ClientRoleType,
  createAgoraRtcEngine,
  ChannelProfileType,
} from 'react-native-agora';
import AppPermissionModal from '../../../libComponents/AppPermissionModal';
import AppLoaderModal from '../../../libComponents/AppLoaderModal';
import LottieView from 'lottie-react-native';

const WaitList = ({navigation, route}) => {
  // console.log("routes params===============",)
  const routeUser = route?.params?.user;
  const agoraEngineRef = useRef();
  const isFocused = useIsFocused();
  const isDark = useSelector(state => state.auth.isDark);
  const userData = useSelector(state => state.auth.userData);
  // console.log('user data========', userData);
  const agoraEng = useSelector(state => state.auth.agoraEng);
  const [refresh, setRefresh] = useState(false);
  const token = useSelector(state => state.auth.agoraToken);
  // const token =
  //   '007eJxTYLhg6/lgwnQ2p7QOw/Jty87oGZr7WDgfObOmve7Bq+qjoUIKDGbmpklm5mbmRuZpaSYWpiYWSRYmBhbJ5qaW5kmJqYZpiUcS0hoCGRm41bKZGRkgEMRnYShJLS5hYAAABjEd/Q==';
  const chatRoom = useSelector(state => state.auth.chatRoom);
  const appId = useSelector(state => state.auth.appId);
  // const appId = '776991abf82447eea6fdbfee7450ec4c';
  const channelName = chatRoom?.room_code.replace(/-/g, '');
  // const channelName = chatRoom.room_code;
  // const channelName = 'test';
  const [waitListData, setWaitListData] = useState([]);
  const [screenLoading, setScreenLoading] = React.useState(false);
  const [acceptRequestButtonLoaidng, setAcceptRequestButtonLoaidng] =
    useState(false);
  const [rejectRequestButtonLoaidng, setRejectRequestButtonLoaidng] =
    useState(false);
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const dispatch = useDispatch();
  const [getPermissionModal, setGetPermissionModal] = useState(false);
  // const uid = 2899;
  const uid = Math.floor(Math.random() * 100);
  console.log('agoraToken--------', token);
  console.log('appId-------------', appId);
  console.log('channelName-------', channelName);

  useEffect(() => {
    if (appId) {
      setupVoiceSDKEngine();
    }
  }, [appId]);

  useEffect(() => {
    if (isFocused) {
      getPermission();
    }
  }, [isFocused]);

  const getPermission = async () => {
    if (Platform.OS === 'android') {
      const res = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.CAMERA,
      ]);
      const permissionsDenied = Object.values(res).some(
        status => status !== PermissionsAndroid.RESULTS.GRANTED,
      );
      if (permissionsDenied) {
        setGetPermissionModal(true);
      } else {
        setGetPermissionModal(false);
      }
    }
  };

  const setupVoiceSDKEngine = async () => {
    try {
      if (Platform.OS === 'android') {
        await getPermission();
      }
      agoraEngineRef.current = createAgoraRtcEngine();
      dispatch(setAgoraEng(agoraEngineRef.current));
      agoraEngineRef.current.registerEventHandler({
        onJoinChannelSuccess: () => {
          console.log('Successfully joined the channel--');
        },
        onUserJoined: (_connection, Uid) => {
          console.log('Remote user joined with uid-');
        },
        onUserOffline: (_connection, Uid) => {
          console.log('Remote user left the channel. uid--');
        },
      });
      agoraEngineRef.current.initialize({
        appId: appId,
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (isFocused) {
      handleGetWaitList();
    }
  }, [isFocused]);

  const handleGetWaitList = async () => {
    setScreenLoading(true);
    const res = await getWaitList();
    // console.log('res of getWaitList---------------', res.data);
    if (res.success) {
      setScreenLoading(false);
      setWaitListData(res.data);
    } else {
      setScreenLoading(false);
      setWaitListData([]);
    }
  };

  const onRefresh = async () => {
    setRefresh(true);
    const res = await getWaitList();
    if (res.success) {
      setRefresh(false);
      setWaitListData(res.data);
    } else {
      setRefresh(false);
      setWaitListData([]);
    }
  };

  useEffect(() => {
    if (chatRoom) {
      handleGetAuthToken();
    }
  }, [chatRoom]);

  const handleGetAuthToken = async () => {
    const formatedChannelName = chatRoom.room_code.replace(/-/g, '');
    const data = {
      channelName: formatedChannelName,
    };
    const res = await getAgoraToken(data);
    if (res.success) {
      dispatch(setAgoraToken(res.data.token));
      dispatch(setAppId(res.data.appID));
    } else {
      ToastAndroid.show(
        'Oops! Something went wrong on Agora Token',
        ToastAndroid.BOTTOM,
        ToastAndroid.SHORT,
      );
    }
  };

  // useEffect(()=>{
  //   if(routeUser&&appId&&token){
  //     setShowAcceptModal(true)
  //     handleAcceptWaitListRequest(routeUser)
  //   }
  // },[routeUser,appId,token])

  const handleAcceptWaitListRequest = async user => {
    setShowAcceptModal(true);
    console.log('user-----------------', user);
    // console.log('appId', appId);
    // console.log('channelName', channelName);
    // console.log('token', token);
    // setAcceptRequestButtonLoaidng(true);
    dispatch(setUserRouteData(user));
    dispatch(
      setConnectionData({
        appId: appId,
        channel: channelName,
        token: token,
      }),
    );
    const data = {userId: user.user, astroId: userData.id};
    const res = await acceptWaitListRequest(data);
    if (res.success) {
      setAcceptRequestButtonLoaidng(false);
      if (user?.request_for == 'call') {
        await handleVoiceCallStart(user);
      } else if (user?.request_for == 'chat') {
        setShowAcceptModal(false);
        navigation.navigate(routes.Chat_Tab_Stack);
      } else if (user?.request_for == 'videocall') {
        await handleVideoCallStart(user);
      }
    } else {
      setAcceptRequestButtonLoaidng(false);
      ToastAndroid.show(
        'Oops! Something went wrong',
        ToastAndroid.BOTTOM,
        ToastAndroid.SHORT,
      );
    }
  };

  //voice call-------------------------------
  const handleVoiceCallStart = async user => {
    const data = {
      user: user.user_details.user,
      astrologer: userData.phone_no,
    };
    // console.log('data-------------', data);
    const res = await voiceCallStart(data);
    // console.log('res of voiceCallStart==============', res.data);
    if (res.success) {
      join();
      navigation.navigate(routes.Call_Tab_Stack);
      setShowAcceptModal(false);
    } else {
      setShowAcceptModal(false);
      ToastAndroid.show(
        'Oops! Unable to connect the call. Please try again.',
        ToastAndroid.BOTTOM,
        ToastAndroid.LONG,
      );
    }
  };

  //------------
  const join = async () => {
    try {
      // agoraEngineRef.current.enableVideo();
      agoraEngineRef.current.disableVideo();
      agoraEngineRef.current?.setChannelProfile(
        ChannelProfileType.ChannelProfileCommunication,
      );
      agoraEngineRef.current?.enableAudio();
      agoraEngineRef.current?.enableLocalAudio(true);
      agoraEngineRef.current?.enableLocalVideo(false);
      agoraEngineRef.current?.joinChannel(token, channelName, uid, {
        clientRoleType: ClientRoleType.ClientRoleBroadcaster,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const join1 = async () => {
    try {
      const agoraEngine = agoraEngineRef.current;
      if (agoraEngine) {
        agoraEngine.setChannelProfile(
          ChannelProfileType.ChannelProfileCommunication,
        );

        agoraEngine.joinChannel(token, channelName, uid, {
          clientRoleType: ClientRoleType.ClientRoleBroadcaster,
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  //video call--------------------------------------
  const handleVideoCallStart = async user => {
    const data = {
      user: user.user_details.user,
      astrologer: userData.phone_no,
    };
    console.log('data----------------------------', data);
    const res = await voiceCallStart(data);
    if (res.success) {
      // joinVideoCall();
      navigation.navigate(routes.VideoCall_TabStack);
      setShowAcceptModal(false);
    } else {
      setShowAcceptModal(false);
      ToastAndroid.show(
        'Oops! Unable to connect the call. Please try again.',
        ToastAndroid.BOTTOM,
        ToastAndroid.LONG,
      );
    }
  };

  const joinVideoCall = async () => {
    try {
      agoraEngineRef.current.enableVideo();
      agoraEngineRef.current?.setChannelProfile(
        ChannelProfileType.ChannelProfileCommunication,
      );
      agoraEngineRef.current?.startPreview();
      agoraEngineRef.current?.joinChannel(token, channelName, uid, {
        // clientRoleType: ClientRoleType.ClientRoleBroadcaster,
        clientRoleType: ClientRoleType.ClientRoleAudience,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleCancelWaitListRequest = async user => {
    // setRejectRequestButtonLoaidng(true);
    const data = {userId: user.user, astroId: userData.id};
    console.log('data', data);
    const res = await cancelWaitListRequest(data);
    // console.log('res of cancelWaitListRequest=======', res.data);
    if (res.success) {
      handleGetWaitList();
      setRejectRequestButtonLoaidng(false);
      ToastAndroid.show(
        ' Chat request cancelled',
        ToastAndroid.BOTTOM,
        ToastAndroid.SHORT,
      );
    } else {
      setRejectRequestButtonLoaidng(false);
      ToastAndroid.show(
        'Oops! Something went wrong',
        ToastAndroid.BOTTOM,
        ToastAndroid.SHORT,
      );
    }
  };

  //wait list me date nahi h
  //   {
  //    "accepted":false,
  //    "astrologer":142,
  //    "cancled":false,
  //    "id":1486,
  //    "rejected":false,
  //    "request_for":"chat",
  //    "user":577,
  //    "user_details":{
  //       "city_state_address":"Pakistan",
  //       "created_at":"2024-05-16T10:25:57Z",
  //       "current_address":"Sindh",
  //       "date_of_birth":"2024-05-26",
  //       "first_free":true,
  //       "full_name":"Ateeb",
  //       "gender":null,
  //       "id":577,
  //       "pincode":null,
  //       "place_of_birth":"Karachi",
  //       "profile_picture":"/media/broskis_nft.png",
  //       "time_of_birth":"11:33",
  //       "updated_at":"2024-06-26T19:57:46.478263Z",
  //       "user":"+913434343434",
  //       "user_gender":"Male"
  //    },
  //    "user_profile":{
  //       "city":"Karach",
  //       "country":"India",
  //       "created_at":"2024-06-25T16:51:41.369469Z",
  //       "dob":"2024-06-25",
  //       "gender":null,
  //       "id":2199,
  //       "name":"Atee",
  //       "state":"Sind",
  //       "tob":"21:51:00",
  //       "tz":"5.5",
  //       "updated_at":"2024-06-25T16:51:41.369705Z",
  //       "user":102
  //    }
  // }

  const WaitingCard = ({item, index}) => {
    console.log('item-----------', item);
    // const [isAcceptLoading, setIsAcceptLoading] = useState(false);
    // const [isRejectLoading, setIsRejectLoading] = useState(false);
    return (
      <View
        key={index}
        style={{
          width: '100%',
          borderBottomWidth: 0.5,
          paddingBottom: 15,
          paddingHorizontal: 15,
          borderBottomColor: AppColors.dark_gray,
          paddingTop: 10,
        }}>
        <AppText style={[{fontWeight: 'bold', color: AppColors.secondary}]}>
          {/* New(Indian) */}
          Indian
          {/* {data?.user_details?.full_name} */}
        </AppText>
        {/* <AppText
          style={[
            styles.cardText,
            {fontWeight: 'bold', color: AppColors.darkYellow},
          ]}>
          India
        </AppText> */}

        <AppText style={[{fontWeight: 'bold'}]}>
          {item?.user_details?.full_name}
        </AppText>
        <AppText style={[{fontWeight: 'bold', color: AppColors.dark_gray}]}>
          {/* {item.created_at} */}
          01 Nov 23, 07:32 PM
        </AppText>
        <AppText style={[{fontWeight: 'bold'}]}>
          Type -{' '}
          {item?.request_for == 'call'
            ? 'Call'
            : item?.request_for == 'chat'
            ? 'Chat'
            : 'Video Call'}
        </AppText>
        {/* <AppText style={[styles.cardText, {fontWeight: 'bold'}]}>
          Token No - 1
        </AppText> */}
        <AppText style={[{fontWeight: 'bold', color: AppColors.darkYellow}]}>
          Status - WAITING
        </AppText>
        {/* <AppText style={[{fontWeight: 'bold'}]}>Duration : 5 mins</AppText> */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 25,
          }}>
          <AppPrimaryButton
            onPress={() => handleCancelWaitListRequest(item)}
            width={'40%'}
            height={44}
            buttonLoading={rejectRequestButtonLoaidng}
            title="Reject"
          />
          <AppPrimaryButton
            onPress={() => handleAcceptWaitListRequest(item)}
            width={'40%'}
            height={44}
            buttonLoading={acceptRequestButtonLoaidng}
            title="Start Session"
          />
        </View>
      </View>
    );
  };

  return (
    <AppContainer>
      <AppStatusBar />
      <AppHeader isDrawer={false} canBack={true} screen={'Waitlist'} />
      {screenLoading ? (
        <AppLoder />
      ) : waitListData.length > 0 ? (
        <FlatList
          data={waitListData}
          renderItem={WaitingCard}
          keyExtractor={(item, index) => index.toString()}
          refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
          }
        />
      ) : (
        <AppContainer style={styles.noDatContainer}>
          <ScrollView
            contentContainerStyle={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            refreshControl={
              <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
            }>
            <LottieView
              source={require('../../../assets/Lottie/noData.json')}
              autoPlay
              loop={true}
              style={{
                height: '30%',
                width: '100%',
                marginTop: -50,
              }}
            />
            {/* <AppText style={styles.noDataText}>No Data Found!</AppText> */}
          </ScrollView>
        </AppContainer>
      )}
      <AppPermissionModal
        onPress={() => {
          Linking.openSettings();
          setGetPermissionModal(!getPermissionModal);
        }}
        isModalVisible={getPermissionModal}
        heading={
          'Open setting , then tap permission and turn on Microphone and Camera'
        }
      />
      <AppLoaderModal isModalVisible={showAcceptModal} />
    </AppContainer>
  );
};

export default WaitList;

const styles = StyleSheet.create({
  noDatContainer: {
    flex: 1,
  },

  noDataText: {
    fontWeight: '600',
    color: AppColors.dark_gray,
    fontSize: 18,
  },
});
