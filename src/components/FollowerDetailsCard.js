import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import AppText from '../libComponents/AppText';
import {AppColors} from '../utils/constants';
import AppIcon, {Icons} from '../libComponents/AppIcon';
import {Icon} from 'react-native-vector-icons/Icon';
import moment from 'moment';

const FollowerDetailsCard = ({
  item,
  index,
  colors = ['#ff6347', '#ffa500', '#00ced1', '#4682b4', '#800080'],
}) => {
  // console.log('item-----111', item);
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        backgroundColor: AppColors.white,
        elevation: 6,
        borderRadius: 5,
        marginTop: 10,
        paddingHorizontal: 10,
      }}>
      <View
        style={{
          height: 60,
          width: 60,
          backgroundColor: colors[index % colors.length],
          borderRadius: 30,
          marginRight: 15,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <AppText
          style={{
            fontSize: 30,
            color: AppColors.white,
            fontWeight: '800',
          }}>
          {item.user_profile?.charAt(0)?.toUpperCase() || 'J'}
        </AppText>
        {/* <AppIcon
          type={Icons.Ionicons}
          // name="person-circle-sharp"
          name="person-circle-outline"
          size={65}
          color={AppColors.dark_gray}
        /> */}
      </View>
      <View>
        <AppText style={{fontWeight: 'bold'}}>
          {item.user_profile || ''}
        </AppText>
        <AppText style={{opacity: 0.7, fontSize: 14}}>
          {moment(item.created_at).format('DD MMM YYYY') || '='}
        </AppText>
      </View>
    </View>
  );
};

export default FollowerDetailsCard;

const styles = StyleSheet.create({});
