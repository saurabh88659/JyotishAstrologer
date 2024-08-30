import {StyleSheet, Text, View, Switch} from 'react-native';
import React, {useState} from 'react';
import AppText from '../libComponents/AppText';
import {AppColors} from '../utils/constants';

const OfferCard = () => {
  // const [Isoffer, setIsOffer] = useState(true);
  return (
    <View
      style={{
        width: '100%',
        paddingBottom: 15,
        paddingTop: 10,
        elevation: 6,
        backgroundColor: AppColors.white,
        marginTop: 15,
        borderRadius: 6,
      }}>
      <View style={{paddingHorizontal: 15}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <AppText
            style={[
              styles.cardText,
              {fontWeight: 'bold', color: AppColors.black},
            ]}>
            Offer Name :{' '}
            <AppText
              style={[
                styles.cardText,
                {fontWeight: 'bold', color: AppColors.secondary},
              ]}>
              75% Offer
            </AppText>
          </AppText>
          <Switch
            trackColor={{false: '#767577', true: 'green'}}
            thumbColor={true ? '#f4f3f4' : '#f4f3f4'}
            //   ios_backgroundColor="#3e3e3e"
            // onValueChange={() => setIsOffer(!Isoffer)}
            // value={Isoffer}
          />
        </View>

        <AppText
          style={[
            styles.cardText,
            {fontWeight: 'bold', color: AppColors.black},
          ]}>
          Display Name :{' '}
          <AppText
            style={[styles.cardText, {fontWeight: 'bold', color: 'green'}]}>
            75% off
          </AppText>
        </AppText>

        {/* <AppText style={[styles.cardText, {fontWeight: 'bold'}]}>
          User Type :{' '}
          <AppText
            style={[styles.cardText, {fontWeight: 'bold', color: 'green'}]}>
            New Users
          </AppText>
        </AppText> */}

        <AppText style={[styles.cardText, {fontWeight: 'bold'}]}>
          Percentage off :{' '}
          <AppText
            style={[styles.cardText, {fontWeight: 'bold', color: 'green'}]}>
            New Users
          </AppText>
        </AppText>
        {/* <AppText
          style={[
            styles.cardText,
            {fontWeight: 'bold', color: AppColors.black},
          ]}>
          India : My Share : ₹4.5 | At Share ₹4.5
        </AppText> */}
      </View>

      {/* <View
        style={{
          height: 0.4,
          width: '100%',
          backgroundColor: AppColors.dark_gray,
          marginTop: 7,
        }}></View>

      <View style={{paddingHorizontal: 15}}>
        <AppText style={[styles.cardText, {fontWeight: 'bold'}]}>
          User Type :{' '}
          <AppText
            style={[styles.cardText, {fontWeight: 'bold', color: 'green'}]}>
            Loyal Users
          </AppText>
        </AppText>
        <AppText
          style={[
            styles.cardText,
            {fontWeight: 'bold', color: AppColors.black},
          ]}>
          India : My Share : ₹5.5 | At Share ₹5.5
        </AppText>
      </View> */}
    </View>
  );
};

export default OfferCard;

const styles = StyleSheet.create({
  cardText: {
    marginTop: 5,
    fontSize: 15,
  },
});
