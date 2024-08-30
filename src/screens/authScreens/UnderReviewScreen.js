import {StyleSheet, View} from 'react-native';
import React from 'react';
import AppContainer from '../../libComponents/AppContainer';
import AppText from '../../libComponents/AppText';
import {AppColors} from '../../utils/constants';
import AppStatusBar from '../../libComponents/AppStatusBar';
import LottieView from 'lottie-react-native';

const UnderReviewScreen = () => {
  return (
    <AppContainer
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15,
      }}>
      <AppStatusBar backgroundColor={AppColors.white} />
      <LottieView
        source={require('../../assets/Lottie/underReview.json')}
        autoPlay
        loop={true}
        style={{
          height: '30%',
          width: '100%',
          marginTop: -50,
        }}
      />
      <AppText
        style={{
          color: AppColors.black,
          fontSize: 18,
          fontWeight: '800',
        }}>
        Your Applicaton is under review
      </AppText>

      <AppText
        style={{
          marginTop: 5,
          color: AppColors.dark_gray,
          fontSize: 13,
          textAlign: 'center',
        }}>
        We'll carefully review your application and aim to email you a response
        within 3-4 days
      </AppText>
    </AppContainer>
  );
};

export default UnderReviewScreen;
const styles = StyleSheet.create({});
