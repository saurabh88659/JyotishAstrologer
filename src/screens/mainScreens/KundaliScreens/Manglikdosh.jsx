import React, {useState} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {AppColors} from '../../../utils/constants';
import AppContainer from '../../../libComponents/AppContainer';
import AppLoder from '../../../libComponents/AppLoader';
import AppText from '../../../libComponents/AppText';

const Manglikdosh = () => {
  const userKundaliData = useSelector(state => state.auth.kundali);
  // const parsedData = JSON.parse(userKundaliData);
  const [manglikData, setmanglikData] = useState(userKundaliData?.manglikdosh);
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
      ) : manglikData ? (
        <ScrollView contentContainerStyle={styles.container}>
          <View
            style={{
              paddingVertical: 10,
              paddingHorizontal: 15,
              backgroundColor: AppColors.white,
              borderRadius: 6,
            }}>
            <Text style={styles.heading}>Manglik Dosha</Text>
            <Text style={styles.subHeading}>
              Manglik by Mars -{' '}
              {manglikData?.response.manglik_by_mars ? 'Yes' : 'No'}
            </Text>
            <Text style={styles.subHeading}>
              Manglik by Saturn -{' '}
              {manglikData?.response?.manglik_by_saturn ? 'Yes' : 'No'}
            </Text>
            <Text style={styles.subHeading}>
              Manglik by Rahu-Ketu -{' '}
              {manglikData?.response?.manglik_by_rahuketu ? 'Yes' : 'No'}
            </Text>
            <Text style={styles.heading}>Factors</Text>
            {manglikData?.response?.factors?.map((factor, index) => (
              <Text key={index} style={styles.text}>
                {factor}
              </Text>
            ))}
            <Text style={styles.heading}>Aspects</Text>
            {manglikData?.response?.aspects?.map((aspect, index) => (
              <Text key={index} style={styles.text}>
                {aspect}
              </Text>
            ))}
            <Text style={styles.text}>
              {manglikData?.response?.bot_response}
            </Text>
            <Text style={styles.heading}>
              Score: {manglikData?.response?.score}
            </Text>
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

export default Manglikdosh;
