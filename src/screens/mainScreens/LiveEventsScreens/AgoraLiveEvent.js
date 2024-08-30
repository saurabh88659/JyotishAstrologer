import React, {useRef, useState, useEffect} from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {PermissionsAndroid, Platform} from 'react-native';
import {
  ClientRoleType,
  createAgoraRtcEngine,
  IRtcEngine,
  RtcSurfaceView,
  ChannelProfileType,
} from 'react-native-agora';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TextInput} from 'react-native-gesture-handler';
import AppLoder from '../../../libComponents/AppLoader';
import MessageItem from '../../../components/MessageItem';
import {AppColors, dummyChat} from '../../../utils/constants';
import {
  deductBalanceOnCallEnd,
  endLiveEvent,
  endLiveSession,
  getAgoraToken,
  startLiveEvent,
} from '../../../base/features/MainApiServices/MainApiServices';
import {FlatList} from 'react-native';
import AppIcon, {Icons} from '../../../libComponents/AppIcon';
import AppStatusBar from '../../../libComponents/AppStatusBar';

const AgoraLiveEvent = ({navigation}) => {
  const agoraEngineRef = useRef();
  const [isJoined, setIsJoined] = useState(false);
  const [remoteUid, setRemoteUid] = useState(0);
  const [message, setMessage] = useState('');
  const {userProfile} = useSelector(state => state.auth);
  const [allMessages, setAllMessages] = useState(dummyChat);
  const [inputMessage, setInputMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const scrollViewRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [startedLiveData, setStartedLiveData] = useState('');
  const [channelName, setChannelName] = useState('');
  const flatListRef = useRef(null);
  const [appId, setAppId] = useState('');
  const [token, setToken] = useState('');
  const [uid] = useState(0);
  console.log('channelName===================', channelName);

  useEffect(() => {
    handleStartLiveEvent();
  }, []);

  const handleStartLiveEvent = async () => {
    const res = await startLiveEvent();
    console.log('res of handleStartLiveEvent3###############', res.data);
    if (res.success) {
      setStartedLiveData(res.data);
      setChannelName(res.data.live_room);
    } else {
      setStartedLiveData('');
      setChannelName('');
      navigation.goBack();
      ToastAndroid.show(
        'Unable to Go live. Please try again.',
        ToastAndroid.SHORT,
      );
    }
  };

  // SOCKET =======
  useEffect(() => {
    if (channelName) {
      const roomCodeWithoutHyphens = channelName.replace(/-/g, '');
      const io = new WebSocket(
        `wss://api.jyotiish.com/ws/chat/${roomCodeWithoutHyphens}/`,
      );
      setSocket(io);
      io.onopen = () => {
        ToastAndroid.show(
          'Oops! On open',
          ToastAndroid.BOTTOM,
          ToastAndroid.SHORT,
        );
      };
      io.onclose = e => {
        ToastAndroid.show(
          'Oops! On close',
          ToastAndroid.BOTTOM,
          ToastAndroid.SHORT,
        );
        console.log('closed', e);
      };
      io.onerror = e => {
        console.error('WebSocket error', e);
        ToastAndroid.show(
          'Oops! WebSocket error',
          ToastAndroid.BOTTOM,
          ToastAndroid.SHORT,
        );
        // setLoading(false);
      };
      io.onmessage = e => {
        ToastAndroid.show(
          'Oops! On Message',
          ToastAndroid.BOTTOM,
          ToastAndroid.SHORT,
        );
        const parsedMessage = JSON.parse(e.data);
        setAllMessages(prevMessages => [...prevMessages, parsedMessage]);
      };
      return () => {
        io.close();
      };
    }
  }, [channelName]);

  useEffect(() => {
    if (channelName) {
      handleGetAuthToken();
    }
  }, [channelName]);

  const handleGetAuthToken = async () => {
    const formatedChannelName = channelName.replace(/-/g, '');
    const data = {
      channelName: formatedChannelName,
    };

    // console.log('data of get agora token==========', data);
    const res = await getAgoraToken(data);
    if (res.success) {
      setToken(res.data.token);
      setAppId(res.data.appID);
    } else {
      ToastAndroid.show(
        'Oops! Something went wrong on Agora Token',
        ToastAndroid.BOTTOM,
        ToastAndroid.SHORT,
      );
    }
  };
  function showMessage(msg) {
    setMessage(msg);
  }

  useEffect(() => {
    if (appId && token && channelName) {
      console.log('APP ID---', appId);
      console.log('CHANNEL ID---', channelName);
      console.log('TOKEN---', token);
      const startAgoraEng = async () => {
        await setupVideoSDKEngine();
        await join();
      };
      startAgoraEng();
      return () => {
        handleEndLiveSession();
      };
    }
  }, [appId, token, channelName]);

  const setupVideoSDKEngine = async () => {
    try {
      agoraEngineRef.current = createAgoraRtcEngine();
      const agoraEngine = agoraEngineRef.current;
      agoraEngine.registerEventHandler({
        onJoinChannelSuccess: () => {
          console.log('ME SUCCESS');
          ToastAndroid.show(
            'Successfully joined the channe',
            ToastAndroid.BOTTOM,
          );
        },

        onUserJoined: (_connection, Uid) => {
          console.log('USER SUCCESS');
          ToastAndroid.show(
            'Remote user joined with uid ',
            ToastAndroid.BOTTOM,
          );
        },

        onUserOffline: (_connection, Uid) => {
          console.log('USER OFF');
          ToastAndroid.show(
            'Remote user left the channel. uid',
            ToastAndroid.BOTTOM,
          );
          // handleEndLiveEvent();
        },
      });
      agoraEngine.initialize({
        appId: appId,
        channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
      });
    } catch (e) {
      console.log(
        '======================setupVideoSDKEngine CATCH===============',
      );
      console.log(e);
    }
  };

  const join = async () => {
    try {
      const agoraEngine = agoraEngineRef.current;
      if (agoraEngine) {
        console.log(' Joining channel...');
        agoraEngine.setChannelProfile(
          ChannelProfileType.ChannelProfileCommunication,
        );
        agoraEngine.enableVideo();
        agoraEngine.enableAudio();
        agoraEngine.enableLocalAudio(true);
        agoraEngine.enableLocalVideo(true);
        agoraEngine?.startPreview();
        console.log('Join channel called');
        agoraEngine.joinChannel(token, channelName, uid, {
          clientRoleType: ClientRoleType.ClientRoleBroadcaster,
        });
      }
    } catch (e) {
      console.log('================join CATCH===============');
      console.error(e);
    }
  };

  const handleEndLiveSession = async () => {
    const res = await endLiveSession(startedLiveData?.id);
    if (res.success) {
      ToastAndroid.show(
        'Session ended!',
        ToastAndroid.BOTTOM,
        ToastAndroid.LONG,
      );
    } else {
      ToastAndroid.show(
        'Oops! Unable to end the call.',
        ToastAndroid.BOTTOM,
        ToastAndroid.LONG,
      );
    }
  };

  const leave = () => {
    try {
      agoraEngineRef.current?.leaveChannel();
      setRemoteUid(0);
      setIsJoined(false);
      showMessage('You left the channel');
    } catch (e) {
      console.log(e);
    }
  };

  const getPermission = async () => {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.CAMERA,
      ]);
    }
  };

  // const switchCamera = () => {
  //   try {
  //     agoraEngineRef.current?.switchCamera();
  //   } catch (e) {}
  // };

  // const handleEndLiveEvent = async () => {
  //   const res = await endLiveEvent();
  //   if (res.success) {
  //     navigation.goBack();
  //     leave();
  //   } else {
  //     ToastAndroid.show(
  //       'Oops! Unable to end the call.',
  //       ToastAndroid.BOTTOM,
  //       ToastAndroid.LONG,
  //     );
  //   }
  // };

  return (
    <SafeAreaView style={styles.main}>
      <AppStatusBar />
      <View style={styles.container}>
        <View style={styles.videoContainer}>
          <View
            style={{
              position: 'absolute',
              right: 20,
              top: 20,
              zIndex: 9999,
              flexDirection: 'row',
              gap: 10,
              height: 25,
              borderWidth: 1,
              paddingHorizontal: 10,
              borderColor: 'red',
              alignItems: 'center',
              borderRadius: 4,
            }}>
            <AppIcon type={Icons.Octicons} name="dot-fill" color="red" />
            <Text style={{color: AppColors.red}}>LIVE</Text>
          </View>
          <React.Fragment key={0}>
            <RtcSurfaceView canvas={{uid: 0}} style={styles.videoView} />
          </React.Fragment>
        </View>
      </View>

      <View style={{height: 300, position: 'absolute', bottom: 0}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{}}
          ref={flatListRef}
          onContentSizeChange={() =>
            flatListRef.current.scrollToEnd({animated: true})
          }
          keyExtractor={item => item.id}
          style={styles.messagesList}
          data={allMessages}
          renderItem={({item}) => (
            <View
              style={{
                // backgroundColor: 'rgba(0, 0, 0, 0.5)',
                marginTop: 10,
                marginHorizontal: 20,
                paddingVertical: 8,
                borderRadius: 15,
              }}>
              <Text
                style={{
                  fontSize: 17,
                  color: AppColors.white,
                  paddingHorizontal: 10,
                  textAlign: 'left',
                }}>
                {item?.message?.message || '--------'}
              </Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 25,
    paddingVertical: 4,
    fontWeight: 'bold',
    color: '#ffffff',
    backgroundColor: '#0055cc',
    margin: 5,
  },
  main: {flex: 1},
  container: {flex: 1},
  videoContainer: {flex: 2},
  videoView: {flex: 1},
  scroll: {flex: 1, backgroundColor: '#ddeeff', width: '100%'},
  scrollContainer: {alignItems: 'center'},
  btnContainer: {flexDirection: 'row', justifyContent: 'center'},
  head: {fontSize: 20},
  info: {backgroundColor: '#ffffe0', color: '#0000ff'},
  messagesList: {
    flex: 1,
    width: '100%',
  },
  dateSeparator: {
    textAlign: 'center',
    paddingVertical: 5,
    backgroundColor: AppColors.black,
    color: AppColors.black,
    fontWeight: 'bold',
  },
  inputContainer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingVertical: 10,
    paddingHorizontal: 5,
    gap: 6,
    marginTop: 50,
  },
  input: {
    borderRadius: 30,
    flex: 1,
    borderWidth: 0.8,
    borderColor: AppColors.black,
    paddingHorizontal: 25,
    color: AppColors.black,
    fontSize: 16,
    backgroundColor: AppColors.white,
  },
  sendButton: {
    height: 45,
    width: 45,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AgoraLiveEvent;
