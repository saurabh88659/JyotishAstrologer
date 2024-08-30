import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppContainer from '../../../libComponents/AppContainer';
import {AppColors} from '../../../utils/constants';
import AppText from '../../../libComponents/AppText';
import {getUserKundaliDetails} from '../../../base/features/MainApiServices/MainApiServices';
import AppLoder from '../../../libComponents/AppLoader';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {setKundali, setkundaliLoading} from '../../../redux/auth.reducer';
const Basic = ({navigation, routes}) => {
  const user = useSelector(state => state.auth.userRouteData);
  const kundaliLoading = useSelector(state => state.auth.kundaliLoading);
  const dispatch = useDispatch();
  console.log('user at kundli=========================================', user);
  const [screenLoading, setScreenLoading] = useState(false);
  const kundali = useSelector(state => state.auth.kundali);
  const [userKundaliData, setUserKundaliData] = useState();

  useEffect(() => {
    if (user) {
      handleGetUserKundaliDetails();
    }
    // dispatch(setKundali(JSON.stringify(data)));
  }, [user]);

  const handleGetUserKundaliDetails = async () => {
    dispatch(setkundaliLoading(true));
    const res = await getUserKundaliDetails(user?.user_profile?.id);
    // console.log(
    //   'res of getUserKundaliDetails ++++++++++++++++++++++++++++++++++',
    //   JSON.stringify(res.data),
    // );
    if (res.success) {
      dispatch(setKundali(res.data));
      dispatch(setkundaliLoading(false));
      setScreenLoading(false);
      setUserKundaliData(res.data);
    } else {
      dispatch(setkundaliLoading(false));
      setScreenLoading(false);
      setUserKundaliData([]);
    }
  };

  const TableRow = ({tableKey = '', value = '', isGray}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: isGray ? AppColors.grayShade : AppColors.white,
          paddingVertical: 15,
          paddingHorizontal: 15,
        }}>
        <AppText style={{width: '50%', fontSize: 16, fontWeight: '500'}}>
          {tableKey}
        </AppText>
        <AppText style={{width: '50%', fontSize: 16, fontWeight: '500'}}>
          {value}
        </AppText>
      </View>
    );
  };

  return (
    <AppContainer style={{backgroundColor: AppColors.lightYellow}}>
      {kundaliLoading ? (
        <AppLoder />
      ) : kundali ? (
        <ScrollView>
          <View style={{paddingVertical: 20, paddingHorizontal: 13}}>
            <TableRow
              tableKey="Name"
              value={userKundaliData?.user_details?.name}
              isGray={true}
            />
            <TableRow
              tableKey="Date"
              value={moment(userKundaliData?.user_details?.dob).format(
                'DD MMMM YYYY',
              )}
            />
            <TableRow
              tableKey="Time"
              //  value="05:30 AM"
              value={moment(
                userKundaliData?.user_details?.tob,
                'HH:mm:ss',
              ).format('hh:mm A')}
              isGray={true}
            />
            <TableRow
              tableKey="Place"
              // value="Bazpur, Us Nagar"
              value={`${userKundaliData?.user_details?.city}, ${userKundaliData?.user_details?.state}`}
            />
            {/* <TableRow tableKey="Latitude" value="19:09" isGray={true} />
            <TableRow tableKey="Longitude" value="75:68" /> */}
            <TableRow
              tableKey="Timezone"
              // value="GMT+5.5"
              value={`GMT+${userKundaliData?.user_details?.tz}`}
              isGray={true}
            />
            <TableRow
              tableKey="Sunrise"
              //  value="7:05:18 AM"
              value={
                userKundaliData?.panchang?.response?.advanced_details?.sun_rise
              }
            />
            <TableRow
              tableKey="Sunset"
              value={
                userKundaliData?.panchang?.response?.advanced_details?.sun_set
              }
              isGray={true}
            />
            <TableRow
              tableKey="Ayanamsha"
              //  value="23.94098"
              value={userKundaliData?.panchang?.response?.ayanamsa?.name}
            />
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

export default Basic;
const styles = StyleSheet.create({
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
