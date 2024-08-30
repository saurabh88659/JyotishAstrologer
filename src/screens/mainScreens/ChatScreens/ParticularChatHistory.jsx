import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Keyboard,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import AppIcon, {Icons} from '../../../libComponents/AppIcon';
import {AppColors, dummyChat, routes} from '../../../utils/constants';
import {
  getChatRoom,
  getChatTimer,
  getParticularChatHistory,
} from '../../../base/features/MainApiServices/MainApiServices';
import AppTimer from '../../../libComponents/AppTimer';
import AppNoBalanceModal from '../../../libComponents/AppNoBalanceModal';
import AppContainer from '../../../libComponents/AppContainer';
import {useSelector} from 'react-redux';
import AppChatHeader from '../../../libComponents/AppChatHeader';
import AppHeader from '../../../libComponents/AppHeader';
import moment from 'moment';
import AppLoder from '../../../libComponents/AppLoader';

const ParticularChatHistory = ({navigation, route}) => {
  const user = route?.params?.user;
  console.log('user id user', user);
  const chatRoom = useSelector(state => state.auth.chatRoom);
  const userData = useSelector(state => state.auth.userData);
  const [allmessages, setAllMessages] = useState([]);
  const [screenLoading, setScreenLoading] = useState(false);
  const flatListRef = useRef(null);

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({animated: true});
    }
  }, [allmessages]);

  useEffect(() => {
    if (userData && user) {
      handleGetParticularChatHistory();
    }
  }, [userData]);

  const handleGetParticularChatHistory = async () => {
    setScreenLoading(true);
    const data = {userId: user.user.id, astroId: userData.id};
    const res = await getParticularChatHistory(data);
    if (res.success) {
      setScreenLoading(false);
      setAllMessages(res.data);
    } else {
      setScreenLoading(false);
      setAllMessages([]);
    }
  };

  const renderItem = ({item, index}) => {
    const currentDate = moment(item.timestamp).format('MMMM D, YYYY');
    const previousItem = allmessages[index - 1];
    const previousDate = previousItem
      ? moment(previousItem.timestamp).format('MMMM D, YYYY')
      : null;
    const showDate = previousDate !== currentDate;

    return (
      <View>
        {showDate && (
          <View style={styles.dateHeader}>
            <Text style={styles.dateText}>{currentDate}</Text>
          </View>
        )}
        <View
          style={[
            styles.messageContainer,
            {
              borderBottomLeftRadius: item?.msg_from === 'user' ? 0 : 10,
              borderBottomRightRadius: item?.msg_from === 'user' ? 10 : 0,
              backgroundColor:
                item.msg_from === 'user' ? AppColors.white : AppColors.primary,
              borderRadius: 5,
              alignSelf: item?.msg_from === 'user' ? 'flex-start' : 'flex-end',
            },
          ]}>
          <Text
            style={{
              fontSize: 16,
              color:
                item?.msg_from === 'user' ? AppColors.black : AppColors.white,
              alignSelf: 'flex-start',
            }}>
            {item?.content}
          </Text>
          <Text
            style={{
              opacity: 0.7,
              fontSize: 12,
              color:
                item.msg_from === 'user' ? AppColors.black : AppColors.white,
            }}>
            {moment(item.timestamp).format('hh:mm A') || '-'}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <AppContainer behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <AppHeader
        isDrawer={false}
        screen={user?.user?.full_name || 'Chat History'}
      />
      {screenLoading ? (
        <AppLoder style={{backgroundColor: '#FFF7EE'}} />
      ) : (
        <View style={styles.container}>
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingVertical: 10}}
            ref={flatListRef}
            onContentSizeChange={() =>
              flatListRef.current.scrollToEnd({animated: true})
            }
            keyExtractor={item => item.id.toString()}
            style={styles.messagesList}
            data={allmessages}
            renderItem={renderItem}
          />
        </View>
      )}
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
    paddingHorizontal: 7,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
});

export default ParticularChatHistory;
