import {StyleSheet, Text, View, ScrollView, FlatList} from 'react-native';
import React from 'react';
import AppLoder from '../../../libComponents/AppLoader';
import AppContainer from '../../../libComponents/AppContainer';
import {AppColors} from '../../../utils/constants';
import {useSelector} from 'react-redux';
import moment from 'moment';
import AppText from '../../../libComponents/AppText';

const Planetdetails = () => {
  const userKundaliData = useSelector(state => state.auth.kundali);
  // const parsedKundaliData = userKundaliData? JSON?.parse(userKundaliData):null;

  const kundaliLoading = useSelector(state => state.auth.kundaliLoading);
  //   console.log
  //     ' userKundaliData.planetDetails.response=========',
  //     parsedKundaliData.planetdetails.response,
  //   );
  //   const formattedData = Object.values(
  //     parsedKundaliData.planetdetails.response,
  //   ).filter(item => typeof item === 'object');
  const planetData = userKundaliData?.planetdetails?.response
    ? Object.entries(userKundaliData.planetdetails.response)
        .filter(
          ([key, value]) => !isNaN(parseInt(key)) && typeof value === 'object',
        )
        .reduce((obj, [key, value]) => {
          obj[key] = value;
          return obj;
        }, {})
    : null;

  const formattedData = planetData ? Object?.values(planetData) : null;

  const renderPlanet = ({item}) => (
    <View style={styles.planetContainer}>
      <Text style={styles.planetTitle}>{item.full_name}</Text>
      <View style={styles.planetDetailRow}>
        <Text style={styles.detailLabel}>Full Name</Text>
        <Text style={styles.detailValue}>{item.full_name}</Text>
      </View>
      <View style={styles.planetDetailRow}>
        <Text style={styles.detailLabel}>Local Degree:</Text>
        <Text style={styles.detailValue}>{item.local_degree}</Text>
      </View>
      <View style={styles.planetDetailRow}>
        <Text style={styles.detailLabel}>Global Degree:</Text>
        <Text style={styles.detailValue}>{item.global_degree}</Text>
      </View>
      <View style={styles.planetDetailRow}>
        <Text style={styles.detailLabel}>Zodiac:</Text>
        <Text style={styles.detailValue}>{item.zodiac}</Text>
      </View>
      <View style={styles.planetDetailRow}>
        <Text style={styles.detailLabel}>House:</Text>
        <Text style={styles.detailValue}>{item.house}</Text>
      </View>
      <View style={styles.planetDetailRow}>
        <Text style={styles.detailLabel}>Nakshatra:</Text>
        <Text style={styles.detailValue}>{item.nakshatra}</Text>
      </View>
      <View style={styles.planetDetailRow}>
        <Text style={styles.detailLabel}>Nakshatra Lord:</Text>
        <Text style={styles.detailValue}>{item.nakshatra_lord}</Text>
      </View>
      <View style={styles.planetDetailRow}>
        <Text style={styles.detailLabel}>Zodiac Lord:</Text>
        <Text style={styles.detailValue}>{item.zodiac_lord}</Text>
      </View>
      {/* Add more details as needed */}
    </View>
  );

  return (
    <AppContainer style={{backgroundColor: AppColors.lightYellow}}>
      {kundaliLoading ? (
        <AppLoder />
      ) : formattedData ? (
        <FlatList
          data={formattedData}
          renderItem={renderPlanet}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.container}
        />
      ) : (
        <View style={styles.noDatContainer}>
          <AppText style={styles.noDataText}>No Data found!</AppText>
        </View>
      )}
    </AppContainer>
  );
};

export default Planetdetails;

const styles = StyleSheet.create({
  container: {
    padding: 16,
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
  planetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    alignSelf: 'center',
  },
  planetContainer: {
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
    width: '100%',
    elevation: 6,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  planetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    marginTop: 10,
    color: AppColors.black,
    alignSelf: 'center',
  },
  planetDetailRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  detailLabel: {
    fontWeight: 'bold',
    width: '50%',
    color: AppColors.black,
    fontSize: 15,
  },
  detailValue: {
    width: '50%',
    color: AppColors.black,
    fontSize: 15,
  },
});
