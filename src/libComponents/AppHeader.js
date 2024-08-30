import {StyleSheet, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {AppColors} from '../utils/constants';
import AppText from './AppText';
import AppIcon, {Icons} from './AppIcon';

const AppHeader = ({
  isDrawer = true,
  screen,
  isIcon = true,
  isTimer = false,
}) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        width: '100%',
        backgroundColor: AppColors.lightYellow,
        flexDirection: 'row',
        elevation: 2,
        paddingHorizontal: 15,
        height: 55,
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}>
      {isIcon &&
        (isDrawer ? (
          <TouchableOpacity
            onPress={() => navigation.toggleDrawer()}
            style={{
              height: '100%',
              width: 30,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 10,
            }}>
            <AppIcon
              type={Icons.FontAwesome}
              name={'bars'}
              color={AppColors.black}
              size={21}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              height: '100%',
              width: 30,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 10,
            }}>
            <AppIcon
              type={Icons.AntDesign}
              name={'arrowleft'}
              color={AppColors.black}
              size={22}
            />
          </TouchableOpacity>
        ))}
      <AppText
        style={{
          color: AppColors.black,
          fontSize: 19,
          fontWeight: 'bold',
        }}>
        {screen}
      </AppText>
      {isTimer}
    </View>
  );
};
export default AppHeader;

const styles = StyleSheet.create({});
