import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {AppColors} from '../utils/constants';
import AppText from '../libComponents/AppText';
import AppPrimaryButton from '../libComponents/AppPrimaryButton';

const WaitingCard = ({OnStarSession, data}) => {
  return (
    <View
      style={{
        width: '100%',
        borderBottomWidth: 0.5,
        paddingBottom: 15,
        paddingHorizontal: 15,
        borderBottomColor: AppColors.dark_gray,
        paddingTop: 10,
      }}>
      <AppText
        style={[
          styles.cardText,
          {fontWeight: 'bold', color: AppColors.secondary},
        ]}>
        New(Indian)
      </AppText>
      {/* <AppText
        style={[
          styles.cardText,
          {fontWeight: 'bold', color: AppColors.darkYellow},
        ]}>
        India
      </AppText> */}

      <AppText style={[styles.cardText, {fontWeight: 'bold'}]}>
        {/* Pooja (Id : 22049506) */}
        {/* Pooja (Id : 22049506) */}
        {data?.user_details?.full_name}
      </AppText>
      <AppText
        style={[
          styles.cardText,
          {fontWeight: 'bold', color: AppColors.dark_gray},
        ]}>
        01 Nov 23, 07:32 PM
      </AppText>
      <AppText style={[styles.cardText, {fontWeight: 'bold'}]}>
        Type - CHAT
      </AppText>
      {/* <AppText style={[styles.cardText, {fontWeight: 'bold'}]}>
        Token No - 1
      </AppText> */}
      <AppText
        style={[
          styles.cardText,
          {fontWeight: 'bold', color: AppColors.darkYellow},
        ]}>
        Status - WAITING
      </AppText>
      <AppText style={[styles.cardText, {fontWeight: 'bold'}]}>
        Duration : 5 mins
      </AppText>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 25,
        }}>
        <AppPrimaryButton
          width={'40%'}
          height={44}
          // buttonLoading={buttonLoading}
          title="User Details"
        />
        <AppPrimaryButton
          onPress={() => OnStarSession()}
          width={'53%'}
          height={44}
          buttonLoading={false}
          title="Start Offline Session"
        />
      </View>
    </View>
  );
};

export default WaitingCard;

const styles = StyleSheet.create({
  cardText: {
    marginTop: 5,
    fontSize: 15,
  },
});
