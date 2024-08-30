import {
  ActivityIndicator,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
  BackHandler,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppContainer from '../../../libComponents/AppContainer';
import AgoraUIKit from 'agora-rn-uikit';
import {useDispatch, useSelector} from 'react-redux';
import {AppColors, routes} from '../../../utils/constants';
import {TouchableOpacity} from 'react-native';
import AppIcon, {Icons} from '../../../libComponents/AppIcon';
import {Modal} from 'react-native';
import AppText from '../../../libComponents/AppText';
import {FlatList} from 'react-native';
import {
  deductBalanceOnCallEnd,
  getChatTimer,
} from '../../../base/features/MainApiServices/MainApiServices';
import {setUserRouteData} from '../../../redux/auth.reducer';
import {useIsFocused} from '@react-navigation/native';
import AppLoder from '../../../libComponents/AppLoader';

const VideoCallScreen = ({navigation}) => {
  const userData = useSelector(state => state.auth.userData);
  const user = useSelector(state => state.auth.userRouteData);
  let hasNavigated = false;
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [showZoomImageModal, setZoomImageModal] = useState(false);
  const agoraEng = useSelector(state => state.auth.agoraEng);
  const [chatTime, setChatTime] = useState();
  const isFocused = useIsFocused();

  const agoraConnectionData = useSelector(state => state.auth.connectionData);
  console.log('agoraConnectionData====================', agoraConnectionData);
  const dispatch = useDispatch();
  //disable backpress-----
  const onBackPress = () => {
    ToastAndroid.show(
      'Session in progress. Please complete the session before leaving',
      ToastAndroid.LONG,
    );
    return true;
  };

  useEffect(() => {
    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      onBackPress,
    );
    return () => subscription.remove();
  }, []);

  //disable backpress-----
  useEffect(() => {
    setupVoiceSDKEngine();
  }, []);

  const setupVoiceSDKEngine = async () => {
    agoraEng.registerEventHandler({
      onJoinChannelSuccess: () => {
        console.log('Successfully joined the channel--');
        // ToastAndroid.show('Successfully joined the channel', ToastAndroid.LONG);
      },
      onUserJoined: (_connection, Uid) => {
        console.log('Remote user joined with uid');
        // ToastAndroid.show('Remote user joined', ToastAndroid.LONG);
      },
      onUserOffline: (_connection, Uid) => {
        // console.log('Remote user left the channel');
        // hasNavigated = true;
        // agoraEng?.leaveChannel();
        // navigation.goBack();
        handleDeductBalanceOnCallEnd();
      },
    });
  };

  const handleDeductBalanceOnCallEnd = async () => {
    const data = {
      astrologer: userData.phone_no,
    };
    const res = await deductBalanceOnCallEnd(data);
    console.log('res of deductBalanceOnCallEnd====', res.data);
    if (res.success) {
      dispatch(setUserRouteData(null));
      agoraEng?.leaveChannel();
      try {
        navigation.goBack();
      } catch (error) {}
    } else {
      ToastAndroid.show(
        'Oops! Unable to end the call.',
        ToastAndroid.BOTTOM,
        ToastAndroid.LONG,
      );
    }
  };

  const callbacks = {
    EndCall: () => {
      handleDeductBalanceOnCallEnd();
    },
    Error: error => {
      handleDeductBalanceOnCallEnd();
      ToastAndroid.show(
        'Oops! Something went wrong.',
        ToastAndroid.BOTTOM,
        ToastAndroid.LONG,
      );
    },
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setChatTime(prevTime => {
        if (prevTime == 0 || prevTime < 0) {
          clearInterval(timer);
          handleDeductBalanceOnCallEnd();
          ToastAndroid.show(
            `The user's balance is finished`,
            ToastAndroid.LONG,
          );
          ToastAndroid.show(
            `The session has been disconnected`,
            ToastAndroid.SHORT,
          );
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = time => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes} : ${seconds < 10 ? '0' : ''}${Math.floor(seconds)}`;
  };

  useEffect(() => {
    if (isFocused) {
      HandlegetChatTimerApi();
    }
  }, [isFocused]);

  const HandlegetChatTimerApi = async () => {
    const data = {userId: user?.user_details?.id, astrologerId: userData.id};
    const res = await getChatTimer(data);
    if (res.success) {
      setChatTime(res.data.chat_time * 60);
    } else {
      setChatTime('');
    }
  }; 

  const connectionData = {
    appId: agoraConnectionData?.appId,
    channel: agoraConnectionData?.channel,
    token: agoraConnectionData?.token,
  };
  if (!connectionData) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: AppColors.white,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator color={AppColors.black} size={35} />
      </View>
    );
  }

  return (
    <AppContainer>
      {connectionData ? (
        <>
          <View
            style={{
              position: 'absolute',
              top: '15%',
              zIndex: 999,
              alignItems: 'center',
              width: '100%',
            }}>
            {chatTime ? (
              <Text
                style={{
                  color: AppColors.black,
                  fontSize: 20,
                  fontWeight: '500',
                }}>
                {chatTime ? formatTime(chatTime) : ''}
              </Text>
            ) : (
              <Text
                style={{
                  color: AppColors.black,
                  fontSize: 20,
                  fontWeight: '500',
                }}>
                00:00
              </Text>
            )}
          </View>
          <AgoraUIKit
            connectionData={connectionData}
            rtcCallbacks={callbacks}
          />
          <View
            style={{
              // backgroundColor: '#FFF7EE',
              backgroundColor: '#ffff',
              paddingHorizontal: 10,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              // borderWidth: 0.6,
              borderColor: AppColors.black,
              paddingVertical: 10,
              // marginTop: 5,
            }}>
            <TouchableOpacity
              onPress={() => setShowMediaModal(!showMediaModal)}>
              <AppIcon
                type={Icons.Ionicons}
                name="document-attach"
                color={AppColors.black}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate(routes.Kundali_Top_Tab_Stack)}>
              <AppIcon
                type={Icons.Entypo}
                name="info-with-circle"
                color={AppColors.black}
              />
            </TouchableOpacity>
            {/* <TouchableOpacity
          onPress={() => setShowMessgagesModal(!showMessgagesModal)}>
          <AppIcon
            type={Icons.MaterialCommunityIcons}
            // name="message-arrow-right"
            name="message-flash"
            color={AppColors.black}
            size={25}
          />
        </TouchableOpacity> */}
          </View>
          <Modal
            visible={showMediaModal}
            animationType="fade"
            transparent={true}
            onRequestClose={() => setShowMediaModal(!showMediaModal)}>
            <View
              style={{
                backgroundColor: AppColors.lightYellow,
                height: '92%',
                marginTop: 'auto',
              }}>
              <View style={styles.followerCountContainer}>
                <AppText style={styles.followerText}>MEDIA</AppText>
              </View>
              <FlatList
                contentContainerStyle={{
                  paddingHorizontal: 5,
                  paddingBottom: '10%',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  // gap: 2,
                  justifyContent: 'space-evenly',
                }}
                data={[1, 1, 1, 1, 1, 1]}
                renderItem={({item, index}) => (
                  <TouchableOpacity
                    onPress={() => setZoomImageModal(true)}
                    style={{
                      height: 120,
                      width: 120,
                      backgroundColor: AppColors.black,
                      marginTop: 6,
                    }}></TouchableOpacity>
                )}
                keyExtractor={item => item?.toString()}
              />
            </View>
          </Modal>

          <Modal
            visible={showZoomImageModal}
            animationType="fade"
            transparent={true}
            onRequestClose={() => setZoomImageModal(!showZoomImageModal)}>
            <View
              style={{
                height: '100%',
                width: '100%',
                alignItems: 'center',
                paddingHorizontal: 15,
                justifyContent: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
              }}>
              <View
                style={{
                  height: '50%',
                  width: '100%',
                  backgroundColor: AppColors.white,
                  alignSelf: 'center',
                }}></View>
            </View>
          </Modal>
        </>
      ) : (
        <AppLoder />
      )}
    </AppContainer>
  );
};

export default VideoCallScreen;

const styles = StyleSheet.create({
  followerCountContainer: {
    backgroundColor: AppColors.black,
    width: '100%',
    alignItems: 'center',
    paddingVertical: 5,
    marginBottom: 20,
  },
  followerText: {
    color: AppColors.white,
    fontWeight: '700',
    fontSize: 14,
  },
});
