import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AppText from '../libComponents/AppText';
import {AppColors} from '../utils/constants';

const PerformanceCard = ({
  heading = '',
  ratingPercentage = 10,
  rating = 0,
  chatTime = 0,
  callTime = 0,
}) => {
  return (
    <>
      <View
        style={{
          paddingVertical: 20,
          backgroundColor: AppColors.white,
          width: '100%',
          marginTop: 15,
          borderRadius: 10,
          elevation: 6,
          paddingHorizontal: 10,
        }}>
        <AppText style={{fontWeight: '700', fontSize: 15}}>{heading}</AppText>

        <View
          style={{
            height: '100%',
            height: 17,
            backgroundColor: 'green',
            borderRadius: 20,
            marginTop: 10,
            justifyContent: 'center',
          }}>
          <View
            style={{
              height: '100%',
              width: '66%',
              justifyContent: 'center',
              backgroundColor: AppColors.yellow,
              borderTopLeftRadius: 20,
              borderBottomLeftRadius: 20,
            }}>
            <View
              style={{
                height: '100%',
                width: '50%',
                backgroundColor: AppColors.red,
                borderTopLeftRadius: 20,
                borderBottomLeftRadius: 20,
              }}></View>
          </View>
        </View>

        <View
          style={{
            height: '100%',
            height: 20,
            justifyContent: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 5,
          }}>
          <AppText style={{fontSize: 13, fontWeight: '600'}}>0.0</AppText>
          <AppText style={{fontSize: 13, fontWeight: '600'}}>1.0</AppText>
          <AppText style={{fontSize: 13, fontWeight: '600'}}>2.0</AppText>
          <AppText style={{fontSize: 13, fontWeight: '600'}}>3.0</AppText>
          <AppText style={{fontSize: 13, fontWeight: '600'}}>4.0</AppText>
          <AppText style={{fontSize: 13, fontWeight: '600'}}>5.0</AppText>
        </View>
        <View
          style={{
            height: 1,
            backgroundColor: AppColors.dark_gray,
            marginVertical: 10,
          }}></View>
        <View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <AppText style={{fontWeight: '700', fontSize: 14.5}}>
              Your score
            </AppText>
            <AppText style={{fontWeight: '700', fontSize: 14.5}}>
              {rating?.toFixed(1)}
            </AppText>
          </View>
          <View
            style={{
              height: '100%',
              width: '100%',
              height: 17,
              backgroundColor: AppColors.gray,
              borderRadius: 20,
              marginTop: 10,
              justifyContent: 'center',
            }}>
            <View
              style={{
                height: '100%',
                width: `${ratingPercentage}%`,
                backgroundColor:
                  ratingPercentage < 33
                    ? AppColors.red
                    : ratingPercentage > 33 && ratingPercentage < 66
                    ? AppColors.yellow
                    : ratingPercentage > 66
                    ? 'green'
                    : 'gray',
                borderRadius: 20,
              }}></View>
          </View>
          {/* <AppText
            style={{
              fontWeight: '500',
              fontSize: 14,
              marginTop: 8,
              textAlign: 'justify',
            }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            vel justo at eros commodo facilisis. Duis vel felis nec justo
            ultricies bibendum. Donec consequat libero et elit mollis, nec
            suscipit tortor pharetra.
          </AppText> */}
          <View style={{marginTop: 5, gap: 5}}>
            <AppText
              style={{
                fontWeight: '800',
                fontSize: 14,
                marginTop: 5,
                color: AppColors.dark_gray,
              }}>
              {/* Rank : 7028 */}
              Total Call Time : {callTime.toFixed()} min
            </AppText>
            <AppText
              style={{
                fontWeight: '800',
                fontSize: 14,
                marginTop: 5,
                color: AppColors.dark_gray,
              }}>
              {/* Rank : 7028 */}
              Total Chat Time : {chatTime.toFixed()} min
            </AppText>
          </View>
        </View>
      </View>
    </>
  );
};

export default PerformanceCard;

const styles = StyleSheet.create({});
