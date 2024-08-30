import {StyleSheet, View, FlatList, RefreshControl} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppContainer from '../../libComponents/AppContainer';
import AppText from '../../libComponents/AppText';
import {AppColors} from '../../utils/constants';
import FollowerDetailsCard from '../../components/FollowerDetailsCard';
import AppHeader from '../../libComponents/AppHeader';
import AppStatusBar from '../../libComponents/AppStatusBar';
import {getfollowers} from '../../base/features/MainApiServices/MainApiServices';
import AppLoder from '../../libComponents/AppLoader';

const Followers = () => {
  const [followers, setFollowers] = React.useState([]);
  const [screenLoading, setScreenLoading] = React.useState(false);
  const [refresh, setRefresh] = useState(false);

  const [colors] = useState([
    '#ff6347',
    '#ffa500',
    '#00ced1',
    '#4682b4',
    '#800080',
  ]);

  useEffect(() => {
    handleGetfollowers();
  }, []);

  const handleGetfollowers = async () => {
    setScreenLoading(true);
    const res = await getfollowers();
    // console.log('followers======55555555555555555555', res);
    if (res.success) {
      setScreenLoading(false);
      setFollowers(res.data.data);
    } else {
      setScreenLoading(false);
      setFollowers([]);
    }
  };

  const OnRefresh = async () => {
    setRefresh(true);
    const res = await getfollowers();
    if (res.success) {
      setRefresh(false);
      setFollowers(res.data.data);
    } else {
      setRefresh(false);
      setFollowers();
    }
  };

  return (
    <AppContainer>
      <AppStatusBar />
      <AppHeader isDrawer={false} screen={'My Followers'} />
      {screenLoading ? (
        <AppLoder />
      ) : (
        <>
          <View style={styles.followerCountContainer}>
            <AppText style={styles.followerText}>
              Number of followers : {followers.length}
            </AppText>
          </View>
          {Array.isArray(followers) && followers.length > 0 ? (
            <FlatList
              contentContainerStyle={{paddingHorizontal: 2, paddingBottom: 10}}
              data={followers}
              renderItem={FollowerDetailsCard}
              keyExtractor={item => item.toString()}
              refreshControl={
                <RefreshControl
                  refreshing={refresh}
                  onRefresh={() => OnRefresh()}
                />
              }
            />
          ) : (
            <View style={styles.noDatContainer}>
              <AppText style={styles.noDataText}>No followers found!</AppText>
            </View>
          )}
        </>
      )}
    </AppContainer>
  );
};

export default Followers;

const styles = StyleSheet.create({
  followerCountContainer: {
    backgroundColor: AppColors.primary,
    width: '100%',
    alignItems: 'center',
    paddingVertical: 5,
  },
  followerText: {
    color: AppColors.white,
    fontWeight: '700',
    fontSize: 14,
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
