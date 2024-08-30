import React, {useState} from 'react';
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

const UsersChat = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  //   const sendMessage = () => {
  //     if (inputText.trim()) {
  //       setMessages(prevMessages => [
  //         ...prevMessages,
  //         {id: `${prevMessages.length}`, text: inputText},
  //       ]);
  //       setInputText('');
  //     }
  //   };

  const arr = [
    {from: 'user', messages: 'hello'},
    {from: 'me', messages: 'hi'},
  ];

  return (
    <KeyboardAvoidingView style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({item}) => (
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
        keyExtractor={item => item.id}
        style={styles.messagesList}
      />

      <View style={{}}>
        <TextInput
          // style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type a message"
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  messagesList: {
    flex: 1,
  },
  messageContainer: {
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: '#e1ffc7',
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
});

export default UsersChat;
