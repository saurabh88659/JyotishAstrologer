import {StyleSheet, View, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppContainer from '../../../libComponents/AppContainer';
import AppStatusBar from '../../../libComponents/AppStatusBar';
import AppHeader from '../../../libComponents/AppHeader';
import {AppColors} from '../../../utils/constants';
import AppLoder from '../../../libComponents/AppLoader';
import AppText from '../../../libComponents/AppText';
import {getReels} from '../../../base/features/MainApiServices/MainApiServices';
import YoutubePlayer from 'react-native-youtube-iframe';
import {extractYouTubeId} from '../../../utils/CommonFun';

export default function ViewAllTrainingReels() {
  const [screenLoading, setScreenLoading] = useState(false);
  const [reelData, setReelData] = useState([]);

  useEffect(() => {
    handletGetReels();
  }, []);

  const handletGetReels = async () => {
    setScreenLoading(true);
    const res = await getReels();
    console.log('res of handletGetReels ', res.data);
    if (res.success) {
      setScreenLoading(false);
      setReelData(res.data.data);
    } else {
      setScreenLoading(false);
      setReelData([]);
    }
  };

  return (
    <AppContainer>
      <AppStatusBar />
      <AppHeader isDrawer={false} screen={'Training Reels'} />
      {screenLoading ? (
        <AppLoder />
      ) : reelData.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flatListContainer}
          data={reelData}
          renderItem={({item, index}) => {
            console.log('item', item);
            const videoId = extractYouTubeId(item.video);
            return (
              <View style={styles.videoContainer}>
                <YoutubePlayer
                  height={230}
                  width={'100%'}
                  play={false}
                  forceAndroidAutoplay={false}
                  videoId={videoId}
                  mute={true}
                />
                <AppText
                  style={{
                    color: AppColors.white,
                    paddingHorizontal: 5,
                    marginTop: 5,
                  }}>
                  {item?.title || ''}
                </AppText>
              </View>
            );
          }}
          keyExtractor={item => item.toString()}
          // refreshControl={
          //   <RefreshControl
          //    refreshing={refresh}
          //    onRefresh={() => OnRefresh()}
          //   />
          // }
        />
      ) : (
        <View style={styles.noDatContainer}>
          <AppText style={styles.noDataText}>
            No training reels available
          </AppText>
          <AppText style={styles.noDataText2}>Please check back later!</AppText>
        </View>
      )}
    </AppContainer>
  );
}

const styles = StyleSheet.create({
  noDatContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  flatListContainer: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    backgroundColor: AppColors.black,
  },

  noDataText: {
    fontWeight: '600',
    color: AppColors.dark_gray,
    fontSize: 18,
    textAlign: 'center',
  },
  noDataText2: {
    color: AppColors.dark_gray,
    fontSize: 16,
    textAlign: 'center',
  },
  videoContainer: {
    gap: 5,
    paddingVertical: 5,
    marginTop: 20,
    backgroundColor: AppColors.black,
  },
});
