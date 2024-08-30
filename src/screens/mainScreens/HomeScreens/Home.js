import {
  View,
  ScrollView,
  AppState,
  StyleSheet,
  ToastAndroid,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AppColors, routes} from '../../../utils/constants';
import HomeCard from '../../../components/HomeCard';
import AppContainer from '../../../libComponents/AppContainer';
import AppIcon, {Icons} from '../../../libComponents/AppIcon';
import AppHeader from '../../../libComponents/AppHeader';
import AppStatusBar from '../../../libComponents/AppStatusBar';
import AppText from '../../../libComponents/AppText';
import AppButton from '../../../libComponents/AppButton';
import LinearGradient from 'react-native-linear-gradient';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import HomeTableRow from '../../../components/HomeTableRow';
import {
  endLiveSession,
  getReels,
  startLiveEvent,
  togleServices,
} from '../../../base/features/MainApiServices/MainApiServices';
import {setAgoraEng, setUserData} from '../../../redux/auth.reducer';
import Video from 'react-native-video';
import AppModal from '../../../libComponents/AppModal';
import AppInfoModal from '../../../libComponents/AppInfoModal';
import {
  ClientRoleType,
  createAgoraRtcEngine,
  IRtcEngine,
  RtcSurfaceView,
  ChannelProfileType,
  AudienceLatencyLevelType,
} from 'react-native-agora';
import DatePicker from 'react-native-date-picker';
import {WebView} from 'react-native-webview';
import {extractYouTubeId} from '../../../utils/CommonFun';
// import YoutubeIframe from 'react-native-youtube-iframe';
import YoutubePlayer from 'react-native-youtube-iframe';
import moment from 'moment';
//

