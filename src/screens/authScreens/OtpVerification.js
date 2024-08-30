import {StyleSheet, Text, View, ToastAndroid} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import AppContainer from '../../libComponents/AppContainer';
import AppPrimaryButton from '../../libComponents/AppPrimaryButton';
import {
  CodeField,
  Cursor,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {AppColors, CONSTANTS_ASYNC, routes} from '../../utils/constants';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {setLoggedIn} from '../../redux/auth.reducer';
import AppStatusBar from '../../libComponents/AppStatusBar';
import useAuthApiServices from '../../base/customHooks/useAuthApiServices';
import {setOfflineData} from '../../base/commonServices';
import AppText from '../../libComponents/AppText';
import {TouchableOpacity} from 'react-native-gesture-handler';

const OtpVerification = ({navigation, route}) => {
  const {verifyAuthOtp, resendAuthOtp} = useAuthApiServices();
  const number = route.params?.number;
  const [buttonLoading, setButtonLoading] = useState(false);
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({});
  const [otp, setOtp] = useState('');
  const isFocused = useIsFocused();
  const codeInputRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isFocused) {
      codeInputRef?.current?.focus();
    }
  }, [isFocused]);

  const handleVerifyAuthOtp = async () => {
    setButtonLoading(true);
    const payloadData = {
      phone_no: `+91${number}`,
      otp: otp,
    };
    const res = await verifyAuthOtp(payloadData);
    console.log('res of handleVerifyAuthOtp===========', JSON.stringify(res));
    if (res.success) {
      if (res.data?.astrologer_profile?.years_of_experience) {
        if (res.data?.astrologer_profile?.is_verified) {
          dispatch(setLoggedIn(true));
          await setOfflineData(CONSTANTS_ASYNC.TOKEN, res.data.access);
          await setOfflineData(CONSTANTS_ASYNC.REFRESH_TOKEN, res.data.refresh);
          setButtonLoading(false);
        } else {
          navigation.replace(routes.UnderReview_Screen);
          setButtonLoading(false);
        }
      } else {
        // just  true for testin-------
        // dispatch(setLoggedIn(true));
        await setOfflineData(CONSTANTS_ASYNC.TOKEN, res.data.access);
        await setOfflineData(CONSTANTS_ASYNC.REFRESH_TOKEN, res.data.refresh);
        setButtonLoading(false);
        navigation.replace(routes.Create_Profile);
      }
    } else {
      ToastAndroid.show(
        'Oops! OTP mismatch. Try again.',
        ToastAndroid.BOTTOM,
        ToastAndroid.SHORT,
      );
      setButtonLoading(false);
    }
  };

  const handleResendAuthOtp = async () => {
    const data = {
      phone_no: `+91${number}`,
    };
    const res = await resendAuthOtp(data);
    console.log('reso od hande handleResendAuthOtp', res);
    if (res.success) {
      ToastAndroid.show(
        'New OTP sent successfully!',
        ToastAndroid.BOTTOM,
        ToastAndroid.SHORT,
      );
    } else {
      ToastAndroid.show(
        'Failed to send OTP. Please try again.',
        ToastAndroid.BOTTOM,
        ToastAndroid.SHORT,
      );
    }
  };

  return (
    <AppContainer>
      <AppStatusBar backgroundColor={AppColors.white} />
      <View style={{paddingHorizontal: 20, marginTop: '10%'}}>
        <View style={{marginTop: 20, marginBottom: 40}}>
          <Text style={styles.texting3}>Verification</Text>
          <Text style={styles.texting2}>
            We've send an OTP to your Mobile Number
          </Text>
          <Text style={styles.texting4}>+91 ******{number.slice(6, 10)}</Text>
        </View>
        <CodeField
          ref={codeInputRef}
          value={otp}
          onChangeText={text => setOtp(text)}
          cellCount={6}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({index, symbol, isFocused}) => (
            <Text
              key={index}
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />

        <View
          style={{flexDirection: 'row', marginTop: '7%', alignSelf: 'center'}}>
          <AppText style={{}}>Didn't get OTP? </AppText>
          <TouchableOpacity onPress={handleResendAuthOtp}>
            <AppText
              style={{
                color: AppColors.primary,
                textDecorationLine: 'underline',
              }}>
              Cick to resend{' '}
            </AppText>
          </TouchableOpacity>
        </View>

        <AppPrimaryButton
          height={50}
          mainContainerStyle={{marginTop: '15%'}}
          buttonLoading={buttonLoading}
          onPress={handleVerifyAuthOtp}
          title="Verify"
        />
      </View>
    </AppContainer>
  );
};

export default OtpVerification;

const styles = StyleSheet.create({
  cell: {
    width: 50,
    height: 50,
    fontSize: 20,
    borderWidth: 2,
    borderColor: AppColors.black,
    color: AppColors.black,
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: 14,
    paddingTop: 10,
    fontWeight: 'bold',
  },
  focusCell: {
    borderColor: AppColors.primary,
  },
  codeFieldRoot: {
    marginTop: 1,
  },
  texting2: {
    fontSize: 15,
    textAlign: 'center',
    color: AppColors.black,
    marginBottom: 10,
    marginTop: 10,
  },

  texting4: {
    fontSize: 18,
    textAlign: 'center',
    color: AppColors.black,
  },
  texting3: {
    fontSize: 26,
    textAlign: 'center',
    fontWeight: 'bold',
    color: AppColors.black,
    justifyContent: 'center',
  },
});
