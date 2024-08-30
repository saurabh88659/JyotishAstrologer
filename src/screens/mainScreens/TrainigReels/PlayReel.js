import {
  ActivityIndicator,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppHeader from '../../../libComponents/AppHeader';
import AppStatusBar from '../../../libComponents/AppStatusBar';
import AppContainer from '../../../libComponents/AppContainer';
import Video from 'react-native-video';
import {AppColors} from '../../../utils/constants';
import {WebView} from 'react-native-webview';
import YoutubePlayer from 'react-native-youtube-iframe';
import AppLoder from '../../../libComponents/AppLoader';

const PlayReel = ({navigation, route}) => {
  const reelData = route?.params?.reelData;
  const [error, setError] = useState(null);
  const [isOnBuffer, setIsOnBuffer] = useState(false);
  const [screenLoading, setScreenLoading] = useState(false);
  useEffect(() => {
    setScreenLoading(true);
    setTimeout(() => {
      setScreenLoading(false);
    }, 1000);
  }, []);

  const onBuffer = () => {
    setIsOnBuffer(!isOnBuffer);
  };
  const videoError = error => {
    // setError('Oops! An error occurred while loading the video.');
    setError(error);
  };
  if (screenLoading) return <AppLoder />;
  return (
    <AppContainer>
      <AppStatusBar />
      <AppHeader isDrawer={false} screen={'Training Reels'} />
      <View style={styles.container}>
        {error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : (
          <YoutubePlayer
            width={'100%'}
            height={'100%'}
            play={true}
            videoId={reelData}
            onError={() => videoError()}
          />
        )}
      </View>
    </AppContainer>
  );
};

export default PlayReel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundVideo: {
    width: '100%',
    height: '100%',
  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
    paddingHorizontal: 15,
  },
  errorText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
