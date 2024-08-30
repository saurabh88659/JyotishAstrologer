import {
  ActivityIndicator,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
  BackHandler,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import AppContainer from '../../../libComponents/AppContainer';
import AgoraUIKit from 'agora-rn-uikit';
import {useSelector} from 'react-redux';
import {AppColors} from '../../../utils/constants';
import {
  ClientRoleType,
  createAgoraRtcEngine,
  IRtcEngine,
  RtcSurfaceView,
  ChannelProfileType,
  AudienceLatencyLevelType,
} from 'react-native-agora';

const GoLive = ({navigation}) => {
  const agoraEng = useSelector(state => state.auth.agoraEng);
  console.log("agoraEng=============",agoraEng)
  const agoraConnectionData = useSelector(state => state.auth.connectionData);
const uid=0
  const connectionData = {
    appId: '3242f52d26474805af2b633ad023b632',
    channel: 'test',
    token:'007eJxTYNhhH3ehbl2V6dQ5TBo+WnasERn/DpsJJNllscy499r0XpoCg7GRiVGaqVGKkZmJuYmFgWlimlGSmbFxYoqBkTGQYZS8KjatIZCRQWrZXRZGBggE8VkYSlKLSxgYAIMaHM8=',
  }; 

  //disable backpress-----
  //   const onBackPress = () => {
  //     ToastAndroid.show(
  //       'Session in progress. Please complete the session before leaving',
  //       ToastAndroid.LONG,
  //     );
  //     return true;
  //   };
  //   useEffect(() => {
  //     const subscription = BackHandler.addEventListener(
  //       'hardwareBackPress',
  //       onBackPress,
  //     );
  //     return () => subscription.remove();
  //   }, []);
  //disable backpress-----

 

  const callbacks = {
    EndCall: () => {
      agoraEng?.leaveChannel();
      navigation.goBack();
    },
  };

  // const connectionData = {
  //   appId: agoraConnectionData?.appId,
  //   channel: agoraConnectionData?.channel,
  //   token: agoraConnectionData?.token,
  // };

  //   useEffect(() => {
  //     if (!agoraConnectionData) {
  //       navigation.goBack();
  //       ToastAndroid.show(
  //         'Details not provided, Please try again.',
  //         ToastAndroid.BOTTOM,
  //       );
  //     }
  //   }, []);

  //   if (!connectionData) {
  //     return (
  //       <View
  //         style={{
  //           flex: 1,
  //           backgroundColor: AppColors.white,
  //           justifyContent: 'center',
  //           alignItems: 'center',
  //         }}>
  //         <ActivityIndicator color={AppColors.black} size={35} />
  //       </View>
  //     );
  //   }


  return (
    <AppContainer>
      {connectionData && (
        <AgoraUIKit styleProps={{}} connectionData={connectionData} rtcCallbacks={callbacks} />
      )}
    </AppContainer>
  );
};

export default GoLive;
const styles = StyleSheet.create({});
