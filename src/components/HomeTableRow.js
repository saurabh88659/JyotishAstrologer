import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppText from '../libComponents/AppText';
import {AppColors} from '../utils/constants';
import {Switch} from 'react-native';
import {TouchableOpacity} from 'react-native';
import AppIcon, {Icons} from '../libComponents/AppIcon';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

const HomeTableRow = ({
  type,
  subType,
  nextTime,
  emergencyChatTotoal,
  emergencyChatUsed = 0,
  isEmergencyChat = false,
  isInformationIcon = false,
  value,
  onToggle,
  onInfoClick,
  onDateChange,
  dateVal,
}) => {
  const [isEnabled, setIsEnabled] = useState(value);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date] = useState(new Date());
  const [dateValue, setDateValue] = useState(dateVal);

  useEffect(() => {
    setIsEnabled(value);
  }, [value]);

  useEffect(() => {
    const formattedTime = dateVal
      ? moment(dateVal, 'HH:mm:ss').format('hh:mm A')
      : '';
    setDateValue(formattedTime);
  }, [dateVal]);

  const toggleSwitch = () => {
    setIsEnabled(!isEnabled);
    onToggle(!isEnabled);
  };

  const handleDate = date => {
    // const formattedDate = moment(date).format('DD MMM YY, h:mm A');
    console.log(date, 'date');
    const formattedTime = moment(date).format('HH:mm:ss');
    const formattedTime1 = moment(date).format('hh:mm A');
    onDateChange(formattedTime);
    setDateValue(formattedTime1);
    setShowDatePicker(!showDatePicker);
  };

  return (
    <View key={value} style={styles.tableRows}>
      <View
        style={{
          width: '33%',
          alignItems: 'center',
          paddingVertical: 8,
        }}>
        <AppText style={{fontWeight: 'bold', textAlign: 'center'}}>
          {type}
        </AppText>
        {/* <AppText style={{fontSize: 13}}>{subType}</AppText> */}
      </View>
      <View
        style={{
          width: '22%',
          alignItems: 'center',
        }}>
        <Switch
          trackColor={{false: AppColors.dark_gray, true: 'green'}}
          thumbColor={isEnabled ? AppColors.white : AppColors.white}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>

      <View style={{width: '45%', alignItems: 'center'}}>
        {nextTime && (
          <>
            <TouchableOpacity
              onPress={() => setShowDatePicker(!showDatePicker)}
              style={{
                borderWidth: 1,
                borderRadius: 5,
                width: '90%',
                height: 32,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <AppText style={{fontSize: 13, fontWeight: '400'}}>
                {dateValue ? dateValue : 'Select Time'}
              </AppText>
            </TouchableOpacity>
            {/* {showDatePicker && ( */}
            <DatePicker
              minimumDate={date}
              // is24hourSource={true}
              is24hourSource="locale"
              mode="time"
              modal
              open={showDatePicker}
              date={date}
              onConfirm={handleDate}
              onCancel={() => setShowDatePicker(!showDatePicker)}
            />
            {/* )} */}
          </>
        )}

        {isEmergencyChat && (
          <View
            style={{
              // borderWidth: 1,
              // borderRadius: 5,
              width: '90%',
              // height: 32,
              justifyContent: 'center',
              alignItems: 'center',
              gap: 5,
            }}>
            <AppText style={{fontSize: 14, fontWeight: '400'}}>
              Used : {emergencyChatUsed.toString()}
            </AppText>
            <AppText style={{fontSize: 13, fontWeight: '400'}}>
              Total : {emergencyChatTotoal.toString()}
            </AppText>
          </View>
        )}

        {isInformationIcon && (
          <View
            style={{
              // borderWidth: 1,
              // borderRadius: 5,
              width: '90%',
              // height: 32,
              justifyContent: 'center',
              alignItems: 'center',
              gap: 5,
            }}>
            <TouchableOpacity onPress={onInfoClick}>
              <AppIcon
                type={Icons.MaterialCommunityIcons}
                name="information"
                color={AppColors.black}
                size={26}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default HomeTableRow;

const styles = StyleSheet.create({
  interNetSpeedContainer: {
    paddingVertical: 12,
    backgroundColor: AppColors.primary,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  typeTableText: {
    width: '33%',
    textAlign: 'center',
    fontWeight: '800',
  },
  statusTableText: {
    width: '22%',
    textAlign: 'center',
    fontWeight: '800',
  },
  nextTimeTableText: {
    width: '45%',
    textAlign: 'center',
    fontWeight: '800',
  },
  TableHeader: {
    width: '100%',
    flexDirection: 'row',
    paddingVertical: 10,
  },
  tableContainer: {
    width: '100%',
    backgroundColor: AppColors.white,
    borderRadius: 10,
    marginTop: 15,
    paddingVertical: 10,
  },
  tableRows: {
    width: '100%',
    flexDirection: 'row',
    paddingVertical: 13,
    // backgroundColor: 'red',
    alignItems: 'center',
  },
  gradientPerformceContainer: {
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 10,
    gap: 5,
    borderRadius: 10,
  },
});
