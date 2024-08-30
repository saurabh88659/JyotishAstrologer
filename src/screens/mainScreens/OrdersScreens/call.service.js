import {setAgoraEng} from '../../../redux/auth.reducer';
import {
  ClientRoleType,
  createAgoraRtcEngine,
  IRtcEngine,
  ChannelProfileType,
} from 'react-native-agora';

export const setupVoiceSDKEngine = async ({dispatch, appId}) => {
  console.log('---- appId, dispatch---', appId, dispatch);
  try {
    if (Platform.OS === 'android') {
      //  await getPermission();
    }
    const agoraEngine = createAgoraRtcEngine();
    dispatch(setAgoraEng(agoraEngine));
    // agoraEngineRef.current = createAgoraRtcEngine();
    // const agoraEngine = agoraEngineRef.current;

    agoraEngine.registerEventHandler({
      onJoinChannelSuccess: () => {
        console.log('Successfully joined the channel');
        // showMessage('Successfully joined the channel ' + channelName);
        //    setIsJoined(true);
      },

      onUserJoined: (_connection, Uid) => {
        console.log('Remote user joined with uid ');
        // showMessage('Remote user joined with uid ' + Uid);
        //    setRemoteUid(Uid);
      },
      onUserOffline: (_connection, Uid) => {
        console.log('Remote user left the channel. uid');
        // showMessage('Remote user left the channel. uid: ' + Uid);
        //    setRemoteUid(0);
      },
    });

    agoraEngine.initialize({
      appId: appId,
    });
  } catch (e) {
    console.log(e);
  }
};
