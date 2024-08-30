import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AppContainer from '../../../libComponents/AppContainer';
import AppStatusBar from '../../../libComponents/AppStatusBar';
import AppHeader from '../../../libComponents/AppHeader';
import {ScrollView} from 'react-native-gesture-handler';
import {AppColors} from '../../../utils/constants';
import AppText from '../../../libComponents/AppText';

const LiveEvent = () => {
  return (
    <AppContainer>
      <AppStatusBar />
      <AppHeader screen={'Live Events'} isDrawer={false} />
      <ScrollView
        contentContainerStyle={{paddingHorizontal: 10, paddingBottom: 10}}
        showsVerticalScrollIndicator={false}>
        {[1, 2, 3, 4, 4, 4].map(() => {
          return (
            <View style={styles.eventCardContainer}>
              <AppText style={styles.headingText}>Live Session</AppText>
              <AppText style={styles.timeText}>02:11 PM (IST)</AppText>
              <AppText style={styles.dayText}>On 28 Oct 2023</AppText>
              <AppText style={styles.statusText}>Status:FINISHED</AppText>
            </View>
          );
        })}
      </ScrollView>
    </AppContainer>
  );
};

export default LiveEvent;

const styles = StyleSheet.create({
  eventCardContainer: {
    width: '100%',
    backgroundColor: AppColors.black,
    marginTop: 10,
    borderRadius: 10,
    gap: 8,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  headingText: {fontSize: 23, color: '#aca253', fontWeight: '700'},
  timeText: {fontSize: 15, color: AppColors.white, fontWeight: '700'},
  dayText: {fontSize: 15, color: '#aca253', fontWeight: '700'},
  statusText: {
    fontSize: 16,
    color: AppColors.white,
    fontWeight: '700',
    marginTop: 8,
  },
});
