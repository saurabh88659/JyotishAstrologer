import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AppStatusBar, {StatusBarStyle} from '../../libComponents/AppStatusBar';
import {AppColors} from '../../utils/constants';
import LottieView from 'lottie-react-native';

const NoInternetScreen = () => {
  return (
    <View
      style={{
        height: '100%',
        backgroundColor: AppColors.white,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <AppStatusBar
        backgroundColor={AppColors.white}
        barStyle={StatusBarStyle.dark_content}
      />
      <LottieView
        source={require('../../assets/Lottie/noInternet.json')}
        autoPlay
        loop={true}
        style={{
          height: '28%',
          width: '100%',
        }}
      />
      <Text
        style={{
          fontSize: 18,
          fontWeight: '500',
          color: '#000',
        }}>
        No Internet Connection
      </Text>
    </View>
  );
};

export default NoInternetScreen;
const styles = StyleSheet.create({});
