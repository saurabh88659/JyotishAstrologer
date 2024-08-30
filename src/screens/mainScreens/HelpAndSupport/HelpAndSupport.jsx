import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  Platform,
  ToastAndroid,
  Modal,
} from 'react-native';
import {
  AppColors,
  dummyChat,
  keyboardType,
  routes,
} from '../../../utils/constants';
import AppContainer from '../../../libComponents/AppContainer';
import {useSelector} from 'react-redux';
import AppHeader from '../../../libComponents/AppHeader';
import AppLoder from '../../../libComponents/AppLoader';
import {TextInput} from 'react-native';
import {TouchableOpacity} from 'react-native';
import AppIcon, {Icons} from '../../../libComponents/AppIcon';
import {getSupportchatroom} from '../../../base/features/MainApiServices/MainApiServices';
import AppTextInputBottomLine from '../../../libComponents/AppTextInputBottomLine';
import {ScrollView} from 'react-native';
import AppText from '../../../libComponents/AppText';
import AppPrimaryButton from '../../../libComponents/AppPrimaryButton';
import {QueryStatus} from '@reduxjs/toolkit/query';

const HelpAndSupport = ({navigation, route}) => {
  const userData = useSelector(state => state.auth.userData);
  const [allmessages, setAllMessages] = useState([]);
  const [screenLoading, setScreenLoading] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [chatRoomId, setChatRoomId] = useState('');
  const [socket, setSocket] = useState('');

  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const [query, setQuery] = useState('');
  const [queryError, setQueryError] = useState('');
  const [showQueryModal, setShowQueryModal] = useState(false);

  const flatListRef = useRef(null);

  useEffect(() => {
    setShowQueryModal(true);
  }, []);

  useEffect(() => {
    handleGetSupportchatroom();
  }, []);

  const handleGetSupportchatroom = async () => {
    setScreenLoading(true);
    const res = await getSupportchatroom();
    // console.log('res of GetSupportchatroom', res.chatroom.data);
    if (res.success) {
      setScreenLoading(false);
      setChatRoomId(res.data.chatroom.room_code);
    } else {
      setScreenLoading(false);
      setChatRoomId('');
      navigation.goBack();
      ToastAndroid.show(
        ' Chat id not provided. Please try again.',
        ToastAndroid.SHORT,
      );
    }
  };

  useEffect(() => {
    if (chatRoomId) {
      const roomCodeWithoutHyphens = chatRoomId.replace(/-/g, '');
      const io = new WebSocket(
        `wss://api.jyotiish.com/ws/chat/${roomCodeWithoutHyphens}/`,
      );
      setSocket(io);
      io.onopen = e => {
        console.log('connected-->>>>>>>', e);
        ToastAndroid.show('connected successfully!', ToastAndroid.SHORT);
      };

      io.onerror = e => {
        // handleSocketError(e);
        io?.close();
        navigation.goBack();
        ToastAndroid.show(
          'Error on socket. Please try again.',
          ToastAndroid.SHORT,
        );
        console.log('error-->>>>', e);
      };

      io.onmessage = e => {
        const parsedMessage = JSON.parse(e.data);
        console.log('parsedMessage===', parsedMessage);
        setAllMessages(prevMessages => [...prevMessages, parsedMessage]);
      };
      return () => {
        io?.close();
        console.log('hello');
      };
    }
  }, [chatRoomId]);

  const sendMessage = () => {
    if (socket && inputMessage.trim()) {
      socket.send(
        JSON.stringify({
          type: 'support_chat',
          message: {
            message: inputMessage,
            msg_from: 'user',
          },
        }),
      );
      setInputMessage('');
      // handleGetChatTimer();
    } else {
      console.log('Cannot send message');
    }
  };

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({animated: true});
    }
  }, [allmessages]);

  // if (allmessages.length >= 0) {
  //   return (
  //     <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
  //       <AppText style={{marginBottom: 20, fontWeight: '600', fontSize: 19}}>
  //         Thank you!
  //       </AppText>
  //       <AppText style={{fontSize: 16, fontWeight: '600', marginBottom: 5}}>
  //         Thank you! Your query has been submitted.
  //       </AppText>
  //       <AppText style={{fontSize: 15, fontWeight: '400'}}>
  //         We'll respond shortly.
  //       </AppText>
  //     </View>
  //   );
  // }
  return (
    <AppContainer behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <AppHeader isDrawer={false} screen={'Help & Support'} />
      {screenLoading ? (
        <AppLoder style={{backgroundColor: '#FFF7EE'}} />
      ) : allmessages.length == 0 ? (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <AppText style={{marginBottom: 20, fontWeight: '600', fontSize: 19}}>
            Thank you!
          </AppText>
          <AppText style={{fontSize: 16, fontWeight: '600', marginBottom: 5}}>
            Thank you! Your query has been submitted.
          </AppText>
          <AppText style={{fontSize: 15, fontWeight: '400'}}>
            We'll respond shortly.
          </AppText>
        </View>
      ) : (
        <View style={styles.container}>
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingVertical: 10}}
            ref={flatListRef}
            onContentSizeChange={() =>
              flatListRef.current.scrollToEnd({animated: true})
            }
            // keyExtractor={item => item.id.toString()}
            style={styles.messagesList}
            data={allmessages}
            renderItem={({item}) => (
              <View
                style={[
                  styles.messageContainer,
                  {
                    borderBottomLeftRadius:
                      !item.message.msg_from === 'user' ? 0 : 10,
                    borderBottomRightRadius:
                      !item.message.msg_from === 'user' ? 10 : 0,
                    backgroundColor:
                      !item.message.msg_from === 'user'
                        ? AppColors.white
                        : AppColors.primary,
                    borderRadius: 5,
                    alignSelf:
                      !item.message.msg_from === 'user'
                        ? 'flex-start'
                        : 'flex-end',
                  },
                ]}>
                <Text
                  style={{
                    fontSize: 16,
                    color:
                      !item.message.msg_from === 'user'
                        ? AppColors.black
                        : AppColors.white,
                  }}>
                  {item?.message?.message}
                </Text>
              </View>
            )}
          />

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={inputMessage}
              onChangeText={setInputMessage}
              placeholder="Type a message..."
              placeholderTextColor={AppColors.dark_gray}
            />
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
        </View>
      )}

      <Modal
        visible={showQueryModal}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShowQueryModal(!showQueryModal)}>
        <View
          style={{
            height: '100%',
            width: '100%',
            backgroundColor: '#000',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 10,
          }}>
          <View
            style={{
              backgroundColor: AppColors.lightYellow,
              paddingVertical: 30,
              width: '100%',
              borderRadius: 6,
              alignItems: 'center',
            }}>
            <AppText
              style={{alignSelf: 'center', fontSize: 18, fontWeight: 'bold'}}>
              CONTACT FORM
            </AppText>
            <AppTextInputBottomLine
              labelText="Name"
              placeholder="Enter name"
              value={name}
              onChangeText={setName}
              maxLength={50}
              validationError={nameError}
            />
            <AppTextInputBottomLine
              keyboardType={keyboardType.phonePad}
              labelText="Phone number"
              placeholder="Enter Phone number"
              value={phone}
              onChangeText={setPhone}
              maxLength={70}
              validationError={phoneError}
            />
            <AppTextInputBottomLine
              // keyboardType={keyboardType.phonePad}
              labelText="Email address"
              placeholder="Enter Email address"
              value={email}
              onChangeText={setEmail}
              maxLength={70}
              validationError={emailError}
            />
            <AppTextInputBottomLine
              // keyboardType={keyboardType.phonePad}
              labelText="Query"
              placeholder="Enter your query"
              value={query}
              onChangeText={setQuery}
              maxLength={100}
              validationError={emailError}
            />

            <AppPrimaryButton
              // buttonLoading={buttonLoading}
              onPress={() => setShowQueryModal(!showQueryModal)}
              height={45}
              width={'40%'}
              title={'SUBMIT'}
              style={{borderRadius: 6}}
              mainContainerStyle={{borderRadius: 6, marginTop: 25}}
            />
          </View>
        </View>
      </Modal>
    </AppContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF7EE',
    borderTopWidth: 0.6,
    borderColor: AppColors.dark_gray,
  },
  messagesList: {
    flex: 1,
  },
  dateHeader: {
    backgroundColor: AppColors.white,
    padding: 5,
    alignItems: 'center',
    width: '30%',
    alignSelf: 'center',
    borderRadius: 6,
    // opacity: 0.8,
  },
  dateText: {
    fontWeight: 'bold',
    color: AppColors.dark_gray,
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
  messageContainer: {
    maxWidth: '80%',
    minWidth: '20%',
    paddingVertical: 5,
    marginVertical: 9,
    marginHorizontal: 15,
    // paddingHorizontal: 7,
    paddingLeft: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
});

export default HelpAndSupport;
