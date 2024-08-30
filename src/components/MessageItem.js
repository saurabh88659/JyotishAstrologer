import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AppColors } from '../utils/constants';

const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const MessageItem = ({ message, from }) => {
  return (
    <View
      style={[
        styles.messageContainer,
        {
          borderBottomLeftRadius: from === 'astrologer' ? 0 : 10,
          borderBottomRightRadius: from === 'astrologer' ? 10 : 0,
          backgroundColor: from === 'astrologer' ? AppColors.white : AppColors.primary,
          borderRadius: 5,
          alignSelf: from === 'astrologer' ? 'flex-start' : 'flex-end',
        },
      ]}
    >
      <Text
        style={{
          fontSize: 16,
          color: from === 'astrologer' ? AppColors.black : AppColors.white,
        }}
      >
        {message.message}
      </Text>
      <Text
        style={{
          fontSize: 12,
          color: from === 'astrologer' ? AppColors.gray : AppColors.gold,
          textAlign: 'right',
          marginTop: 4,
        }}
      >
        {formatTime(message.timestamp)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    maxWidth: '80%',
    paddingVertical: 8,
    marginVertical: 9,
    marginHorizontal: 10,
    paddingHorizontal: 15,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
});

export default MessageItem;
