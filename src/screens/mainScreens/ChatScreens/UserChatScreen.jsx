import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  ToastAndroid,
  BackHandler,
  Modal,
  Dimensions,
  ImageBackground,
} from 'react-native';
import AppIcon, {Icons} from '../../../libComponents/AppIcon';
import {AppColors, routes} from '../../../utils/constants';
import {
  getChatTimer,
  getMedia,
  getParticularChatHistory,
  getSupportChat,
} from '../../../base/features/MainApiServices/MainApiServices';
import AppNoBalanceModal from '../../../libComponents/AppNoBalanceModal';
import AppContainer from '../../../libComponents/AppContainer';
import {useSelector} from 'react-redux';
import AppChatHeader from '../../../libComponents/AppChatHeader';
import {useIsFocused} from '@react-navigation/native';
import AppText from '../../../libComponents/AppText';
import AppLoder from '../../../libComponents/AppLoader';
import messaging from '@react-native-firebase/messaging';

const UserChatScreen = ({navigation, route}) => {
  const windowWidth = Dimensions.get('window').width;
  // const user = route?.params?.user;
  const user = useSelector(state => state.auth.userRouteData);
  console.log('user---------------------------at chat ', user?.user_details);
  const chatRoom = useSelector(state => state.auth.chatRoom);
  // console.log('chatRoom====', chatRoom);
  const userData = useSelector(state => state.auth.userData);
  const [allmessages, setAllMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const flatListRef = useRef(null);
  const [noBalanceModal, setShowoBalanceModal] = useState(false);
  const [chatTime, setChatTime] = useState('');
  const [screenLoading, setScreenLoading] = useState(false);
  const isFocused = useIsFocused();
  const [showMessgagesModal, setShowMessgagesModal] = useState(false);
  const [supportChatData, setSupportChatData] = React.useState([]);
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [mediaData, setMediaData] = useState(false);
  const [showZoomImageModal, setZoomImageModal] = useState(false);

  // call end on notification ------------
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      if (remoteMessage?.notification?.title?.includes('Chat Ended')) {
        if (socket) {
          chatEnd();
        }
      }
    });

    const unsubscribeOnBackgroundMessage =
      messaging().setBackgroundMessageHandler(async remoteMessage => {
        if (remoteMessage?.notification?.title?.includes('Chat Ended')) {
          if (socket) {
            chatEnd();
          }
        }
      });
    return () => {
      unsubscribe();
      // unsubscribeOnBackgroundMessage();
    };
  }, []);

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

  //scroll down ---------------------
  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({animated: true});
    }
  }, [allmessages]);

  useEffect(() => {
    handleGetSupportChat();
  }, []);

  useEffect(() => {
    if (user && userData) {
      handleGetMedia();
    }
  }, [user, userData]);

  //chat history===============================
  useEffect(() => {
    if (userData && user) {
      // handleGetParticularChatHistory();
    }
  }, [userData, user]);

  const handleGetSupportChat = async () => {
    const res = await getSupportChat();
    if (res.success) {
      setSupportChatData(res.data.data);
    } else {
      setSupportChatData([]);
    }
  };

  const handleGetMedia = async () => {
    const data = {userId: user?.user_details?.id, astroId: userData.id};
    const res = await getMedia(data);
    if (res.success) {
      setMediaData(res.data.data);
    } else {
      setMediaData([]);
    }
  };

  //handle socket error ==
  const handleSocketError = event => {
    let errorMessage;
    if (event.type === 'close') {
      errorMessage =
        'The connection was closed unexpectedly. Please try again.';
    } else if (event.type === 'error') {
      errorMessage = 'Oops! Some error occurred. Please try again.';
    }
    ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
  };

  // useEffect(() => {
  //   if (!chatRoom?.id) {
  //     navigation.goBack();
  //     ToastAndroid.show(
  //       'Unable to create chat room. Please try again.',
  //       ToastAndroid.SHORT,
  //     );
  //     return;
  //   }
  //   if (!user) {
  //     ToastAndroid.show(
  //       'User information not found. Please try again.',
  //       ToastAndroid.SHORT,
  //     );
  //     setTimeout(() => {
  //       navigation.goBack();
  //     }, 1000);
  //     return;
  //   }

  //   const options = {
  //     headers: {
  //       Authorization: `Bearer ${await getOfflineData(CONSTANTS_ASYNC.TOKEN)}`,
  //     },
  //   };
  //   const roomCodeWithoutHyphens = chatRoom.room_code.replace(/-/g, '');
  //   const io = new WebSocket(
  //     `wss://api.jyotiish.com/ws/chat/${roomCodeWithoutHyphens}/`,
  //     null,
  //     options,
  //   );
  //   setSocket(io);
  //   io.onopen = e => {
  //     // ToastAndroid.show('Socket connected', ToastAndroid.SHORT);
  //     console.log('socket connected', e);
  //   };
  //   io.onerror = e => {
  //     handleSocketError(e);
  //     io.close();
  //     try {
  //       navigation?.goBack();
  //     } catch (error) {
  //       console.log('error onerror can not navigate');
  //     }
  //   };
  //   io.onclose = e => {
  //     console.log('socket closed', e);
  //     // ToastAndroid.show('Socket connection closed', ToastAndroid.SHORT);
  //   };
  //   io.onmessage = e => {
  //     const parsedMessage = JSON.parse(e.data);
  //     if (parsedMessage.type == 'chat_time') {
  //       setChatTime(parsedMessage.message.time * 60);
  //       // if (parsedMessage?.message?.time == 0) {
  //       //   setShowoBalanceModal(true);
  //       // }
  //     } else {
  //       setAllMessages(prevMessages => [...prevMessages, parsedMessage]);
  //     }
  //   };
  //   return () => {
  //     io?.close();
  //   };
  // }, []);

  //socket connection--------------
  useEffect(() => {
    const setupSocket = async () => {
      if (!chatRoom?.id) {
        navigation.goBack();
        ToastAndroid.show(
          'Unable to create chat room. Please try again.',
          ToastAndroid.SHORT,
        );
        return;
      }

      if (!user) {
        ToastAndroid.show(
          'User information not found. Please try again.',
          ToastAndroid.SHORT,
        );
        setTimeout(() => {
          navigation.goBack();
        }, 1000);
        return;
      }
      const token = await getOfflineData(CONSTANTS_ASYNC.TOKEN);
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const roomCodeWithoutHyphens = chatRoom.room_code.replace(/-/g, '');
      const io = new WebSocket(
        `wss://api.jyotiish.com/ws/chat/${roomCodeWithoutHyphens}/`,
        null,
        options,
      );
      setSocket(io);
      io.onopen = e => {
        ToastAndroid.show('Socket connected', ToastAndroid.SHORT);
        console.log('socket connected', e);
      };

      io.onerror = e => {
        handleSocketError(e);
        io.close();
        try {
          navigation?.goBack();
        } catch (error) {
          console.log('error onerror can not navigate');
        }
      };

      io.onclose = e => {
        console.log('socket closed', e);
        ToastAndroid.show('Socket connection closed', ToastAndroid.SHORT);
      };

      io.onmessage = e => {
        const parsedMessage = JSON.parse(e.data);
        // if (parsedMessage.type == 'chat_time') {
        //   setChatTime(parsedMessage.message.time * 60);
        //   if (parsedMessage?.message?.time == 0) {
        //     setShowoBalanceModal(true);
        //   }
        // } else {
        //   setAllMessages(prevMessages => [...prevMessages, parsedMessage]);
        // }
        if (parsedMessage.type === 'user_join') {
          // console.log(${parsedMessage.username} has joined);
          ToastAndroid.show(
            `${parsedMessage.username} has joined`,
            ToastAndroid.SHORT,
          );
        } else if (parsedMessage.type === 'user_leave') {
          ToastAndroid.show(
            `${parsedMessage.username} has left`,
            ToastAndroid.SHORT,
          );
        } else {
          setAllMessages(prevMessages => [...prevMessages, parsedMessage]);
        }
      };
    };
    setupSocket();

    return () => {
      socket?.close();
    };
  }, []);

  const handleGetParticularChatHistory = async () => {
    setScreenLoading(true);
    const data = {userId: user?.user_details?.id, astroId: userData.id};
    const res = await getParticularChatHistory(data);
    if (res.success) {
      const formattedData = res.data.map(item => {
        return {
          message: {
            from: item?.msg_from,
            message: item?.content,
            date: item?.timestamp,
          },
        };
      });
      setScreenLoading(false);
      setAllMessages(formattedData);
    } else {
      setScreenLoading(false);
      setAllMessages([]);
    }
  };

  useEffect(() => {
    if (socket && user) {
      setTimeout(() => {
        // handleGetChatTimer();
      }, 1000);
    }
  }, [socket, user]);

  const handleGetChatTimer = async () => {
    if (socket && user) {
      socket.send(
        JSON.stringify({
          type: 'chat_time',
          message: {
            sender: user?.user_details?.user,
            astrologer: userData?.phone_no,
            from: 'astrologer',
          },
        }),
      );
    } else {
      console.log('cant send body for timer');
    }
  };

  const sendMessage = () => {
    if (socket && inputMessage.trim()) {
      socket.send(
        JSON.stringify({
          message: {
            sender: user?.user_details?.user,
            astrologer: userData?.phone_no,
            message: inputMessage,
            from: 'astrologer',
          },
        }),
      );
      setInputMessage('');
    } else {
      console.log('Cannot send message');
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setChatTime(prevTime => {
        if (prevTime == 0) {
          clearInterval(timer);
          socket?.close();
          setShowoBalanceModal(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    HandlegetChatTimerApi();
  }, []);

  const HandlegetChatTimerApi = async () => {
    const data = {userId: user?.user_details?.id, astrologerId: userData.id};
    const res = await getChatTimer(data);
    if (res.success) {
      setChatTime(res.data.chat_time * 60);
      // setChatTime(6);
    } else {
      setChatTime(0);
    }
  };

  const formatTime = time => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes} min ${seconds < 10 ? '0' : ''}${Math.ceil(seconds)} sec`;
  };

  const chatEnd = () => {
    socket.close();
    navigation.goBack();
  };

  const sendPredefineMessage = message => {
    if (socket && showMessgagesModal) {
      socket.send(
        JSON.stringify({
          message: {
            sender: user?.user_details?.user,
            astrologer: userData?.phone_no,
            message: message,
            from: 'astrologer',
          },
        }),
      );
      setShowMessgagesModal(!showMessgagesModal);
    } else {
      console.log('Cannot send message');
    }
  };

  return (
    <AppContainer behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <AppChatHeader
        // oninfoPress={() => navigation.navigate(routes.Kundali_Top_Tab_Stack)}
        onEndButton={chatEnd}
        screen={user?.user_details?.full_name}
        isDrawer={false}
        isIcon={false}
        isInfoButton={false}
        isTimer={
          chatTime > 0 && (
            <Text
              style={{
                color: AppColors.black,
                fontSize: 17,
              }}>
              {formatTime(chatTime)}
            </Text>
          )
        }
      />
      {screenLoading ? (
        <AppLoder />
      ) : (
        <>
          <ImageBackground
            resizeMode="cover"
            source={require('../../../assets/Images/chatbg.png')}
            style={styles.container}>
            <FlatList
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{paddingVertical: 10}}
              ref={flatListRef}
              onContentSizeChange={() =>
                flatListRef.current.scrollToEnd({animated: true})
              }
              keyExtractor={item => item.id}
              style={styles.messagesList}
              data={allmessages}
              renderItem={({item}) => (
                <View
                  style={[
                    styles.mesageContainer,
                    {
                      borderBottomLeftRadius:
                        item.message.from === 'user' ? 0 : 10,
                      borderBottomRightRadius:
                        item.message.from === 'user' ? 10 : 0,
                      backgroundColor:
                        item.message.from === 'user'
                          ? AppColors.white
                          : AppColors.primary,
                      borderRadius: 5,
                      alignSelf:
                        item.message.from === 'user'
                          ? 'flex-start'
                          : 'flex-end',
                    },
                  ]}>
                  <Text
                    style={{
                      fontSize: 16,
                      color:
                        item.message.from === 'user'
                          ? AppColors.black
                          : AppColors.white,
                    }}>
                    {item?.message?.message}
                  </Text>
                </View>
              )}
            />
          </ImageBackground>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={inputMessage}
              onChangeText={setInputMessage}
              placeholder="Type a message..."
              placeholderTextColor={AppColors.dark_gray}
            />
            {/* {inputMessage ? ( */}
            <TouchableOpacity
              disabled={!inputMessage}
              onPress={() => sendMessage()}
              style={[
                styles.sendButton,
                {backgroundColor: inputMessage ? 'green' : AppColors.gray},
              ]}>
              <AppIcon
                type={Icons.Ionicons}
                name="send"
                color={AppColors.white}
                size={20}
              />
            </TouchableOpacity>
          </View>

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

            <TouchableOpacity
              onPress={() => setShowMessgagesModal(!showMessgagesModal)}>
              <AppIcon
                type={Icons.MaterialCommunityIcons}
                // name="message-arrow-right"
                name="message-flash"
                color={AppColors.black}
                size={25}
              />
            </TouchableOpacity>
          </View>

          <AppNoBalanceModal
            onRightButtonCLick={() => navigation.goBack()}
            titileRightButton="Ok"
            isModalVisible={noBalanceModal}
            // isModalVisible={true}
            heading="Session Disconnected"
            subHeading="The user's balance is finished. The session has been disconnected."
          />
          <Modal
            visible={showMessgagesModal}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setShowMessgagesModal(!showMessgagesModal)}>
            <View
              style={{
                backgroundColor: AppColors.lightYellow,
                height: '92%',
                marginTop: 'auto',
              }}>
              <View style={styles.followerCountContainer}>
                <AppText style={styles.followerText}>
                  Tap the message below to send it to the user
                </AppText>
              </View>
              <FlatList
                contentContainerStyle={{
                  paddingHorizontal: 12,
                  paddingBottom: '10%',
                }}
                data={supportChatData}
                renderItem={({item, index}) => (
                  <TouchableOpacity
                    onPress={() => sendPredefineMessage(item?.message)}
                    style={{
                      backgroundColor: AppColors.primary,

                      alignSelf: 'flex-start',
                      maxWidth: '100%',
                      paddingVertical: 8,
                      marginVertical: 9,
                      marginHorizontal: 10,
                      paddingHorizontal: 15,
                      borderRadius: 6,
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: AppColors.white,
                      }}>
                      {item?.message}
                    </Text>
                  </TouchableOpacity>
                )}
                keyExtractor={item => item?.toString()}
              />
            </View>
          </Modal>
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
                  width: '100%',
                  // gap: 2,
                  justifyContent: 'space-evenly',
                }}
                data={[1, 1, 1, 1, 1, 1]}
                renderItem={({item, index}) => (
                  <TouchableOpacity
                    onPress={() => setZoomImageModal(true)}
                    style={{
                      // width: 110,
                      height: 135,
                      width: windowWidth / 3.3,
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
      )}
    </AppContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#FFF7EE',
    backgroundColor: 'red',
    borderTopWidth: 0.6,
    borderColor: AppColors.dark_gray,
  },
  messagesList: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingVertical: 10,
    paddingHorizontal: 5,
    gap: 6,
  },
  input: {
    borderRadius: 30,
    flex: 1,
    borderWidth: 0.8,
    borderColor: AppColors.dark_gray,
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
  mesageContainer: {
    maxWidth: '80%',
    paddingVertical: 8,
    marginVertical: 9,
    marginHorizontal: 10,
    paddingHorizontal: 15,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
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

export default UserChatScreen;
