import React, {useRef, useState, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  Image,
  Keyboard,
} from 'react-native';
import {useSelector} from 'react-redux';
import Loading from '../components/Loading';
import {User} from '../assets/images';
import SideOptions from './LiveSideOptions';
import {AppColors} from '../../../utils/constants';

const LiveMessageItem = ({message}) => {
  return (
    <View style={styles.messageContainer}>
      <Image source={User} style={styles.avatar} />
      <View style={styles.messageBubble}>
        <Text style={styles.senderName}>{message.sender}</Text>
        <Text style={styles.messageText}>{message.message}</Text>
        <Text style={styles.messageTime}>
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
      </View>
    </View>
  );
};

const LiveChat = ({roomId}) => {
  const {userProfile} = useSelector(state => state.auth);
  const [allMessages, setAllMessages] = useState([
    {
      message: {
        sender: 'Ateeb',
        message: 'Ateeb Joined',
        timestamp: new Date().toISOString(),
      },
    },
    {
      message: {
        sender: 'Ateeb',
        message: 'Hello',
        timestamp: new Date().toISOString(),
      },
    },
    {
      message: {
        sender: 'User2',
        message: 'User2 Joined',
        timestamp: new Date().toISOString(),
      },
    },
    {
      message: {
        sender: 'User2',
        message: 'Hi Ateeb!',
        timestamp: new Date().toISOString(),
      },
    },
    {
      message: {
        sender: 'Ateeb',
        message:
          'How are you? How are you? How are you?How are you?How are you?How are you?',
        timestamp: new Date().toISOString(),
      },
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const scrollViewRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('LiveChat roomId:', roomId);
    if (roomId) {
      const io = new WebSocket(`wss://api.jyotiish.com/ws/chat/${roomId}/`);
      setSocket(io);

      io.onopen = () => {
        setLoading(false);
      };

      io.onclose = e => {
        console.log('closed', e);
      };

      io.onerror = e => {
        console.error('WebSocket error', e);
        setLoading(false);
      };

      io.onmessage = e => {
        const parsedMessage = JSON.parse(e.data);
        setAllMessages(prevMessages => [
          ...prevMessages,
          {
            ...parsedMessage,
            message: {
              ...parsedMessage.message,
              timestamp: new Date().toISOString(),
            },
          },
        ]);
      };
      return () => {
        io.close();
      };
    }
  }, [roomId]);

  const sendMessage = () => {
    if (socket && inputMessage.trim()) {
      socket.send(
        JSON.stringify({
          message: {
            sender: userProfile?.user,
            message: inputMessage,
            timestamp: new Date().toISOString(),
          },
        }),
      );
      setInputMessage('');
    } else {
      console.log('Cannot send message');
    }
  };

  const handleKeyPress = event => {
    if (event.key === 'Enter' && inputMessage.trim()) {
      sendMessage();
      Keyboard.dismiss();
    }
  };

  const groupMessagesByDate = messages => {
    return messages.reduce((acc, message) => {
      const messageDate = new Date(message.message.timestamp).toDateString();
      if (!acc[messageDate]) {
        acc[messageDate] = [];
      }
      acc[messageDate].push(message);
      return acc;
    }, {});
  };

  if (loading) {
    return <Loading />;
  }

  const groupedMessages = groupMessagesByDate(allMessages);

  return (
    <View style={styles.container}>
      <View style={styles.messagesContainer}>
        <View style={styles.messageComponentContainer}>
          <ScrollView
            ref={scrollViewRef}
            onContentSizeChange={() =>
              scrollViewRef.current?.scrollToEnd({animated: true})
            }
            style={styles.messagesList}>
            {Object.keys(groupedMessages).map((date, index) => (
              <View key={index}>
                <Text style={styles.dateSeparator}>{date}</Text>
                {groupedMessages[date].map((item, idx) => (
                  <LiveMessageItem key={idx} message={item.message} />
                ))}
              </View>
            ))}
          </ScrollView>
        </View>
        <View style={styles.sideChatOptionsContainer}>
          <SideOptions />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputMessage}
          onChangeText={setInputMessage}
          placeholder="Type a message..."
          placeholderTextColor={AppColors.gray}
          onSubmitEditing={sendMessage}
          returnKeyType="send"
          blurOnSubmit={true}
          onKeyPress={handleKeyPress}
        />
        <View style={styles.chargesContainer}>
          <Text style={styles.chargesText}>
            {/* {symbols.rupees} 20 /m */}
            20/m
          </Text>
        </View>
      </View>
    </View>
  );
};

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messagesContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  messageComponentContainer: {
    flex: 0.8,
  },
  sideChatOptionsContainer: {
    flex: 0.2,
    marginBottom: 10,
  },
  messagesList: {
    flex: 1,
    padding: 10,
  },
  dateSeparator: {
    textAlign: 'center',
    color: AppColors.gray,
    marginVertical: 10,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    maxWidth: width * 0.6,
  },
  messageBubble: {
    backgroundColor: 'transparent',
    borderRadius: 15,
    padding: 10,
  },
  messageText: {
    color: AppColors.white,
    fontSize: 16,
  },
  messageTime: {
    color: AppColors.grayShade,
    fontSize: 12,
    alignSelf: 'flex-end',
    marginTop: 5,
  },
  senderName: {
    color: AppColors.white,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
  },
  input: {
    flex: 1,
    backgroundColor: AppColors.grayShade,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    color: AppColors.black,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  chargesContainer: {
    backgroundColor: AppColors.grayShade,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.3,
  },
  chargesText: {
    fontSize: 16,
    color: 'white',
  },
});

export default LiveChat;
