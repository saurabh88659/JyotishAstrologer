import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {AppColors} from '../utils/constants';
import AppText from '../libComponents/AppText';
import moment from 'moment';
import {formatToRupees} from '../utils/CommonFun';

const WalletPaymentDetailsCard = ({item}) => {
  console.log('item---', item);
  return (
    <View
      style={{
        backgroundColor: AppColors.white,
        marginTop: 15,
        elevation: 6,
        paddingHorizontal: 12,
        paddingVertical: 10,
      }}>
      {/* <AppText style={{marginBottom: 3, color: AppColors.primary}}>
        Chat
      </AppText> */}
      <AppText style={{color: AppColors.dark_gray, marginBottom: 3}}>
        #79173173
      </AppText>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 3,
        }}>
        <AppText style={{fontSize: 15, width: '60%'}}>
          Chat with {item?.user?.full_name} for 3 mintues
        </AppText>
        <AppText style={{color: 'green'}}>
          +{formatToRupees(item.astro_charge)}
        </AppText>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 3,
        }}>
        <AppText style={{width: 150}}>UserId : 41577226</AppText>
        <AppText style={{color: AppColors.dark_gray}}>
          {moment(item.created_at).format('DD MMM YY, hh:mm A')}
          {/* 24 apr 24,02:16 PM */}
        </AppText>
      </View>
    </View>
  );
};

export default WalletPaymentDetailsCard;
const styles = StyleSheet.create({});
