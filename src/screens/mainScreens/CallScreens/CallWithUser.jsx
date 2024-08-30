import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  PermissionsAndroid,
  ToastAndroid,
  BackHandler,
  Modal,
} from 'react-native';

import React, {useEffect, useRef, useState} from 'react';
import AppContainer from '../../../libComponents/AppContainer';
import AppHeader from '../../../libComponents/AppHeader';
import AppText from '../../../libComponents/AppText';
import {AppColors, routes} from '../../../utils/constants';
import AppStatusBar from '../../../libComponents/AppStatusBar';
import LinearGradient from 'react-native-linear-gradient';
import AppIcon, {Icons} from '../../../libComponents/AppIcon';
import AppChatHeader from '../../../libComponents/AppChatHeader';
import {useDispatch, useSelector} from 'react-redux';
import {
  deductBalanceOnCallEnd,
  getChatTimer,
  voiceCallEnd,
} from '../../../base/features/MainApiServices/MainApiServices';
import {useIsFocused} from '@react-navigation/native';
import {setUserRouteData} from '../../../redux/auth.reducer';
import {FlatList} from 'react-native';

const CallWithUser = ({navigation, route}) => {
  // const user = route?.params?.user;
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [showZoomImageModal, setZoomImageModal] = useState(false);
  const user = useSelector(state => state.auth.userRouteData);
  const chatRoom = useSelector(state => state.auth.chatRoom);
  const userData = useSelector(state => state.auth.userData);
  const agoraEng = useSelector(state => state.auth.agoraEng);
  // const appId = useSelector(state => state.auth.appId);
  const appId = '3242f52d26474805af2b633ad023b632';
  const dispatch = useDispatch();
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);
  const [socket, setSocket] = useState(null);
  const [chatTime, setChatTime] = useState();
  const isFocused = useIsFocused();
  const [number, setNumber] = useState('');

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
    if (agoraEng) {
      setupVoiceSDKEngine();
    }
  }, [agoraEng]);

  const setupVoiceSDKEngine = async () => {
    try {
      agoraEng.registerEventHandler({
        onJoinChannelSuccess: () => {
          console.log('Successfully joined the channel--');
          ToastAndroid.show(
            'Successfully joined the channel',
            ToastAndroid.SHORT,
          );
        },
        onUserJoined: (_connection, Uid) => {
          console.log('Remote user joined with uid-');
        },
        onUserOffline: (_connection, Uid) => {
          // handleVoiceCallEnd();
          handleDeductBalanceOnCallEnd();
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (!user) {
      ToastAndroid.show(
        'User information not found. Please try again.',
        ToastAndroid.SHORT,
      );
      setTimeout(() => {
        handleDeductBalanceOnCallEnd();
      }, 1000);
      return;
    }
  }, []);

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
      setNumber(res.data.user);
    } else {
      setChatTime('');
    }
  };

  const toggleMute = () => {
    setIsMuted(prev => {
      const newMutedState = !prev;
      try {
        agoraEng?.enableLocalAudio(!newMutedState);
      } catch (error) {
        console.log('Error muting', error);
      }
      return newMutedState;
    });
  };

  const toggleSpeaker = () => {
    setIsSpeakerOn(prev => {
      const newSpeakerState = !prev;
      try {
        agoraEng?.setEnableSpeakerphone(newSpeakerState);
      } catch (error) {
        console.log('Error switching speaker', error);
      }
      return newSpeakerState;
    });
  };

  const leaveCall = () => {
    try {
      agoraEng?.leaveChannel();
      navigation?.goBack();
    } catch (e) {
      console.log('=============', e);
    }
  };

  const handleDeductBalanceOnCallEnd = async () => {
    const data = {
      astrologer: userData?.phone_no,
    };
    const res = await deductBalanceOnCallEnd(data);
    if (res.success) {
      dispatch(setUserRouteData(null));
      leaveCall();
    } else {
      ToastAndroid.show(
        'Oops! Unable to end the call.',
        ToastAndroid.BOTTOM,
        ToastAndroid.LONG,
      );
    }
  };

  // const handleVoiceCallEnd = async () => {
  //   const data = {
  //     user: user.user_details.user,
  //     astrologer: userData.phone_no,
  //   };
  //   const res = await voiceCallEnd(data);
  //   // leaveCall();
  //   if (res.success) {
  //     dispatch(setUserRouteData(null));
  //     leaveCall();
  //   } else {
  //     ToastAndroid.show(
  //       'Oops! Unable to end the call.',
  //       ToastAndroid.BOTTOM,
  //       ToastAndroid.LONG,
  //     );
  //   }
  // };

  return (
    <AppContainer>
      <AppStatusBar />
      <LinearGradient
        colors={[AppColors.lightYellow, '#FFF']}
        style={{flex: 1}}>
        <View style={{paddingHorizontal: 15, alignItems: 'center'}}>
          <View style={styles.userProfileContainer}>
            <AppIcon
              type={Icons.Ionicons}
              name="person-circle-outline"
              color={AppColors.dark_gray}
              size={110}
            />
          </View>
          <AppText
            style={[
              styles.userNameText,
              {textAlign: 'center', textTransform: 'uppercase'},
            ]}>
            {user?.user_details?.full_name || '---'}
          </AppText>
          {chatTime ? (
            <Text
              style={{
                color: AppColors.dark_gray,
                fontSize: 17,
                marginTop: 5,
              }}>
              {chatTime ? formatTime(chatTime) : ''}
            </Text>
          ) : (
            <Text
              style={{
                color: AppColors.dark_gray,
                fontSize: 17,
                marginTop: 5,
              }}>
              00:00
            </Text>
          )}
        </View>
        <View style={styles.controllerContainer}>
          <TouchableOpacity
            onPress={() => toggleSpeaker()}
            style={[
              styles.SpeakerButtonContainer,
              {
                backgroundColor: isSpeakerOn ? AppColors.black : AppColors.gray,
              },
            ]}>
            <AppIcon
              type={Icons.FontAwesome6}
              name="volume-high"
              size={26}
              color={isSpeakerOn ? AppColors.white : AppColors.black}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => toggleMute()}
            style={[
              styles.MuteButtonContainer,
              {backgroundColor: isMuted ? AppColors.black : AppColors.gray},
            ]}>
            <AppIcon
              type={Icons.FontAwesome5}
              name={'microphone-slash'}
              size={26}
              color={isMuted ? AppColors.white : AppColors.black}
            />
          </TouchableOpacity>

          <TouchableOpacity
            // onPress={leaveCall}
            onPress={handleDeductBalanceOnCallEnd}
            style={styles.CallEndbuttonContainer}>
            <AppIcon
              type={Icons.MaterialIcons}
              name="call-end"
              size={35}
              color={AppColors.white}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-evenly',
            marginBottom: '40%',
            paddingHorizontal: 20,
            // justifyContent:'center',
            // gap:70
          }}>
          <TouchableOpacity
            onPress={() => setShowMediaModal(!showMediaModal)}
            style={[
              styles.SpeakerButtonContainer,
              {
                backgroundColor: AppColors.gray,
              },
            ]}>
            <AppIcon
              type={Icons.Ionicons}
              name="document-attach"
              color={AppColors.black}
              size={28}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate(routes.Kundali_Top_Tab_Stack)}
            style={[
              styles.SpeakerButtonContainer,
              {backgroundColor: AppColors.gray},
            ]}>
            <AppIcon
              type={Icons.Entypo}
              name="info-with-circle"
              color={AppColors.black}
              size={28}
            />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <Modal
        visible={showMediaModal}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShowMediaModal(!showMediaModal)}>
        <View
          style={{
            backgroundColor: AppColors.lightYellow,
            height: '100%',
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
    </AppContainer>
  );
};

export default CallWithUser;

const styles = StyleSheet.create({
  controllerContainer: {
    // backgroundColor: 'red',
    marginTop: 'auto',
    height: 130,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  MuteButtonContainer: {
    height: 70,
    width: 70,
    backgroundColor: AppColors.black,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  SpeakerButtonContainer: {
    height: 70,
    width: 70,
    backgroundColor: AppColors.black,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  CallEndbuttonContainer: {
    height: 70,
    width: 70,
    backgroundColor: AppColors.red,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userNameText: {
    color: AppColors.black,
    fontSize: 22,
    fontWeight: 'bold ',
    marginTop: 20,
  },
  userProfileContainer: {
    height: 110,
    width: 110,
    backgroundColor: AppColors.gray,
    borderRadius: 110 / 2,
    marginTop: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
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
