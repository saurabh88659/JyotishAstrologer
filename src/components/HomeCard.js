import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {AppColors} from '../utils/constants';
import AppText from '../libComponents/AppText';
import {useSelector} from 'react-redux';
import AppIcon from '../libComponents/AppIcon';
import {useNavigation} from '@react-navigation/native';
import {Image} from 'react-native-animatable';

const HomeCard = ({data, isImage = false, source, onPress}) => {
  const isDark = useSelector(state => state.auth.isDark);
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={
        data?.ScreenName
          ? () => navigation?.navigate(data?.ScreenName)
          : onPress
      }
      activeOpacity={0.5}
      style={{
        height: 135,
        width: '32%',
        borderRadius: 15,
        backgroundColor: isDark ? AppColors.black : AppColors.white,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View style={{marginTop: -10, alignItems: 'center'}}>
        <View
          style={{
            height: 65,
            width: 65,
            backgroundColor: data?.backgroundColor,
            borderRadius: 35,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {isImage ? (
            <Image source={source} style={{height: '65%', width: '65%'}} />
          ) : (
            <AppIcon
              type={data?.IconType}
              name={data?.IconName}
              size={data.iconSize}
              color={AppColors.white}
            />
          )}
        </View>
        <AppText
          style={{
            marginTop: 5,
            fontWeight: 'bold',
            fontSize: 14,
            textAlign: 'center',
          }}>
          {data.label}
        </AppText>
      </View>
    </TouchableOpacity>
  );
};

export default HomeCard;

const styles = StyleSheet.create({});
