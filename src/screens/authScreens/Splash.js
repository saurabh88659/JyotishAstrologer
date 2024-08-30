import {Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AppText from '../../libComponents/AppText';
import AppContainer from '../../libComponents/AppContainer';
import {AppColors, CONSTANTS_ASYNC, routes} from '../../utils/constants';
import * as Animatable from 'react-native-animatable';
import {useDispatch} from 'react-redux';
import {setLoggedIn, setUserData} from '../../redux/auth.reducer';
import {legacy_createStore} from '@reduxjs/toolkit';
import AppStatusBar, {StatusBarStyle} from '../../libComponents/AppStatusBar';
import {getOfflineData} from '../../base/commonServices';
import useAuthApiServices from '../../base/customHooks/useAuthApiServices';

const Splash = ({navigation}) => {
  const dispatch = useDispatch();
  const {getProfile} = useAuthApiServices();

  const handeGetProfile = async () => {
    const res = await getProfile();
    console.log('res of handle Splash---------------------------------', res);
    if (res.success) {
      if (res.data?.data?.charges_per_min) {
        if (res.data?.data?.is_verified) {
          dispatch(setLoggedIn(true));
          dispatch(setUserData(res.data.data));
        } else {
          dispatch(setLoggedIn(false));
          navigation.replace(routes.UnderReview_Screen);
        }
      } else {
        dispatch(setLoggedIn(false));
        navigation.replace(routes.Create_Profile);
      }
    } else {
      dispatch(setLoggedIn(false));
      navigation.replace(routes.login);
    }
  };

  const checkLogin = async e => {
    const token = await getOfflineData(CONSTANTS_ASYNC.TOKEN);
    console.log('token', token);
    if (token) {
      handeGetProfile();
    } else {
      dispatch(setLoggedIn(false));
      navigation.replace(routes.login);
    }
  };

  return (
    <AppContainer
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: AppColors.lightYellow,
      }}>
      <AppStatusBar
        backgroundColor={AppColors.lightYellow}
        barStyle={StatusBarStyle.dark_content}
      />
      <Animatable.View
        animation="zoomIn"
        delay={100}
        duration={800}
        onAnimationEnd={e => checkLogin(e)}>
        <Image
          style={{height: 200, width: 200}}
          source={require('../../assets/Images/jyotishLogo.png')}
        />
      </Animatable.View>
    </AppContainer>
  );
};

export default Splash;
const styles = StyleSheet.create({});
