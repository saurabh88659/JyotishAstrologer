import {StyleSheet, Text, View, ToastAndroid} from 'react-native';
import React, {useRef, useState} from 'react';
import {AppColors} from '../../../utils/constants';
import AppContainer from '../../../libComponents/AppContainer';
import AppHeader from '../../../libComponents/AppHeader';
import AppTextInputBottomLine from '../../../libComponents/AppTextInputBottomLine';
import AppPrimaryButton from '../../../libComponents/AppPrimaryButton';
import {
  addSupportMessage,
  editSupportMessage,
} from '../../../base/features/MainApiServices/MainApiServices';

const AddQuickChat = ({navigation, route}) => {
  const editChatData = route?.params?.editChatData;
  const [message, setMessage] = useState(
    editChatData ? editChatData.message : '',
  );
  const [messageError, setMessageError] = useState('');
  const [inputAutoFocus] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);

  const validateForm = () => {
    let isValid = true;
    if (!message.trim()) {
      setMessageError('Message is required');
      isValid = false;
    } else {
      setMessageError('');
    }
    return isValid;
  };

  const handleAddSupportMessage = async () => {
    setButtonLoading(true);
    const data = {message: message};
    const res = await addSupportMessage(data);
    console.log('res of addSupportMessage', res);
    if (res.success) {
      setButtonLoading(false);
      ToastAndroid.show(
        'Message saved successfully!',
        ToastAndroid.BOTTOM,
        ToastAndroid.SHORT,
      );
      navigation.goBack();
    } else {
      ToastAndroid.show(
        'Opps! Something went wrong',
        ToastAndroid.BOTTOM,
        ToastAndroid.SHORT,
      );
      setButtonLoading(false);
    }
  };

  const handleEditSupportMessage = async () => {
    setButtonLoading(true);
    const data = {id: editChatData.id, body: {message: message}};
    console.log(data, 'data----');
    const res = await editSupportMessage(data);
    //     console.log('res of editSupportMessage=======', res);
    if (res.success) {
      setButtonLoading(false);
      ToastAndroid.show(
        'Message updated successfully!',
        ToastAndroid.BOTTOM,
        ToastAndroid.SHORT,
      );
      navigation.goBack();
    } else {
      ToastAndroid.show(
        'Opps! Something went wrong',
        ToastAndroid.BOTTOM,
        ToastAndroid.SHORT,
      );
      setButtonLoading(false);
    }
  };

  const submit = () => {
    if (validateForm()) {
      if (editChatData) {
        handleEditSupportMessage();
      } else {
        handleAddSupportMessage();
      }
    }
  };
  return (
    <AppContainer>
      <AppHeader
        isDrawer={false}
        screen={editChatData ? 'Edit Quick Chat' : 'Add Quick Chat'}
      />
      <View>
        <AppTextInputBottomLine
          autoFocus={inputAutoFocus}
          style={{with: '80%'}}
          labelText="Message"
          placeholder="Enter Message"
          value={message}
          onChangeText={setMessage}
          maxLength={100}
          validationError={messageError}
        />
      </View>
      <AppPrimaryButton
        onPress={() => submit()}
        buttonLoading={buttonLoading}
        height={50}
        title={'SUBMIT'}
        mainContainerStyle={{
          borderRadius: 0,
          position: 'absolute',
          bottom: 0,
        }}
        style={{borderRadius: 0}}
      />
    </AppContainer>
  );
};

export default AddQuickChat;

const styles = StyleSheet.create({});
