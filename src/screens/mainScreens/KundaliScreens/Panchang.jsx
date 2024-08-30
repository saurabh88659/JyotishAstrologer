import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {ScrollView} from 'react-native';
import {AppColors} from '../../../utils/constants';
import AppLoder from '../../../libComponents/AppLoader';

const Panchang = () => {
  const userKundaliData = useSelector(state => state.auth.kundali);
  // const parsedKundaliData = JSON.parse(userKundaliData);
  const kundaliLoading = useSelector(state => state.auth.kundaliLoading);

  const Card = ({title, data}) => {
    return (
      <View style={styles.card}>
        <Text style={styles.title}>{title}</Text>
        {Object.entries(data).map(([key, value]) => (
          <View key={key} style={styles.row}>
            <Text style={styles.key}>{key.replace(/_/g, ' ')}:</Text>
            <Text style={styles.value}>{value}</Text>
          </View>
        ))}
      </View>
    );
  };

  const AdvanceDetailsCard = ({title, data}) => {
    return (
      <View style={styles.card}>
        <Text style={styles.title}>{title}</Text>
        {Object.entries(data).map(([key, value]) => (
          <View key={key} style={styles.row}>
            <Text style={styles.key2}>{key.replace(/_/g, ' ')}:</Text>
            <Text style={styles.value2}>{value}</Text>
          </View>
        ))}
      </View>
    );
  };
  return (
    <View style={styles.container}>
      {kundaliLoading ? (
        <AppLoder />
      ) : (
        <ScrollView>
          <View style={{paddingHorizontal: 10}}>
            {userKundaliData?.panchang?.response?.tithi && (
              <Card
                title="Tithi"
                data={userKundaliData.panchang.response.tithi}
              />
            )}
            {userKundaliData?.panchang?.response?.nakshatra && (
              <Card
                title="Nakshatra"
                data={userKundaliData.panchang.response.nakshatra}
              />
            )}

            {userKundaliData?.panchang?.response?.karana && (
              <Card
                title="Karana"
                data={userKundaliData.panchang.response.karana}
              />
            )}

            {userKundaliData?.panchang?.response?.yoga && (
              <Card
                title="Yoga"
                data={userKundaliData.panchang.response.yoga}
              />
            )}

            {userKundaliData?.panchang?.response?.advanced_details.masa && (
              <AdvanceDetailsCard
                title="Yoga"
                data={
                  userKundaliData?.panchang?.response?.advanced_details?.masa
                }
              />
            )}

            {userKundaliData?.panchang?.response?.advanced_details.years && (
              <AdvanceDetailsCard
                title="Years"
                data={
                  userKundaliData?.panchang?.response?.advanced_details?.years
                }
              />
            )}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default Panchang;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: AppColors.lightYellow,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: AppColors.black,
    //     alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  key: {
    fontWeight: 'bold',
    marginRight: 8,
    color: AppColors.black,
    width: '25%',
    fontSize: 15,
  },
  value: {
    flex: 1,
    flexWrap: 'wrap',
    color: AppColors.black,
    fontSize: 15,
  },
  key2: {
    fontWeight: 'bold',
    marginRight: 8,
    color: AppColors.black,
    fontSize: 15,
    width: '50%',
  },
  value2: {
    flex: 1,
    flexWrap: 'wrap',
    color: AppColors.black,
    fontSize: 15,
  },
});
