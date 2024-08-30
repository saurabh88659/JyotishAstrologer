import React, {useState} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import AppContainer from '../../../libComponents/AppContainer';
import AppLoder from '../../../libComponents/AppLoader';
import {AppColors} from '../../../utils/constants';
import AppText from '../../../libComponents/AppText';

const Pitradosh = () => {
  const userKundaliData = useSelector(state => state.auth.kundali);
  // const parsedData = JSON.parse(userKundaliData);
  const [pitraDoshData, setPitraDoshData] = useState(userKundaliData?.pitradosh);
  const kundaliLoading = useSelector(state => state.auth.kundaliLoading);
  return (
    <AppContainer
      style={{
        backgroundColor: AppColors.lightYellow,
        paddingHorizontal: 15,
        paddingVertical: 20,
      }}>
      {kundaliLoading ? (
        <AppLoder />
      ) : pitraDoshData ? (
        <ScrollView contentContainerStyle={styles.container}>
          <View
            style={{
              paddingVertical: 10,
              paddingHorizontal: 15,
              backgroundColor: AppColors.white,
              borderRadius: 6,
            }}>
            <Text style={styles.heading}>Pitra Dosha</Text>
            <Text style={styles.subHeading}>
              Dosha Present -{' '}
              {pitraDoshData.response.is_dosha_present ? 'Yes' : 'No'}
            </Text>
            <Text style={styles.text}>
              {pitraDoshData.response.bot_response}
            </Text>
            <Text style={styles.heading}>Effects</Text>
            {pitraDoshData.response.effects.map((effect, index) => (
              <Text key={index} style={styles.text}>
                {effect}
              </Text>
            ))}
            <Text style={styles.heading}>Remedies</Text>
            {pitraDoshData.response.remedies.map((remedy, index) => (
              <Text key={index} style={styles.text}>
                {remedy}
              </Text>
            ))}
          </View>
        </ScrollView>
      ) : (
        <View style={styles.noDatContainer}>
          <AppText style={styles.noDataText}>No Data found!</AppText>
        </View>
      )}
    </AppContainer>
  );
};

const styles = StyleSheet.create({
  container: {},
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: AppColors.black,
    marginTop: 10,
  },
  subHeading: {
    fontSize: 16,
    marginBottom: 3,
    color: AppColors.black,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
    color: AppColors.black,
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

export default Pitradosh;
