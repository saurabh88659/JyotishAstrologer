import {
  StyleSheet,
  View,
  FlatList,
  RefreshControl,
  Image,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useId, useState} from 'react';
import AppContainer from '../../../libComponents/AppContainer';
import AppStatusBar from '../../../libComponents/AppStatusBar';
import AppHeader from '../../../libComponents/AppHeader';
import AppLoder from '../../../libComponents/AppLoader';
import {AppColors, routes} from '../../../utils/constants';
import AppText from '../../../libComponents/AppText';
import {TouchableOpacity} from 'react-native-gesture-handler';

import moment from 'moment';
import {useIsFocused} from '@react-navigation/native';
import {
  getCallHistory,
  getChatHistory,
} from '../../../base/features/MainApiServices/MainApiServices';
import {useSelector} from 'react-redux';
import {BASE_URL} from '../../../base/commonServices';
const CallHistory = ({navigation}) => {
  const [screenLoading, setScreenLoading] = React.useState(false);
  const userData = useSelector(state => state.auth.userData);
  const [callHistoryData, setCallHistoryData] = useState([]);
  const [refresh, setefresh] = useState(false);
  const isFocused = useIsFocused();
  const [colors] = useState([
    '#ff6347',
    '#ffa500',
    '#00ced1',
    '#4682b4',
    '#800080',
  ]);

  useEffect(() => {
    if (userData) {
      handleGetCallHistory();
    }
  }, [userData]);

  const handleGetCallHistory = async () => {
    setScreenLoading(true);
    const res = await getCallHistory(userData.id);
    // console.log('res of getCallHistory==', res.data);
    if (res.success) {
      setScreenLoading(false);
      setCallHistoryData(res.data);
    } else {
      setScreenLoading(false);
      setCallHistoryData([]);
    }
  };

  const onRefresh = async () => {
    setefresh(true);
    const res = await getChatHistory(userData.id);
    if (res.success) {
      setefresh(false);
      setCallHistoryData(res.data);
    } else {
      setefresh(false);
      setCallHistoryData([]);
    }
  };

  const ChatHistoryCard = ({item, index}) => {
    console.log('item---', item);
    return (
      <TouchableOpacity
        disabled={true}
        // onPress={() =>
        //   navigation.navigate(routes.particular_Chat_History, {user: item})
        // }
        activeOpacity={0.9}
        key={index}
        style={{
          width: '100%',
          elevation: 6,
          backgroundColor: AppColors.white,
          borderRadius: 10,
          marginTop: 10,
          paddingHorizontal: 10,
          paddingVertical: 20,
          flexDirection: 'row',
          alignItems: 'center',
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
          {item.user.profile_picture ? (
            <Image
              resizeMode="contain"
              source={{uri: BASE_URL + item.user.profile_picture}}
              style={{height: 60, width: 60, borderRadius: 30}}
            />
          ) : (
            <AppText
              style={{
                fontSize: 30,
                color: AppColors.white,
                fontWeight: '800',
              }}>
              {item?.user?.full_name?.charAt(0)?.toUpperCase() || 'J'}
            </AppText>
          )}
        </View>
        <View>
          <AppText style={{fontWeight: 'bold', fontSize: 17}}>
            {item?.user?.full_name || '-'}
          </AppText>
          <AppText style={{opacity: 0.7, fontSize: 14}}>
            {moment(item.started_at).format('DD MMM YYYY hh:mm A') || '-'}
          </AppText>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <AppContainer>
      <AppStatusBar />
      <AppHeader isDrawer={false} screen={'Call History'} />
      {screenLoading ? (
        <AppLoder />
      ) : (
        <>
          {callHistoryData.length > 0 ? (
            <FlatList
              contentContainerStyle={{
                paddingHorizontal: 12,
                paddingBottom: '17%',
              }}
              data={callHistoryData}
              renderItem={ChatHistoryCard}
              keyExtractor={item => item.toString()}
              refreshControl={
                <RefreshControl
                  refreshing={refresh}
                  onRefresh={() => onRefresh()}
                />
              }
            />
          ) : (
            <View style={styles.noDatContainer}>
              <AppText style={styles.noDataText}>No history available!</AppText>
            </View>
          )}
        </>
      )}
    </AppContainer>
  );
};

export default CallHistory;

const styles = StyleSheet.create({
  followerCountContainer: {
    backgroundColor: AppColors.skyBlue,
    width: '100%',
    alignItems: 'center',
    paddingVertical: 5,
  },
  noDatContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  noDataText: {
    fontWeight: '600',
    color: AppColors.dark_gray,
    fontSize: 18,
  },
});
