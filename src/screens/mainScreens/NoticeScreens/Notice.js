import {StyleSheet, Text, View, RefreshControl} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getNoticeData} from '../../../base/features/MainApiServices/MainApiServices';
import AppContainer from '../../../libComponents/AppContainer';
import AppStatusBar from '../../../libComponents/AppStatusBar';
import AppHeader from '../../../libComponents/AppHeader';
import {FlatList} from 'react-native';
import {AppColors} from '../../../utils/constants';
import moment from 'moment';
import AppLoder from '../../../libComponents/AppLoader';
import AppText from '../../../libComponents/AppText';
import {useIsFocused} from '@react-navigation/native';

const Notice = () => {
  const [noticeData, setNoticeData] = useState([1]);
  const [screenLoading, setScreenLoading] = React.useState(false);
  const [refresh, setefresh] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      handleGetNoticeData();
    }
  }, [isFocused]);

  const handleGetNoticeData = async () => {
    setScreenLoading(true);
    const res = await getNoticeData();
    console.log('res of setScreenLoading========', res.data);
    if (res.success) {
      setScreenLoading(false);
      setNoticeData(res.data);
    } else {
      setScreenLoading(false);
      setNoticeData([]);
    }
  };

  const onRefresh = async () => {
    setefresh(true);
    const res = await getNoticeData();
    console.log('res of getNoticeData==', res.data);
    if (res.success) {
      setefresh(false);
      setNoticeData(res.data);
    } else {
      setefresh(false);
      setNoticeData([]);
    }
  };

  const NoticeCard = ({item, index}) => {
    console.log('item of notice--', item);
    return (
      <View key={index} style={styles.noticeCardContainer}>
        <View style={{paddingHorizontal: 15}}>
          <Text style={styles.heading} numberOfLines={1}>
            {item?.head || 'Request for chat'}
          </Text>
          <Text style={styles.message}>{item?.message || 'hello'}</Text>
          <Text style={styles.time}>
            {moment(item?.created_at).format('D MMM, YYYY, h:mm A')}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <AppContainer>
      <AppStatusBar />
      <AppHeader screen={'Notice'} />

      {screenLoading ? (
        <AppLoder />
      ) : noticeData.length > 0 ? (
        <FlatList
          contentContainerStyle={{paddingBottom: '60%'}}
          data={noticeData}
          renderItem={NoticeCard}
          keyExtractor={(item, index) => index.toString()}
          refreshControl={
            <RefreshControl
              refreshing={refresh}
              onRefresh={() => onRefresh()}
            />
          }
        />
      ) : (
        <View style={styles.noDatContainer}>
          <AppText style={styles.noDataText}>No Data found!</AppText>
        </View>
      )}
    </AppContainer>
  );
};

export default Notice;

const styles = StyleSheet.create({
  noticeCardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 15,
    paddingTop: 10,
    width: '100%',
    borderBottomWidth: 0.2,
    borderBottomColor: AppColors.dark_gray,
    marginTop: 5,
  },
  heading: {
    color: AppColors.black,
    fontSize: 16,
    fontWeight: 'bold',
    opacity: 0.8,
  },
  message: {
    color: AppColors.black,
    fontSize: 15,
    opacity: 0.7,
  },
  time: {
    color: AppColors.dark_gray,
    fontSize: 12,
    marginTop: 4,
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