const Home = ({navigation}) => {
  const userData = useSelector(state => state.auth.userData);
  // console.log('USER DATA=========', userData);
  const whoosh = useSelector(state => state.auth.whoosh);
  // whoosh.play();
  const internetSpeed = useSelector(state => state.auth.internetSpeed);
  // console.log(internetSpeed, 'internetSpeed-------------------------');
  const [chat, setChat] = useState(null);
  const [chatTime, setChatTime] = useState(null);
  const [call, setCall] = useState(null);
  const [callTime, setCallTime] = useState(null);
  const [videoCall, setVideoCall] = useState(null);
  const [videoCallTime, setVideoCallTime] = useState(null);
  const [emergencyChat, setEmergencyChat] = useState(null);
  const [isShowGoLiveModalVisible, setIsShowGoLiveModalVisible] =
    useState(false);
  const [showEmergencyChatInfoModal, setShowEmergencyChatInfoModal] =
    useState(false);
  const [showEmergencyCallInfoModal, setShowEmergencyCallInfoModal] =
    useState(false);
  const [emergencyCall, setEmergencyCall] = useState(null);
  const [reelsdata, setReelsData] = useState([]);
  const dispatch = useDispatch();

  const handleLiveEvent = async () => {
    navigation.navigate(routes.AgoraLiveEvent);
    setIsShowGoLiveModalVisible(!isShowGoLiveModalVisible);
  };

  const cardArr = [
    {
      IconType: Icons.Feather,
      IconName: 'phone-call',
      label: 'Call',
      backgroundColor: '#8dcd4e',
      // ScreenName: routes.Call_History,
      ScreenName: routes.Call_History,
      iconSize: 26,
    },
    {
      IconType: Icons.Ionicons,
      IconName: 'chatbubbles-outline',
      label: 'Chat',
      backgroundColor: '#f9434f',
      ScreenName: routes.ChatHistory,
      // ScreenName: routes.ChatHistory,
      iconSize: 29,
    },
    // {
    //   IconType: Icons.Ionicons,
    //   IconName: 'wallet-outline',
    //   label: 'Wallet',
    //   backgroundColor: '#fc8885',
    //   ScreenName: routes.WalletBottomTab,
    //   iconSize: 29,
    // },
    {
      IconType: Icons.FontAwesome5,
      IconName: 'clipboard-list',
      label: 'Waitlist',
      backgroundColor: '#3a261d',
      ScreenName: routes.WaitList,
      iconSize: 29,
    },
    // {
    //   IconType: Icons.AntDesign,
    //   IconName: 'gift',
    //   label: 'Offers',
    //   backgroundColor: '#b1036e',
    //   ScreenName: routes.Offer,
    //   iconSize: 30,
    // },
    {
      IconType: Icons.Entypo,
      IconName: 'star-outlined',
      label: 'My Reviews',
      backgroundColor: '#c9dd02',
      ScreenName: routes.MyReviews,
      iconSize: 30,
    },
    {
      IconType: Icons.Foundation,
      IconName: 'graph-bar',
      label: 'Performance',
      backgroundColor: '#f2980c',
      ScreenName: routes.Performance_Screens,
      iconSize: 30,
    },
    // {
    //   IconType: Icons.Ionicons,
    //   IconName: 'settings-outline',
    //   label: 'Settings',
    //   backgroundColor: '#000000',
    //   ScreenName: routes.Settings,
    //   iconSize: 29,
    // },
    // {
    //   IconType: Icons.Ionicons,
    //   IconName: 'person-outline',
    //   label: 'Profile',
    //   backgroundColor: '#f2980c',
    //   ScreenName: routes.Profile,
    //   iconSize: 28,
    // },
    {
      IconType: Icons.SimpleLineIcons,
      IconName: 'user-following',
      label: 'My Followers',
      backgroundColor: '#393939',
      ScreenName: routes.Followers,
      iconSize: 27,
    },
  ];

  useEffect(() => {
    if (userData) {
      setChat(userData?.chat);
      setCall(userData?.call);
      setVideoCall(userData?.video_call);
      setEmergencyChat(userData?.emergency_chat);
      setEmergencyCall(userData?.emergency_call);

      setChatTime(userData?.chat_time);
      setCallTime(userData?.call_time);
      setVideoCallTime(userData?.video_call_time);
    }
  }, [userData]);

  useEffect(() => {
    if (userData) {
      toggleServices();
    }
  }, [
    chat,
    call,
    emergencyCall,
    // emergencyChat,
    videoCall,
    chatTime,
    callTime,
    videoCallTime,
  ]);

  useEffect(() => {
    handletGetReels();
  }, []);

  const toggleServices = async () => {
    const object = {
      id: userData?.id,
      body: {
        chat: chat,
        call: call,
        emergency_call: emergencyCall,
        emergency_chat: emergencyChat,
        video_call: videoCall,
        chat_time: chatTime,
        call_time: callTime,
        video_call_time: videoCallTime,
      },
    };
    // console.log('object===============================', object);
    // return;
    const res = await togleServices(object);
    console.log('res---', res.data);
    if (res.success) {
      dispatch(setUserData(res.data.data));
      ToastAndroid.show(
        'Service update successfully!',
        ToastAndroid.BOTTOM,
        ToastAndroid.SHORT,
      );
    } else {
      ToastAndroid.show(
        'Something went wrong!',
        ToastAndroid.BOTTOM,
        ToastAndroid.SHORT,
      );
      setChat(userData?.chat);
      setCall(userData?.call);
      setVideoCall(userData?.chat);
      setEmergencyChat(userData?.emergency_chat);
      setEmergencyCall(userData?.emergency_call);
    }
  };

  const handletGetReels = async () => {
    const res = await getReels();
    console.log('res of getreel====================', res.data);
    if (res.success) {
      setReelsData(res.data.data);
    } else {
      setReelsData([]);
    }
  };

  const hanldeEmergencyChatInfoModal = () => {
    setShowEmergencyChatInfoModal(!showEmergencyChatInfoModal);
    setTimeout(() => {
      setShowEmergencyChatInfoModal(false);
    }, 2000);
  };

  const hanldeEmergencyCallInfoModal = () => {
    setShowEmergencyCallInfoModal(!showEmergencyCallInfoModal);
    setTimeout(() => {
      setShowEmergencyCallInfoModal(false);
    }, 2000);
  };

  // const handleEndLiveSession = async () => {
  //   const res = await endLiveSession(2379);
  //   if (res.success) {
  //     ToastAndroid.show(
  //       'Session ended!',
  //       ToastAndroid.BOTTOM,
  //       ToastAndroid.LONG,
  //     );
  //   } else {
  //     ToastAndroid.show(
  //       'Oops! Unable to end the call.',
  //       ToastAndroid.BOTTOM,
  //       ToastAndroid.LONG,
  //     );
  //   }
  // };

  return (
    <AppContainer style={{backgroundColor: AppColors.gray}}>
      <AppStatusBar />
      <AppHeader canBack={false} screen={'Home'} />
      <ScrollView contentContainerStyle={{paddingHorizontal: 6}}>
        {/*-------- internet speed indicator------------ */}
        <View key={internetSpeed} style={styles.interNetSpeedContainer}>
          <AppText
            style={{
              color: AppColors.white,
              fontWeight: 'bold',
              fontSize: 14.5,
            }}>
            Your Internet Speed :{' '}
            <AppText
              style={{
                color: AppColors.white,
                fontWeight: 'bold',
                fontSize: 14.5,
              }}>
              {internetSpeed == 'good'
                ? 'Good'
                : internetSpeed == 'average'
                ? 'Average'
                : internetSpeed == 'bad'
                ? 'Bad'
                : 'checking...'}
            </AppText>
          </AppText>
          <View
            style={{
              height: 30,
              width: 30,
              backgroundColor: AppColors.white,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <AppIcon
              type={Icons.MaterialCommunityIcons}
              size={18}
              name="wifi"
              color={
                internetSpeed == 'good'
                  ? 'green'
                  : internetSpeed == 'average'
                  ? AppColors.yellow
                  : internetSpeed == 'bad'
                  ? AppColors.red
                  : '#ffff'
              }
            />
          </View>
        </View>
        {/*--------  chat call tabs ------------ */}
        <View style={styles.tableContainer}>
          <View style={styles.TableHeader}>
            <AppText style={styles.typeTableText}>Type</AppText>
            <AppText style={styles.statusTableText}>Status</AppText>
            <AppText style={styles.nextTimeTableText}>Next online Time</AppText>
          </View>
          <HomeTableRow
            onDateChange={val => {
              setChatTime(val);
              // console.log('setChatTime====', val);
            }}
            value={chat}
            dateVal={chatTime}
            onToggle={val => {
              setChat(val);
            }}
            type="Chat"
            subType="India : 7.5"
            nextTime="07 May 24, 10:10 AM"
          />

          <HomeTableRow
            onDateChange={val => {
              setCallTime(val);
              // console.log('setChatTime====', val);
            }}
            dateVal={callTime}
            value={call}
            onToggle={val => {
              setCall(val);
              // console.log(val);
            }}
            type="Call"
            subType="India : 7.5"
            nextTime="10 May 24, 05:30 PM"
          />

          <HomeTableRow
            onDateChange={val => {
              setVideoCallTime(val);
              // console.log('setChatTime====', val);
            }}
            dateVal={videoCallTime}
            value={videoCall}
            onToggle={val => {
              setVideoCall(val);
              // console.log(val);
            }}
            type="Video Call"
            subType="India : 7.5"
            nextTime="07 May 24, 09:100 AM"
          />
          {/* <HomeTableRow
            value={emergencyChat}
            onToggle={val => {
              setEmergencyChat(val);
            }}
            onInfoClick={hanldeEmergencyChatInfoModal}
            type="Emergency Chat"
            subType="India : 7.5"
            emergencyChatTotoal={150}
            emergencyChatUsed={0}
            isEmergencyChat={false}
            isInformationIcon={true}
          /> */}
          <HomeTableRow
            onInfoClick={hanldeEmergencyCallInfoModal}
            value={emergencyCall}
            onToggle={val => {
              setEmergencyCall(val);
              // console.log(val);
            }}
            type="Emegency Call"
            subType="India : 7.5"
            isInformationIcon={true}
          />
        </View>
        {/*--------  check performace view ------------ */}
        <View
          style={{
            width: '100%',
            marginTop: 15,
          }}>
          <LinearGradient
            colors={['#FEB747', '#AD1257']}
            style={styles.gradientPerformceContainer}>
            <AppText
              style={{
                fontWeight: 'bold',
                color: AppColors.white,
                fontSize: 18,
              }}>
              Check Your Performance
            </AppText>
            <AppText style={{color: AppColors.white, fontSize: 14}}>
              Look into your daily ratings, earning and performance on Jytish
            </AppText>
            <AppButton
              onPress={() => navigation.navigate(routes.Performance_Screens)}
              height={35}
              width={'40%'}
              style={{alignSelf: 'flex-end'}}
              title="View my scores"
              backgroundColor={AppColors.white}
              titleColor={AppColors.black}
            />
          </LinearGradient>
        </View>
        {/*--------  Traning reels view ------------ */}
        {reelsdata.length > 0 && (
          <View
            style={{
              width: '100%',
              marginTop: 10,
              width: '100%',
              paddingVertical: 10,
              paddingHorizontal: 10,
              gap: 5,
              borderRadius: 5,
              backgroundColor: AppColors.white,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 5,
                paddingVertical: 5,
              }}>
              <AppText style={{fontSize: 17, fontWeight: '700'}}>
                Training Reels
              </AppText>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(routes.View_All_Training_Reels)
                }>
                <AppText style={{fontSize: 15, fontWeight: '500'}}>
                  View All
                </AppText>
              </TouchableOpacity>
            </View>
            <ScrollView showsHorizontalScrollIndicator={false} horizontal>
              {reelsdata.slice(0, 5).map((item, index) => {
                const videoId = extractYouTubeId(item.video);
                const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                return (
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() =>
                      navigation.navigate(routes.Play_Reel, {reelData: videoId})
                    }
                    style={{
                      width: 200,
                      height: 110,
                      // backgroundColor: 'rgba(0, 0, 0, 0.8)',
                      borderRadius: 8,
                      marginHorizontal: 5,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      resizeMode="cover"
                      style={{height: '100%', width: '100%', borderRadius: 8}}
                      source={{uri: thumbnailUrl}}
                    />
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        )}
        {/* --------  go live  view ------------ */}
        <View
          style={{
            width: '100%',
            marginTop: 10,
            paddingVertical: 15,
            paddingHorizontal: 10,
            borderRadius: 5,
            backgroundColor: AppColors.white,
          }}>
          <TouchableWithoutFeedback
            // onPress={() => navigation.navigate(routes.Live_Event)}
            // onPress={() => navigation.navigate(routes.GoLive)}
            onPress={() =>
              setIsShowGoLiveModalVisible(!isShowGoLiveModalVisible)
            }
            //   onPress={() => {
            //     ToastAndroid.show(
            //       'Live feature comming soon...',
            //       ToastAndroid.SHORT,
            //     );
            //   }
            // }
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 5,
              paddingVertical: 5,
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingLeft: '2%',
              }}>
              <View
                style={{
                  height: 38,
                  width: 38,
                  backgroundColor: AppColors.gray,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 20,
                }}>
                <AppIcon
                  type={Icons.MaterialCommunityIcons}
                  name="movie-play"
                  size={25}
                  color={AppColors.dark_gray}
                />
              </View>

              <AppText
                style={{fontSize: 17, fontWeight: '700', marginLeft: '12%'}}>
                Go Live Now!! 😍
              </AppText>
            </View>

            <TouchableOpacity
              // onPress={() => {
              //   ToastAndroid.show(
              //     'Live feature comming soon...',
              //     ToastAndroid.SHORT,
              //   );
              // }}
              onPress={() =>
                setIsShowGoLiveModalVisible(!isShowGoLiveModalVisible)
              }
              style={{
                height: 30,
                width: 50,
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}>
              <AppIcon
                type={Icons.AntDesign}
                name="right"
                size={18}
                color={AppColors.dark_gray}
              />
            </TouchableOpacity>
          </TouchableWithoutFeedback>
        </View>
        {/*--------  More tab screens  view ------------ */}
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 5,
            paddingVertical: 10,
            justifyContent: 'space-between',
            marginBottom: 5,
            // marginTop: 5,
          }}>
          {cardArr.map((item, key) => (
            <HomeCard data={item} />
          ))}
        </View>
      </ScrollView>
      <AppInfoModal
        heading="Emergency call notifications will appear even if your call service is off"
        isModalVisible={showEmergencyCallInfoModal}
        onCancel={() =>
          setShowEmergencyCallInfoModal(!showEmergencyCallInfoModal)
        }
        onRequestClose={() =>
          setShowEmergencyCallInfoModal(!showEmergencyCallInfoModal)
        }
      />

      {/* <AppInfoModal
        heading="Emergency chat notifications will appear even if your chat service is off"
        isModalVisible={showEmergencyChatInfoModal}
        onCancel={() =>
          setShowEmergencyChatInfoModal(!showEmergencyChatInfoModal)
        }
        onRequestClose={() =>
          setShowEmergencyChatInfoModal(!showEmergencyChatInfoModal)
        }
      /> */}

      <AppModal
        headingFontSize={18}
        titleLeftButton="Cancel"
        titileRightButton="Yes"
        heading="Sure you want to Go live?"
        isModalVisible={isShowGoLiveModalVisible}
        onleftButtonClick={() =>
          setIsShowGoLiveModalVisible(!isShowGoLiveModalVisible)
        }
        onRightButtonCLick={() => handleLiveEvent()}
        // onRightButtonCLick={() => handleEndLiveSession()}
        onRequestClose={() =>
          setIsShowGoLiveModalVisible(!isShowGoLiveModalVisible)
        }
      />
    </AppContainer>
  );
};

export default Home;
const styles = StyleSheet.create({
  interNetSpeedContainer: {
    paddingVertical: 12,
    backgroundColor: AppColors.primary,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  typeTableText: {
    width: '33%',
    textAlign: 'center',
    fontWeight: '800',
  },
  statusTableText: {
    width: '22%',
    textAlign: 'center',
    fontWeight: '800',
  },
  nextTimeTableText: {
    width: '45%',
    textAlign: 'center',
    fontWeight: '800',
  },
  TableHeader: {
    width: '100%',
    flexDirection: 'row',
    paddingVertical: 10,
  },
  tableContainer: {
    width: '100%',
    backgroundColor: AppColors.white,
    borderRadius: 10,
    marginTop: 15,
    paddingVertical: 10,
  },
  tableRows: {
    width: '100%',
    flexDirection: 'row',
    paddingVertical: 13,
    // backgroundColor: 'red',
    alignItems: 'center',
  },
  gradientPerformceContainer: {
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 10,
    gap: 5,
    borderRadius: 10,
  },
});
