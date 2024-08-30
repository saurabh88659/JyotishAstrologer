import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import React, {createContext, useEffect, useRef, useState} from 'react';
import logo from '../../assets/Images/jyotishLogo.png';
import AppText from '../../libComponents/AppText';
import AppContainer from '../../libComponents/AppContainer';
import AppButton from '../../libComponents/AppButton';
import AppTextInput from '../../libComponents/AppTextInput';
import {AppColors, keyboardType, routes} from '../../utils/constants';
import AppPrimaryButton from '../../libComponents/AppPrimaryButton';
import {useIsFocused} from '@react-navigation/native';
import AppStatusBar from '../../libComponents/AppStatusBar';
import useAuthApiServices from '../../base/customHooks/useAuthApiServices';

export const loginContext = createContext();
const Login = ({navigation}) => {
  const [buttonLoading, setButtonLoading] = useState(false);
  const [number, setNumber] = useState('');
  const [numberError, setNumberError] = useState('');
  const [inputAutoFocus, setInputAutoFocus] = useState(true);
  const isFocused = useIsFocused();
  const inputRef = useRef();
  const {getAuthOtp} = useAuthApiServices();

  useEffect(() => {
    if (isFocused) {
      setInputAutoFocus(true);
      inputRef?.current?.focus();
    }
  }, [isFocused]);

  const validateForm = () => {
    let isValid = true;
    //Regex-----------------
    const numberRegex = /^[6-9]\d{9}$/;
    // Number Validation
    if (!number.trim()) {
      setNumberError('Number is required');
      isValid = false;
    } else if (!numberRegex.test(number)) {
      setNumberError('Please enter a valid Phone number');
      isValid = false;
    } else {
      setNumberError('');
    }
    return isValid;
  };

  const handleGetAuthOtp = async () => {
    if (validateForm()) {
      setButtonLoading(true);
      const payloadData = {
        phone_no: `+91${number}`,
        astrologer: true,
      };
      const res = await getAuthOtp(payloadData);
      // console.log('res of getAuthOtp====', res.success);
      if (res.success) {
        ToastAndroid.show(
          'OTP sent successfully!',
          ToastAndroid.BOTTOM,
          ToastAndroid.SHORT,
        );
        setButtonLoading(false);
        navigation.navigate(routes.Otp_Verification, {number});
      } else {
        ToastAndroid.show(
          'Failed to send OTP. Please try again',
          ToastAndroid.BOTTOM,
          ToastAndroid.SHORT,
        );
        // console.log('error of  get Otp--------', res);
        setButtonLoading(false);
      }
    }
  };

  return (
    <loginContext.Provider value={{name: 'hello'}}>
      <AppContainer style={{}}>
        <AppStatusBar backgroundColor={AppColors.white} />
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            alignItems: 'center',
            paddingHorizontal: 25,
            paddingBottom: 20,
          }}>
          <Image
            source={logo}
            style={{
              height: 180,
              width: 200,
              marginTop: 30,
              marginBottom: 50,
            }}
            // height={100}
          />
          {/* <AppText
          style={{
            fontSize: 28,
            textAlign: 'center',
            fontWeight: '700',
            // marginTop: 10,
            marginBottom: 25,
          }}>
          Jyotish
        </AppText> */}
          <AppTextInput
            ref={inputRef}
            autoFocus={inputAutoFocus}
            isNumber={true}
            value={number}
            onChangeText={text => setNumber(text)}
            placeholder={'Enter your phone number'}
            labelText="Phone number"
            style={styles.input}
            keyboardType={keyboardType.phonePad}
            validationError={numberError}
            maxLength={10}
          />
          <AppPrimaryButton
            height={50}
            buttonLoading={buttonLoading}
            mainContainerStyle={{marginTop: 20}}
            onPress={() => {
              handleGetAuthOtp();
            }}
            title="GET OTP"
          />
        </ScrollView>
      </AppContainer>
    </loginContext.Provider>
  );
};

export default Login;

const styles = StyleSheet.create({});
