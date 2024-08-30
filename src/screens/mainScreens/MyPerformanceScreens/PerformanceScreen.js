import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppContainer from '../../../libComponents/AppContainer';
import AppHeader from '../../../libComponents/AppHeader';
import AppStatusBar from '../../../libComponents/AppStatusBar';
import AppText from '../../../libComponents/AppText';
import AppButton from '../../../libComponents/AppButton';
import {AppColors} from '../../../utils/constants';
import AppIcon, {Icons} from '../../../libComponents/AppIcon';
import PerformanceCard from '../../../components/PerformanceCard';
import {getPerformance} from '../../../base/features/MainApiServices/MainApiServices';
import {locale} from 'moment';
import AppLoder from '../../../libComponents/AppLoader';
import {useSelector} from 'react-redux';

const PerformanceScreen = () => {
  const [performanceData, setPerformanceData] = useState('');
  const [screenLoading, setScreenLoading] = useState('');
  const userData = useSelector(state => state.auth.userData);

  useEffect(() => {
    if (userData) {
      hanldeGetPErformance();
    }
  }, [userData]);

  const hanldeGetPErformance = async () => {
    setScreenLoading(true);
    const res = await getPerformance(userData.id);
    console.log('res of getPerformance', res.data);
    if (res.success) {
      setPerformanceData(res.data);
      setScreenLoading(false);
    } else {
      setPerformanceData('');
      setScreenLoading(false);
    }
  };

  if (screenLoading) {
    return <AppLoder />;
  }
  return (
    <AppContainer>
      <AppHeader isDrawer={false} screen={'Performance Dashboard'} />
      <AppStatusBar />
      <ScrollView
        contentContainerStyle={{paddingHorizontal: 15, alignItems: 'center'}}
        showsVerticalScrollIndicator={false}>
        {/* <AppText
          style={{
            fontSize: 18,
            textAlign: 'center',
            paddingVertical: 10,
            fontWeight: '700',
          }}>
          Performance Dashboard
        </AppText> */}

        <TouchableOpacity
          activeOpacity={1}
          style={{
            width: '70%',
            height: 50,
            backgroundColor: AppColors.primary,
            borderRadius: 15,
            // justifyContent: 'space-between',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            paddingHorizontal: 12,
            marginTop: '5%',
          }}>
          <AppText
            style={{
              color: AppColors.white,
              fontWeight: '600',
              fontSize: 16,
              marginLeft: 5,
            }}>
            {/* Last 30 days availability */}
            Performance Dashboard
          </AppText>
          {/* <AppIcon
            type={Icons.Feather}
            name="chevron-right"
            color={AppColors.white}
          /> */}
        </TouchableOpacity>
        {/* //-----------------------------profile performance----------------------------------- */}
        {/* -----1st card-- */}
        <View style={{marginVertical: 20, marginBottom: 10, width: '100%'}}>
          <AppText style={{fontWeight: '900', fontSize: 17}}>
            Profile Performance
          </AppText>
          <PerformanceCard
            ratingPercentage={(performanceData.average_rating * 100) / 5}
            heading="Average rating"
            rating={performanceData?.average_rating}
            chatTime={performanceData.total_chat_minutes}
            callTime={performanceData.total_call_minutes}
          />
          {/* <PerformanceCard
            ratingPercentage={25}
            heading="Average rating Call"
          />
          <PerformanceCard
            ratingPercentage={25}
            heading="Average rating Call"
          /> */}
        </View>

        {/* -----2nd card-- */}
        {/* <View style={{marginVertical: 20, marginBottom: 10}}>
          <AppText style={{fontWeight: '900', fontSize: 17}}>
            PO Performance
          </AppText>
          <PerformanceCard ratingPercentage={100} heading="PO rating" />
          <PerformanceCard ratingPercentage={40} heading="PO retention %" />
        </View> */}
        {/* <PerformanceCard /> */}
        {/* //-----------------------------profile performance----------------------------------- */}
      </ScrollView>
    </AppContainer>
  );
};

export default PerformanceScreen;
