import React, {useRef, useState, useEffect, useContext} from 'react';
import {
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  ClientRoleType,
  createAgoraRtcEngine,
  IRtcEngine,
  ChannelProfileType,
  RtcSurfaceView,
} from 'react-native-agora';

import {colors, screens} from '../utils/constants';
import {VideoCallProps} from './interfaces';
import {chatConnection} from '../features/chat/chat.connection';
import {getPermissionsMicrophone} from './functions/getPermissionsMicrophone';
import {useNavigation} from '@react-navigation/native';
import LiveChat from './LiveChat';
import {CTAContext} from '../cta/context/CTAContext';
import OtherLiveSessions from '../cta/Modals/OtherLiveSessions';
import {getPermissionsCamera} from './functions/getPermissionsCamera';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MIcon from 'react-native-vector-icons/MaterialIcons';

const users = [
  {
    id: 1,
    name: 'Ateeb',
    image:
      'https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg',
  },
  {
    id: 2,
    name: 'Anonymous',
    image:
      'https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg',
  },
];

const uid = 0;

const {width, height} = Dimensions.get('window');

const LiveStream = ({route}) => {
  const {showModal, hideModal} = useContext(CTAContext);
  const {roomId} = route.params;
  const agoraEngineRef = useRef();
  const [statusText, setStatusText] = useState('Waiting...');
  const navigation = useNavigation();
  const [channelName, setChannelName] = useState('');
  const [token, setToken] = useState('');
  const [appId, setAppId] = useState('');
  const [remoteUid, setRemoteUid] = useState(0);

  const timerIntervalRef = useRef(null);

  useEffect(() => {
    getTimer();
  }, []);

  useEffect(() => {
    const startCall = async () => {
      if (channelName && appId && token) {
        console.log({channelName, appId, token});
        await getPermissionsCamera();
        await getPermissionsMicrophone();
        await setupVideoSDKEngine();
        await join();
        await StartTimer();
      }
    };
    startCall();

    return () => {
      console.log('Cleaning up Agora resources...');
      leave();

      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [channelName, appId, token]);

  const getTimer = async () => {
    setStatusText('Connecting...');
    setChannelName((roomId ?? '').replace(/-/g, ''));
    const agoraToken = await chatConnection.getAgoraToken(
      roomId && roomId.replace(/-/g, ''),
    );
    setAppId(agoraToken?.appID);
    setToken(agoraToken?.token);
  };

  const StartTimer = async () => {
    let currentTime = 0;
    timerIntervalRef.current = setInterval(() => {
      currentTime++;
      const formattedTime = formatTime(currentTime);
      setStatusText(formattedTime);
    }, 1000);

    function formatTime(totalSeconds) {
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = Math.floor(totalSeconds % 60);
      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
        2,
        '0',
      )}:${String(seconds).padStart(2, '0')}`;
    }
  };

  const setupVideoSDKEngine = async () => {
    try {
      agoraEngineRef.current = createAgoraRtcEngine();
      const agoraEngine = agoraEngineRef.current;
      agoraEngine.registerEventHandler({
        onJoinChannelSuccess: () => {
          console.log('ME SUCCESS');
        },
        onUserJoined: (_connection, Uid) => {
          setRemoteUid(Uid);
          console.log('USER SUCCESS');
        },
        onUserOffline: (_connection, Uid) => {
          console.log('USER OFF');
        },
      });
      agoraEngine.initialize({
        appId: appId,
        channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
      });
      // agoraEngine.enableVideo();
    } catch (e) {
      console.log(e);
    }
  };

  const join = async () => {
    try {
      const agoraEngine = agoraEngineRef.current;
      if (agoraEngine) {
        agoraEngine.setChannelProfile(
          ChannelProfileType.ChannelProfileCommunication,
        );
        // agoraEngine.enableAudio();
        // agoraEngine.enableVideo();
        agoraEngine.enableLocalAudio(true);
        agoraEngine.enableLocalVideo(true);
        agoraEngine.joinChannel(token, channelName, uid, {
          clientRoleType: ClientRoleType.ClientRoleAudience,
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const leave = () => {
    try {
      agoraEngineRef.current?.leaveChannel();
    } catch (e) {
      console.error(e);
    }
  };

  const handleLeave = () => {
    showModal(
      <OtherLiveSessions
        onLeave={FollowAndLeave}
        onFollowAndLeave={FollowAndLeave}
      />,
      false,
    );
  };

  const FollowAndLeave = () => {
    hideModal();
    try {
      if (appId) {
        leave();
      }
      navigation.navigate(screens?.home);
    } catch (e) {
      console.error(e);
    }
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      tabBarStyle: {backgroundColor: 'black'},
      headerShown: true,
      headerTitle: '',
      headerLeft: () => (
        <View style={styles.headerLeftContainer}>
          <View style={styles.userCirclesContainer}>
            {users.map((user, index) => (
              <View
                key={user.id}
                style={[styles.userCircle, {zIndex: users.length - index}]}>
                {user.image ? (
                  <Image source={{uri: user.image}} style={styles.userImage} />
                ) : (
                  <Text style={styles.anonymousText}>{user.name}</Text>
                )}
              </View>
            ))}
          </View>
          <View style={styles.verticalSeparator} />
          <View style={styles.statusTextContainer}>
            <Text style={styles.headerLeftText}>{statusText}</Text>
          </View>
        </View>
      ),
      headerRight: () => (
        <View style={styles.headerButtonContainer}>
          <TouchableOpacity onPress={handleLeave} style={styles.headerViews}>
            <MCIcon name="eye" size={15} color={colors.white} />
            <Text style={styles.headerLeftText}>8.1k</Text>
            <MIcon name="chevron-right" size={15} color={colors.white} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLeave} style={styles.headerButton}>
            <MCIcon name="close" size={15} color={colors.white} />
          </TouchableOpacity>
        </View>
      ),
      headerStyle: {
        backgroundColor: 'black',
      },
      headerTintColor: 'white',
    });
  }, [navigation, statusText]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'black'} />
      <RtcSurfaceView canvas={{uid: remoteUid}} style={styles.videoView} />
      <View style={styles.chatOverlay}>
        <View style={styles.AnonText}>
          <MIcon name="lock" size={15} color={colors.white} />
          <Text style={styles.headerLeftText}>This call is anonymous</Text>
        </View>
        {channelName && <LiveChat roomId={channelName} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  videoView: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height,
  },
  AnonText: {
    position: 'absolute',
    top: '-100%',
    left: 10,
    gap: 5,
    flexDirection: 'row',
    marginBottom: 5,
    padding: 10,
    borderRadius: 30,
    backgroundColor: colors.grayShade,
  },

  headerButtonContainer: {
    flexDirection: 'row',
    marginBottom: 'auto',
  },
  headerViews: {
    flexDirection: 'row',
    gap: 5,
    marginRight: 15,
    padding: 10,
    borderRadius: 30,
    backgroundColor: colors.grayShade,
  },
  headerButton: {
    marginRight: 15,
    padding: 10,
    borderRadius: 50,
    backgroundColor: colors.red,
  },
  headerButtonText: {
    color: 'white',
    fontSize: 12,
  },
  headerLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  userCirclesContainer: {
    flexDirection: 'row',
  },
  userCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.grayShade,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -10,
    borderWidth: 2,
    borderColor: 'black',
  },
  userImage: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  anonymousText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  verticalSeparator: {
    width: 1,
    height: 20,
    backgroundColor: colors.grayShade,
    marginHorizontal: 10,
  },
  statusTextContainer: {
    backgroundColor: colors.grayShade,
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  headerLeftText: {
    color: 'white',
    fontSize: 12,
  },
  chatOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
  },
});

export default LiveStream;
